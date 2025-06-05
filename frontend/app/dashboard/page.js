"use client"; // Importante para usar hooks en Next.js

import { useState, useEffect } from "react";
import { CgMenuRound } from "react-icons/cg";

function Sidebar() {
  const [isOpen, setOpen] = useState(false);

  // ✅ Cierra el menú al hacer clic fuera de él
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

      {/* ✅ Menú lateral con fondo personalizado */}
      <aside
        className={`sidebar fixed top-0 left-0 h-screen w-64 p-6 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-400 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg`}
      >
        <ul className="space-y-4">
          <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
          <li><a className="hover:underline"> Tablas </a></li>
          <ul className="space-y-4">
            <li><a href="/usuarios" className="hover:underline">Usuarios</a></li>
            <li><a href="/asistencia" className="hover:underline">Registros</a></li>
            <li><a href="/logs" className="hover:underline">Logs</a></li>
          </ul>
        </ul>
      </aside>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="h-screen relative flex-col ">
      {/* Navbar → Puedes activarlo aquí cuando esté listo */}
      
      <div className="relative hex-pattern2 p-10">
        <div className="flex flex-1 overflow-hidden p-5 box3">
          {/* ✅ Panel lateral */}
          <Sidebar />

          <main className="flex-1 p-6">
            <h2 className="text-2xl font-bold">Bienvenido al Dashboard</h2>
            <p className="text-gray-600">Aquí puedes gestionar asistencia, usuarios y monitorear registros.</p>
          </main>
        </div>
      </div>
    </div>
  );
}