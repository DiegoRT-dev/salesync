import TablaHoy from "@/components/TablaHoy";
import VentasHoy from "@/components/VentasHoy";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-secondary min-h-full p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-head">Dashboard</h1>
        <VentasHoy />
        <div className="bg-primary p-6 rounded-2xl shadow-md">
          <TablaHoy />
        </div>

        <div className="flex justify-center">
          <Link
            href="/estadisticas"
            className="bg-btn text-white px-4 py-2 rounded-lg"
          >
            Todas las Estadisticas
          </Link>
        </div>
      </div>
    </div>
  );
}
