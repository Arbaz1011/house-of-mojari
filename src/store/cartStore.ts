"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  getTotal: () => number;
  getItemCount: () => number;
}

function matchesItem(item: CartItem, productId: string, size: string) {
  return item.productId === productId && item.size === size;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const cartItem = { ...item, color: "" };
          const existing = state.items.find((i) =>
            matchesItem(i, cartItem.productId, cartItem.size)
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                matchesItem(i, cartItem.productId, cartItem.size)
                  ? { ...i, quantity: i.quantity + cartItem.quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, cartItem], isOpen: true };
        });
      },

      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter((i) => !matchesItem(i, productId, size)),
        }));
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            matchesItem(i, productId, size) ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCartOpen: (open) => set({ isOpen: open }),

      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "hom-cart" }
  )
);
