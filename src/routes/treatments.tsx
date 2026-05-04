import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { TreatmentPlanView } from "@/components/dashboard/TreatmentPlanView";
import { fetchTreatmentPlans } from "@/lib/api-service";
import type { TreatmentPlan } from "@/lib/mock-data";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [{ title: "Treatment Plans — SmileFlow" }],
  }),
  component: TreatmentsPage,
});

function TreatmentsPage() {
  const [plans, setPlans] = useState<TreatmentPlan[]>([]);

  useEffect(() => {
    fetchTreatmentPlans().then(setPlans);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Treatment Plans</h1>
        <p className="text-sm text-muted-foreground mt-1">All active and completed treatment plans</p>
      </div>
      <TreatmentPlanView plans={plans} />
    </div>
  );
}