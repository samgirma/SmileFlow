/**
 * Unauthorized — "Access Denied" page shown when a user tries to
 * access a page their role does not permit.
 */
import { createFileRoute, Link } from '@tanstack/react-router';
import { ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/unauthorized')({
  head: () => ({
    meta: [{ title: 'Access Denied — SmileFlow' }],
  }),
  component: UnauthorizedPage,
});

function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 mb-4">
        <ShieldX className="h-8 w-8 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        You don't have permission to view this page. Contact your clinic administrator
        if you believe this is an error.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild variant="outline">
          <Link to="/">Go to Dashboard</Link>
        </Button>
        <Button asChild>
          <Link to="/login">Switch Account</Link>
        </Button>
      </div>
    </div>
  );
}