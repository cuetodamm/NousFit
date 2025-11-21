import prisma from "../../../../lib/prisma"; // Asegúrate de que esta ruta sea correcta según tu proyecto
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Obtenemos las asistencias e incluimos los datos del usuario relacionado
    const asistencias = await prisma.asistencia.findMany({
      include: {
        usuario: {
          select: {
            nombre: true,
            apellidos: true,
            noCuenta: true,
            carrera: true,
            turno: true,
            genero: true,
          },
        },
      },
      orderBy: {
        fecha: 'desc', // Las más recientes primero
      },
    });

    return NextResponse.json(asistencias);
  } catch (error) {
    console.error("Error obteniendo asistencias:", error);
    return NextResponse.json(
      { message: "Error al obtener registros" },
      { status: 500 }
    );
  }
}

// Opcional: Endpoint para registrar asistencia (para probar con Postman o desde el FaceID)
export async function POST(req) {
  try {
    const body = await req.json();
    const { usuarioId } = body;

    if (!usuarioId) {
      return NextResponse.json({ message: "Falta usuarioId" }, { status: 400 });
    }

    const nuevaAsistencia = await prisma.asistencia.create({
      data: {
        usuarioId: usuarioId,
      },
    });

    return NextResponse.json(nuevaAsistencia);
  } catch (error) {
    return NextResponse.json({ message: "Error creando registro" }, { status: 500 });
  }
}