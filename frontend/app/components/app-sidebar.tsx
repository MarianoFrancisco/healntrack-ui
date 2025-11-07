"use client"

import * as React from "react"
import {
  Banknote,
  Bed,
  BookOpen,
  BriefcaseBusiness,
  Hospital,
  Info,
  Pill,
  SquareUser,
  Stethoscope,
  Syringe,
  TreePalm,
  Users,
} from "lucide-react"

import { NavMain } from "~/components/nav-main"
import { NavSecondary } from "~/components/nav-secondary"
import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { Link } from "react-router"

const data = {
  user: {
    name: "sapo",
    email: "sapo@healntrack.com",
    avatar: "https://picsum.photos/400/400",
  },
  navMain: [
    {
      title: "Areas del hospital",
      url: "/departments",
      icon: Users,
      items: [
        {
          title: "Listado",
          url: "/departments",
        },
        {
          title: "Crear Area",
          url: "/departments/create",
        }
      ],
    },
    {
      title: "Empleados",
      url: "/employees",
      icon: BriefcaseBusiness,
      items: [
        {
          title: "Contratar",
          url: "/employees/hire",
        },
        {
          title: "Listado",
          url: "/employees",
        },
        {
          title: "Managers",
          url: "/employees/managers",
        },
        {
          title: "Historial laboral",
          url: "/employees/history",
        },
      ],
    },
    {
      title: "Nómina",
      url: "/payrolls",
      icon: BriefcaseBusiness,
      items: [
        {
          title: "Pagar nómina",
          url: "/payrolls/create",
        },
        {
          title: "Historial de pagos",
          url: "/payrolls",
        },
      ]
    },
    {
      title: "Vacaciones",
      url: "/vacations",
      icon: TreePalm,
      items: [
        {
          title: "Nueva solicitud",
          url: "/vacations/create",
        },
        {
          title: "Listado de solicitudes",
          url: "/vacations",
        },
        {
          title: "Configuración",
          url: "/vacations/conf",
        },
      ],
    },
    {
      title: "Pacientes",
      url: "/patients",
      icon: SquareUser,
      items: [
        {
          title: "Nuevo paciente",
          url: "/patients/create",
        },
        {
          title: "Listado de pacientes",
          url: "/patients",
        },
      ],
    },
    {
      title: "Consultas Médicas",
      url: "/consultations",
      icon: Stethoscope,
      items: [
        {
          title: "Nueva consulta",
          url: "/consultations/create",
        },
        {
          title: "Historial de consultas",
          url: "/consultations",
        },
      ],
    },
    {
      title: "Medicamentos",
      url: "/medicines",
      icon: Pill,
      items: [
        {
          title: "Nuevo medicamento",
          url: "/medicines/create",
        },
        {
          title: "Catálogo de medicamentos",
          url: "/medicines",
        },
        {
          title: "Lotes de medicamentos",
          url: "/medicines/batches",
        },
      ],
    },
    {
      title: "Ventas Farmacia",
      url: "/sales",
      icon: Banknote,
      items: [
        {
          title: "Nueva venta",
          url: "/sales/type",
        },
      ],
    },
    {
      title: "Habitaciones",
      url: "/rooms",
      icon: Bed,
      items: [
        {
          title: "Nueva habitación",
          url: "/rooms/create",
        },
        {
          title: "Listado",
          url: "/rooms",
        },
      ],
    },
    {
      title: "Hospitalizaciones",
      url: "/hospitalizations",
      icon: Hospital,
      items: [
        {
          title: "Nueva hospitalización",
          url: "/hospitalizations/create",
        },
        {
          title: "Listado",
          url: "/hospitalizations",
        },
      ],
    },
    {
      title: "Cirugías",
      url: "/surgery-prices",
      icon: Syringe,
      items: [
        {
          title: "Nueva cirugía",
          url: "/surgery-prices/create",
        },
        {
          title: "Listado",
          url: "/surgery-prices",
        },
      ],
    }
  ],
  navSecondary: [
    {
      title: "Acerca de",
      url: "/about",
      icon: Info,
    },
    {
      title: "Documentación",
      url: "#",
      icon: BookOpen,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="flex items-center gap-3">
                <div className="flex items-center justify-center">
                  <img
                    src="/logo.svg"
                    alt="Heal n Track Logo"
                    className="h-10 w-10 rounded-lg object-contain"
                  />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-base font-semibold">Heal n Track</span>
                  <span className="truncate text-sm text-muted-foreground">Hospital</span>
                </div>
              </Link>

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
