import { createFileRoute } from '@tanstack/react-router';
import { FileHeart } from 'lucide-react';

export const Route = createFileRoute('/medical-records')({
  head: () => ({ meta: [{ title: 'Medical Records — SmileFlow' }] }),
  component: MedicalRecordsPage,
});

function MedicalRecordsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <FileHeart className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Medical Records</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        Access your dental records and treatment history. Patient view.
      </p>
    </div>
  );
}