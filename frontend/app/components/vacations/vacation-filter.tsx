import { Form, useNavigate, useSearchParams } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { CalendarSearch } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { DatePicker } from "~/components/common/date-picker";

export function VacationFilter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Estados locales para date pickers
  const [startDate, setStartDate] = useState<Date | undefined>(
    searchParams.get("startDate")
      ? new Date(searchParams.get("startDate")!)
      : undefined
  );

  const [endDate, setEndDate] = useState<Date | undefined>(
    searchParams.get("endDate")
      ? new Date(searchParams.get("endDate")!)
      : undefined
  );

  const [requestedAtFrom, setRequestedAtFrom] = useState<Date | undefined>(
    searchParams.get("requestedAtFrom")
      ? new Date(searchParams.get("requestedAtFrom")!)
      : undefined
  );

  const [requestedAtTo, setRequestedAtTo] = useState<Date | undefined>(
    searchParams.get("requestedAtTo")
      ? new Date(searchParams.get("requestedAtTo")!)
      : undefined
  );

  return (
    <Form
      method="get"
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4 border rounded-lg bg-card shadow-sm"
    >
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

      {/* Estado */}
      <div className="grid gap-1">
        <Label htmlFor="status">Estado</Label>
        <Select name="status" defaultValue={searchParams.get("status") ?? "all"}>
          <SelectTrigger id="status" className="w-full">
            <SelectValue placeholder="Selecciona un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="PENDIENTE">Pendiente</SelectItem>
            <SelectItem value="APROBADA">Aprobada</SelectItem>
            <SelectItem value="RECHAZADA">Rechazada</SelectItem>
            <SelectItem value="AUTOGENERADA">Autogenerada</SelectItem>
            <SelectItem value="FIRMADO">Firmado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Inicio desde */}
      <div className="grid gap-1">
        <Label htmlFor="startDate">Inicio desde</Label>
        <DatePicker
          value={startDate}
          onChange={(date) => setStartDate(date)}
          placeholder="Desde"
        />
        <input
          type="hidden"
          name="startDate"
          value={startDate ? startDate.toISOString().split("T")[0] : ""}
        />
      </div>

      {/* Fin hasta */}
      <div className="grid gap-1">
        <Label htmlFor="endDate">Fin hasta</Label>
        <DatePicker
          value={endDate}
          onChange={(date) => setEndDate(date)}
          placeholder="Hasta"
        />
        <input
          type="hidden"
          name="endDate"
          value={endDate ? endDate.toISOString().split("T")[0] : ""}
        />
      </div>

      {/* Solicitud desde */}
      <div className="grid gap-1">
        <Label htmlFor="requestedAtFrom">Solicitada desde</Label>
        <DatePicker
          value={requestedAtFrom}
          onChange={(date) => setRequestedAtFrom(date)}
          placeholder="Desde"
        />
        <input
          type="hidden"
          name="requestedAtFrom"
          value={
            requestedAtFrom ? requestedAtFrom.toISOString().split("T")[0] : ""
          }
        />
      </div>

      {/* Solicitud hasta */}
      <div className="grid gap-1">
        <Label htmlFor="requestedAtTo">Solicitada hasta</Label>
        <DatePicker
          value={requestedAtTo}
          onChange={(date) => setRequestedAtTo(date)}
          placeholder="Hasta"
        />
        <input
          type="hidden"
          name="requestedAtTo"
          value={
            requestedAtTo ? requestedAtTo.toISOString().split("T")[0] : ""
          }
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
          onClick={() => navigate("/vacations")}
        >
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
