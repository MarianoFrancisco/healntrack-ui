import { Form, useNavigate, useSearchParams } from "react-router";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface HospitalizationFilterProps {
  patients: { id: string; fullname: string }[];
}

export function HospitalizationFilter({ patients }: HospitalizationFilterProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Estado del paciente
  const [patientId, setPatientId] = useState(searchParams.get("patientId") ?? "");
  const [active, setActive] = useState(searchParams.get("active") ?? "all");

  const patientOptions: ComboboxOption[] = [
    { value: "", label: "Todos los pacientes" },
    ...patients.map((p) => ({ value: p.id, label: p.fullname })),
  ];

  return (
    <Form
      method="get"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-card shadow-sm items-end"
    >
      {/* Paciente */}
      <div className="grid gap-1">
        <Label htmlFor="patientId">Paciente</Label>
        <Combobox
          options={patientOptions}
          value={patientId}
          onChange={setPatientId}
          placeholder="Seleccionar paciente"
        />
        <input type="hidden" name="patientId" value={patientId} />
      </div>

      {/* Estado de hospitalización */}
      <div className="grid gap-1">
        <Label htmlFor="active">Estado</Label>
        <Select name="active" value={active} onValueChange={setActive}>
          <SelectTrigger id="active" className="w-full">
            <SelectValue placeholder="Selecciona un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="true">Hospitalizado</SelectItem>
            <SelectItem value="false">Dado de alta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Botones */}
      <div className="sm:col-span-2 lg:col-span-2 flex justify-end gap-3 mt-2">
        <Button type="submit" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Buscar
        </Button>
        <Button
          type="reset"
          variant="outline"
          onClick={() => navigate("/hospitalizations")}
        >
          Limpiar
        </Button>
      </div>
    </Form>
  );
}
