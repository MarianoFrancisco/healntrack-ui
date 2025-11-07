import { Form, useNavigate, useSearchParams } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Search } from "lucide-react";

export function SurgeryPriceFilter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <Form
      method="get"
      className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-card shadow-sm items-end"
    >
      {/* Buscar cirugía */}
      <div className="grid gap-1">
        <Label htmlFor="name">Cirugía</Label>
        <Input
          id="name"
          name="name"
          placeholder="Nombre de la cirugía"
          defaultValue={searchParams.get("name") ?? ""}
        />
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 col-span-1 sm:col-span-2 lg:col-span-1">
        <Button type="submit" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Buscar
        </Button>
        <Button
          type="reset"
          variant="outline"
          onClick={() => navigate("/surgery-prices")}
        >
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
