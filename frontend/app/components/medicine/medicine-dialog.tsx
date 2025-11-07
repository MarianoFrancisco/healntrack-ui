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
import type { MedicineResponseDTO } from "~/types/medicine";
import { Eye } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { UnitTypeBadge } from "./unit-type-badge";
import { StatusBadge } from "../common/status-badge";

interface MedicineDialogProps {
  medicine: MedicineResponseDTO;
}

export function MedicineDialog({ medicine }: MedicineDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Botón para abrir el diálogo */}
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" />
          Ver detalle
        </Button>
      </DialogTrigger>

      {/* Contenido del diálogo */}
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Detalles del Medicamento</DialogTitle>
          <DialogDescription>
            Información completa del medicamento registrado en el catálogo.
          </DialogDescription>
        </DialogHeader>

        {/* Campos de información */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Código */}
          <div className="grid gap-2">
            <Label>Código</Label>
            <Input value={medicine.code} disabled />
          </div>

          {/* Nombre */}
          <div className="grid gap-2">
            <Label>Nombre</Label>
            <Input value={medicine.name} disabled />
          </div>

          {/* Unidad y Estado */}
          <div className="grid gap-2">
            <Label>Unidad</Label>
            <div className="flex items-center">
              <UnitTypeBadge unitType={medicine.unitType} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Estado</Label>
            <div className="flex items-center">
              <StatusBadge status={medicine.status === "ACTIVE"} />
            </div>
          </div>

          {/* Stock y valores */}
          <div className="grid gap-2">
            <Label>Stock mínimo</Label>
            <Input value={medicine.minStock} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Stock actual</Label>
            <Input value={medicine.stock ?? "—"} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Precio actual (Q)</Label>
            <Input value={medicine.currentPrice.toFixed(2)} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Costo actual (Q)</Label>
            <Input value={medicine.currentCost.toFixed(2)} disabled />
          </div>

          {/* Descripción */}
          <div className="grid gap-2 sm:col-span-2">
            <Label>Descripción</Label>
            <Textarea
              value={medicine.description ?? "Sin descripción"}
              disabled
              className="min-h-20"
            />
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
