import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contratar empleado" },
    { name: "description", content: "Bienvenido a la página de contratación de empleados" },
  ];
}
export const handle = {
  crumb: "Contratar"
};

export default function HireEmployeePage() {
  return <div>Contratación de empleados</div>;
}