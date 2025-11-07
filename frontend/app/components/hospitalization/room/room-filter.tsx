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

export function RoomFilter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <Form
      method="get"
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-card shadow-sm items-end"
    >
      {/* Número de habitación */}
      <div className="grid gap-1">
        <Label htmlFor="number">Número</Label>
        <Input
          id="number"
          name="number"
          placeholder="Ej. 1B"
          defaultValue={searchParams.get("number") ?? ""}
        />
      </div>

      {/* Estado */}
      <div className="grid gap-1">
        <Label htmlFor="status">Estado</Label>
        <Select
          name="status"
          defaultValue={searchParams.get("status") ?? "all"}
        >
          <SelectTrigger id="status" className="w-full">
            <SelectValue placeholder="Selecciona un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="AVAILABLE">Disponibles</SelectItem>
            <SelectItem value="OCCUPIED">Ocupadas</SelectItem>
            <SelectItem value="OUT_OF_SERVICE">Fuera de servicio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Espaciador para mantener diseño */}
      <div className="hidden lg:block"></div>

      {/* Botones */}
      <div className="flex justify-end gap-3">
        <Button type="submit" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Buscar
        </Button>
        <Button
          type="reset"
          variant="outline"
          onClick={() => navigate("/rooms")}
        >
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
