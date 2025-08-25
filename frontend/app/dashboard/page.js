"use client";
import { useState, useEffect } from "react";
import { CgMenuRound } from "react-icons/cg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Bar, Line } from "react-chartjs-2";

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler);

// Datos estáticos de ejemplo
const staticData = {
  genero: {
    hombres: 65,
    mujeres: 35
  },
  carreras: [
    { carrera: "ICO", cantidad: 20 },
    { carrera: "LIA", cantidad: 27 },
    { carrera: "LAM", cantidad: 21 },
    { carrera: "LPS", cantidad: 13 },
    { carrera: "LDE", cantidad: 19 },
    { carrera: "LCN", cantidad: 10 },
    { carrera: "ADMINISTRATIVOS", cantidad: 7 },
    { carrera: "DOCENTES", cantidad: 9 },
  ],
  horarios: [
    { hora: 9, cantidad: 18 },
    { hora: 10, cantidad: 22 },
    { hora: 11, cantidad: 15 },
    { hora: 12, cantidad: 25 },
    { hora: 13, cantidad: 20 },
    { hora: 14, cantidad: 26}
  ],
  dias: [
    { fecha: "Lunes", cantidad: 50 },
    { fecha: "Martes", cantidad: 65 },
    { fecha: "Miercoles", cantidad: 40 },
    { fecha: "Jueves", cantidad: 55 },
    { fecha: "Viernes", cantidad: 70 }
  ]
};
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
      <aside className={`sidebar fixed top-0 left-0 h-screen w-64 p-6 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-400 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg`}>
        <ul className="space-y-4">
          <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
          <li><a className="hover:underline">Tablas</a></li>
          <ul className="space-y-4">
            <li><a href="/usuarios" className="hover:underline">Usuarios</a></li>
            <li><a href="/asistencia" className="hover:underline">Registros</a></li>
            <li><a href="/logs" className="hover:underline">Logs</a></li>
            <li><a href="/face-recognition" className="hover:underline">Face ID</a></li>
          </ul>
        </ul>
      </aside>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulamos una llamada API con un retraso
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula carga
        
        // Usamos los datos estáticos directamente
        setData(staticData);
      } catch (err) {
        setError("Error al cargar datos estáticos");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Opciones para los gráficos
  const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { 
      position: 'top',
      labels: {
        boxWidth: 12,
        padding: 20
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true
    }
  }
};
return (
    <div className="h-screen relative flex-col">
      <div className="relative hex-pattern2 p-10">
        <div className="flex flex-1  p-5 box3">
          <Sidebar />
          
          <main className="flex-1 p-6 w-full">
            <h2 className="text-2xl font-bold">Bienvenido al Dashboard</h2>
            <p className="text-gray-600">
              Aquí puedes gestionar asistencia, usuarios y monitorear registros.
            </p>

            {error && (
              <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {loading && <p className="mt-6 text-black-500">Cargando estadísticas...</p>}

            {data && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {/* Gráfico de Género */}
                <div className=" p-4 rounded-lg ">
                  <h3 className="text-lg font-semibold mb-3">Distribución por Género</h3>
                  <div className="h-64">
                    <Doughnut
                      data={{
                        labels: ["Hombres", "Mujeres"],
                        datasets: [{
                          data: [data.genero.hombres, data.genero.mujeres],
                          backgroundColor: ["#2196F3", "#E91E63"],
                        }],
                      }}
                      options={chartOptions}
                    />
                  </div>
                </div>

                {/* Gráfico de Carreras */}
                <div className=" p-4 rounded-lg ">
                  <h3 className="text-lg font-semibold mb-3">Usuarios por Carrera</h3>
                  <div className="h-64">
                    <Bar
                      data={{
                        labels: data.carreras.map(c => c.carrera),
                        datasets: [{
                          label: "Cantidad",
                          data: data.carreras.map(c => c.cantidad),
                          backgroundColor: ["#FF9800", "#4CAF50", "#9C27B0", "#607D8B"],
                        }],
                      }}
                      options={chartOptions}
                    />
                  </div>
                </div>

                {/* Gráfico de Horarios */}
                <div className=" p-4 rounded-lg ">
                  <h3 className="text-lg font-semibold mb-3">Asistencias por Hora</h3>
                  <div className="h-64">
                    <Line
                      data={{
                        labels: data.horarios.map(h => `${h.hora}:00`),
                        datasets: [{
                          label: "Asistencias",
                          data: data.horarios.map(h => h.cantidad),
                          borderColor: "#2196F3",
                          backgroundColor: "rgba(33, 150, 243, 0.1)",
                          fill: true,
                          tension: 0.3,
                        }],
                      }}
                      options={chartOptions}
                    />
                  </div>
                </div>

                {/* Gráfico de Días */}
                <div className=" p-4 rounded-lg ">
                  <h3 className="text-lg font-semibold mb-3">Ingresos Diarios</h3>
                  <div className="h-64">
                    <Line
                      data={{
                        labels: data.dias.map(d => d.fecha),
                        datasets: [{
                          label: "Ingresos",
                          data: data.dias.map(d => d.cantidad),
                          borderColor: "#E91E63",
                          backgroundColor: "rgba(233, 30, 99, 0.1)",
                          fill: true,
                          tension: 0.3,
                        }],
                      }}
                      options={chartOptions}
                    />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}