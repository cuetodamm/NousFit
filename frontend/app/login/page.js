// app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Phone,
  MapPin,
  Facebook,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
// Usamos la ruta relativa que sí funciona
import InfoTooltip from "../components/InfoTooltip.jsx";

export default function LoginPage() {
  const [form, setForm] = useState({ correo: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!form.correo.includes("@")) newErrors.correo = "Correo no válido.";
    if (form.password.length < 6)
      newErrors.password = "La contraseña debe tener mínimo 6 caracteres.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors((prev) => ({ 
      correo: prev.correo, 
      password: prev.password 
    })); 

    if (!validate()) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), 
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        if (data.usuario.esAdmin) {
          router.push("/dashboard");
        } else {
          router.push("/home");
        }
      } else {
        setErrors({ general: data.message });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrors({ general: "Error de conexión con el servidor." });
    }
    
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.11) 0%, rgba(0,0,0,0.15) 60%), linear-gradient(135deg, #2E4F2F 0%, #3A6F3A 45%, #2E4F2F 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.22 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.18), rgba(0,0,0,0.18))",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="
          w-full max-w-5xl bg-white/95 rounded-3xl shadow-2xl flex flex-col md:flex-row
          overflow-hidden backdrop-blur-2xl border border-white/30
          mb-10
        "
      >
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="
            hidden md:flex flex-col items-center justify-center w-1/2 p-12
            bg-gradient-to-b from-[#2E4F2F] to-[#3A6F3A]
            text-white text-center
          "
        >
          <motion.img
            initial={{ scale: 0.7, opacity: 0, filter: "blur(8px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9 }}
            src="/UAEMex_escudo.png" 
            alt="Escudo UAEM"
            width={240}
            height={240}
            className="drop-shadow-2xl animate-pulse-slow"
          />
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mt-6 tracking-wide"
          >
            Bienvenido nuevamente
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg mt-3 max-w-xs opacity:90 leading-relaxed"
          >
            Accede al sistema de control de asistencia del gimnasio del
            Centro Universitario UAEM Ecatepec.
          </motion.p>
        </motion.div>
        <div className="w-full md:w-1/2 p-8 sm:p-10 bg-white">
          <motion.h2
            initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-center text-[#2E4F2F] mb-6"
          >
            Iniciar Sesión
          </motion.h2>

          {errors.general && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm text-center mb-4 bg-red-100 p-3 rounded-lg"
            >
              {errors.general}
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* CORREO */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold">
                Correo institucional
                <InfoTooltip message="Ingresa tu correo institucional registrado." />
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className={`
                    absolute left-3 top-3 text-gray-400 transition-all duration-300
                    ${
                      form.correo ? "opacity-0 scale-75" : "opacity-100 scale-100"
                    }
                  `}
                />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleInputChange}
                  className="
                    w-full pl-12 pr-3 py-3 rounded-xl border-2 border-[#2E4F2F]
                    focus:ring-[4px] focus:ring-[#6aba55]
                    transition-all duration-300 bg-white
                  "
                />
              </div>
              {errors.correo && (
                <p className="text-red-600 text-sm">{errors.correo}</p>
              )}
            </div>

            {/* CONTRASEÑA */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold">
                Contraseña
                <InfoTooltip message="Ingresa la contraseña que creaste en tu registro." />
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className={`
                    absolute left-3 top-3 text-gray-400 transition-all duration-300
                    ${
                      form.password
                        ? "opacity-0 scale-75"
                        : "opacity-100 scale-100"
                    }
                  `}
                />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleInputChange}
                  className="
                    w-full pl-12 pr-12 py-3 rounded-xl border-2 border-[#2E4F2F]
                    focus:ring-[4px] focus:ring-[#6aba55]
                    transition-all duration-300 bg-white
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="text-right text-sm -mt-3">
              <a
                href="/forgot-password"
                className="font-semibold text-[#2E4F2F] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.93 }}
              transition={{ duration: 0.15 }}
              type="submit"
              disabled={isLoading}
              className="
                w-full bg-[#3A6F3A] text-white py-3 rounded-xl text-lg font-semibold
                shadow-md hover:shadow-xl transition-all duration-300
                flex justify-center items-center
                disabled:opacity-75 disabled:cursor-not-allowed
              "
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Ingresar"
              )}
            </motion.button>
          </form>

          <p className="text-center mt-6 text-sm">
            ¿No tienes cuenta?
            <a
              href="/register"
              className="ml-1 text-[#2E4F2F] font-semibold hover:underline"
            >
              Registrarme
            </a>
          </p>
        </div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="
          w-full max-w-2xl bg-white/95 backdrop-blur-lg rounded-xl p-8 
          shadow-inner text-gray-700 text-sm border border-white/20
          flex flex-col
        "
      >
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-bold text-[#2E4F2F] mb-3">
              Contáctanos
            </h3>
            <div className="flex items-center justify-center md:justify-start mb-2">
              <Phone className="w-4 h-4 mr-2 text-[#2E4F2F]" />
              <span>+52 55 5787 3626</span>
            </div>
            <div className="flex items-center justify-center md:justify-start mb-2">
              <Mail className="w-4 h-4 mr-2 text-[#2E4F2F]" />
              <span>difusionuaemecate@gmail.com</span>
            </div>
            <div className="flex items-start justify-center md:justify-start">
              <MapPin className="w-4 h-4 mr-2 mt-1 text-[#2E4F2F] flex-shrink-0" />
              <address className="not-italic">
                Dentro de la UAEM, José Revuelta 17, Tierra Blanca, Ecatepec de
                Morelos, Méx. C.P. 55020
              </address>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-[#2E4F2F] mb-3">Síguenos</h3>
            <div className="flex justify-center">
              <a
                href="https://www.facebook.com/profile.php?id=100057592562538&locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:text-[#1877F2] transition"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="w-full text-center text-gray-500 text-xs mt-6 pt-6 border-t border-gray-300/50">
          <p>© {new Date().getFullYear()} Nousfit. Todos los derechos reservados.</p>
        </div>
      </motion.footer>
    </div>
  );
}