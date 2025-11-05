"use client"

import * as React from "react"
import {
  BookOpen,
  BriefcaseBusiness,
  Info,
  Pill,
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
      isActive: true,
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
      isActive: true,
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
        {
          title: "Pago de nómina",
          url: "/employees/payroll/create",
        },
        {
          title: "Historial de pagos",
          url: "/employees/payroll/history",
        }
      ],
    },
    {
      title: "Vacaciones",
      url: "/employees/vacations",
      icon: TreePalm,
      items: [
        {
          title: "Nueva solicitud",
          url: "/employees/vacations/create",
        },
        {
          title: "Listado de solicitudes",
          url: "/employees/vacations",
        },
        {
          title: "Configuración",
          url: "/employees/conf",
        },
      ],
    },
    {
      title: "Farmacia",
      url: "#",
      icon: Pill,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
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
