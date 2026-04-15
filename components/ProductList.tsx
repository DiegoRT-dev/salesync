"use client";

import { useEffect, useState } from "react";

export default async function ProductList() {
    const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const res = await fetch("/api/productos");
      const data = await res.json();
      setProductos(data);
    };

    fetchProductos();
  }, []);

    return(
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {productos.map((p: any) => (
                <div key={p.id}className="bg-primary p-4 rounded-2xl shadow-md hover:shadow-lg transition border border-transparent">
                    <h2 className="font-semibold text-head">{p.nombre}</h2>
                    <p className="text-lg font-bold mt-1">${p.precio}</p>
                    <p className="text-sm text-tx-secondary mt-1">Stock {p.stock}</p>
                </div>
            ))}
        </div>
    );
}