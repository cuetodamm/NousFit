import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import CryptoJS from "crypto-js";

const AES_SECRET_KEY = "3d9c1b79641bb1355b25a38a3f98487fccb3bd59c2692c56de1a464694feaa85"; // ⚠️ Usa una clave segura y guárdala en `.env`

export async function POST(req) {
  try {
    const formData = await req.formData();
    const imagenBase64 = formData.get("imagen");
    const correo = formData.get("correo");

    if (!correo || !imagenBase64) {
      return NextResponse.json(
        { message: "Correo o imagen no proporcionados" },
        { status: 400 }
      );
    }

    // 🔹 Encriptar la imagen con AES-256
    const imagenEncriptada = CryptoJS.AES.encrypt(imagenBase64, AES_SECRET_KEY).toString();

    // 🔹 Guardar la imagen en la base de datos en `datosBiometricos`
    await prisma.usuario.update({
      where: { correo },
      data: { datosBiometricos: imagenEncriptada },
    });

    return NextResponse.json(
      { message: "Imagen encriptada y guardada correctamente!" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error interno en la subida de imagen:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}