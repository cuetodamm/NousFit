import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; // Conexión a la base de datos
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    
    const { correo, password } = await req.json();

    // Buscar usuario en la base de datos
    const user = await prisma.usuario.findUnique({
      where: { correo }
    });

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado." }, { status: 404 });
    }
        // 🔹 Comparar la contraseña ingresada con la versión encriptada en la BD
    const isPasswordValid = await bcrypt.compare(password, user.contraseña); // ✅ Usamos bcrypt.compare()

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Credenciales incorrectas" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login exitoso", token: "jwt-example" }, { status: 200 });
  } catch (error) {
    console.error("Error interno en el inicio se sesión:", error);
    return NextResponse.json ({ message: "Error interno del servidor." }, { status: 500 });
  }
}