import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    layout("layouts/sidebar.tsx", [
        index("routes/home.tsx"),
        route("about", "routes/about.tsx"),

        ...prefix("employees", [
            index("routes/employees/index.tsx"),
            route("hire", "routes/employees/hire.tsx"),
            route(":cui/terminate", "routes/employees/terminate.tsx"),
            route(":cui/rehire", "routes/employees/rehire.tsx"),
            route(":cui/reward", "routes/employees/reward.tsx"),
            route("history", "routes/employees/history.tsx"),
            route("managers", "routes/employees/managers.tsx"),
        ]),

        ...prefix("vacations", [
            index("routes/vacations/index.tsx"),
            route("create", "routes/vacations/create.tsx"),
            route("conf", "routes/vacations/conf.tsx"),
            route(":id/review", "routes/vacations/review.tsx"),
        ]),

        ...prefix("payrolls", [
            index("routes/payrolls/index.tsx"),
            route("create", "routes/payrolls/create.tsx"),
        ]),

        ...prefix("departments", [
            index("routes/departments/index.tsx"),
            route("create", "routes/departments/create.tsx"),
            route(":id/edit", "routes/departments/edit.tsx"),
            route(":id/deactivate", "routes/departments/deactivate.tsx")
        ]),

        ...prefix("patients", [
            index("routes/patients/index.tsx"),
            route("create", "routes/patients/create.tsx"),
            route(":id/edit", "routes/patients/edit.tsx"),
        ]),

        ...prefix("consultations", [
            index("routes/consultations/index.tsx"),
            route("create", "routes/consultations/create.tsx"),

        ]),
    ]),
] satisfies RouteConfig;
