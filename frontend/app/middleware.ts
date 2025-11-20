import { NextResponse } from "next/server"; 
import type { NextRequest } from "next/server"; 
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = [ 
    "/login", "/api/auth/login", 
    "/api/auth/register", "/api/auth/session", 
    "/_next", "/favicon.ico", 
];

export function middleware(req: NextRequest) { 
    const { pathname } = req.nextUrl; 
    if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) 
        return NextResponse.next();

    const token = req.cookies.get("token")?.value; 
    if (!token) 
        return NextResponse.redirect(new URL("/login", req.url));
    
    try { 
        jwt.verify(token, process.env.JWT_SECRET!); 
        return NextResponse.next(); 
    } catch { 
        return NextResponse.redirect(new URL("/login", req.url)); 
    } 
}