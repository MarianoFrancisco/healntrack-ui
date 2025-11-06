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

export interface PromoteEmployeeRequestDTO {
  salaryIncrease?: number;
  departmentCode?: string;
  date?: string;
  notes?: string;
}

interface RewardEmployeeFormProps {
  employee: EmployeeResponseDTO;
}

export function RewardEmployeeForm({ employee }: RewardEmployeeFormProps) {
  const actionData = useActionData() as
    | { error?: string; success?: string; errors?: Record<string, string> }
    | undefined;

  const navigation = useNavigation();
  const [rewardType, setRewardType] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">
        Promover o Aumentar Salario
      </h2>

      {actionData?.error && (
        <ErrorAlert title="Error" description={actionData.error} />
      )}
      {actionData?.success && (
        <SuccessAlert title="Éxito" description={actionData.success} />
      )}

      <Form
        method="post"
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

        {/* Departamento actual */}
        <div className="space-y-2">
          <Label htmlFor="department">Departamento actual</Label>
          <Input
            id="department"
            value={employee.department?.name ?? "Sin departamento"}
            disabled
          />
          <input type="hidden" name="departmentCode" value={employee.department?.code ?? ""} />
        </div>

        {/* Tipo de recompensa */}
        <div className="space-y-2">
          <Label htmlFor="rewardType">Tipo de recompensa</Label>
          <Select
            name="rewardType"
            value={rewardType}
            onValueChange={setRewardType}
          >
            <SelectTrigger id="rewardType" className="w-full">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AUMENTO">Aumento salarial</SelectItem>
              <SelectItem value="ASCENSO">Ascenso (nuevo cargo)</SelectItem>
            </SelectContent>
          </Select>
          {actionData?.errors?.rewardType && (
            <p className="text-sm text-red-600">{actionData.errors.rewardType}</p>
          )}
        </div>

        {/* Fecha efectiva */}
        <div className="space-y-2">
          <Label htmlFor="date">Fecha efectiva</Label>
          <DatePicker
            value={date}
            onChange={setDate}
            placeholder="Selecciona la fecha"
          />
          <input
            type="hidden"
            name="date"
            value={date ? date.toISOString().split("T")[0] : ""}
          />
          {actionData?.errors?.date && (
            <p className="text-sm text-red-600">{actionData.errors.date}</p>
          )}
        </div>

        {/* Monto del aumento */}
        <div className="space-y-2">
          <Label htmlFor="salaryIncrease">Monto del aumento</Label>
          <Input
            id="salaryIncrease"
            name="salaryIncrease"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ejemplo: 500.00"
          />
          {actionData?.errors?.salaryIncrease && (
            <p className="text-sm text-red-600">{actionData.errors.salaryIncrease}</p>
          )}
        </div>

        {/* Notas */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Notas o comentarios</Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Detalles adicionales o comentarios sobre la promoción o aumento (opcional)"
            maxLength={255}
          />
          {actionData?.errors?.notes && (
            <p className="text-sm text-red-600">{actionData.errors.notes}</p>
          )}
        </div>

        {/* Botón */}
        <div className="flex items-center justify-end gap-3 pt-4 md:col-span-2">
          <Button
            type="submit"
            disabled={isSubmitting || !rewardType}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Confirmar {rewardType === "ASCENSO" ? "ascenso" : "aumento"}
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
