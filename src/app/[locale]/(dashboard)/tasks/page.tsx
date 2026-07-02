"use client";

import { useTasks } from "@/hooks/use-tasks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableSkeleton } from "@/components/shared/page-skeleton";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { Plus, GripVertical, ListTodo, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import type { TaskStatus } from "@/types";
import { cn } from "@/lib/utils";

const columns: { id: TaskStatus; label: string; icon: React.ReactNode }[] = [
  { id: "todo", label: "À faire", icon: <ListTodo className="h-4 w-4" /> },
  { id: "in_progress", label: "En cours", icon: <Clock className="h-4 w-4" /> },
  { id: "review", label: "Révision", icon: <AlertCircle className="h-4 w-4" /> },
  { id: "done", label: "Terminé", icon: <CheckCircle2 className="h-4 w-4" /> },
];

const priorityColors: Record<string, string> = {
  low: "bg-muted/20 text-muted-foreground",
  medium: "bg-warning/10 text-warning",
  high: "bg-destructive/10 text-destructive",
};

export default function TasksPage() {
  const { data: tasks, isLoading, refetch, updateTaskStatus } = useTasks();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      title: form.get("title") as string,
      description: form.get("description") as string,
      priority: (form.get("priority") as string) ?? "medium",
      assigneeName: "Moi",
    };
    try {
      const res = await fetch("/api/mock/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast.success("Tâche créée");
      setOpen(false);
      refetch();
    } catch {
      toast.error("Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      toast.success("Tâche déplacée");
    } catch {
      toast.error("Erreur");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Tâches</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gérez vos tâches par statut</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nouvelle tâche
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle tâche</DialogTitle>
              <DialogDescription>Ajoutez une tâche à votre tableau</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input id="title" name="title" placeholder="Préparer les conclusions" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" placeholder="Description optionnelle" />
              </div>
              <div className="space-y-2">
                <Label>Priorité</Label>
                <Select name="priority" defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Basse</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="high">Haute</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Création..." : "Créer la tâche"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <TableSkeleton rows={6} />
        ) : (
          <div className="grid gap-4 overflow-x-auto sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => {
              const columnTasks = tasks.filter((t) => t.status === col.id);
              return (
                <div
                  key={col.id}
                  className="rounded-xl border bg-card/50 p-4"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const taskId = e.dataTransfer.getData("text/task-id");
                    if (taskId) handleDrop(taskId, col.id);
                  }}
                >
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    {col.icon}
                    {col.label}
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {columnTasks.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {columnTasks.map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("text/task-id", task.id)}
                        className="cursor-grab rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md active:cursor-grabbing"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium">{task.title}</p>
                          <Badge className={cn("text-[10px]", priorityColors[task.priority])}>
                            {task.priority === "high" ? "Haute" : task.priority === "medium" ? "Moyenne" : "Basse"}
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{task.assigneeName}</p>
                        {task.dueDate && (
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {format(task.dueDate, "dd/MM", { locale: fr })}
                          </p>
                        )}
                      </div>
                    ))}
                    {columnTasks.length === 0 && (
                      <p className="py-4 text-center text-xs text-muted-foreground">Aucune tâche</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
