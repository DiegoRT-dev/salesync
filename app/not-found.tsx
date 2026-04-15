import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      
      <h1 className="text-4xl font-bold text-head mb-2">
        404
      </h1>

      <p className="text-tx-secondary mb-6">
        La pagina que buscas no existe
      </p>

      <Link
        href="/"
        className="bg-btn text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
      >
        Volver al inicio
      </Link>

    </div>
  );
}