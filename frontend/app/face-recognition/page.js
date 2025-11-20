"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import CryptoJS from "crypto-js";

export default function FaceRecognition() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraState, setCameraState] = useState("idle");
  const [errorDetails, setErrorDetails] = useState({ title: "", message: "", solution: "" });
  const [usuarioIdentificado, setUsuarioIdentificado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const facemeshModel = await facemesh.load();
      setModel(facemeshModel);
      console.log("✅ Modelo `facemesh` cargado!");
    }

    loadModel();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    setCameraState("loading");
    setErrorDetails({ title: "", message: "", solution: "" });

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Tu navegador no soporta acceso a la cámara (HTTPS requerido).");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
        audio: false,
      });

      streamRef.current = stream;

      if (!videoRef.current) {
        console.warn("🚫 `videoRef.current` es `null`. Esperando renderizado...");
        setCameraState("idle");
        return;
      }

      videoRef.current.srcObject = stream;
      setCameraState("active");
      console.log("✅ Cámara activada!");

    } catch (err) {
      console.error("❌ Error al acceder a la cámara:", err);
      setCameraState("error");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraState("idle");
  };

  const captureImage = () => {
    if (!videoRef.current) return null;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg", 0.9).split(",")[1];
  };

  const encryptImage = (imageBase64) => {
    return CryptoJS.AES.encrypt(imageBase64, process.env.NEXT_PUBLIC_AES_SECRET_KEY).toString();
  };

  const processFaceRecognition = async () => {
    if (cameraState !== "active" || !model) return;

    setLoading(true);
    try {
      const imageBase64 = captureImage();
      if (!imageBase64) {
        alert("❌ No se pudo capturar la imagen.");
        return;
      }

      const encryptedImage = encryptImage(imageBase64);
      console.log("🔹 Imagen encriptada:", encryptedImage);

      const response = await axios.post("/api/auth/save-face", { image: encryptedImage });

      if (response.data.message.includes("No se encontró coincidencia")) {
        setUsuarioIdentificado(null);
        alert("❌ No se encontró coincidencia.");
      } else {
        setUsuarioIdentificado(response.data.message);
        alert(`✅ Usuario identificado: ${response.data.message}`);
      }

    } catch (error) {
      console.error("Error:", error);
      setErrorDetails({
        title: "Error en reconocimiento",
        message: error.message,
        solution: "Intenta de nuevo o verifica tu conexión"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="face-recognition-container">
      <h1>Registro de Asistencia Facial</h1>

      <div className="camera-controls">
        {cameraState === "idle" && (
          <button onClick={startCamera} className="start-button">
            Activar Cámara
          </button>
        )}
      </div>

      <div className="camera-container">
        {cameraState === "loading" && <p>Cargando cámara...</p>}
        {cameraState === "error" && <p>{errorDetails.message}</p>}
        {cameraState === "active" && (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="camera-preview" />
            <button onClick={stopCamera} className="stop-button">Detener Cámara</button>
            <button onClick={processFaceRecognition} disabled={loading} className={`process-button ${loading ? "disabled" : ""}`}>
              {loading ? "Procesando..." : "Registrar Asistencia"}
            </button>
          </>
        )}
      </div>

      {usuarioIdentificado && <p>Usuario Identificado: <strong>{usuarioIdentificado}</strong></p>}

      <style jsx>{`
        .face-recognition-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          text-align: center;
          background: #f4f4f4;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .camera-container {
          width: 100%;
          background: #000;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          overflow: hidden;
        }
        .camera-preview {
          width: 100%;
          max-height: 500px;
          object-fit: contain;
        }
        .start-button { background: #4CAF50; color: white; }
        .stop-button { background: #f44336; color: white; }
        .process-button { background: #2196F3; color: white; }
        .process-button.disabled { background: #cccccc; cursor: not-allowed; }
      `}</style>
    </div>
  );
}