import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Loader2, Save } from "lucide-react";
import type { EmployeeResponseDTO } from "~/types/employee";

interface EmployeeEditDialogProps {
  employee: EmployeeResponseDTO;
}

export function EmployeeEditDialog({ employee }: EmployeeEditDialogProps) {
  const [open, setOpen] = useState(false);
  const actionData = useActionData() as
    | { error?: string; success?: string; errors?: Record<string, string> }
    | undefined;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Ver / Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Empleado: {employee.fullname}</DialogTitle>
          <DialogDescription>
            Visualiza y actualiza los datos editables del empleado.
          </DialogDescription>
        </DialogHeader>

        <Form method="post" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <input type="hidden" name="cui" value={employee.cui} />

          <div className="grid gap-2">
            <Label htmlFor="cui">CUI</Label>
            <Input id="cui" value={employee.cui} disabled />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="nit">NIT</Label>
            <Input id="nit" value={employee.nit} disabled />
          </div>

          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="fullname">Nombre completo</Label>
            <Input
              id="fullname"
              name="fullname"
              defaultValue={employee.fullname}
              required
            />
            {actionData?.errors?.fullname && (
              <p className="text-sm text-red-600">{actionData.errors.fullname}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" value={employee.email} disabled />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Teléfono</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              defaultValue={employee.phoneNumber}
              required
            />
            {actionData?.errors?.phoneNumber && (
              <p className="text-sm text-red-600">{actionData.errors.phoneNumber}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="department">Departamento</Label>
            <Input
              id="department"
              value={employee.department?.name ?? "Sin departamento"}
              disabled
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="salary">Salario</Label>
            <Input id="salary" value={employee.salary.toFixed(2)} disabled />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="igssPercent">IGSS (%)</Label>
            <Input
              id="igssPercent"
              name="igssPercent"
              type="number"
              step="0.01"
              min="0"
              max="100"
              defaultValue={(employee.igssPercent * 100).toFixed(2)}
            />
            {actionData?.errors?.igssPercent && (
              <p className="text-sm text-red-600">{actionData.errors.igssPercent}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="irtraPercent">IRTRA (%)</Label>
            <Input
              id="irtraPercent"
              name="irtraPercent"
              type="number"
              step="0.01"
              min="0"
              max="100"
              defaultValue={(employee.irtraPercent * 100).toFixed(2)}
            />
            {actionData?.errors?.irtraPercent && (
              <p className="text-sm text-red-600">{actionData.errors.irtraPercent}</p>
            )}
          </div>

          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="status">Estado</Label>
            <Input
              id="status"
              value={employee.isActive ? "Activo" : "Inactivo"}
              disabled
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 sm:col-span-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Guardar cambios
                </>
              )}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
