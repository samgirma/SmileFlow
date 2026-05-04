import { createFileRoute } from '@tanstack/react-router';
import { Receipt } from 'lucide-react';

export const Route = createFileRoute('/billing')({
  head: () => ({ meta: [{ title: 'Billing — SmileFlow' }] }),
  component: BillingPage,
});

function BillingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <Receipt className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Billing</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        Invoice management and payment processing. Receptionist view.
      </p>
    </div>
  );
}