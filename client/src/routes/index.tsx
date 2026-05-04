import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PatientStatusCard } from "@/components/dashboard/PatientStatusCard";
import { TreatmentPlanView } from "@/components/dashboard/TreatmentPlanView";
import { LandingPage } from "@/components/landing/LandingPage";
import { fetchAppointments, fetchTreatmentPlans } from "@/lib/api-service";
import type { Appointment, TreatmentPlan } from "@/lib/mock-data";
import { Users, CalendarCheck, Clock, TrendingUp } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmileFlow — Premium Dental Care" },
      { name: "description", content: "Transform your smile with world-class dental care. From routine check-ups to advanced cosmetic procedures." },
    ],
  }),
  component: Index,
});

/**
 * Stat card atom — simple metric display for the top row.
 */
function StatCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-muted">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
      {trend && (
        <p className="mt-1 text-xs text-primary flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> {trend}
        </p>
      )}
    </div>
  );
}

function Index() {
  const user = useAuthStore((s) => s.user);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([]);

  useEffect(() => {
    // Only fetch dashboard data if user is authenticated
    if (user) {
      // TODO [PHP]: Replace with real API calls
      fetchAppointments().then(setAppointments);
      fetchTreatmentPlans().then(setTreatmentPlans);
    }
  }, [user]);

  // Show landing page for unauthenticated users
  if (!user) {
    return <LandingPage />;
  }

  // Show dashboard for authenticated users
  const todayAppointments = appointments.filter(
    (a) => a.date === "2026-05-04"
  );

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Command Center
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monday, May 4, 2026 · Today&apos;s overview
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Today's Patients"
          value={String(todayAppointments.length)}
          icon={Users}
          trend="+12% vs last week"
        />
        <StatCard
          label="Appointments"
          value={String(appointments.length)}
          icon={CalendarCheck}
        />
        <StatCard
          label="Avg. Wait Time"
          value="8 min"
          icon={Clock}
          trend="Down 3 min"
        />
        <StatCard
          label="Revenue Today"
          value="$4,280"
          icon={TrendingUp}
          trend="+8% vs yesterday"
        />
      </div>

      {/* Two-column layout: Patient Cards + Treatment Plans */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Patient status cards — 3 columns */}
        <div className="xl:col-span-3 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Today&apos;s Patients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayAppointments.map((apt) => (
              <PatientStatusCard key={apt.id} appointment={apt} />
            ))}
          </div>
        </div>

        {/* Treatment Plans — 2 columns */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Active Treatment Plans
          </h2>
          <TreatmentPlanView plans={treatmentPlans} />
        </div>
      </div>
    </div>
  );
}
