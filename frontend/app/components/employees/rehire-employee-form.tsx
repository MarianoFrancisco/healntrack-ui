import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";
import { DatePicker } from "../common/date-picker";
import type { EmployeeResponseDTO } from "~/types/employee";

interface EmployeeRehireFormProps {
  departments?: ComboboxOption[];
  employee: EmployeeResponseDTO;
}

export function RehireEmployeeForm({ employee, departments = [] }: EmployeeRehireFormProps) {
  const actionData = useActionData() as { error?: string; success?: string; errors?: Record<string, string> } | undefined;
  const navigation = useNavigation();
  const [submitted, setSubmitted] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const isSubmitting = navigation.state === "submitting";

  // Local states for dates
  const [startDate, setStartDate] = useState<Date | undefined>();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Contratar empleado</h2>

      {actionData?.error && <ErrorAlert title="Error" description={actionData.error} />}
      {actionData?.success && <SuccessAlert title="Éxito" description={actionData.success} />}

      <Form
        method="post"
        onSubmit={() => setSubmitted(true)}
        className="space-y-6 rounded-lg border p-6 shadow-sm bg-white"
      >
        {/* Campos en 2 columnas responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CUI */}
          <div className="space-y-2">
            <Label htmlFor="cui">CUI</Label>
            <Input
              id="cui"
              value={employee.cui}
              disabled
              
            />
          </div>

          {/* NIT */}
          <div className="space-y-2">
            <Label htmlFor="nit">NIT</Label>
            <Input
              id="nit"
              value={employee.nit}
              disabled
            />
          </div>

          {/* Nombre completo */}
          <div className="space-y-2">
            <Label htmlFor="fullname">Nombre completo</Label>
            <Input
              id="fullname"
              value={employee.fullname}
              disabled
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={employee.email}
              disabled
            />
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Teléfono</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              maxLength={8}
              placeholder="Ej. 12345678"
              required
            />
          </div>

          {/* Fecha de nacimiento */}
          <div className="space-y-2">
            <Label>Fecha de nacimiento</Label>
            <Input
              id="birthdate"
              value={new Date(employee.birthDate).toLocaleDateString("es-GT")}
              disabled
            />
          </div>

          {/* Departamento */}
          <div className="space-y-2">
            <Label htmlFor="departmentCode">Area</Label>
            <input type="hidden" name="departmentCode" value={selectedDepartment} />
            <Combobox
              options={departments}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              placeholder="Seleccionar area"
            />
          </div>

          {/* Fecha de inicio */}
          <div className="space-y-2">
            <Label>Fecha de inicio</Label>
            <input
              type="hidden"
              name="startDate"
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
            />
            <DatePicker value={startDate} onChange={setStartDate} placeholder="Selecciona fecha" />
          </div>

          {/* Salario */}
          <div className="space-y-2">
            <Label htmlFor="salary">Salario</Label>
            <Input
              id="salary"
              name="salary"
              type="number"
              step="0.01"
              placeholder="Ej. 5000.00"
              required
            />
          </div>

          {/* IGSS */}
          <div className="space-y-2">
            <Label htmlFor="igssPercent">IGSS (%)</Label>
            <Input
              id="igssPercent"
              name="igssPercent"
              type="number"
              step="0.1"
              placeholder="Ej. 4.83"
              required
            />
          </div>

          {/* IRTRA */}
          <div className="space-y-2">
            <Label htmlFor="irtraPercent">IRTRA (%)</Label>
            <Input
              id="irtraPercent"
              name="irtraPercent"
              type="number"
              step="0.1"
              placeholder="Ej. 4.83"
              required
            />
          </div>

          {/* Notas */}
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Input
              id="notes"
              name="notes"
              type="text"
              maxLength={250}
              placeholder="Opcional"
            />
          </div>
        </div>

        {/* Botón */}
        <div className="flex items-center justify-end pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Re-contratar
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
