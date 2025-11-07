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

export function BatchFilter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <Form
      method="get"
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-card shadow-sm items-end"
    >
      {/* Código de medicina */}
      <div className="grid gap-1">
        <Label htmlFor="medicineCode">Código de medicina</Label>
        <Input
          id="medicineCode"
          name="medicineCode"
          placeholder="Ej: MED-001"
          defaultValue={searchParams.get("medicineCode") ?? ""}
        />
      </div>

      {/* Solo con stock */}
      <div className="grid gap-1">
        <Label htmlFor="onlyWithStock">Con stock</Label>
        <Select
          name="onlyWithStock"
          defaultValue={searchParams.get("onlyWithStock") ?? "all"}
        >
          <SelectTrigger id="onlyWithStock" className="w-full">
            <SelectValue placeholder="Seleccionar opción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="true">Solo con stock</SelectItem>
            <SelectItem value="false">Sin stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Solo no expirados */}
      <div className="grid gap-1">
        <Label htmlFor="onlyNotExpired">No expirados</Label>
        <Select
          name="onlyNotExpired"
          defaultValue={searchParams.get("onlyNotExpired") ?? "all"}
        >
          <SelectTrigger id="onlyNotExpired" className="w-full">
            <SelectValue placeholder="Seleccionar opción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="true">Solo no expirados</SelectItem>
            <SelectItem value="false">Expirados</SelectItem>
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
          onClick={() => navigate("/medicines/batches")}
        >
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
