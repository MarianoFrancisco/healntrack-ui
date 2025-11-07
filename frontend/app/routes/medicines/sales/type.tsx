"use client"

import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Users, Hospital } from "lucide-react";

export default function SalesTypeSelectionPage() {
  const navigate = useNavigate();

  const handleSelect = (buyerType: "PATIENT" | "HOSPITALIZATION") => {
    navigate(`/sales/create?buyerType=${buyerType}`);
  };

  return (
    <section className="p-6 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Selecciona el tipo de venta</h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        {/* Venta a pacientes comunes */}
        <Card className="flex-1 cursor-pointer hover:shadow-lg transition" onClick={() => handleSelect("PATIENT")}>
          <CardHeader className="flex items-center gap-3">
            <Users className="h-6 w-6 text-blue-600" />
            <CardTitle>Venta a Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Para pacientes que visitan la farmacia del hospital. Aquí puedes registrar la venta de medicamentos directamente al público.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Seleccionar
            </Button>
          </CardFooter>
        </Card>

        {/* Venta a hospitalizaciones */}
        <Card className="flex-1 cursor-pointer hover:shadow-lg transition" onClick={() => handleSelect("HOSPITALIZATION")}>
          <CardHeader className="flex items-center gap-3">
            <Hospital className="h-6 w-6 text-green-600" />
            <CardTitle>Venta a Hospitalizados</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Para pacientes que se encuentran internados. Aquí puedes registrar la venta de medicamentos directamente a sus hospitalizaciones.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Seleccionar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
