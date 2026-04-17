import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {items, total, metodoPago} = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "No hay productos a la venta" },
                { status: 400 }
            )
        }

        if (!total || total <= 0) {
            return NextResponse.json(
                { error: "Total invalido" },
                { status: 400 }
            )
        }

        const venta = await prisma.$transaction(async(tx) => {
            const nuevaVenta = await tx.venta.create({
                data: {
                    total,
                    metodoPago
                }
            });

            for (const item of items) {

                const producto = await tx.producto.findUnique({
                    where: { id: item.id }
                });

                if(!producto) {
                    throw new Error(`Producto no encontrado (ID: ${item.id})`);
                }

                if (producto.stock < item.cantidad) {
                    throw new Error(`Stock insuficiente para ${producto.nombre}`);
                }
                
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
        return NextResponse.json({error: "Error al registrar venta"}, {status: 500});
    }
}
