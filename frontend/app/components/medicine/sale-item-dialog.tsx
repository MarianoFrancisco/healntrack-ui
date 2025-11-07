import { useState } from "react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Eye } from "lucide-react"
import type { SaleItemResponseDTO } from "~/types/sale"

interface SaleDialogProps {
  saleId: string
  items: SaleItemResponseDTO[]
}

export function SaleDialog({ saleId, items }: SaleDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger para abrir el diálogo */}
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" /> Ver Detalle
        </Button>
      </DialogTrigger>

      {/* Contenido del diálogo */}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalle de Venta</DialogTitle>
        </DialogHeader>

        {/* ID de la venta */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="grid gap-2">
            <Label>ID de Venta</Label>
            <Input value={saleId} disabled />
          </div>
        </div>

        {/* Lista de items */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left border-b">Código</th>
                <th className="p-2 text-left border-b">Nombre</th>
                <th className="p-2 text-right border-b">Precio Unitario</th>
                <th className="p-2 text-right border-b">Cantidad</th>
                <th className="p-2 text-right border-b">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="even:bg-gray-50">
                  <td className="p-2 border-b">{item.medicineCode}</td>
                  <td className="p-2 border-b">{item.medicine.name}</td>
                  <td className="p-2 text-right border-b">
                    {item.unitPrice.toLocaleString("es-GT", {
                      style: "currency",
                      currency: "GTQ",
                    })}
                  </td>
                  <td className="p-2 text-right border-b">{item.quantity}</td>
                  <td className="p-2 text-right border-b">
                    {item.lineTotal.toLocaleString("es-GT", {
                      style: "currency",
                      currency: "GTQ",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
