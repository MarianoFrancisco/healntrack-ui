import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { DatePicker } from "~/components/common/date-picker";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";

export interface PayPayrollRequestDTO {
  startDate: string;
  endDate: string;
  payDay: string;
  type: string;
}

export function PayrollForm() {
  const actionData = useActionData() as
    | { error?: string; success?: string; errors?: Record<string, string> }
    | undefined;

  const navigation = useNavigation();
  const [submitted, setSubmitted] = useState(false);

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [payDay, setPayDay] = useState<Date | undefined>();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">
        Registrar nómina
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
        className="space-y-4 rounded-lg border p-6 shadow-sm bg-white"
      >
        <div className="space-y-2">
          <Label htmlFor="startDate">Fecha inicio</Label>
          <DatePicker
            value={startDate}
            onChange={setStartDate}
            placeholder="Selecciona la fecha de inicio"
          />
          <Input
            type="hidden"
            name="startDate"
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
          />
          {actionData?.errors?.startDate && (
            <p className="text-sm text-red-600">{actionData.errors.startDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">Fecha fin</Label>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            placeholder="Selecciona la fecha de fin"
          />
          <Input
            type="hidden"
            name="endDate"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
          />
          {actionData?.errors?.endDate && (
            <p className="text-sm text-red-600">{actionData.errors.endDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="payDay">Fecha de pago</Label>
          <DatePicker
            value={payDay}
            onChange={setPayDay}
            placeholder="Selecciona la fecha de pago"
          />
          <Input
            type="hidden"
            name="payDay"
            value={payDay ? payDay.toISOString().split("T")[0] : ""}
          />
          {actionData?.errors?.payDay && (
            <p className="text-sm text-red-600">{actionData.errors.payDay}</p>
          )}
        </div>

        <Input type="hidden" name="type" value="REGULAR" />

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Registrando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Registrar nómina
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
