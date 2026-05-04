import { createFileRoute } from '@tanstack/react-router';
import { CreditCard } from 'lucide-react';

export const Route = createFileRoute('/payments')({
  head: () => ({ meta: [{ title: 'Payments — SmileFlow' }] }),
  component: PaymentsPage,
});

function PaymentsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <CreditCard className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Payments</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        View payment history and outstanding balances. Patient view.
      </p>
    </div>
  );
}