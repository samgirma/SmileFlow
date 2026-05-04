/**
 * HasPermission — Component-level RBAC gate.
 *
 * Wraps UI elements that should only be visible to specific roles.
 * This is a UX convenience — the PHP backend MUST enforce the same
 * permission checks server-side via middleware.
 *
 * Usage:
 *   <HasPermission roles={['admin', 'dentist']}>
 *     <Button variant="destructive">Delete Record</Button>
 *   </HasPermission>
 */
import type { ReactNode } from 'react';
import { useAuthStore, type UserRole } from '@/lib/auth-store';

interface HasPermissionProps {
  /** Roles allowed to see the children */
  roles: UserRole[];
  /** Content rendered when the user has the required role */
  children: ReactNode;
  /** Optional fallback when the user lacks permission */
  fallback?: ReactNode;
}

export function HasPermission({ roles, children, fallback = null }: HasPermissionProps) {
  const userRole = useAuthStore((s) => s.userRole);

  if (!userRole || !roles.includes(userRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}