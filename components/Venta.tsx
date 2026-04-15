"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { useState } from "react";

export default function Venta({ productos }: any) {
  const [seleccion, setSeleccion] = useState<number | "">("");
  const [formaPago, setFormaPago] = useState<string | "">("efectivo");
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const agregar = useCartStore((s) => s.addToCart);
  const items = useCartStore((s) => s.items);
  const increase = useCartStore((s) => s.increaseQuantity);
  const decrease = useCartStore((s) => s.decreaseQuantity);
  const remove = useCartStore((s) => s.removeFromCart);
  const total = useCartStore((s) => s.getTotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const selectedProduct = productos.find((p: any) => p.id === seleccion);

  const handleCobrar = async () => {
    if (items.length === 0) return;

    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          total,
          metodoPago: formaPago,
        }),
      });
      if (res.ok) {
        clearCart();
        setSeleccion("");
        setFormaPago("efectivo");
        setAlert({
          type: "success",
          message: "Venta registrada correctamente",
        });
      } else {
        setAlert({
          type: "error",
          message: "Error al registar la venta",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Error de conexion",
      });
    }

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <div className="p-6">
      {alert && (
        <div className="fixed bottom-5 right-5 z-50">
          <div
            className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3
        ${
          alert.type === "success"
            ? "bg-success text-white"
            : "bg-error text-white"
        }`}
          >
            <span>{alert.message}</span>

            <button onClick={() => setAlert(null)} className="ml-2 font-bold">
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-primary p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-head mb-4">Productos</h2>
          <select
            value={seleccion}
            onChange={(e) => {
              const value = e.target.value;
              setSeleccion(value === "" ? "" : Number(value));
            }}
            className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          >
            <option value="">Selecciona una opcion</option>
            {productos.map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              if (!selectedProduct) return;
              agregar({
                id: selectedProduct.id,
                nombre: selectedProduct.nombre,
                precio: selectedProduct.precio,
              });

              setSeleccion("");
            }}
            disabled={!selectedProduct}
            className="w-full bg-btn text-white py-2 rounded-lg hover:opacity-90 transition cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:opacity-100"
          >
            {!selectedProduct ? "Selecciona un producto" : "Agregar"}
          </button>
        </div>

        <div className="bg-primary p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-head mb-4">Carrito</h2>
          {items.length === 0 ? (
            <p>No hay productos</p>
          ) : (
            <div>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <div className="flex justify-between items-center border-b py-2">
                      <div>
                        <p className="font-semibold">{item.nombre}</p>
                        <p className="text-sm text-tx-secondary">
                          ${item.precio} x {item.cantidad}
                        </p>
                        <p className="font-semibold text-head">
                          ${item.precio * item.cantidad}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => increase(item.id)}
                          className="bg-secondary px-2 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => decrease(item.id)}
                          className="bg-secondary px-2 rounded"
                        >
                          -
                        </button>
                        <button
                          onClick={() => remove(item.id)}
                          className="text-error"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-bold text-head">Total: ${total}</h3>

            <select
              value={formaPago}
              onChange={(e) => setFormaPago(e.target.value)}
              className="w-full border rounded-lg p-2 mt-3"
            >
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
            <button
              onClick={handleCobrar}
              disabled={items.length === 0}
              className="w-full bg-success text-white py-2 rounded-lg mt-4 hover:opacity-90 transition cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:opacity-100"
            >
              Cobrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
