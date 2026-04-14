import VentasHoy from "@/components/VentasHoy";

export default function Home() {
  return (
    <div className="bg-secondary min-h-full p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-head">
          Dashboard
        </h1>
        <VentasHoy />
      </div>
    </div>
  );
}