import { Form, useNavigate, useSearchParams } from "react-router"
import { Label } from "~/components/ui/label"
import { Button } from "~/components/ui/button"
import { CalendarSearch } from "lucide-react"
import { DatePicker } from "~/components/common/date-picker"
import { useState } from "react"
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select"

interface SaleFilterProps {
  sellers: { sellerId: string; sellerName: string }[]
}

export function SaleFilter({ sellers }: SaleFilterProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Fecha inicial y final
  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    searchParams.get("occurredFrom") ? new Date(Number(searchParams.get("occurredFrom"))) : undefined
  )
  const [dateTo, setDateTo] = useState<Date | undefined>(
    searchParams.get("occurredTo") ? new Date(Number(searchParams.get("occurredTo"))) : undefined
  )

  // Combobox vendedor
  const [sellerId, setSellerId] = useState(searchParams.get("sellerId") ?? "")

  const sellerOptions: ComboboxOption[] = [
    { value: "", label: "Todos los vendedores" },
    ...sellers.map((s) => ({ value: s.sellerId, label: s.sellerName })),
  ]

  return (
    <Form
      method="get"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4 border rounded-lg bg-card shadow-sm"
    >
      {/* Vendedor */}
      <div className="grid gap-1">
        <Label htmlFor="sellerId">Vendedor</Label>
        <Combobox options={sellerOptions} value={sellerId} onChange={setSellerId} className="w-full" />
        <input type="hidden" name="sellerId" value={sellerId} />
      </div>

      {/* Estado */}
      <div className="grid gap-1">
        <Label htmlFor="status">Estado</Label>
        <Select name="status" defaultValue={searchParams.get("status") ?? "all"}>
          <SelectTrigger id="status" className="w-full">
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="OPEN">Abierta</SelectItem>
            <SelectItem value="COMPLETED">Completada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Fecha desde */}
      <div className="grid gap-1">
        <Label htmlFor="occurredFrom">Fecha desde</Label>
        <DatePicker value={dateFrom} onChange={setDateFrom} placeholder="Desde" />
        <input
          type="hidden"
          name="occurredFrom"
          value={dateFrom ? dateFrom.getTime().toString() : ""}
        />
      </div>

      {/* Fecha hasta */}
      <div className="grid gap-1">
        <Label htmlFor="occurredTo">Fecha hasta</Label>
        <DatePicker value={dateTo} onChange={setDateTo} placeholder="Hasta" />
        <input
          type="hidden"
          name="occurredTo"
          value={dateTo ? dateTo.getTime().toString() : ""}
        />
      </div>

      {/* Botones */}
      <div className="sm:col-span-2 lg:col-span-2 xl:col-span-6 flex justify-end gap-3 mt-2">
        <Button type="submit" className="flex items-center gap-2">
          <CalendarSearch className="h-4 w-4" />
          Buscar
        </Button>
        <Button type="reset" variant="outline" onClick={() => navigate("/sales")}>
          Limpiar
        </Button>
      </div>
    </Form>
  )
}
