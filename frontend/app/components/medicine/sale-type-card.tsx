"use client"
import type { ReactNode } from "react";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface SaleTypeCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  buyerType: "PATIENT" | "HOSPITALIZATION";
}

export function SaleTypeCard({ title, description, icon, buyerType }: SaleTypeCardProps) {
  return (
    <Card className="flex-1 hover:shadow-lg transition">
      <CardHeader className="flex items-center gap-3">
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Form method="get">
          <input type="hidden" name="buyerType" value={buyerType} />
          <Button type="submit" variant="outline" className="w-full">
            Seleccionar
          </Button>
        </Form>
      </CardFooter>
    </Card>
  );
}
