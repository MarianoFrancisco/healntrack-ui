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
import type { VacationResponseDTO } from "~/types/vacation";
import { VacationStatusBadge } from "~/components/vacations/vacation-status-badge";
import { Eye } from "lucide-react";

interface VacationDialogProps {
  vacation: VacationResponseDTO;
}

export function VacationDialog({ vacation }: VacationDialogProps) {
  const [open, setOpen] = useState(false);

  const formatDate = (dateString?: string) =>
    dateString
      ? new Date(dateString).toLocaleDateString("es-GT", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "—";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger para abrir el diálogo */}
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" /> Ver Solicitud
        </Button>
      </DialogTrigger>

      {/* Contenido del diálogo */}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Solicitud de Vacaciones</DialogTitle>
          <DialogDescription>
            Información detallada de la solicitud de vacaciones del empleado.
          </DialogDescription>
        </DialogHeader>

        {/* Datos de la solicitud */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Empleado */}
          <div className="grid gap-2">
            <Label>Empleado</Label>
            <Input value={vacation.employeeName} disabled />
          </div>
          <div className="grid gap-2">
            <Label>CUI</Label>
            <Input value={vacation.employeeCui} disabled />
          </div>

          {/* Departamento */}
          <div className="grid gap-2">
            <Label>Departamento</Label>
            <Input value={vacation.departmentName} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Código de Departamento</Label>
            <Input value={vacation.departmentCode} disabled />
          </div>

          {/* Fechas */}
          <div className="grid gap-2">
            <Label>Fecha de inicio</Label>
            <Input value={formatDate(vacation.startDate)} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Fecha de finalización</Label>
            <Input value={formatDate(vacation.endDate)} disabled />
          </div>

          {/* Estado y revisión */}
          <div className="grid gap-2 sm:col-span-2">
            <Label>Estado</Label>
            <div className="flex items-center gap-2">
              <VacationStatusBadge status={vacation.status} />
            </div>
          </div>

          {vacation.reviewedBy && (
            <>
              <div className="grid gap-2">
                <Label>Revisado por</Label>
                <Input value={vacation.reviewedBy} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Fecha de revisión</Label>
                <Input value={formatDate(vacation.reviewedAt)} disabled />
              </div>
            </>
          )}

          {/* Fecha de solicitud */}
          <div className="grid gap-2 sm:col-span-2">
            <Label>Fecha de solicitud</Label>
            <Input value={formatDate(vacation.requestedAt)} disabled />
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
