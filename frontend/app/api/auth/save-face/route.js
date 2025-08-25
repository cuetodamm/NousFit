import prisma from "@/lib/prisma";
import crypto from "node:crypto";
import fetch from "node-fetch";
import * as tf from "@tensorflow/tfjs-node";
import * as facemesh from "@tensorflow-models/facemesh";
global.fetch = fetch;

// 🔥 Clave AES-256 segura
const AES_SECRET_KEY = "3d9c1b79641bb1355b25a38a3f98487fccb3bd59c2692c56de1a464694feaa85";

const decryptData = (encryptedString) => {
  const bytes = CryptoJS.AES.decrypt(encryptedString, AES_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export async function POST(req) {
  try {
    const { image } = await req.json();
    console.log("🔹 Imagen recibida para comparación:", image);

    // 🔹 Desencriptar la imagen detectada
    const detectedImageBase64 = decryptData(image);
    
    // 🔹 Obtener TODOS los usuarios con `datosBiometricos`
    const usuarios = await prisma.Usuario.findMany({ where: { datosBiometricos: { not: null } } });

    if (!usuarios.length) {
      console.log("🚫 No hay usuarios registrados con datos biométricos.");
      return Response.json({ message: "No hay usuarios con datos biométricos." }, { status: 404 });
    }

    let usuarioIdentificado = null;
    let menorDistancia = Infinity;

    const model = await facemesh.load();
    const detectedImageTensor = await convertBase64ToTensor(detectedImageBase64);

    for (const usuario of usuarios) {
      // 🔹 Desencriptar `datosBiometricos` del usuario
      const storedImageBase64 = decryptData(usuario.datosBiometricos);
      const storedImageTensor = await convertBase64ToTensor(storedImageBase64);

      const detectedPredictions = await model.estimateFaces(detectedImageTensor, false);
      const storedPredictions = await model.estimateFaces(storedImageTensor, false);

      if (!detectedPredictions.length || !storedPredictions.length) continue;

      // 🔹 Calcular distancia euclidiana entre rostros
      const distancia = euclideanDistance(detectedPredictions[0].mesh, storedPredictions[0].mesh);
      console.log(`🔹 Distancia con ${usuario.correo}: ${distancia}`);

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        usuarioIdentificado = usuario;
      }
    }

    if (usuarioIdentificado && menorDistancia < 10) {
      await prisma.Asistencia.create({
        data: {
          correo: usuarioIdentificado.correo,
          fecha: new Date(),
          estado: "Asistencia confirmada",
        },
      });

      console.log(`✅ Asistencia registrada para ${usuarioIdentificado.correo}!`);
      return Response.json({ message: `✅ Usuario identificado: ${usuarioIdentificado.nombre}` }, { status: 200 });
    } else {
      console.log("🚫 No se encontró coincidencia.");
      return Response.json({ message: "No se encontró coincidencia.", status: 403 });
    }

  } catch (error) {
    console.error("❌ Error en la comparación facial:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

const convertBase64ToTensor = async (base64) => {
  const buffer = Buffer.from(base64, "base64");
  return tf.node.decodeImage(buffer);
};

const euclideanDistance = (arr1, arr2) => {
  return Math.sqrt(arr1.reduce((acc, val, i) => acc + Math.pow(val - arr2[i], 2), 0));
};