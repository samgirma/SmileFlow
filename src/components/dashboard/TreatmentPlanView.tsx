/**
 * TreatmentPlanView — Displays treatment plans with procedure details,
 * costs, and insurance coverage breakdown.
 *
 * TODO [PHP]: Data comes from GET /api/treatment-plans/:patientId
 */
import { CheckCircle2, Clock, AlertCircle, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { TreatmentPlan } from '@/lib/mock-data';

interface TreatmentPlanViewProps {
  plans: TreatmentPlan[];
}

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Done' },
  approved: { icon: Clock, color: 'text-primary', bg: 'bg-primary/10', label: 'Approved' },
  pending: { icon: AlertCircle, color: 'text-warning-foreground', bg: 'bg-warning/20', label: 'Pending' },
};

export function TreatmentPlanView({ plans }: TreatmentPlanViewProps) {
  return (
    <div className="space-y-6">
      {plans.map((plan) => (
        <div key={plan.id} className="rounded-2xl border border-border bg-card overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{plan.patientName}</h3>
              <p className="text-xs text-muted-foreground">Created {plan.createdAt}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                <DollarSign className="h-4 w-4" />
                {plan.totalCost.toLocaleString()}
              </div>
              <p className="text-xs text-primary">
                Insurance covers ${plan.insuranceCoverage.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Procedures list */}
          <div className="divide-y divide-border">
            {plan.procedures.map((proc, i) => {
              const config = statusConfig[proc.status];
              const Icon = config.icon;
              return (
                <div key={i} className="flex items-center gap-4 px-6 py-3.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.bg}`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{proc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Tooth {proc.tooth}
                      {proc.date && ` · ${proc.date}`}
                    </p>
                  </div>
                  <Badge variant="secondary" className={config.bg}>
                    <span className={config.color}>{config.label}</span>
                  </Badge>
                  <span className="text-sm font-medium text-foreground tabular-nums">
                    ${proc.cost}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer summary */}
          <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-3">
            <span className="text-xs text-muted-foreground">
              Patient responsibility
            </span>
            <span className="text-sm font-bold text-foreground">
              ${(plan.totalCost - plan.insuranceCoverage).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}