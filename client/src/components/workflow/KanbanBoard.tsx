/**
 * KanbanBoard — Clinic workflow visualization with three columns:
 * "Waiting Room", "In Chair", and "Billing Pending".
 *
 * Uses @hello-pangea/dnd for drag-and-drop between columns.
 *
 * TODO [PHP]: On drag end, call updateWorkflowStatus() which
 * PATCHes to /api/workflow/:id on the Laravel backend.
 */
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { Clock, Armchair, Receipt, AlertTriangle, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { fetchWorkflowItems, updateWorkflowStatus } from '@/lib/api-service';
import type { WorkflowItem } from '@/lib/mock-data';

type Stage = 'waiting' | 'in-chair' | 'billing';

const columns: { id: Stage; title: string; icon: React.ElementType; color: string }[] = [
  { id: 'waiting', title: 'Waiting Room', icon: Clock, color: 'text-warning-foreground' },
  { id: 'in-chair', title: 'In Chair', icon: Armchair, color: 'text-primary' },
  { id: 'billing', title: 'Billing Pending', icon: Receipt, color: 'text-success' },
];

export function KanbanBoard() {
  const [items, setItems] = useState<WorkflowItem[]>([]);

  useEffect(() => {
    // TODO [PHP]: Replace with real API call
    fetchWorkflowItems().then(setItems);
  }, []);

  const getColumnItems = (stage: Stage) =>
    items.filter((item) => item.stage === stage);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const newStage = result.destination.droppableId as Stage;
    const itemId = result.draggableId;

    // Optimistic update
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, stage: newStage } : item))
    );

    // TODO [PHP]: This PATCHes /api/workflow/:id with the new stage
    await updateWorkflowStatus(itemId, newStage);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colItems = getColumnItems(col.id);
          return (
            <div key={col.id} className="flex flex-col">
              {/* Column header */}
              <div className="flex items-center gap-2 mb-4 px-1">
                <col.icon className={`h-5 w-5 ${col.color}`} />
                <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {colItems.length}
                </Badge>
              </div>

              {/* Droppable area */}
              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 space-y-3 rounded-2xl border-2 border-dashed p-3 min-h-[200px] transition-colors ${
                      snapshot.isDraggingOver
                        ? 'border-primary/40 bg-primary/5'
                        : 'border-border bg-muted/20'
                    }`}
                  >
                    {colItems.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(dragProvided, dragSnapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className={`rounded-xl border bg-card p-4 shadow-sm transition-shadow ${
                              dragSnapshot.isDragging ? 'shadow-lg border-primary/30' : 'border-border'
                            }`}
                          >
                            {/* Patient info */}
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-muted text-xs font-semibold text-accent-foreground">
                                  <User className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground">
                                    {item.patientName}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{item.time}</p>
                                </div>
                              </div>
                              {item.priority === 'urgent' && (
                                <Badge className="bg-destructive/10 text-destructive text-[10px]">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Urgent
                                </Badge>
                              )}
                            </div>

                            {/* Procedure */}
                            <p className="text-xs text-muted-foreground mb-2">{item.procedure}</p>

                            {/* Meta */}
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{item.dentist}</span>
                              {item.waitTime !== undefined && item.stage === 'waiting' && (
                                <span className={`font-medium ${item.waitTime > 10 ? 'text-destructive' : 'text-muted-foreground'}`}>
                                  {item.waitTime}m wait
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}