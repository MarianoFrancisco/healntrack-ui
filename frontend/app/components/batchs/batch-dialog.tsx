import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { BatchResponseDTO } from "~/types/batch";
import { Eye } from "lucide-react";

interface BatchDialogProps {
  batch: BatchResponseDTO;
}

export function BatchDialog({ batch }: BatchDialogProps) {
  const [open, setOpen] = useState(false);

  const formatDate = (dateString?: string) =>
    dateString
      ? new Date(dateString).toLocaleDateString("es-GT", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "—";

  const formatPrice = (price?: string) =>
    price ? `Q ${parseFloat(price).toFixed(2)}` : "—";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Botón para abrir el diálogo */}
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" />
          Ver lote
        </Button>
      </DialogTrigger>

      {/* Contenido del diálogo */}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalle del Lote</DialogTitle>
          <DialogDescription>
            Información detallada del lote de medicina.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Medicamento */}
          <div className="grid gap-2">
            <Label>Código de medicina</Label>
            <Input value={batch.medicine.code} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Nombre de medicina</Label>
            <Input value={batch.medicine.name} disabled />
          </div>

          {/* Información principal */}
          <div className="grid gap-2">
            <Label>Fecha de expiración</Label>
            <Input value={formatDate(batch.expirationDate)} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Cantidad comprada</Label>
            <Input value={batch.purchasedQuantity.toString()} disabled />
          </div>

          <div className="grid gap-2">
            <Label>Cantidad en stock</Label>
            <Input value={batch.quantityOnHand.toString()} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Precio de compra</Label>
            <Input value={formatPrice(batch.purchasePrice)} disabled />
          </div>

          {/* Empleado que compró */}
          <div className="grid gap-2 sm:col-span-2">
            <Label>Comprado por</Label>
            <Input value={batch.employee.fullname} disabled />
          </div>

          <div className="grid gap-2 sm:col-span-2">
            <Label>CUI del comprador</Label>
            <Input value={batch.employee.cui} disabled />
          </div>

          <div className="grid gap-2 sm:col-span-2">
            <Label>Estado del empleado</Label>
            <Input value={batch.employee.isActive ? "Activo" : "Inactivo"} disabled />
          </div>

          {/* Fechas del registro */}
          <div className="grid gap-2">
            <Label>Creado el</Label>
            <Input
              value={formatDate(new Date(batch.createdAt).toISOString())}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label>Última actualización</Label>
            <Input
              value={formatDate(new Date(batch.updatedAt).toISOString())}
              disabled
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
