"use client"

import { Button } from "~/components/ui/button"
import { Trash } from "lucide-react"
import type { CartItem } from "~/types/cart"

interface CartItemCardProps {
  item: CartItem
  onRemove: (code: string) => void
  onChangeQuantity?: (code: string, quantity: number) => void
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onRemove,
  onChangeQuantity,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 border-b py-2">
      <div>
        <p className="font-semibold">{item.medicineName}</p>
        <p className="text-sm text-muted-foreground">{item.medicineCode}</p>
        <p className="text-sm">Subtotal: {item.subtotal.toLocaleString("es-GT", {
          style: "currency",
          currency: "GTQ",
        })}</p>
      </div>
      <div className="flex items-center gap-2">
        {onChangeQuantity && (
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) =>
              onChangeQuantity(item.medicineCode, parseInt(e.target.value, 10))
            }
            className="w-16 border rounded p-1 text-center"
          />
        )}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onRemove(item.medicineCode)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
