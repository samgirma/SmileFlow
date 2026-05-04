/**
 * PatientStatusCard — Real-time patient status card for the Command Center.
 * Shows patient info, current appointment, and quick actions.
 */
import { Clock, Phone, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Appointment } from '@/lib/mock-data';

interface PatientStatusCardProps {
  appointment: Appointment;
}

const statusColors: Record<string, string> = {
  scheduled: 'bg-muted text-muted-foreground',
  confirmed: 'bg-teal-muted text-accent-foreground',
  'in-progress': 'bg-primary text-primary-foreground',
  completed: 'bg-success text-success-foreground',
  cancelled: 'bg-destructive/10 text-destructive',
};

const typeLabels: Record<string, string> = {
  cleaning: 'Cleaning',
  filling: 'Filling',
  extraction: 'Extraction',
  consultation: 'Consult',
  'root-canal': 'Root Canal',
  crown: 'Crown',
};

export function PatientStatusCard({ appointment }: PatientStatusCardProps) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      {/* Status badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar placeholder */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-muted text-sm font-semibold text-accent-foreground">
            {appointment.patientName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{appointment.patientName}</h3>
            <p className="text-xs text-muted-foreground">{appointment.dentist}</p>
          </div>
        </div>
        <Badge className={statusColors[appointment.status] || ''} variant="secondary">
          {appointment.status.replace('-', ' ')}
        </Badge>
      </div>

      {/* Details */}
      <div className="space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <FileText className="h-3.5 w-3.5" />
          <span>{typeLabels[appointment.type] || appointment.type}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          <span>{appointment.time} · {appointment.duration} min</span>
        </div>
      </div>

      {/* Quick actions (visible on hover) */}
      <div className="mt-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent">
          <Phone className="h-3 w-3" /> Call
        </button>
        <button className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20">
          <FileText className="h-3 w-3" /> Chart
        </button>
      </div>
    </div>
  );
}