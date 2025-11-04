import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contratar empleado" },
    { name: "description", content: "Bienvenido a la página de contratación de empleados" },
  ];
}
export const handle = {
  crumb: "Editar"
};

export default function EditEmployeePage() {
  return <div>Edición de empleados</div>;
}