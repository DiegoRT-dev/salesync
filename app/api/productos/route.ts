import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const productos = await prisma.producto.findMany();
    return Response.json(productos);
  } catch (error) {
    return Response.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}