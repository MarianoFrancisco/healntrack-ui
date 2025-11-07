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

export function TransactionFilter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [startDate, setStartDate] = useState<Date | undefined>(
    searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined
  );

  return (
    <Form
      method="get"
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 border rounded-lg bg-card shadow-sm"
    >
      <div className="grid gap-1">
        <Label htmlFor="area">Área</Label>
        <Input
          id="area"
          name="area"
          placeholder="Código o nombre de área"
          defaultValue={searchParams.get("area") ?? ""}
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="type">Tipo</Label>
        <Select name="type" defaultValue={searchParams.get("type") ?? "INCOME"}>
          <SelectTrigger id="type" className="w-full">
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INCOME">Ingreso</SelectItem>
            <SelectItem value="EXPENSE">Gasto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1">
        <Label htmlFor="startDate">Fecha desde</Label>
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
        <Label htmlFor="endDate">Fecha hasta</Label>
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

      <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3 mt-2">
        <Button type="submit" className="flex items-center gap-2">
          <CalendarSearch className="h-4 w-4" />
          Filtrar
        </Button>
        <Button
          type="reset"
          variant="outline"
          onClick={() => navigate("/transactions")}
        >
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
