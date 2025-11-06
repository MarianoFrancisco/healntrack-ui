import { Form, useNavigate, useSearchParams } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function EmployeeFilter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <Form
      method="get"
      className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-card shadow-sm items-end"
    >
      {/* Buscar empleado */}
      <div className="grid gap-1">
        <Label htmlFor="q">Empleado</Label>
        <Input
          id="q"
          name="q"
          placeholder="CUI o nombre"
          defaultValue={searchParams.get("q") ?? ""}
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
        <Label htmlFor="isActive">Estado</Label>
        <Select name="isActive" defaultValue={searchParams.get("isActive") ?? "all"}>
          <SelectTrigger id="isActive" className="w-full">
            <SelectValue placeholder="Selecciona un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="true">Activos</SelectItem>
            <SelectItem value="false">Inactivos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3">
        <Button type="submit" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Buscar
        </Button>
        <Button
          type="reset"
          variant="outline"
          onClick={() => navigate("/employees")}
        >
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
