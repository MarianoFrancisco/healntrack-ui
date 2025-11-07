import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  useLoaderData,
} from "react-router";
import { ApiError } from "~/lib/api-client";
import { batchService } from "~/services/batch-service";
import { employeeService } from "~/services/employment-service";
import { medicineService } from "~/services/medicine-service";
import type { ComboboxOption } from "~/components/common/combobox-option";
import type { CreateBatchRequestDTO } from "~/types/batch";
import type { Route } from "./+types";
import { BatchForm } from "~/components/batchs/batch-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Registrar lote" },
    { name: "description", content: "Registrar un nuevo lote de medicina" },
  ];
}

export const handle = {
  crumb: "Registrar lote",
};

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const { code } = params;

    if (!code) {
      throw new Response("Código de medicina no proporcionado", { status: 400 });
    }

    const [medicine, employees] = await Promise.all([
      medicineService.getMedicineByCode(code),
      employeeService.getAllEmployees({ isActive: true, department: "FAR-025" }),
    ]);

    const employeeOptions: ComboboxOption[] = employees.map((e) => ({
      label: e.fullname,
      value: e.id,
    }));

    return { medicine, employeeOptions };
  } catch (error) {
    console.error("Error al cargar medicina o empleados:", error);
    throw error;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const payload: CreateBatchRequestDTO = {
    medicineCode: formData.get("medicineCode") as string,
    expirationDate: formData.get("expirationDate") as string,
    purchasedQuantity: Number(formData.get("purchasedQuantity")),
    purchasedBy: formData.get("purchasedBy") as string,
  };

  try {
    await batchService.createBatch(payload);
    return redirect("/medicines");
  } catch (error: any) {
    console.error("Error al registrar lote:", error);

    if (error instanceof ApiError && error.response) {
      try {
        const errorData = (error.response as any).data || error.response;
        return {
          errors: errorData.errors || {},
          error: errorData.detail || errorData.message || `Error ${error.status}`,
        };
      } catch (parseError) {
        return { error: `Error ${error.status}: No se pudo procesar la respuesta` };
      }
    }

    return { error: error.message || "Error al registrar el lote" };
  }
}

export default function CreateBatchPage() {
  const { medicine, employeeOptions } = useLoaderData<typeof loader>();

  return (
    <section className="p-6">
      <BatchForm medicine={medicine} employees={employeeOptions} />
    </section>
  );
}
