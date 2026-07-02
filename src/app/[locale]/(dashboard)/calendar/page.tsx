"use client";

import { useCalendarEvents } from "@/hooks/use-calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageSkeleton } from "@/components/shared/page-skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { Plus, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

export default function CalendarPage() {
  const { data: events, isLoading, refetch } = useCalendarEvents();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const monthEvents = useMemo(
    () => events.filter((e) => {
      const d = new Date(e.start);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }),
    [events, currentMonth, currentYear],
  );

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    const form = new FormData(e.currentTarget);
    try {
      const payload = {
        title: form.get("title") as string,
        type: form.get("type") as "court_date" | "client_meeting" | "internal_deadline",
        start: new Date(form.get("date") as string).toISOString(),
        end: new Date(form.get("date") as string).toISOString(),
        allDay: true,
      };
      const res = await fetch("/api/mock/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast.success("Événement créé");
      setOpen(false);
      refetch();
    } catch {
      toast.error("Erreur");
    } finally {
      setCreating(false);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  if (isLoading) return <PageSkeleton />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Calendrier</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {events.length} événement(s) ce mois
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Nouvel événement</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvel événement</DialogTitle>
              <DialogDescription>Planifiez un événement</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input name="title" required placeholder="Audience..." />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select name="type" defaultValue="client_meeting">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="court_date">Audience</SelectItem>
                    <SelectItem value="client_meeting">RDV Client</SelectItem>
                    <SelectItem value="internal_deadline">Échéance interne</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input name="date" type="date" required />
              </div>
              <Button type="submit" className="w-full" disabled={creating}>
                {creating ? "Création..." : "Créer"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Month Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="font-serif text-lg font-semibold">
          {MONTHS_FR[currentMonth]} {currentYear}
        </h2>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="mt-4 overflow-x-auto rounded-xl border">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
            <div key={d} className="border-r px-3 py-2 text-xs font-medium text-muted-foreground last:border-r-0">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {/* Empty cells */}
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[80px] border-b border-r bg-muted/5 p-2 last:border-r-0 sm:min-h-[100px]" />
          ))}
          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, day) => {
            const date = new Date(currentYear, currentMonth, day + 1);
            const dayEvents = monthEvents.filter(
              (e) => new Date(e.start).getDate() === day + 1,
            );
            return (
              <div
                key={day}
                className={cn(
                  "min-h-[80px] border-b border-r p-1.5 transition-colors hover:bg-secondary/30 last:border-r-0 sm:min-h-[100px] sm:p-2",
                  date.toDateString() === new Date().toDateString() && "bg-accent/5",
                )}
              >
                <p className={cn(
                  "mb-1 text-xs font-medium",
                  date.toDateString() === new Date().toDateString() && "text-accent",
                )}>
                  {day + 1}
                </p>
                <div className="space-y-0.5">
                  {dayEvents.slice(0, 2).map((e) => (
                    <div
                      key={e.id}
                      className="truncate rounded px-1 py-0.5 text-[10px] font-medium text-white"
                      style={{ backgroundColor: e.color }}
                    >
                      {e.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <p className="text-[10px] text-muted-foreground">+{dayEvents.length - 2}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="mt-6 space-y-3">
        <h2 className="font-serif text-lg font-semibold">Événements à venir</h2>
        {events
          .filter((e) => new Date(e.start) > new Date())
          .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
          .slice(0, 10)
          .map((e) => (
            <div key={e.id} className="flex items-center gap-3 rounded-xl border p-3">
              <div className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: e.color }} />
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{e.title}</p>
                <p className="text-xs text-muted-foreground">
                  {format(e.start, "dd MMM yyyy • HH:mm", { locale: fr })}
                </p>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                {e.type === "court_date" ? "Audience" : e.type === "client_meeting" ? "RDV Client" : "Échéance"}
              </Badge>
            </div>
          ))}
      </div>
    </div>
  );
}
