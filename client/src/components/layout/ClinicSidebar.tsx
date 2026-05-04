/**
 * ClinicSidebar — Persistent, collapsible sidebar for clinic staff.
 * Uses dark sidebar theme from design system tokens.
 *
 * RBAC: Navigation items are filtered by the current user's role.
 * Each nav item specifies which roles can see it.
 */
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  ClipboardList,
  Kanban,
  Settings,
  SmilePlus,
  FileText,
  UserCheck,
  Receipt,
  CreditCard,
  FileHeart,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuthStore, type UserRole } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';

/**
 * Navigation items with role-based visibility.
 * Each item lists which roles can see it.
 * The PHP backend enforces the same restrictions via middleware.
 */
interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const allNavItems: NavItem[] = [
  // Shared / Admin
  { title: 'Dashboard', url: '/', icon: LayoutDashboard, roles: ['admin', 'dentist', 'receptionist'] },
  { title: 'Patients', url: '/patients', icon: Users, roles: ['admin', 'dentist', 'receptionist'] },
  { title: 'Workflow', url: '/workflow', icon: Kanban, roles: ['admin', 'dentist', 'receptionist'] },

  // Admin only
  { title: 'User Management', url: '/user-management', icon: Users, roles: ['admin'] },
  { title: 'Clinic Settings', url: '/settings', icon: Settings, roles: ['admin'] },
  { title: 'Audit Logs', url: '/audit-logs', icon: FileText, roles: ['admin'] },

  // Dentist
  { title: 'My Appointments', url: '/my-appointments', icon: CalendarDays, roles: ['dentist'] },
  { title: 'EHR / Patient Charts', url: '/ehr', icon: ClipboardList, roles: ['dentist'] },

  // Receptionist
  { title: 'Master Calendar', url: '/calendar', icon: CalendarDays, roles: ['receptionist'] },
  { title: 'Check-in Desk', url: '/check-in', icon: UserCheck, roles: ['receptionist'] },
  { title: 'Billing', url: '/billing', icon: Receipt, roles: ['receptionist'] },

  // Patient
  { title: 'My Bookings', url: '/my-bookings', icon: CalendarDays, roles: ['patient'] },
  { title: 'Medical Records', url: '/medical-records', icon: FileHeart, roles: ['patient'] },
  { title: 'Payments', url: '/payments', icon: CreditCard, roles: ['patient'] },
];

/** Group labels based on role */
const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administration',
  dentist: 'Clinical',
  receptionist: 'Front Desk',
  patient: 'My Portal',
};

export function ClinicSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const currentPath = useRouterState({
    select: (s) => s.location.pathname,
  });
  const navigate = useNavigate();
  const { user, userRole, logout } = useAuthStore();

  /** Filter nav items to only those the current role can see */
  const visibleItems = allNavItems.filter(
    (item) => userRole && item.roles.includes(userRole)
  );

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  return (
    <Sidebar collapsible="icon">
      {/* Brand */}
      <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary">
            <SmilePlus className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-base font-semibold text-sidebar-foreground tracking-tight">
                SmileFlow
              </h1>
              <p className="text-[11px] text-sidebar-accent-foreground/60">Dental Clinic</p>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Role-filtered Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>{ROLE_LABELS[userRole || 'admin']}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer — logged-in dentist info */}
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
            {initials}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-sidebar-foreground">{user?.name || 'Guest'}</p>
              <p className="truncate text-xs text-sidebar-accent-foreground/60 capitalize">{userRole || 'Unknown'}</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}