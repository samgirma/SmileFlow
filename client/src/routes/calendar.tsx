import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [{ title: "Calendar — SmileFlow" }],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-muted mb-4">
        <CalendarDays className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Smart Calendar</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        High-performance scheduling with drag-and-drop time slots.
        This view will be built in the next iteration.
      </p>
    </div>
  );
}