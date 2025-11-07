"use client";
import { useFetcher, useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { Combobox, type ComboboxOption } from "~/components/common/combobox-option";
import { useCart } from "~/hooks/use-cart";
import { toast } from "sonner";

interface CreateSaleFormProps {
  sellers: { sellerId: string; sellerName: string }[];
  buyers: { buyerId: string; buyerName: string }[];
  buyerType: "HOSPITALIZATION" | "PATIENT";
  redirectTo?: string;
}

export function CreateSaleForm({ sellers, buyers, buyerType, redirectTo = "/sales" }: CreateSaleFormProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (fetcher.state !== "idle") return;

    const data = fetcher.data as any;
    if (!data) return;

    if (data.error) {
      setErrorMessage(data.error);
      toast.error(data.error);
    } else if (data.success) {
      toast.success(data.success);
      clearCart();
      setErrorMessage(null);

      navigate(redirectTo);
    }
  }, [fetcher.state, fetcher.data, clearCart, navigate, redirectTo]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cart.length === 0) {
      const msg = "El carrito está vacío";
      setErrorMessage(msg);
      toast.error(msg);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block font-semibold mb-1">Vendedor</label>
          <input type="hidden" name="sellerId" value={selectedSeller} />
          <Combobox options={sellerOptions} value={selectedSeller} onChange={setSelectedSeller} placeholder="Seleccionar vendedor" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Comprador</label>
          <input type="hidden" name="buyerId" value={selectedBuyer} />
          <Combobox options={buyerOptions} value={selectedBuyer} onChange={setSelectedBuyer} placeholder="Seleccionar comprador" />
        </div>

        <input type="hidden" name="buyerType" value={buyerType} />

        <div className="flex items-center justify-between gap-4">
          <div className="text-right md:text-left">
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-xl font-bold">
              {total.toLocaleString("es-GT", { style: "currency", currency: "GTQ" })}
            </div>
          </div>
          <Button type="submit" disabled={cart.length === 0 || fetcher.state === "submitting"}>
            {fetcher.state === "submitting" ? "Creando..." : "Crear venta"}
          </Button>
        </div>
      </div>
    </fetcher.Form>
  );
}
