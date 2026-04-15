"use client";
import { useEffect, useState } from "react";

export default function TablaReciente() {
  const [ventas, setVentas] = useState<any>(null);

  useEffect(() => {
    fetch("/api/table")
      .then((res) => res.json())
      .then(setVentas);
  }, []);

  if (!ventas) return <p>Cargando tabla</p>;

  const exportarCSV = (ventas: any[]) => {
    const headers = ["Fecha", "Total", "Metodo"];

    const rows = ventas.map((v) => [
      new Date(v.fecha).toLocaleDateString(),
      v.total,
      v.metodoPago,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "ventas.csv";
    link.click();
  };

  return (
    <div>
      <h2 className="font-bold mb-4">Ventas Recientes</h2>
      <table className="w-full text-sm mb-4">
        <thead>
          <tr className="text-left border-b">
            <th>Fecha</th>
            <th>Total</th>
            <th>Metodo</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v: any) => (
            <tr key={v.id} className="border-b">
              <td>{new Date(v.fecha).toLocaleDateString()}</td>
              <td>${v.total}</td>
              <td>{v.metodoPago}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center">
        <button
          onClick={() => exportarCSV(ventas)}
          className="bg-btn text-white px-4 py-2 rounded-lg"
        >
          Exportar CSV
        </button>
      </div>
    </div>
  );
}
