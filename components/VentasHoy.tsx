"use client";

import { useEffect, useState } from "react";

export default function VentasHoy() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Cargando</p>;

  const hoy = new Date().toISOString().split("T")[0];

  const ventasHoy = data.ventasPorDia[hoy] || 0;

  const ingresosHoy = data.ingresosPorDia[hoy] || 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-primary p-4 rounded-2xl shadow-md">
        <p className="text-sm text-tx-secondary">Ventas de Hoy</p>
        <h2 className="text-2xl font-bold text-head">
          {!ventasHoy ? "No hay ventas hoy" : ventasHoy}
        </h2>
      </div>

      <div className="bg-primary p-4 rounded-2xl shadow-md">
        <p className="text-sm text-tx-secondary">Ingresos de Hoy</p>
        <h2 className="text-2xl font-bold text-head">
          {ingresosHoy === 0
            ? "No hay ingresos hoy"
            : `$${ingresosHoy.toLocaleString()}`}
        </h2>
      </div>

      <div className="bg-primary p-4 rounded-2xl shadow-md">
        <p className="text-sm text-tx-secondary">Método más usado</p>
        <h2 className="text-xl font-bold text-head">
          {Object.entries(data.metodoPago).sort(
            (a: any, b: any) => b[1] - a[1],
          )[0]?.[0] || "N/A"}
        </h2>
      </div>
    </div>
  );
}
