import { Form, useNavigate, useSearchParams } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { CalendarSearch } from "lucide-react";
import { useState } from "react";
import { DatePicker } from "~/components/common/date-picker";

export function PayrollFilter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [paydayFrom, setPaydayFrom] = useState<Date | undefined>(
    searchParams.get("paydayFrom")
      ? new Date(searchParams.get("paydayFrom")!)
      : undefined
  );

  const [paydayTo, setPaydayTo] = useState<Date | undefined>(
    searchParams.get("paydayTo")
      ? new Date(searchParams.get("paydayTo")!)
      : undefined
  );

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

  return (
    <Form
      method="get"
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-4 border rounded-lg bg-card shadow-sm"
    >
      <div className="grid gap-1">
        <Label htmlFor="employee">Empleado</Label>
        <Input
          id="employee"
          name="employee"
          placeholder="CUI o nombre"
          defaultValue={searchParams.get("employee") ?? ""}
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="department">Departamento</Label>
        <Input
          id="department"
          name="department"
          placeholder="Código o nombre"
          defaultValue={searchParams.get("department") ?? ""}
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="paydayFrom">Pago desde</Label>
        <DatePicker
          value={paydayFrom}
          onChange={(date) => setPaydayFrom(date)}
          placeholder="Desde"
        />
        <input
          type="hidden"
          name="paydayFrom"
          value={paydayFrom ? paydayFrom.toISOString().split("T")[0] : ""}
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="paydayTo">Pago hasta</Label>
        <DatePicker
          value={paydayTo}
          onChange={(date) => setPaydayTo(date)}
          placeholder="Hasta"
        />
        <input
          type="hidden"
          name="paydayTo"
          value={paydayTo ? paydayTo.toISOString().split("T")[0] : ""}
        />
      </div>

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

      <div className="sm:col-span-2 lg:col-span-6 flex justify-end gap-3 mt-2">
        <Button type="submit" className="flex items-center gap-2">
          <CalendarSearch className="h-4 w-4" />
          Buscar
        </Button>
        <Button
          type="reset"
          variant="outline"
          onClick={() => navigate("/payrolls")}
        >
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
