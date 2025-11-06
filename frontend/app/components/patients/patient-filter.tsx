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

export function PatientFilter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <Form
      method="get"
      className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-card shadow-sm items-end"
    >
      <div className="grid gap-1">
        <Label htmlFor="q">Buscar paciente</Label>
        <Input
          id="q"
          name="q"
          placeholder="CUI o nombre"
          defaultValue={searchParams.get("q") ?? ""}
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="gender">Género</Label>
        <Select name="gender" defaultValue={searchParams.get("gender") ?? "all"}>
          <SelectTrigger id="gender" className="w-full">
            <SelectValue placeholder="Selecciona un género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="MALE">Masculino</SelectItem>
            <SelectItem value="FEMALE">Femenino</SelectItem>
            <SelectItem value="OTHER">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Buscar
        </Button>
        <Button
          type="reset"
          variant="outline"
          onClick={() => navigate("/patients")}
        >
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
