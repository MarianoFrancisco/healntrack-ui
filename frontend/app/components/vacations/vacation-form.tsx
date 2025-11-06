import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option";
import { DatePicker } from "~/components/common/date-picker";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";

interface VacationRequestFormProps {
  employees: ComboboxOption[];
}

export function VacationRequestForm({ employees }: VacationRequestFormProps) {
  const actionData = useActionData() as
    | { error?: string; success?: string; errors?: Record<string, string> }
    | undefined;
  const navigation = useNavigation();
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [requestedAt, setRequestedAt] = useState<Date | undefined>(new Date());
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Nueva Solicitud de Vacaciones</h2>

      {actionData?.error && <ErrorAlert title="Error" description={actionData.error} />}
      {actionData?.success && <SuccessAlert title="Éxito" description={actionData.success} />}

      <Form
        method="post"
        className="space-y-6 rounded-lg border p-6 shadow-sm bg-white"
      >
        {/* Primera fila: Empleado y Fecha de solicitud */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Empleado */}
          <div className="space-y-2">
            <Label htmlFor="employeeCui">Empleado</Label>
            <input type="hidden" name="employeeCui" value={selectedEmployee} />
            <Combobox
              options={employees}
              value={selectedEmployee}
              onChange={setSelectedEmployee}
              placeholder="Seleccionar empleado"
            />
            {actionData?.errors?.employeeCui && (
              <p className="text-sm text-red-600">{actionData.errors.employeeCui}</p>
            )}
          </div>

          {/* Fecha de solicitud */}
          <div className="space-y-2">
            <Label htmlFor="requestedAt">Fecha de solicitud</Label>
            <input
              type="hidden"
              name="requestedAt"
              value={requestedAt ? requestedAt.toISOString().split("T")[0] : ""}
            />
            <DatePicker value={requestedAt} onChange={setRequestedAt} placeholder="Seleccionar fecha" />
            {actionData?.errors?.requestedAt && (
              <p className="text-sm text-red-600">{actionData.errors.requestedAt}</p>
            )}
          </div>
        </div>

        {/* Segunda fila: Fechas de inicio y fin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fecha de inicio */}
          <div className="space-y-2">
            <Label htmlFor="startDate">Fecha de inicio</Label>
            <input
              type="hidden"
              name="startDate"
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
            />
            <DatePicker value={startDate} onChange={setStartDate} placeholder="Seleccionar fecha de inicio" />
            {actionData?.errors?.startDate && (
              <p className="text-sm text-red-600">{actionData.errors.startDate}</p>
            )}
          </div>

          {/* Fecha de fin */}
          <div className="space-y-2">
            <Label htmlFor="endDate">Fecha de finalización</Label>
            <input
              type="hidden"
              name="endDate"
              value={endDate ? endDate.toISOString().split("T")[0] : ""}
            />
            <DatePicker value={endDate} onChange={setEndDate} placeholder="Seleccionar fecha de finalización" />
            {actionData?.errors?.endDate && (
              <p className="text-sm text-red-600">{actionData.errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Botón de enviar */}
        <div className="flex items-center justify-end pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Solicitar Vacaciones
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
