import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option";
import { DatePicker } from "~/components/common/date-picker";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";

interface ConsultationFormProps {
  patients: ComboboxOption[];
  doctors: ComboboxOption[];
}

export function ConsultationForm({ patients, doctors }: ConsultationFormProps) {
  const actionData = useActionData() as { error?: string; success?: string; errors?: Record<string, string> } | undefined;
  const navigation = useNavigation();
  const [submitted, setSubmitted] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Registrar Consulta</h2>

      {actionData?.error && <ErrorAlert title="Error" description={actionData.error} />}
      {actionData?.success && <SuccessAlert title="Éxito" description={actionData.success} />}

      <Form
        method="post"
        onSubmit={() => setSubmitted(true)}
        className="space-y-6 rounded-lg border p-6 shadow-sm bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="patientId">Paciente</Label>
            <input type="hidden" name="patientId" value={selectedPatient} />
            <Combobox
              options={patients}
              value={selectedPatient}
              onChange={setSelectedPatient}
              placeholder="Seleccionar paciente"
            />
            {actionData?.errors?.patientId && <p className="text-sm text-red-600">{actionData.errors.patientId}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeId">Doctor</Label>
            <input type="hidden" name="employeeId" value={selectedDoctor} />
            <Combobox
              options={doctors}
              value={selectedDoctor}
              onChange={setSelectedDoctor}
              placeholder="Seleccionar doctor"
            />
            {actionData?.errors?.employeeId && <p className="text-sm text-red-600">{actionData.errors.employeeId}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Fecha de consulta</Label>
            <input type="hidden" name="date" value={date ? date.toISOString().split("T")[0] : ""} />
            <DatePicker value={date} onChange={setDate} placeholder="Seleccionar fecha" />
            {actionData?.errors?.date && <p className="text-sm text-red-600">{actionData.errors.date}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo</Label>
            <Input
              id="reason"
              name="reason"
              type="text"
              placeholder="Motivo de la consulta"
              required
            />
            {actionData?.errors?.reason && <p className="text-sm text-red-600">{actionData.errors.reason}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnóstico</Label>
            <Input
              id="diagnosis"
              name="diagnosis"
              type="text"
              placeholder="Diagnóstico"
              required
            />
            {actionData?.errors?.diagnosis && <p className="text-sm text-red-600">{actionData.errors.diagnosis}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="treatment">Tratamiento</Label>
            <Input
              id="treatment"
              name="treatment"
              type="text"
              placeholder="Tratamiento (opcional)"
            />
            {actionData?.errors?.treatment && <p className="text-sm text-red-600">{actionData.errors.treatment}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalFee">Costo total</Label>
            <Input
              id="totalFee"
              name="totalFee"
              type="number"
              step="0.01"
              placeholder="Costo total"
              required
            />
            {actionData?.errors?.totalFee && <p className="text-sm text-red-600">{actionData.errors.totalFee}</p>}
          </div>
        </div>

        <div className="flex items-center justify-end pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Creando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Registrar Consulta
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
