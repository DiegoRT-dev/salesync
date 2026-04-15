"use client";
import { useEffect, useState } from "react";

export default function TablaHoy() {
  const [ventasHoy, setVentasHoy] = useState<any>(null);

  useEffect(() => {
    fetch("/api/table/hoy")
      .then((res) => res.json())
      .then(setVentasHoy);
  }, []);

  if (!ventasHoy) return <p>Cargando tabla</p>;

  return (
    <div>
      <h2 className="font-bold mb-4">Ventas de Hoy</h2>
      {ventasHoy.length === 0 ? (
        <p className="text-tx-secondary text-center py-6">No hay ventas hoy</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>Fecha</th>
              <th>Total</th>
              <th>Metodo</th>
            </tr>
          </thead>
          <tbody>
            {ventasHoy.map((v: any) => (
              <tr key={v.id} className="border-b">
                <td>{new Date(v.fecha).toLocaleDateString()}</td>
                <td>${v.total}</td>
                <td>{v.metodoPago}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
