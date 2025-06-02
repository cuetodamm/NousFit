"use client";                                             // Importante para usar hooks en Next.js

import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const InfoTooltip = ({ message }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="text-xl bg-transparent  cursor-pointer"
        onClick={() => setVisible(!visible)}
      >
        <AiOutlineQuestionCircle className="borderquest"/>
      </button>

      {visible && (
        <div className="absolute left-full top-0 ml-2 question text-black-500 text-sm px-3 py-2 rounded-md shadow-lg w-52">
          {message}
        </div>
      )}
    </div>
  );
};

const InfoTooltip2 = ({ message }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="text-xl bg-transparent  cursor-pointer"
        onClick={() => setVisible(!visible)}
      >
        <AiOutlineQuestionCircle className="borderquest2"/>
      </button>

      {visible && (
        <div className="absolute left-full top-0 ml-2 question2 text-black-500 text-sm px-3 py-2 rounded-md shadow-lg w-52">
          {message}
        </div>
      )}
    </div>
  );
};

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);           //Nos permitira alternar entre botones de inicio de sesión y registro
  const [step, setStep] = useState(1);                    //Maneja el paso actual en el registro
  const [error, setError] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    password: "",
    noCuenta: "",
    carrera: "",
    turno: "",
    genero: "",
    numeroTutor: "",
    credencialUniversitaria: null,
    ineTutor: null,
    cartaResponsiva: null,
    certificadoMedico: null
  });

  
  const validateCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;           //Revisa que haya texto antes del @, despues de este caracter verifica que haya un punto y dominio
    return regex.test(correo);                             //Validacion de emails con regex
  }
  
  const handleInputChange = (e) => {                      //Manejo de cambios en cada campo
    if (!e.target || !e.target.name) {
      console.error("Error detectado: Inputn sin nombre detectado", e);
      return;
    }
    setFormData({
       ... formData,
        [e.target.name]: e.target.type == "file" ? e.target.files[0] : e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formDataToSend,
      });

      // Verifica si la respuesta es válida antes de procesarla
      if (!response.ok) {
        console.error("Error en la solicitud:", response.statusText);
        return;
      }

      const text = await response.text(); //Obtener texto antes de procesarlo como JSON
      console.log("Respuesta del backend (texto):", text);

      let data;
      try {
        data = JSON.parse(text); // Procesar JSON si la respuesta no está vacía
      } catch (error) {
        console.error("Error al parsear JSON:", error);
        return;
      }

      console.log("Registro exitoso:", data);
      window.location.href = "/login";

    } catch (error) {
      console.error("Error en la conexión con el servidor:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateCorreo(correo)) {
      setError("Correo no válido, intenta con otro.");
      return;
    }

    try {                                                 //Solicitud de login al backend
      const response = await fetch("/api/auth/login", {
        method: "POST", //Http de la solicitud
        headers: { "Content-Type": "application/json" },  //
        body: JSON.stringify({ correo, password }),        //Conversion de datos a formato JSON
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard"                        //Redireccionamiento al dashboard
        console.log("login exitoso, ¡Bienvenido!", data); 
      } else {
        setError(data.message || "Error al iniciar sesión.");
      }
    } catch (error) {
      setError("Error de conexión con el servidor.");
    }
    
    
  
};

  return (
    
    <div className=" relative h-screen overflow-hidden">
      <div className="relative hex-pattern">


        <div className="h-screen flex p-5">

          <div className="w-1/2 flex flex-col items-justify justify-center box text-black-500 p-7">
            <h1 className="text-2xl text-center font-bold mb-4">¡Bienvenido a NousFit!</h1>
            <p className="text-lg  max-w-md">
              Para poder ingresar debes colocar correo y contraseña
              previamente registrados.
            </p>
            <p className="text-lg  max-w-md">
              ¿No es posible iniciar sesion? Revisa tus datos.
            </p>
            <p className="text-lg text-justify max-w-md">
              ¿Sigues sin poder acceder? ¡Prueba registrandote!
            </p>
            <p className="text-lg text-justify max-w-md">
              En cada signo de interrogación podrás ver información de ayuda para llenar en cada campo, solo dale click al icono.
            </p>
            <p className="text-lg text-justify max-w-md">
              Para mayor información de los documentos a digitalizar, puedes acercarte con el personal 
              responsable del gimnasio universitario.
            </p>
          </div>

          <div className="w-1/2 flex flex-col items-justify justify-center box p-7">
            {/* Botones dinámicos para alternar entre login y registro */}
            <div className="relative mb-6 flex items-justify justify-center cursor-pointer">
              <button
                className={`px-4 py-2 text-lg font-semibold rounded-md transition cursor-pointer ${
                  isLogin ? "buttonSI text-black-500 border" : "buttonSIi bg-transparent text-black-500 border"
                }`}
                onClick={() => {
                  setIsLogin(true);
                  setStep(1);
                }}
              >
                Ingresar
              </button>

              <button
                className={`px-4 py-2 text-lg font-semibold rounded-md transition ml-4  cursor-pointer ${
                  !isLogin ? "buttonSU text-black-500 border" : " buttonSUu bg-transparent text-black-500 border"
                }`}
                onClick={() => {
                  setIsLogin(false);
                  setStep(1);
                }}
              >
                Registrarse
              </button>
            </div>
            <div className= "relative mb-6 flex items-center justify-center">
              {/* Formulario de Login */}
              {isLogin ? (
                <form onSubmit={handleLogin} className=" p-8 rounded-lg w-96">
                  <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                  <div>
                    <label className="text-black-500 font-medium p-5">Correo Electrónico</label>
                    <InfoTooltip2 message="Ingresa tu correo institucional para iniciar de sesión." />
                    <input type="correo" name="correo" placeholder="Correo electrónico" className="w-full p-3 mb-4 border rounded-lg"
                    value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                  </div>

                  <div>
                    <label className="text-black-500 font-medium p-5">Contraseña</label>
                    <InfoTooltip2 message="Recuerdas la contraseña que ingresaste en el registro, ¿Verdad?." />
                    <input type="password" name="password" placeholder="Contraseña" className="w-full p-3 mb-4 border rounded-lg"
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>

                  <button type="submit" className="w-full buttonSI text-blalck-500 py-2 rounded-lg cursor-pointer">Iniciar Sesión</button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className=" p-8 rounded-lg w-96">
                  <h2 className="text-2xl font-bold mb-6 text-center ">Registro</h2>

                  {/* Paso 1: Datos personales y académicos */}
                  {step === 1 && (
                    <>
                      <div>
                        <label className="text-black-500 font-medium p-5">Nombre(s)</label>
                        <InfoTooltip message="Ingresa tu nombre o nombres si tienes mas de uno." />
                        <input type="text" name="nombre" placeholder="Nombre" className="w-full p-3 mb-4 border rounded-lg"
                        value={formData.nombre} onChange={handleInputChange} required />
                      </div>

                      <div>
                        <label className="text-black-500 font-medium p-5">Apellidos</label>
                        <InfoTooltip message="Ingresa tu apellido paterno seguido del apellido materno." />
                        <input type="text" name="apellidos" placeholder="Apellidos (Paterno y Materno)" className="w-full p-3 mb-4 border rounded-lg"
                        value={formData.apellidoPaterno} onChange={handleInputChange} required />
                      </div>

                      <div>
                        <label className="text-black-500 font-medium p-5">Email</label>
                        <InfoTooltip message="Ingresa el correo institucional, este ha sido dado de alta en la universidad" />
                        <input type="correo" name="correo" placeholder="Email" className="w-full p-3 mb-4 border rounded-lg"
                        value={formData.correo} onChange={handleInputChange} required />
                      </div>

                      <div>
                        <label className="text-black-500 font-medium p-5">Contraseña</label>
                        <InfoTooltip message="Entre mas dificil sea es mas complicado filtrarla, pero acuerdate de guardarla." />
                        <input type="password" name="password" placeholder="Contraseña" className="w-full p-3 mb-4 border rounded-lg"
                        value={formData.password} onChange={handleInputChange} required />
                      </div>

                      <div>
                        <label className="text-black-500 font-medium p-5">Número de Cuenta</label>
                        <InfoTooltip message="El número de cuenta es el identificador como estudiantes de la Universidad." />
                        <input type="number" name="noCuenta" placeholder="Número de Cuenta" className="w-full p-3 mb-4 border rounded-lg"
                        value={formData.noCuenta} onChange={handleInputChange} required />
                      </div>

                      <button type="button" className="w-full buttonSU
                      text-black-500 py-2 rounded-lg cursor-pointer" onClick={() => setStep(2)}>Siguiente</button>

                    </>
                  )}

                  {/* Paso 2: Documentos y datos del tutor */}
                  {step === 2 && (
                    <>

                      {/* Datos académicos */}

                      <div>
                        <label className="text-black-500 font-medium p-5">Licenciatura</label>
                        <InfoTooltip message="Ingresa la carrera en la que estas estudiando." />
                        <select name="carrera" placeholder="Carrera" className="w-full p-3 mb-4 border rounded-lg"
                        value={formData.carrera} onChange={handleInputChange} required >
                          <option value="" disabled>Selecciona tu carrera</option>
                          <option value="Ingeniería en Computación">Ingeniería en Computación</option>
                          <option value="Administración">Administración</option>
                          <option value="Derecho">Derecho</option>
                          <option value="Contaduría">Contaduría</option>
                          <option value="Psicología">Psicología</option>
                          <option value="Informática Administrativa">Informática Administrativa</option>
                      </select>
                      </div>

                      <div>
                        <label className="text-black-500 font-medium p-5">Turno</label>
                        <InfoTooltip message="No todas las carreras tienen la variedad de turnos, elige el turno en el que estás depende a tu carrera" />
                        <select name="turno" placeholder="Selecciona uno" className="w-full p-3 mb-4 border rounded-lg"
                        value={formData.turno} onChange={handleInputChange} required >
                          <option value="" disabled>Selecciona uno</option>
                          <option value="Matutino">Matutino</option>
                          <option value="Verpertino">Vespertino</option>
                          <option value="Diurno">Diurno</option>
                      </select>
                      </div>

                      <div>
                        <label className="text-black-500 font-medium p-5">Género</label>
                        <InfoTooltip message="Quisieramos ser inclusivos pero en las estadisticas solo piden Hombre y mujer." />
                        <select name="genero" placeholder="Selecciona uno" className="w-full p-3 mb-4 border rounded-lg"
                        value={formData.genero} onChange={handleInputChange} required >
                          <option value="" disabled>Selecciona uno</option>
                          <option value="Hombre">Hombre</option>
                          <option value="Mujer">Mujer</option>
                      </select>
                      </div>

                      <div>
                        <label className="text-black-500 font-medium p-5">Número de Emergencia</label>
                        <InfoTooltip message="Es el numero de emergencia para cualquier situación, tengamos cuidado dentro del espacio." />
                        <input type="number" name="numeroTutor" placeholder="Número del tutor" className="w-full p-3 mb-4 border rounded-lg"
                        value={formData.numeroTutor} onChange={handleInputChange} />
                      </div>

                      <button type="button" className="w-full mb-6 buttonSI text-black-500 py-2 rounded-lg cursor-pointer" onClick={() => setStep(1)}>Regresar</button>

                      <button type="button" className="w-full buttonSU text-black-500 py-2 rounded-lg cursor-pointer" onClick={() => setStep(3)}>Siguiente</button>
                    </>
                  )}  
                  {step === 3 && (
                    <>

                      <div>
                        <label className="text-black-500 font-medium p-5">Credencial Universitaria</label>
                        <InfoTooltip message="Deberas de escanear tu credencial universitaria en un formato PDF y anexarlo." />
                        <input type="file" name="credencialUniversitaria" className="w-full p-3 mb-4 border rounded-lg" accept="application/pdf"
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] })} />
                      </div>

                      <div>
                        <label className="text-black-500 font-medium p-5">Ine del Tutor</label>
                        <InfoTooltip message="Este documento es para tener en cuenta la persona de emergencia para cualquier situación dentro del gimnasio." />
                        <input type="file" name="ineTutor" className="w-full p-3 mb-4 border rounded-lg" accept="application/pdf"
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] })} required />
                      </div>

                      <div>
                        <label className="text-black-500 font-medium p-5">Carta Responsiva</label>
                        <InfoTooltip message="Deberas llenar y firmar lo correspondiente y anexarlo dentro de un PDF." />
                        <input type="file" name="cartaResponsiva" className="w-full p-3 mb-4 border rounded-lg" accept="application/pdf"
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] })} required />
                      </div>

                      <div>
                        <label className="text-black-500 font-medium p-5">Certificado Médico</label>
                        <InfoTooltip message="IAntes de empezar una vida saludable, es necesario tener en cuenta las actividades que nos afecten nuestra salud con algun especialista." />
                        <input type="file" name="certificadoMedico" className="w-full p-3 mb-4 border rounded-lg" accept="application/pdf"
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] })} required />
                      </div>

                      <button type="button" className="w-full mb-6 buttonSI text-black-500 py-2 rounded-lg cursor-pointer" onClick={() => setStep(2)}>Regresar</button>

                      <button type="submit" className="w-full buttonSU text-black-500 py-2 rounded-lg cursor-pointer">Registrarse</button>
                    </>
                  )}  
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
