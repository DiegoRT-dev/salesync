"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
} from "recharts";
import TablaReciente from "./TablaReciente";
import TablaHoy from "./TablaHoy";

export default function Estadisticas() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Cargando</p>;

  const chartData = Object.entries(data.ventasPorDia).map(([fecha, total]) => ({
    fecha,
    total: Number(total),
  }));

  const metodoPagoData = Object.entries(data.metodoPago).map(
    ([name, value], index) => ({
      name,
      value,
      fill: ["#10B981", "#3B82F6", "#F59E0B"][index % 3],
    }),
  );

  const ingresosChartData = Object.entries(data.ingresosPorDia).map(
    ([fecha, total]) => ({
      fecha,
      total: Number(total),
    }),
  );

  const hoy = new Date().toISOString().split("T")[0];

  const ventasHoy = data.ventasPorDia[hoy] || 0;

  const ingresosHoy = data.ingresosPorDia[hoy] || 0;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-primary p-4 rounded-2xl shadow-md">
          <p className="text-sm text-tx-secondary">Total de Ventas</p>
          <h2 className="text-2xl font-bold text-head">{data.totalVentas}</h2>
        </div>
        <div className="bg-primary p-4 rounded-2xl shadow-md">
          <p className="text-sm text-tx-secondary">Total de Ingresos</p>
          <h2 className="text-2xl font-bold text-head">
            ${data.totalIngresos.toLocaleString()}
          </h2>
        </div>
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
      </div>

      <div className="space-y-4 mb-4">
        <div className="bg-primary p-6 rounded-2xl shadow-md">
          <TablaHoy />
        </div>

        <div className="bg-primary p-6 rounded-2xl shadow-md">
          <TablaReciente />
        </div>
      </div>

      <div className="bg-primary p-6 rounded-2xl shadow-md mb-4">
        <h2 className="font-bold text-head mb-4">Ventas por dia</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
              }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-primary p-6 rounded-2xl shadow-md mb-4">
        <h2 className="font-bold text-head mb-4">Ingresos por dia</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ingresosChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip
              formatter={(value) => `$${Number(value ?? 0)}`}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
              }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-primary p-6 rounded-2xl shadow-md mb-4">
        <h2 className="font-bold text-head mb-4">Productos mas vendidos</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.productosMasVendidos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#1E3A8A" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-primary p-6 rounded-2xl shadow-md mb-4">
        <h2 className="font-bold text-head mb-4">Metodos de pago</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={metodoPagoData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
