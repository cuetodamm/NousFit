"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CgMenuRound } from "react-icons/cg";
import CryptoJS from "crypto-js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const AES_SECRET_KEY = process.env.AES_SECRET_KEY;

function Sidebar() {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div>
      <button className="p-4" onClick={() => setOpen(!isOpen)}>
        <CgMenuRound className="text-5xl" />
      </button>
      <aside
        className={`sidebar fixed top-0 left-0 h-screen w-64 p-6 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-400 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg`}
      >
        <ul className="space-y-4">
          <li>
            <a href="/dashboard" className="hover:underline">
              Dashboard
            </a>
          </li>
          <li>
            <a className="hover:underline">Asistencia</a>
          </li>
          <li>
            <a href="/login" className="hover:underline">
              Salir
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
  async function fetchUsuario() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No hay token guardado");
        return;
      }

      const response = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsuario(response.data.usuario);
    } catch (err) {
      console.error("Error al obtener el usuario:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchUsuario();
}, []);


  const encryptImage = (imageBase64) => {
    return CryptoJS.AES.encrypt(imageBase64, AES_SECRET_KEY).toString();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !usuario) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImage(reader.result.split(",")[1]); 
    };
  };

  const handleSaveImage = async () => {
    if (!selectedImage || !usuario) {
      setUploadStatus("No hay imagen seleccionada");
      return;
    }

    const encryptedImage = encryptImage(selectedImage);
    const formData = new FormData();
    formData.append("imagen", encryptedImage);
    formData.append("correo", usuario.correo);

    try {

    const response = await axios.post("/api/auth/uploadBiometric", formData);
    setUploadStatus(response.data.message);
  } catch (error) {
    setUploadStatus("Error al guardar la imagen.");
    console.error("Error:", error);
  }
};

  const asistenciaData = {
    labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    datasets: [{
      label: "Asistencias semanales",
      data: [50, 65, 40, 55, 70], 
      borderColor: "#2196F3",
      backgroundColor: "rgba(33, 150, 243, 0.1)",
      fill: true,
      tension: 0.3,
    }]
  };

  return (
    <div className="h-screen relative flex-col">
      <div className="relative hex-pattern2 p-10">
        <div className="flex flex-1 p-5 box3">
          <Sidebar />
          <main className="flex-1 p-6 w-full">
            <h2 className="text-2xl font-bold">Bienvenido al Dashboard</h2>
            {loading ? <p>Cargando datos...</p> : usuario && <p>Bienvenido, <strong>{usuario.nombre}</strong> 👋</p>}
            <p className="text-gray-600">Gestiona tu asistencia y registro biométrico aquí.</p>

             <h2 className="mt-6 text-lg font-semibold">Subir imagen para registro biométrico</h2>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {selectedImage && (
  <button onClick={handleSaveImage} className="mt-4 p-2 bg-blue-500 text-white rounded">
    Guardar Imagen
  </button>
)}
{uploadStatus && <p>{uploadStatus}</p>}



            <h2 className="mt-6 text-lg font-semibold">Asistencias semanales</h2>
            <div className="chart-container h-64">
              <Line data={asistenciaData} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}