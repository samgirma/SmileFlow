import { createFileRoute } from '@tanstack/react-router';
import { ClipboardList } from 'lucide-react';

export const Route = createFileRoute('/ehr')({
  head: () => ({ meta: [{ title: 'EHR / Patient Charts — SmileFlow' }] }),
  component: EhrPage,
});

function EhrPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <ClipboardList className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">EHR / Patient Charts</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        Electronic health records and patient chart management. Dentist view.
      </p>
    </div>
  );
}