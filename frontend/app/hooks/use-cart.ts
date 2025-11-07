"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import type { CartItem } from "~/types/cart";

const LOCAL_STORAGE_KEY = "cart_items";

function readCartFromLocalStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(readCartFromLocalStorage());
  }, []);

  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === LOCAL_STORAGE_KEY) {
        try {
          const items = e.newValue ? (JSON.parse(e.newValue) as CartItem[]) : [];
          setCart(items);
        } catch {
        }
      }
    }
    function handleCustom(e: Event) {
      const custom = e as CustomEvent<CartItem[]>;
      if (custom.detail) setCart(custom.detail);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorage);
      window.addEventListener("cart:change", handleCustom as EventListener);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener("cart:change", handleCustom as EventListener);
      }
    };
  }, []);

  const saveCart = useCallback((items: CartItem[]) => {
    setCart(items);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent<CartItem[]>("cart:change", { detail: items }));
    }
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, "subtotal">) => {
      const existing = cart.find((i) => i.medicineCode === item.medicineCode);

      if (existing) {
        const updated = cart.map((i) =>
          i.medicineCode === item.medicineCode
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
                subtotal: (i.quantity + item.quantity) * i.unitCost,
              }
            : i
        );
        saveCart(updated);
        toast.success("Cantidad actualizada en el carrito");
      } else {
        const next = [...cart, { ...item, subtotal: item.quantity * item.unitCost }];
        saveCart(next);
        toast.success("Producto agregado al carrito");
      }
    },
    [cart, saveCart]
  );

  const removeItem = useCallback(
    (code: string) => {
      const next = cart.filter((i) => i.medicineCode !== code);
      saveCart(next);
      toast.info("Producto eliminado del carrito");
    },
    [cart, saveCart]
  );

  const updateQuantity = useCallback(
    (code: string, quantity: number) => {
      const next = cart.map((i) =>
        i.medicineCode === code ? { ...i, quantity, subtotal: quantity * i.unitCost } : i
      );
      saveCart(next);
      toast.success("Cantidad actualizada");
    },
    [cart, saveCart]
  );

  const clearCart = useCallback(() => {
    saveCart([]);
    toast.warning("Carrito vaciado");
  }, [saveCart]);

  const total = cart.reduce((sum, i) => sum + i.subtotal, 0);

  return { cart, addItem, removeItem, updateQuantity, clearCart, total };
}