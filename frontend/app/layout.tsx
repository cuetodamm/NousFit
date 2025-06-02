'use client';


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();             //Detecta la página actual
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Verifica si hay sesión activa
    setAuthenticated(!!token);

    if (!token && pathname === "/login") {
      router.push("/login"); // Redirige al login si no está autenticado
    }
  }, [pathname]);

  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {pathname === "/login" || authenticated ? (
          <>
            <main className="flex-1">{children}</main>
          </>
        ) : null}
      </body>
    </html>
  );
}

