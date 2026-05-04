import { createFileRoute } from '@tanstack/react-router';
import { UserCheck } from 'lucide-react';

export const Route = createFileRoute('/check-in')({
  head: () => ({ meta: [{ title: 'Check-in Desk — SmileFlow' }] }),
  component: CheckInPage,
});

function CheckInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <UserCheck className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Check-in Desk</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        Patient check-in and queue management. Receptionist view.
      </p>
    </div>
  );
}