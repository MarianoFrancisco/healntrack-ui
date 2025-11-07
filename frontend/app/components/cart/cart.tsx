"use client"

import { Button } from "~/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer"
import { useCart } from "~/hooks/use-cart"
import { CartItemCard } from "./cart-item"
import { ShoppingCart } from "lucide-react"

export const CartDrawer: React.FC = () => {
  const { cart, removeItem, updateQuantity, clearCart, total } = useCart()

  return (
    <Drawer>
      {/* Botón fijo en la parte superior derecha */}
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="fixed top-20 right-4 z-50 flex items-center gap-2 px-3 py-2 w-auto max-w-[200px]"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="truncate">Carrito ({cart.length})</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="w-96 flex flex-col items-center h-full"> {/* <-- items-center */}
          <DrawerHeader className="w-full text-center">
            <DrawerTitle>Carrito de Compras</DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-4 py-2 w-full flex flex-col items-center gap-2">
            {cart.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center">
                El carrito está vacío
              </p>
            ) : (
              cart.map((item) => (
                <CartItemCard
                  key={item.medicineCode}
                  item={item}
                  onRemove={removeItem}
                  onChangeQuantity={updateQuantity}
                //   className="w-full" // que cada item ocupe todo el ancho
                />
              ))
            )}
          </div>

          <DrawerFooter className="flex flex-col gap-2 w-full items-center">
            <p className="text-lg font-semibold">
              Total:{" "}
              {total.toLocaleString("es-GT", {
                style: "currency",
                currency: "GTQ",
              })}
            </p>

            <div className="flex justify-between w-full">
              <Button onClick={clearCart} variant="secondary">
                Vaciar carrito
              </Button>
              {/* Aquí puedes agregar el botón de procesar compra */}
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
