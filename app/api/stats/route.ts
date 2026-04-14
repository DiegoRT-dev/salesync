import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ventas = await prisma.venta.findMany({
      select: {
        fecha: true,
        total: true,
        metodoPago: true,
      },
    });

    const ventasPorDia: Record<string, number> = {};

    ventas.forEach((v) => {
      const fecha = v.fecha.toISOString().split("T")[0];
      ventasPorDia[fecha] = (ventasPorDia[fecha] || 0) + 1;
    });

    const metodoPago: Record<string, number> = {};

    ventas.forEach((v) => {
      metodoPago[v.metodoPago] = (metodoPago[v.metodoPago] || 0) + 1;
    });

    const totalVentas = ventas.length;
    const totalIngresos = ventas.reduce((acc, v) => acc + v.total, 0);

    //Nuevo
    const productosMasVendidosRaw = await prisma.ventaItem.groupBy({
      by: ["productoId"],
      _sum: {
        cantidad: true,
      },
      orderBy: {
        _sum: {
          cantidad: "desc",
        },
      },
      take: 5,
    });

    const productos = await prisma.producto.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });

    const productosMasVendidos = productosMasVendidosRaw.map((item) => {
      const producto = productos.find((p) => p.id === item.productoId);

      return {
        nombre: producto?.nombre || "Desconocido",
        cantidad: item._sum.cantidad || 0,
      };
    });

    const ingresosPorDia: Record<string, number> = {};

    ventas.forEach((v) => {
        const fecha = v.fecha.toISOString().split("T")[0];

        ingresosPorDia[fecha] = 
        (ingresosPorDia[fecha] || 0) + v.total;
    })

    return NextResponse.json({
      ventasPorDia,
      metodoPago,
      totalVentas,
      totalIngresos,
      productosMasVendidos,
      ingresosPorDia
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error stats" }, { status: 500 });
  }
}
