import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {items, total, metodoPago} = await req.json();

        const venta = await prisma.$transaction(async(tx) => {
            const nuevaVenta = await tx.venta.create({
                data: {
                    total,
                    metodoPago
                }
            });

            for (const item of items) {
                await tx.ventaItem.create({
                    data: {
                        ventaId: nuevaVenta.id,
                        productoId: item.id,
                        cantidad: item.cantidad,
                        precioUnitario: item.precio,
                        subtotal: item.precio * item.cantidad
                    }
                });

                await tx.producto.update({
                    where: { id: item.id },
                        data:{
                            stock: {
                                decrement: item.cantidad
                            }
                        }
                });
            }
            return nuevaVenta;
        });
        return NextResponse.json(venta);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Error al registar venta"}, {status: 500});
    }
}