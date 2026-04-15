import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ventas = await prisma.venta.findMany({
      orderBy: {
        fecha: "desc",
      },
      take: 10,
      include: {
        items: true,
      },
    });
    return NextResponse.json(ventas);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
