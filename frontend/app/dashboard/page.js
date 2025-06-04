"use client";                                             // Importante para usar hooks en Next.js

import { useState, useEffect } from "react";
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
  const [hydrated, setHydrated] = useState("");
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

          <div className="w-1/2 flex flex-col items-justify justify-center box1  text-black-500 p-7">
            <div>
              <div className="box items-justify justify-center p-7">
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
              <div className="flex justify-center items-center">
                <img src="/UAEMex_escudo.png" className="escudo" />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-justify justify-center box p-7">
            {/* Botones dinámicos para alternar entre login y registro */}
            
            </div>
          </div>
        </div>
      </div>
  );
}
