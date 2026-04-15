import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const inicio = new Date();
  inicio.setHours(0, 0, 0, 0);

  const fin = new Date();
  fin.setHours(23, 59, 59, 999);

  const ventasHoy = await prisma.venta.findMany({
    where: {
      fecha: {
        gte: inicio,
        lte: fin,
      },
    },
    orderBy: {
      fecha: "desc",
    },
  });

  return NextResponse.json(ventasHoy);
}
