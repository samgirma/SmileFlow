import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [{ title: "Settings — SmileFlow" }],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <Settings className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Clinic Settings</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        Clinic configuration, staff management, and integrations will be available here.
      </p>
    </div>
  );
}