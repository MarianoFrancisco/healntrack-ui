// components/breadcrumbs.tsx
import { Link, useMatches, type UIMatch } from "react-router";
import type { BreadcrumbHandle } from "types/breadcrumb";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

export function AppBreadcrumbs() {
    const matches = useMatches() as UIMatch<unknown, BreadcrumbHandle>[];

    const crumbs = matches
        .filter((m) => m.handle?.crumb)
        .map((m) => {
            const label =
                typeof m.handle!.crumb === "function"
                    ? m.handle!.crumb(m)
                    : m.handle!.crumb;

            return { label, to: m.pathname };
        });

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {crumbs.map((crumb, i) => {
                    const isLast = i === crumbs.length - 1;
                    return (
                        <BreadcrumbItem key={crumb.to}>
                            {isLast ? (
                                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                            ) : (
                                <>
                                    <BreadcrumbLink asChild>
                                        <Link to={crumb.to}>{crumb.label}</Link>
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                </>
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}