import { redirect, type LoaderFunctionArgs, type ActionFunctionArgs, useLoaderData, useNavigate, useSearchParams, useActionData } from "react-router"
import { employeeService } from "~/services/employment-service"
import { patientService } from "~/services/patient-service"
import { saleService } from "~/services/sale-service"
import { medicineService } from "~/services/medicine-service"
import { MedicineFilter } from "~/components/medicine/medicine-filter"
import type { MedicineResponseDTO } from "~/types/medicine"
import type { CreateSaleDTO } from "~/types/sale"
import { hospitalizationService } from "~/services/hospitalization/hospitalization-service"
import { useCart } from "~/hooks/use-cart"
import { MedicineSaleCartTable } from "~/components/medicine/medicine-sale-cart"
import { CreateSaleForm } from "~/components/medicine/sale-form"
import { CartDrawer } from "~/components/cart/cart"
import { useEffect } from "react"
import { toast } from "sonner"

interface LoaderData {
  sellers: { sellerId: string; sellerName: string }[]
  buyers: { buyerId: string; buyerName: string }[]
  buyerType: "PATIENT" | "HOSPITALIZATION"
  medicines: MedicineResponseDTO[]
  searchTerm?: string
  isActive?: boolean
}

// ------------------- LOADER -------------------
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const buyerType = (url.searchParams.get("buyerType") || "PATIENT") as
    | "PATIENT"
    | "HOSPITALIZATION"

  const searchTerm = url.searchParams.get("searchTerm") || undefined
  const isActiveParam = url.searchParams.get("isActive")
  const isActive =
    isActiveParam === "true"
      ? true
      : isActiveParam === "false"
        ? false
        : undefined

  const [employees, patients, hospitalizations, medicines] = await Promise.all([
    employeeService.getAllEmployees({ isActive: true }),
    patientService.getAllPatients({}),
    buyerType !== "PATIENT" ? hospitalizationService.getAllHospitalizations({ active: true }) : Promise.resolve([]),
    medicineService.getAllMedicines({ searchTerm, isActive }),
  ])

  // Sellers
  // Filtrar empleados por código
  const filteredEmployees = employees.filter(e =>
    e.department.code === "FAR-025" || e.department.code === "ENF-025"
  )

  // Sellers
  const sellerOptions = filteredEmployees.map(e => ({
    sellerId: e.id,
    sellerName: e.fullname,
  }))

  // Buyers
  let buyerOptions: { buyerId: string; buyerName: string }[]
  if (buyerType === "PATIENT") {
    buyerOptions = patients.map(p => ({ buyerId: p.id, buyerName: p.fullName }))
  } else {
    // hospitalizations: mostrar nombre del paciente que hace match
    const patientMap = new Map(patients.map(p => [p.id, p.fullName]))
    buyerOptions = hospitalizations.map(h => ({
      buyerId: h.id,
      buyerName: patientMap.get(h.patientId) || "Desconocido",
    }))
  }

  return {
    sellers: sellerOptions,
    buyers: buyerOptions,
    buyerType,
    medicines,
    searchTerm,
    isActive,
  }
}

// ------------------- ACTION -------------------
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const sellerId = formData.get("sellerId") as string
  const buyerId = formData.get("buyerId") as string
  const buyerType = formData.get("buyerType") as string
  const items = JSON.parse(formData.get("items") as string)

  const payload: CreateSaleDTO = {
    sellerId,
    buyerId,
    buyerType,
    items: items.map((i: any) => ({
      medicineCode: i.medicineCode,
      quantity: i.quantity,
    })),
  }

  try {
    await saleService.createSale(payload)
    // Mensaje de éxito para toast
    return { success: "Venta creada correctamente" }
  } catch (error: any) {
    console.error("Error al crear venta:", error)

    // Extraer el mensaje del backend si existe
    let message = "Error al crear venta"
    if (error?.response?.detail) {
      message = error.response.detail
    } else if (error?.message) {
      message = error.message
    }

    return { error: message }
  }
}

// ------------------- COMPONENT -------------------
export default function CreateSalePage() {
  const { sellers, buyers, buyerType, medicines } =
    useLoaderData<typeof loader>()
  const actionData = useActionData() as
    | { error?: string; success?: string }
    | undefined

  const { cart } = useCart()

  // Mostrar toast según el resultado del action
useEffect(() => {
  if (actionData?.error) {
    toast.error(actionData.error)
  }
  if (actionData?.success) {
    toast.success(actionData.success)
  }
}, [actionData])


  return (
    <section className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Crear venta</h1>

      <CartDrawer />
      {/* Formulario de filtros de medicina */}
      <MedicineFilter buyerType={buyerType} />

      {/* Tabla de medicinas */}
      <MedicineSaleCartTable data={medicines} />

      {/* Formulario de venta */}
      <CreateSaleForm sellers={sellers} buyers={buyers} buyerType={buyerType} />
    </section>
  )
}
