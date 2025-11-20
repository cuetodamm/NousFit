"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Loader2,
  BookUser,
  School,
  Clock,
  Users,
  FileText,
  Facebook,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InfoTooltip from "../components/InfoTooltip.jsx";

const MotionInput = ({ name, value, onChange, type = "text", Icon }) => (
  <div className="relative">
    <Icon
      size={20}
      className={`absolute left-4 top-3.5 text-gray-400 transition-all duration-300 ${
        value ? "opacity-0 scale-75" : "opacity-100 scale-100"
      }`}
    />
    <motion.input
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full pl-14 pr-3 py-3 rounded-xl border-2 border-[#2E4F2F] focus:ring-[4px] focus:ring-[#6aba55] transition-all duration-300 bg-white text-sm sm:text-base"
    />
  </div>
);

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    password: "",
    confirmPassword: "",
    noCuenta: "",
    carrera: "",
    turno: "",
    genero: "",
    numeroTutor: "",
    credencialUniversitaria: null,
    ineTutor: null,
    cartaResponsiva: null,
    certificadoMedico: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: e.target.files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!form.nombre) newErrors.nombre = "El nombre es obligatorio.";
      if (!form.apellidos) newErrors.apellidos = "Los apellidos son obligatorios.";
      if (!form.correo.includes("@")) newErrors.correo = "Correo no válido.";
      if (form.password.length < 6) newErrors.password = "Mínimo 6 caracteres.";
      if (form.password !== form.confirmPassword)
        newErrors.confirmPassword = "Las contraseñas no coinciden.";
      if (!form.noCuenta) newErrors.noCuenta = "El No. de Cuenta es obligatorio.";
    }
    if (step === 2) {
      if (!form.carrera) newErrors.carrera = "Selecciona una carrera.";
      if (!form.turno) newErrors.turno = "Selecciona un turno.";
      if (!form.genero) newErrors.genero = "Selecciona un género.";
      if (!form.numeroTutor) newErrors.numeroTutor = "El No. de emergencia es obligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; 

    if (step !== 3) {
      if (step === 1 && !validateStep()) return;
      if (step === 2 && !validateStep()) return;
    }
    
    if (step === 3 && (!form.credencialUniversitaria || !form.ineTutor || !form.cartaResponsiva || !form.certificadoMedico)) {
      setErrors({ general: "Faltan documentos por subir." });
      return;
    }

    setIsLoading(true);
    setErrors({});

    const formDataToSend = new FormData();
    Object.keys(form).forEach((key) => {
      formDataToSend.append(key, form[key]);
    });

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Registro exitoso! Serás redirigido para iniciar sesión.");
        router.push("/login");
      } else {
        setErrors({ general: data.message });
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
      setErrors({ general: "Error de conexión con el servidor." });
    }
    
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 py-10 overflow-hidden"
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
            hidden md:flex flex-col items-center justify-center w-1/2 p-10
            bg-gradient-to-b from-[#2E4F2F] to-[#3A6F3A]
            text-white text-center
          "
        >
          <motion.img
            initial={{ scale: 0.7, opacity: 0, filter: "blur(6px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            src="/UAEMex_escudo.png"
            alt="Escudo UAEM"
            width={260}
            height={260}
            className="drop-shadow-2xl"
          />
          <motion.h1
            initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mt-6 tracking-wide"
          >
            NousFit
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.3 }}
            className="text-lg mt-3 max-w-xs opacity-90 leading-relaxed"
          >
            Sistema de Registro Oficial de Asistencia para el Gimnasio del
            Centro Universitario UAEM Ecatepec
          </motion.p>
        </motion.div>
        <div className="w-full md:w-1/2 p-8 sm:p-10 bg-white">
          <motion.h2
            initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-center text-[#2E4F2F] mb-4"
          >
            Crear Cuenta
          </motion.h2>

          <div className="flex justify-center items-center mb-4">
            <span className={`font-semibold ${step === 1 ? 'text-[#2E4F2F]' : 'text-gray-400'}`}>Paso 1</span>
            <div className="w-10 h-0.5 mx-2 bg-gray-300"></div>
            <span className={`font-semibold ${step === 2 ? 'text-[#2E4F2F]' : 'text-gray-400'}`}>Paso 2</span>
            <div className="w-10 h-0.5 mx-2 bg-gray-300"></div>
            <span className={`font-semibold ${step === 3 ? 'text-[#2E4F2F]' : 'text-gray-400'}`}>Paso 3</span>
          </div>

          {errors.general && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm text-center mb-4 bg-red-100 p-3 rounded-lg"
            >
              {errors.general}
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">
                      Nombre(s)
                      <InfoTooltip message="Ingresa tu nombre o nombres." />
                    </label>
                    <MotionInput
                      name="nombre"
                      value={form.nombre}
                      onChange={handleInputChange}
                      Icon={User}
                    />
                    {errors.nombre && <p className="text-red-600 text-sm">{errors.nombre}</p>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">
                      Apellidos
                      <InfoTooltip message="Ingresa tu apellido paterno y materno." />
                    </label>
                    <MotionInput
                      name="apellidos"
                      value={form.apellidos}
                      onChange={handleInputChange}
                      Icon={User}
                    />
                    {errors.apellidos && <p className="text-red-600 text-sm">{errors.apellidos}</p>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">
                      Correo Institucional
                      <InfoTooltip message="Usa tu correo @uaemex.mx" />
                    </label>
                    <MotionInput
                      name="correo"
                      value={form.correo}
                      onChange={handleInputChange}
                      Icon={Mail}
                    />
                    {errors.correo && <p className="text-red-600 text-sm">{errors.correo}</p>}
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">Contraseña</label>
                    <div className="relative">
                      <Lock 
                        size={20} 
                        className={`absolute left-4 top-3.5 text-gray-400 transition-all duration-300 ${
                          form.password ? "opacity-0 scale-75" : "opacity-100 scale-100"
                        }`}
                      />
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-12 py-3 rounded-xl border-2 border-[#2E4F2F] focus:ring-[4px] focus:ring-[#6aba55] transition-all duration-300 bg-white text-sm sm:text-base"
                      />
                      {/* --- FIN DEL CAMBIO --- */}
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">Confirmar Contraseña</label>
                    <div className="relative">
                      <Lock 
                        size={20} 
                        className={`absolute left-4 top-3.5 text-gray-400 transition-all duration-300 ${
                          form.confirmPassword ? "opacity-0 scale-75" : "opacity-100 scale-100"
                        }`}
                      />
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-12 py-3 rounded-xl border-2 border-[#2E4F2F] focus:ring-[4px] focus:ring-[#6aba55] transition-all duration-300 bg-white text-sm sm:text-base"
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700">
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">
                      Número de Cuenta
                      <InfoTooltip message="Tu número de estudiante de 7 dígitos." />
                    </label>
                    <MotionInput
                      name="noCuenta"
                      value={form.noCuenta}
                      onChange={handleInputChange}
                      Icon={BookUser}
                    />
                    {errors.noCuenta && <p className="text-red-600 text-sm">{errors.noCuenta}</p>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.93 }}
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-[#3A6F3A] text-white py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl"
                  >
                    Siguiente
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">
                      Licenciatura
                      <InfoTooltip message="Selecciona tu programa educativo." />
                    </label>
                    <div className="relative">
                      <select 
                        name="carrera" 
                        value={form.carrera} 
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-10 py-3 rounded-xl border-2 border-[#2E4F2F] focus:ring-[4px] focus:ring-[#6aba55] transition-all duration-300 bg-white text-sm sm:text-base appearance-none"
                      >
                        <option value="" disabled>Selecciona tu carrera</option>
                        <option value="Ingeniería en Computación">Ingeniería en Computación</option>
                        <option value="Administración">Administración</option>
                        <option value="Derecho">Derecho</option>
                        <option value="Contaduría">Contaduría</option>
                        <option value="Psicología">Psicología</option>
                        <option value="Informática Administrativa">Informática Administrativa</option>
                        <option value="Docente">Docente</option>
                        <option value="Administrativo">Administrativo</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"/>
                    </div>
                    {/* --- ¡¡¡FIN DEL CAMBIO!!! --- */}
                    {errors.carrera && <p className="text-red-600 text-sm">{errors.carrera}</p>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">Turno</label>
                    <div className="relative">
                      <select name="turno" value={form.turno} onChange={handleInputChange} className="w-full pl-4 pr-10 py-3 rounded-xl border-2 border-[#2E4F2F] focus:ring-[4px] focus:ring-[#6aba55] transition-all duration-300 bg-white text-sm sm:text-base appearance-none">
                        <option value="" disabled>Selecciona tu turno</option>
                        <option value="Matutino">Matutino</option>
                        <option value="Vespertino">Vespertino</option>
                        <option value="Diurno">Diurno</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"/>
                    </div>
                    {errors.turno && <p className="text-red-600 text-sm">{errors.turno}</p>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">Género</label>
                    <div className="relative">
                      <select name="genero" value={form.genero} onChange={handleInputChange} className="w-full pl-4 pr-10 py-3 rounded-xl border-2 border-[#2E4F2F] focus:ring-[4px] focus:ring-[#6aba55] transition-all duration-300 bg-white text-sm sm:text-base appearance-none">
                        <option value="" disabled>Selecciona tu género</option>
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"/>
                    </div>
                    {errors.genero && <p className="text-red-600 text-sm">{errors.genero}</p>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">
                      Número de Emergencia (Tutor)
                      <InfoTooltip message="Un número de contacto en caso de emergencia." />
                    </label>
                    <MotionInput
                      name="numeroTutor"
                      value={form.numeroTutor}
                      onChange={handleInputChange}
                      type="tel"
                      Icon={Phone}
                    />
                    {errors.numeroTutor && <p className="text-red-600 text-sm">{errors.numeroTutor}</p>}
                  </div>

                  <div className="flex gap-4">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.93 }} type="button" onClick={prevStep} className="w-1/2 bg-gray-200 text-gray-800 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg">
                      Regresar
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.93 }} type="button" onClick={nextStep} className="w-1/2 bg-[#3A6F3A] text-white py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl">
                      Siguiente
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <p className="text-sm text-center text-gray-600">Sube los siguientes documentos en formato PDF.</p>
                  
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">
                      Credencial Universitaria (PDF)
                      <InfoTooltip message="Escaneo de tu credencial vigente." />
                    </label>
                    <input type="file" name="credencialUniversitaria" onChange={handleInputChange} accept="application/pdf" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#3A6F3A] file:text-white hover:file:bg-[#2E4F2F]"/>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">
                      INE del Tutor (PDF)
                      <InfoTooltip message="Escaneo del INE de tu contacto de emergencia." />
                    </label>
                    <input type="file" name="ineTutor" onChange={handleInputChange} accept="application/pdf" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#3A6F3A] file:text-white hover:file:bg-[#2E4F2F]"/>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">
                      Carta Responsiva (PDF)
                      <InfoTooltip message="La carta firmada. Pídela en la administración." />
                    </label>
                    <input type="file" name="cartaResponsiva" onChange={handleInputChange} accept="application/pdf" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#3A6F3A] file:text-white hover:file:bg-[#2E4F2F]"/>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm sm:text-base">
                      Certificado Médico (PDF)
                      <InfoTooltip message="Certificado de buena salud, no mayor a 3 meses." />
                    </label>
                    <input type="file" name="certificadoMedico" onChange={handleInputChange} accept="application/pdf" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#3A6F3A] file:text-white hover:file:bg-[#2E4F2F]"/>
                  </div>

                  <div className="flex gap-4">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.93 }} type="button" onClick={prevStep} className="w-1/2 bg-gray-200 text-gray-800 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg">
                      Regresar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: isLoading ? 1 : 1.05 }}
                      whileTap={{ scale: isLoading ? 1 : 0.93 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-1/2 bg-[#3A6F3A] text-white py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl flex justify-center items-center disabled:opacity-75"
                    >
                      {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        "Finalizar Registro"
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
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