import { createFileRoute } from '@tanstack/react-router';
import { FileText } from 'lucide-react';

export const Route = createFileRoute('/audit-logs')({
  head: () => ({ meta: [{ title: 'Audit Logs — SmileFlow' }] }),
  component: AuditLogsPage,
});

function AuditLogsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Audit Logs</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        View system activity and audit trail. Admin only.
      </p>
    </div>
  );
}