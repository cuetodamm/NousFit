import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "clave-secreta-temp"; // Usa variable de entorno en producción

export async function POST(req) {
  try {
    const { correo, password } = await req.json();

    const user = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.contraseña);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    // 🔐 Generar el token incluyendo `esAdmin`
    const token = jwt.sign(
      {
        id: user.id,
        correo: user.correo,
        esAdmin: user.esAdmin,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ 🔹 Enviar `usuario` completo en la respuesta
    return NextResponse.json(
      {
        message: "Login exitoso",
        token,
        usuario: {
          id: user.id,
          nombre: user.nombre,
          correo: user.correo,
          esAdmin: user.esAdmin,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error interno en el inicio de sesión:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

