import { prisma } from "@/lib/prisma";

export default async function ProductList() {
    const productos = await prisma.producto.findMany();

    return(
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {productos.map((p) => (
                <div key={p.id}className="bg-primary p-4 rounded-2xl shadow-md hover:shadow-lg transition border border-transparent">
                    <h2 className="font-semibold text-head">{p.nombre}</h2>
                    <p className="text-lg font-bold mt-1">${p.precio}</p>
                    <p className="text-sm text-tx-secondary mt-1">Stock {p.stock}</p>
                </div>
            ))}
        </div>
    );
}