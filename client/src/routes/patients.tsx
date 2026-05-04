import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { fetchPatients } from "@/lib/api-service";
import type { Patient } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/patients")({
  head: () => ({
    meta: [
      { title: "Patients — SmileFlow" },
      { name: "description", content: "Patient directory and records." },
    ],
  }),
  component: PatientsPage,
});

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success",
  inactive: "bg-muted text-muted-foreground",
  new: "bg-primary/10 text-primary",
};

function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients().then(setPatients);
  }, []);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Patients</h1>
          <p className="text-sm text-muted-foreground mt-1">{patients.length} registered patients</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Filter patients..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((patient) => (
          <div key={patient.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-muted text-sm font-semibold text-accent-foreground">
                  {patient.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{patient.name}</h3>
                  <p className="text-xs text-muted-foreground">{patient.insuranceProvider}</p>
                </div>
              </div>
              <Badge variant="secondary" className={statusStyles[patient.status]}>
                {patient.status}
              </Badge>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> {patient.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" /> {patient.phone}
              </div>
            </div>
            {patient.nextAppointment && (
              <p className="mt-3 text-xs text-primary font-medium">
                Next: {patient.nextAppointment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}