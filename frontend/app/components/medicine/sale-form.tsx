"use client"

import { useFetcher } from "react-router"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option"
import { useCart } from "~/hooks/use-cart"

interface CreateSaleFormProps {
  sellers: { sellerId: string; sellerName: string }[]
  buyers: { buyerId: string; buyerName: string }[]
  buyerType: "HOSPITALIZATION" | "PATIENT"
}

export function CreateSaleForm({ sellers, buyers, buyerType }: CreateSaleFormProps) {
  const fetcher = useFetcher()
  const { cart } = useCart()

  const sellerOptions: ComboboxOption[] = sellers.map(s => ({
    value: s.sellerId,
    label: s.sellerName,
  }))

  const buyerOptions: ComboboxOption[] = buyers.map(b => ({
    value: b.buyerId,
    label: b.buyerName,
  }))

  const [selectedSeller, setSelectedSeller] = useState<string>(sellerOptions[0]?.value || "")
  const [selectedBuyer, setSelectedBuyer] = useState<string>(buyerOptions[0]?.value || "")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (cart.length === 0) {
      alert("El carrito está vacío")
      return
    }

    const items = cart.map(item => ({
      medicineCode: item.medicineCode,
      quantity: item.quantity,
    }))

    const formData = new FormData()
    formData.append("sellerId", selectedSeller)
    formData.append("buyerId", selectedBuyer)
    formData.append("buyerType", buyerType)
    formData.append("items", JSON.stringify(items))

    fetcher.submit(formData, {
      method: "POST",
      action: "/sales/create",
    })
  }

  return (
    <fetcher.Form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Selector de seller */}
        <div className="flex-1">
          <label className="block font-semibold mb-1">Vendedor</label>
          <input type="hidden" name="sellerId" value={selectedSeller} />
          <Combobox
            options={sellerOptions}
            value={selectedSeller}
            onChange={setSelectedSeller}
            placeholder="Seleccionar vendedor"
          />
        </div>

        {/* Selector de buyer */}
        <div className="flex-1">
          <label className="block font-semibold mb-1">Comprador</label>
          <input type="hidden" name="buyerId" value={selectedBuyer} />
          <Combobox
            options={buyerOptions}
            value={selectedBuyer}
            onChange={setSelectedBuyer}
            placeholder="Seleccionar comprador"
          />
        </div>

        {/* Input hidden de buyerType */}
        <input type="hidden" name="buyerType" value={buyerType} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={cart.length === 0}>
          Crear venta
        </Button>
      </div>
    </fetcher.Form>
  )
}
