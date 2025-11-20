import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "clave-secreta-temp";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "No autenticado" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    return NextResponse.json(
      {
        usuario: {
          id: decoded.id,
          correo: decoded.correo,
          esAdmin: decoded.esAdmin,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Token inválido" },
      { status: 401 }
    );
  }
}
