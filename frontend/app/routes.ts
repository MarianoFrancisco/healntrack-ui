import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    layout("layouts/sidebar.tsx", [
        index("routes/home.tsx"),
        route("about", "routes/about.tsx"),

        ...prefix("employees", [
            index("routes/employees/index.tsx"),
            route("create", "routes/employees/create.tsx"),
            route("edit", "routes/employees/edit.tsx"),
        ]),
    ]),
] satisfies RouteConfig;
