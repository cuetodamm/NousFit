"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { CgMenuRound } from "react-icons/cg";
import { FaSearch, FaFileExcel, FaFilter, FaPlus } from "react-icons/fa";

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
      <button 
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors" 
        onClick={() => setOpen(!isOpen)}
      >
        <CgMenuRound className="text-3xl" />
      </button>
      
      <aside className={`sidebar fixed top-0 left-0 h-screen w-64 p-6 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out bg-gradient-to-b from-gray-900 via-gray-800 to-black shadow-2xl z-40`}>
        <div className="flex items-center gap-3 mb-10 mt-12">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">N</div>
            <h2 className="text-2xl font-bold tracking-wider">NousFit</h2>
        </div>
        
        <nav>
            <ul className="space-y-6">
            <li>
                <a href="/dashboard" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded transition-all">
                <span>📊</span> Dashboard
                </a>
            </li>
            <li>
                <div className="text-xs uppercase text-gray-500 font-bold mb-2 px-2">Gestión</div>
                <ul className="space-y-2 pl-2">
                    <li><a href="/usuarios" className="block text-gray-400 hover:text-white p-2 rounded hover:bg-gray-800">Usuarios</a></li>
                    <li><a href="/asistencia" className="block text-white bg-blue-900/50 border-l-4 border-blue-500 p-2 rounded">Registros</a></li>
                    <li><a href="/logs" className="block text-gray-400 hover:text-white p-2 rounded hover:bg-gray-800">Logs del Sistema</a></li>
                </ul>
            </li>
            <li>
                <div className="text-xs uppercase text-gray-500 font-bold mb-2 px-2">Seguridad</div>
                <a href="/face-recognition" className="block text-gray-400 hover:text-white p-2 rounded hover:bg-gray-800">Face ID</a>
            </li>
            </ul>
        </nav>
      </aside>
    </div>
  );
}

export default function AsistenciaPage() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarAsistencias = async () => {
      try {
        const res = await axios.get("/api/auth/asistencia");
        setRegistros(res.data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los registros de asistencia.");
      } finally {
        setLoading(false);
      }
    };
    cargarAsistencias();
  }, []);

  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "-";
    const fecha = new Date(fechaISO);
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    }).format(fecha);
  };

  const registrosFiltrados = registros.filter((item) => {
    const termino = filtro.toLowerCase();
    const u = item.usuario || {}; 
    return (
      (u.nombre && u.nombre.toLowerCase().includes(termino)) ||
      (u.apellidos && u.apellidos.toLowerCase().includes(termino)) ||
      (u.noCuenta && u.noCuenta.includes(termino)) ||
      (u.carrera && u.carrera.toLowerCase().includes(termino))
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 ml-0 md:ml-0 transition-all">
        <div className="max-w-7xl mx-auto">
            <header className="mb-8 mt-12 md:mt-0">
                <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Registro de Asistencia</h1>
                <p className="text-gray-500 mt-2">Monitoreo en tiempo real de ingresos por reconocimiento facial.</p>
            </header>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre, cuenta o carrera..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                        <FaFilter /> Filtrar
                    </button>
                    
                    {/* BOTÓN REGISTRAR AGREGADO */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm">
                        <FaPlus /> Registrar
                    </button>
                    
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium text-sm">
                        <FaFileExcel /> Exportar
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Cargando bitácora...</p>
                    </div>
                ) : error ? (
                    <div className="p-8 text-center text-red-500 bg-red-50 border-b border-red-100">
                        {error}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                    <th className="p-4">Hora / Fecha</th>
                                    <th className="p-4">Alumno</th>
                                    <th className="p-4">No. Cuenta</th>
                                    <th className="p-4">Carrera</th>
                                    <th className="p-4">Turno</th>
                                    <th className="p-4 text-center">Género</th>
                                    <th className="p-4 text-center">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {registrosFiltrados.length > 0 ? (
                                    registrosFiltrados.map((registro) => (
                                        <tr key={registro.id} className="hover:bg-blue-50/50 transition-colors group">
                                            <td className="p-4 text-gray-600 font-mono text-sm whitespace-nowrap">
                                                {formatearFecha(registro.fecha)}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-800">
                                                        {registro.usuario?.nombre} {registro.usuario?.apellidos}
                                                    </span>
                                                    <span className="text-xs text-gray-400 md:hidden">{registro.usuario?.noCuenta}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-600 font-mono text-sm">
                                                {registro.usuario?.noCuenta}
                                            </td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                                                    {registro.usuario?.carrera || "N/A"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600 text-sm">
                                                {registro.usuario?.turno || "-"}
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={`inline-block w-6 h-6 rounded-full text-xs flex items-center justify-center text-white ${
                                                    registro.usuario?.genero === 'H' ? 'bg-indigo-500' : 
                                                    registro.usuario?.genero === 'M' ? 'bg-pink-500' : 'bg-gray-400'
                                                }`}>
                                                    {registro.usuario?.genero ? registro.usuario.genero.charAt(0) : '?'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                    ● Exitoso
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="p-10 text-center text-gray-500">
                                            No se encontraron registros que coincidan con "{filtro}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                    <span>Mostrando {registrosFiltrados.length} registros</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Anterior</button>
                        <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}