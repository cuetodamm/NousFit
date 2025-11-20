import { NextResponse } from "next/server"; import { serialize } from "cookie";

export async function POST(req: Request) { 
    try { 
        const { token } = await req.json(); 
        if (!token) { 
            return NextResponse.json({ 
                message: "Token requerido" }, { status: 400 });
            } 
            const cookie = serialize("token", token, { 
                httpOnly: true, 
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax", path: "/", maxAge: 60 * 60 * 24,
            }); 
            return NextResponse.json({ ok: true },
                { status: 200, headers: { "Set-Cookie": cookie } });
            } catch (error) { 
                console.error(error); 
                return NextResponse.json({ message: "Error interno" },
                     { status: 500 }); 
            }
}