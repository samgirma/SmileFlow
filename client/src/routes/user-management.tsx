import { createFileRoute } from '@tanstack/react-router';
import { Users } from 'lucide-react';

export const Route = createFileRoute('/user-management')({
  head: () => ({ meta: [{ title: 'User Management — SmileFlow' }] }),
  component: UserManagementPage,
});

function UserManagementPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <Users className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">User Management</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        Manage staff accounts, roles, and permissions. Admin only.
      </p>
    </div>
  );
}