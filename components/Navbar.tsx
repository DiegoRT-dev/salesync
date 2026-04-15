"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `text-sm font-medium transition ${
      pathname === path
        ? "text-head font-semibold underline"
        : "text-tx-secondary hover:text-head"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-primary/80 backdrop-blur border-b">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between max-w-7xl mx-auto px-4 md:px-6 py-3">
        <h1 className="font-bold text-head text-lg">
          <Link href="/">SaleSync</Link>
        </h1>

        <nav className="flex flex-wrap gap-3 mt-2 md:mt-0 md:flex-nowrap md:gap-6">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/venta" className={linkClass("/venta")}>
            Venta
          </Link>
          <Link href="/productos" className={linkClass("/productos")}>
            Productos
          </Link>
          <Link href="/estadisticas" className={linkClass("/estadisticas")}>
            Estadisticas
          </Link>
        </nav>
      </div>
    </header>
  );
}
