import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Heal n Track" },
    { name: "description", content: "Bienvenido a Heal n Track!" },
  ];
}

export const handle = {
  crumb: "Inicio"
};

export default function Home() {
  return <div>Inicio</div>;
}
