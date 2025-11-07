// hooks/useCart.ts
"use client"

import { useEffect, useState, useCallback } from "react"
import type { CartItem } from "~/types/cart"

const LOCAL_STORAGE_KEY = "cart_items"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  // Cargar carrito desde localStorage al inicio
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (stored) setCart(JSON.parse(stored))
    }
  }, [])

  const saveCart = useCallback((items: CartItem[]) => {
    setCart(items)
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
    }
  }, [])

  const addItem = useCallback(
    (item: Omit<CartItem, "subtotal">) => {
      const existing = cart.find((i) => i.medicineCode === item.medicineCode)
      if (existing) {
        // Si ya existe, aumentamos cantidad
        saveCart(
          cart.map((i) =>
            i.medicineCode === item.medicineCode
              ? {
                  ...i,
                  quantity: i.quantity + item.quantity,
                  subtotal: (i.quantity + item.quantity) * i.unitCost,
                }
              : i
          )
        )
      } else {
        saveCart([
          ...cart,
          { ...item, subtotal: item.quantity * item.unitCost },
        ])
      }
    },
    [cart, saveCart]
  )

  const removeItem = useCallback(
    (code: string) => {
      saveCart(cart.filter((i) => i.medicineCode !== code))
    },
    [cart, saveCart]
  )

  const updateQuantity = useCallback(
    (code: string, quantity: number) => {
      saveCart(
        cart.map((i) =>
          i.medicineCode === code
            ? { ...i, quantity, subtotal: quantity * i.unitCost }
            : i
        )
      )
    },
    [cart, saveCart]
  )

  const clearCart = useCallback(() => {
    saveCart([])
  }, [saveCart])

  const total = cart.reduce((sum, i) => sum + i.subtotal, 0)

  return { cart, addItem, removeItem, updateQuantity, clearCart, total }
}
