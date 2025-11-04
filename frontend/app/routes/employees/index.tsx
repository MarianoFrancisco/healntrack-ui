import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Employees" },
    { name: "description", content: "Bienvenido a la página de empleados" },
  ];
}
export const handle = {
  crumb: "Empleados"
};

export default function EmployeesPage() {
  return <div>Empleados Page</div>;
}