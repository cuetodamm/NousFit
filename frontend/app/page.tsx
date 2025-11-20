import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#42502B] via-[#489E31] to-[#42502B] p-4"
    style={{
        backgroundImage:
          "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.11) 0%, rgba(0,0,0,0.15) 60%), linear-gradient(135deg, #2E4F2F 0%, #3A6F3A 45%, #2E4F2F 100%)",
      }}>
      
      {/* Escudo / logo */}
      <div className="mb-8">
        <Image
          src="/UAEMex_escudo.png"
          alt="Escudo"
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>

      {/* Título */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-6">
        Bienvenido a NousFit
      </h1>

      {/* Descripción */}
      <p className="text-lg sm:text-xl md:text-2xl text-white text-center max-w-2xl mb-8">
        El sistema oficial de Registro de Asistencia para el Gimnasio Universitario de la UAEMex.
      </p>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/login" className="w-max">
          <button className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg transition">
            Iniciar sesión
          </button>
        </Link>
        <Link href="/register" className="w-max">
          <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition">
            Registrarse
          </button>
        </Link>
      </div>
      <div className="w-full text-center text-white text-xs mt-6 pt-6 border-t border-gray-300/50">
        <p>© {new Date().getFullYear()} Nousfit. Todos los derechos reservados.</p>
      </div>
    </main>
  );
}
