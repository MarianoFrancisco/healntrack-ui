"use client";
import { useFetcher } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option";
import { useCart } from "~/hooks/use-cart";
import { toast } from "sonner";

interface CreateSaleFormProps {
  sellers: { sellerId: string; sellerName: string }[];
  buyers: { buyerId: string; buyerName: string }[];
  buyerType: "HOSPITALIZATION" | "PATIENT";
}

export function CreateSaleForm({ sellers, buyers, buyerType }: CreateSaleFormProps) {
  const fetcher = useFetcher();
  const { cart, clearCart, total } = useCart();

  const sellerOptions: ComboboxOption[] = useMemo(
    () => sellers.map((s) => ({ value: s.sellerId, label: s.sellerName })),
    [sellers]
  );
  const buyerOptions: ComboboxOption[] = useMemo(
    () => buyers.map((b) => ({ value: b.buyerId, label: b.buyerName })),
    [buyers]
  );

  const [selectedSeller, setSelectedSeller] = useState<string>(sellerOptions[0]?.value || "");
  const [selectedBuyer, setSelectedBuyer] = useState<string>(buyerOptions[0]?.value || "");

  useEffect(() => {
    if (fetcher.state !== "idle") return;
    const wasSubmitted = !!fetcher.formData;
    const ok =
      (fetcher.data as any)?.success === true ||
      (fetcher.data as any)?.status === "OK" ||
      (fetcher.data as any)?.ok === true;
    if (wasSubmitted && ok) {
      toast.success("Venta creada");
      clearCart();
    }
  }, [fetcher.state, fetcher.data, fetcher.formData, clearCart]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cart.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }
    const items = cart.map((item) => ({ medicineCode: item.medicineCode, quantity: item.quantity }));
    const formData = new FormData();
    formData.append("sellerId", selectedSeller);
    formData.append("buyerId", selectedBuyer);
    formData.append("buyerType", buyerType);
    formData.append("items", JSON.stringify(items));
    fetcher.submit(formData, { method: "POST", action: "/sales/create" });
  };

  return (
    <fetcher.Form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Vendedor</label>
          <input type="hidden" name="sellerId" value={selectedSeller} />
          <Combobox options={sellerOptions} value={selectedSeller} onChange={setSelectedSeller} placeholder="Seleccionar vendedor" />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Comprador</label>
          <input type="hidden" name="buyerId" value={selectedBuyer} />
          <Combobox options={buyerOptions} value={selectedBuyer} onChange={setSelectedBuyer} placeholder="Seleccionar comprador" />
        </div>
        <input type="hidden" name="buyerType" value={buyerType} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Total: {total.toLocaleString("es-GT", { style: "currency", currency: "GTQ" })}</span>
        <Button type="submit" disabled={cart.length === 0 || fetcher.state === "submitting"}>
          {fetcher.state === "submitting" ? "Creando..." : "Crear venta"}
        </Button>
      </div>
    </fetcher.Form>
  );
}
