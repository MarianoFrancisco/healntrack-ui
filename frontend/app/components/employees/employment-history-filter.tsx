import { Form, useSearchParams } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { CalendarSearch } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { DatePicker } from "~/components/common/date-picker";

export function EmploymentHistoryFilter() {
  const [searchParams] = useSearchParams();

  const [startDateFrom, setStartDateFrom] = useState<Date | undefined>(
    searchParams.get("startDateFrom") ? new Date(searchParams.get("startDateFrom")!) : undefined
  );
  const [startDateTo, setStartDateTo] = useState<Date | undefined>(
    searchParams.get("startDateTo") ? new Date(searchParams.get("startDateTo")!) : undefined
  );

  return (
    <Form method="get" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4 border rounded-lg bg-card shadow-sm">
      {/* Empleado */}
      <div className="grid gap-1">
        <Label htmlFor="employee">Empleado</Label>
        <Input
          id="employee"
          name="employee"
          placeholder="CUI o nombre"
          defaultValue={searchParams.get("employee") ?? ""}
        />
      </div>

      {/* Departamento */}
      <div className="grid gap-1">
        <Label htmlFor="department">Departamento</Label>
        <Input
          id="department"
          name="department"
          placeholder="Código o nombre"
          defaultValue={searchParams.get("department") ?? ""}
        />
      </div>

      {/* Tipo */}
      <div className="grid gap-1">
        <Label htmlFor="type">Tipo de periodo</Label>
        <Select name="type" defaultValue={searchParams.get("type") ?? ""}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="CONTRATACION">Contratación</SelectItem>
            <SelectItem value="RECONTRATACION">Recontratación</SelectItem>
            <SelectItem value="ASCENSO">Ascenso</SelectItem>
            <SelectItem value="AUMENTO">Aumento</SelectItem>
            <SelectItem value="DESPIDO">Despido</SelectItem>
            <SelectItem value="RENUNCIA">Renuncia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Fecha inicio desde */}
      <div className="grid gap-1">
        <Label htmlFor="startDateFrom">Inicio desde</Label>
        <DatePicker
          value={startDateFrom}
          onChange={(date) => setStartDateFrom(date)}
          placeholder="Desde"
        />
        {/* Campo hidden para enviar el valor al form */}
        <input
          type="hidden"
          name="startDateFrom"
          value={startDateFrom ? startDateFrom.toISOString().split("T")[0] : ""}
        />
      </div>

      {/* Fecha inicio hasta */}
      <div className="grid gap-1">
        <Label htmlFor="startDateTo">Inicio hasta</Label>
        <DatePicker
          value={startDateTo}
          onChange={(date) => setStartDateTo(date)}
          placeholder="Hasta"
        />
        <input
          type="hidden"
          name="startDateTo"
          value={startDateTo ? startDateTo.toISOString().split("T")[0] : ""}
        />
      </div>

      {/* Botones */}
      <div className="sm:col-span-2 lg:col-span-3 xl:col-span-5 flex justify-end gap-3 mt-2">
        <Button type="submit" className="flex items-center gap-2">
          <CalendarSearch className="h-4 w-4" />
          Buscar
        </Button>
        <Button
          type="reset"
          variant="outline"
          onClick={() => (window.location.href = "/employees/history")}
        >
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
