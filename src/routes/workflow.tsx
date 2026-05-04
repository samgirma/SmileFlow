/**
 * Workflow page — Kanban-style board for clinic patient flow.
 * Shows Waiting Room → In Chair → Billing Pending.
 */
import { createFileRoute } from "@tanstack/react-router";
import { KanbanBoard } from "@/components/workflow/KanbanBoard";

export const Route = createFileRoute("/workflow")({
  head: () => ({
    meta: [
      { title: "Workflow — SmileFlow" },
      { name: "description", content: "Manage patient flow through the clinic with drag-and-drop workflow board." },
    ],
  }),
  component: WorkflowPage,
});

function WorkflowPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Clinic Workflow
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Drag patients between stages to update their status
        </p>
      </div>
      <KanbanBoard />
    </div>
  );
}