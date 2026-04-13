"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar(){
    const pathname = usePathname();

    const linkClass = (path: string) => 
        `text-sm font-medium transition ${
            pathname === path
            ? "text-head font-semibold underline"
            : "text-tx-secondary hover:text-head"
        }`;

    return (
        <header className="sticky top-0 z-50 bg-primary/80 backdrop-blur border-b">
            <div className="flex items-center justify-between max-w-7xl max-auto mx-auto h-16 px-6">
                <h1 className="font-bold text-head text-lg"><Link href="/">SaleSync</Link></h1>
                <nav className="flex items-center gap-6">
                    <Link href="/" className={linkClass("/")}>Home</Link>
                <Link href="/venta" className={linkClass("/venta")}>Venta</Link>
                <Link href="/productos" className={linkClass("/productos")}>Productos</Link>
                <Link href="/estadisticas" className={linkClass("/estadisticas")}>Estadisticas</Link>
                </nav>
            </div>
        </header>
    );
}