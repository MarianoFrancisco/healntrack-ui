import { useState } from "react";
import { useNavigate } from "react-router";
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
import type { EmployeeResponseDTO, UpdateEmployeeRequestDTO } from "~/types/employee";

interface EmployeeEditDialogProps {
  employee: EmployeeResponseDTO;
  onSave?: (cui: string, updated: UpdateEmployeeRequestDTO) => Promise<void> | void;
}

export function EmployeeEditDialog({ employee, onSave }: EmployeeEditDialogProps) {
    const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fullname, setFullname] = useState(employee.fullname);
  const [phoneNumber, setPhoneNumber] = useState(employee.phoneNumber);
  const [igssPercent, setIgssPercent] = useState(employee.igssPercent * 100);
  const [irtraPercent, setIrtraPercent] = useState(employee.irtraPercent * 100);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave?.(employee.cui, {
        fullname,
        phoneNumber,
        igssPercent: igssPercent / 100,
        irtraPercent: irtraPercent / 100,
      });
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Ver / Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Empleado: {employee.fullname}</DialogTitle>
            <DialogDescription>
              Visualiza y actualiza los datos editables del empleado.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* CUI */}
            <div className="grid gap-2">
              <Label htmlFor="cui">CUI</Label>
              <Input id="cui" value={employee.cui} disabled />
            </div>

            {/* NIT */}
            <div className="grid gap-2">
              <Label htmlFor="nit">NIT</Label>
              <Input id="nit" value={employee.nit} disabled />
            </div>

            {/* Nombre completo */}
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="fullname">Nombre completo</Label>
              <Input
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" value={employee.email} disabled />
            </div>

            {/* Teléfono */}
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Teléfono</Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {/* Departamento */}
            <div className="grid gap-2">
              <Label htmlFor="department">Departamento</Label>
              <Input id="department" value={employee.department.name} disabled />
            </div>

            {/* Salario */}
            <div className="grid gap-2">
              <Label htmlFor="salary">Salario</Label>
              <Input id="salary" value={employee.salary.toFixed(2)} disabled />
            </div>

            {/* IGSS */}
            <div className="grid gap-2">
              <Label htmlFor="igssPercent">IGSS (%)</Label>
              <Input
                id="igssPercent"
                type="number"
                min={1}
                max={100}
                step="0.01"
                value={igssPercent}
                onChange={(e) => setIgssPercent(Number(e.target.value))}
              />
            </div>

            {/* IRTRA */}
            <div className="grid gap-2">
              <Label htmlFor="irtraPercent">IRTRA (%)</Label>
              <Input
                id="irtraPercent"
                type="number"
                min={1}
                max={100}
                step="0.01"
                value={irtraPercent}
                onChange={(e) => setIrtraPercent(Number(e.target.value))}
              />
            </div>

            {/* Estado */}
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="status">Estado</Label>
              <Input
                id="status"
                value={employee.isActive ? "Activo" : "Inactivo"}
                disabled
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button" onClick={() => navigate("/employees")}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
