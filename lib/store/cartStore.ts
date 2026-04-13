import { create } from "zustand";

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface CartState {
  items: CartItem[];

  addToCart: (product: Omit<CartItem, "cantidad">) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;

  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product) => {
    const items = get().items;
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ),
      });
    } else {
      set({
        items: [...items, { ...product, cantidad: 1 }],
      });
    }
  },

  removeFromCart: (id) => {
    set({
      items: get().items.filter((item) => item.id !== id),
    });
  },

  increaseQuantity: (id) => {
    set({
      items: get().items.map((item) =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ),
    });
  },

  decreaseQuantity: (id) => {
    set({
      items: get()
        .items.map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0),
    });
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  },
}));