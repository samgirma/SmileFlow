import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ClinicSidebar } from "@/components/layout/ClinicSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { useAuthStore, type UserRole } from "@/lib/auth-store";
import { useNavigate, useRouterState } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * =============================================================
 * Route-level RBAC configuration
 * =============================================================
 *
 * Maps each route path to the roles allowed to access it.
 * Routes not listed here are accessible to any authenticated user.
 *
 * TODO [PHP]: This is a UX-only guard. The PHP backend MUST enforce
 * the same permissions via middleware. If the backend returns 403
 * Forbidden, the Axios interceptor should redirect to /unauthorized.
 * =============================================================
 */
const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  '/user-management': ['admin'],
  '/settings': ['admin'],
  '/audit-logs': ['admin'],
  '/my-appointments': ['dentist'],
  '/ehr': ['dentist'],
  '/check-in': ['receptionist'],
  '/billing': ['receptionist'],
  '/my-bookings': ['patient'],
  '/medical-records': ['patient'],
  '/payments': ['patient'],
};

/** Public routes that don't require authentication */
const PUBLIC_ROUTES = ['/login', '/unauthorized'];

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SmileFlow — Dental Clinic Management" },
      { name: "description", content: "Integrated patient portal and clinical workflow automation for modern dental practices." },
      { name: "author", content: "SmileFlow" },
      { property: "og:title", content: "SmileFlow — Dental Clinic Management" },
      { property: "og:description", content: "Integrated patient portal and clinical workflow automation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { isAuthenticated, userRole, isLoading, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  // Restore session from localStorage on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Auth & RBAC guard
  useEffect(() => {
    if (isLoading) return;

    const isPublic = PUBLIC_ROUTES.includes(currentPath);

    // Redirect unauthenticated users to /login
    if (!isAuthenticated && !isPublic) {
      navigate({ to: '/login' });
      return;
    }

    // Redirect authenticated users away from /login
    if (isAuthenticated && currentPath === '/login') {
      navigate({ to: '/' });
      return;
    }

    // Check role-based access
    if (isAuthenticated && userRole) {
      const allowedRoles = ROUTE_PERMISSIONS[currentPath];
      if (allowedRoles && !allowedRoles.includes(userRole)) {
        navigate({ to: '/unauthorized' });
      }
    }
  }, [isLoading, isAuthenticated, userRole, currentPath, navigate]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Public pages (login, unauthorized) render without sidebar
  if (PUBLIC_ROUTES.includes(currentPath)) {
    return (
      <main className="min-h-screen bg-background">
        <Outlet />
      </main>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ClinicSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
