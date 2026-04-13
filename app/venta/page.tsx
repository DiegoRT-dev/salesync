import Venta from "@/components/Venta";
import { prisma } from "@/lib/prisma";

export default async function VentaPage(){
    const productos = await prisma.producto.findMany();

    return(
        <div>
            <Venta productos={productos}/>
        </div>
    );
}

