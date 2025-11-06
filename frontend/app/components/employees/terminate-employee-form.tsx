import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { DatePicker } from "~/components/common/date-picker";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";
import { Textarea } from "~/components/ui/textarea";
import type { EmployeeResponseDTO } from "~/types/employee";

export interface TerminateEmploymentRequestDTO {
  date?: string;
  terminationType?: string; // DESPIDO | RENUNCIA
  reason?: string;
}

interface TerminateEmployeeFormProps {
  employee: EmployeeResponseDTO;
}

export function TerminateEmployeeForm({ employee }: TerminateEmployeeFormProps) {
  const actionData = useActionData() as
    | { error?: string; success?: string; errors?: Record<string, string> }
    | undefined;

  const navigation = useNavigation();
  const [submitted, setSubmitted] = useState(false);
  const [terminationDate, setTerminationDate] = useState<Date | undefined>(new Date());

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">
        Terminar relación laboral
      </h2>

      {actionData?.error && (
        <ErrorAlert title="Error" description={actionData.error} />
      )}
      {actionData?.success && (
        <SuccessAlert title="Éxito" description={actionData.success} />
      )}

      <Form
        method="post"
        onSubmit={() => setSubmitted(true)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg border p-6 shadow-sm bg-white"
      >
        {/* CUI */}
        <div className="space-y-2">
          <Label htmlFor="cui">CUI</Label>
          <Input id="cui" value={employee.cui} disabled />
        </div>

        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="fullname">Nombre completo</Label>
          <Input id="fullname" value={employee.fullname} disabled />
        </div>

        {/* Fecha de terminación */}
        <div className="space-y-2">
          <Label htmlFor="date">Fecha de terminación</Label>
          <DatePicker
            value={terminationDate}
            onChange={(date) => setTerminationDate(date)}
            placeholder="Selecciona la fecha"
          />
          <input
            type="hidden"
            name="date"
            value={terminationDate ? terminationDate.toISOString().split("T")[0] : ""}
          />
          {actionData?.errors?.date && (
            <p className="text-sm text-red-600">{actionData.errors.date}</p>
          )}
        </div>

        {/* Tipo de terminación */}
        <div className="space-y-2">
          <Label htmlFor="terminationType">Tipo de terminación</Label>
          <Select name="terminationType" defaultValue="">
            <SelectTrigger id="terminationType" className="w-full">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DESPIDO">Despido</SelectItem>
              <SelectItem value="RENUNCIA">Renuncia</SelectItem>
            </SelectContent>
          </Select>
          {actionData?.errors?.terminationType && (
            <p className="text-sm text-red-600">{actionData.errors.terminationType}</p>
          )}
        </div>

        {/* Motivo */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="reason">Motivo</Label>
          <Textarea
            id="reason"
            name="reason"
            placeholder="Describe brevemente el motivo de la terminación"
            maxLength={255}
          />
          {actionData?.errors?.reason && (
            <p className="text-sm text-red-600">{actionData.errors.reason}</p>
          )}
        </div>

        {/* Botones */}
        <div className="flex items-center justify-end gap-3 pt-4 md:col-span-2">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Confirmar terminación
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
