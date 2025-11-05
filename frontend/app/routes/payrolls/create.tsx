import { redirect, type ActionFunctionArgs } from "react-router";
import { ApiError } from "~/lib/api-client";
import { payrollService } from "~/services/payroll-service";
import { PayrollForm } from "~/components/payroll/payroll-form";
import type { PayPayrollRequestDTO } from "~/types/payroll";
import type { Route } from "../+types/home";
import { useActionData, useNavigation } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pagar nómina" },
    { name: "description", content: "Pagar nómina de todos los empleados activos" },
  ];
}

export const handle = {
  crumb: "Pagar nómina",
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    const payrollData: PayPayrollRequestDTO = {
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      payDay: formData.get("payDay") as string,
      type: "REGULAR",
    };

    await payrollService.payPayroll(payrollData);
    return redirect("/payrolls");
  } catch (error: any) {
    console.error("Action error:", error);

    if (error instanceof ApiError && error.response) {
      const errorData = (error.response as any).data || error.response;
      return {
        errors: errorData.errors || {},
        error: errorData.detail || errorData.message || `Error ${error.status}`,
      };
    }

    return { error: error.message || "Error al pagar la nómina" };
  }
}

export default function CreatePayrollPage() {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">Pagar nómina</h1>
      <PayrollForm />
    </section>
  );
}
