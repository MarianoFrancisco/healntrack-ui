import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option";
import { DatePicker } from "~/components/common/date-picker";
import { ErrorAlert } from "~/components/common/error-alert";
import { SuccessAlert } from "~/components/common/success-alert";
import type { EmployeeResponseDTO } from "~/types/employee";

export interface AddStaffAssignmentRequest {
  employeeId: string;
  assignedAt: string;
}

interface StaffManageFormProps {
  employees: EmployeeResponseDTO[];
  hospitalizationId: string;
}

export function StaffManageForm({ employees, hospitalizationId }: StaffManageFormProps) {
  const actionData = useActionData() as { error?: string; success?: string; errors?: Record<string, string> } | undefined;
  const navigation = useNavigation();
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [assignedAt, setAssignedAt] = useState<Date | undefined>();
  const isSubmitting = navigation.state === "submitting";

  const employeeOptions: ComboboxOption[] = employees.map((e) => ({
    label: e.fullname,
    value: e.id,
  }));

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {actionData?.error && <ErrorAlert title="Error" description={actionData.error} />}
      {actionData?.success && <SuccessAlert title="Éxito" description={actionData.success} />}

      <Form method="post" className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Empleado */}
        <input type="text" name="hospitalizationId" value={hospitalizationId} hidden />
        <div className="space-y-2">
          <Label htmlFor="employeeId">Empleado</Label>
          <input type="hidden" name="employeeId" value={selectedEmployee} />
          <Combobox
            options={employeeOptions}
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            placeholder="Seleccionar empleado"
          />
          {actionData?.errors?.employeeId && (
            <p className="text-sm text-red-600">{actionData.errors.employeeId}</p>
          )}
        </div>

        {/* Fecha de asignación */}
        <div className="space-y-2">
          <Label htmlFor="assignedAt">Fecha de asignación</Label>
          <input
            type="hidden"
            name="assignedAt"
            value={assignedAt ? assignedAt.toISOString().split("T")[0] : ""}
          />
          <DatePicker
            value={assignedAt}
            onChange={setAssignedAt}
            placeholder="Seleccionar fecha"
          />
          {actionData?.errors?.assignedAt && (
            <p className="text-sm text-red-600">{actionData.errors.assignedAt}</p>
          )}
        </div>

        {/* Botón de asignar */}
        <div className="flex items-center">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2 w-full md:w-auto">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Asignando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Asignar
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
