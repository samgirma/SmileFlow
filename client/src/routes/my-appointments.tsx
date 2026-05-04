import { createFileRoute } from '@tanstack/react-router';
import { CalendarDays } from 'lucide-react';

export const Route = createFileRoute('/my-appointments')({
  head: () => ({ meta: [{ title: 'My Appointments — SmileFlow' }] }),
  component: MyAppointmentsPage,
});

function MyAppointmentsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <CalendarDays className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">My Appointments</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        View and manage your scheduled appointments. Dentist view.
      </p>
    </div>
  );
}