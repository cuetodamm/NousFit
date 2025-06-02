import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const formData = await req.formData(); // ✅ Captura los datos enviados desde el frontend

    // 🔹 Extraer datos personales
    const nombre = formData.get("nombre")?.trim() || null;
    const apellidos = formData.get("apellidos")?.trim() || null;
    const correo = formData.get("correo")?.trim() || null;
    let   password = formData.get("password")?.trim() || null;
    const noCuenta = formData.get("noCuenta")?.trim() || null;
    const carrera = formData.get("carrera")?.trim() || null;
    const turno = formData.get("turno")?.trim() || null;
    const genero = formData.get("genero")?.trim() || null;
    const numeroTutor = formData.get("numeroTutor")?.trim() || null;

    // 🔹 Extraer archivos y asegurarse de que `url` sea una cadena válida
    const credencialUniversitaria = formData.get("credencialUniversitaria")?.name || null;
    const ineTutor = formData.get("ineTutor")?.name || null;
    const cartaResponsiva = formData.get("cartaResponsiva")?.name || null;
    const certificadoMedico = formData.get("certificadoMedico")?.name || null;

    // 🔹 Validar que no haya campos vacíos
    if (!nombre || !apellidos|| !correo || !password || !noCuenta ||
        !carrera || !turno || !genero || !numeroTutor || !credencialUniversitaria || 
        !ineTutor || !cartaResponsiva || !certificadoMedico) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Verificar si el correo ya está registrado
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (usuarioExistente) {
      return NextResponse.json({ message: "El correo ya está registrado, usa otro." }, { status: 400 });
    }
        // Encriptar la contraseña en la misma variable
    password = await bcrypt.hash(password, 10); // ✅ Sobrescribimos `password` con la versión encriptada

    // 🔹 Guardar usuario en la base de datos con Prisma
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        apellidos,
        correo,
        contraseña: password,
        noCuenta,
        carrera,
        turno,
        genero,
        numeroTutor,
        documentos: {
          create: [
            { tipo: "CREDENCIAL_UNIVERSITARIA", url: credencialUniversitaria },
            { tipo: "INE_TUTOR", url: ineTutor },
            { tipo: "CARTA_RESPONSIVA", url: cartaResponsiva },
            { tipo: "CERTIFICADO_MEDICO", url: certificadoMedico },
          ],
        },
      },
    });

    return NextResponse.json({ message: "Registro exitoso", usuario: nuevoUsuario });

  } catch (error) {
    console.error("Error interno en el registro:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}