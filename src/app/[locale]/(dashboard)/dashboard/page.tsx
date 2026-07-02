"use client";

import { useCases } from "@/hooks/use-cases";
import { useTasks } from "@/hooks/use-tasks";
import { useCalendarEvents } from "@/hooks/use-calendar";
import { Badge } from "@/components/ui/badge";
import { PageSkeleton } from "@/components/shared/page-skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "@/i18n/navigation";
import { Briefcase, ListTodo, Calendar, Euro, TrendingUp, ArrowRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Jan", dossiers: 12, clients: 8 },
  { month: "Fév", dossiers: 18, clients: 11 },
  { month: "Mar", dossiers: 15, clients: 9 },
  { month: "Avr", dossiers: 22, clients: 14 },
  { month: "Mai", dossiers: 28, clients: 17 },
  { month: "Juin", dossiers: 24, clients: 15 },
];

export default function DashboardPage() {
  const { data: cases, isLoading: casesLoading } = useCases({ limit: 100 });
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const { data: events, isLoading: eventsLoading } = useCalendarEvents();

  const isLoading = casesLoading || tasksLoading || eventsLoading;

  if (isLoading) return <PageSkeleton />;

  const activeCases = cases.filter((c) => c.status !== "closed").length;
  const openTasks = tasks.filter((t) => t.status !== "done").length;
  const upcomingEvents = events
    .filter((e) => new Date(e.start) > new Date())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 5);
  const monthlyRevenue = 48200;

  const kpis = [
    { label: "Dossiers actifs", value: activeCases, icon: Briefcase, color: "text-primary" },
    { label: "Tâches en cours", value: openTasks, icon: ListTodo, color: "text-accent" },
    { label: "Échéances à venir", value: upcomingEvents.length, icon: Calendar, color: "text-warning" },
    { label: "Revenu mensuel", value: `${monthlyRevenue.toLocaleString("fr-FR")} €`, icon: Euro, color: "text-success" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Tableau de bord</h1>
          <p className="mt-1 text-sm text-muted-foreground">Vue d'ensemble de votre activité</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="card-glass p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <Icon className={cn("h-5 w-5 shrink-0", kpi.color)} />
              </div>
              <p className="mt-2 font-serif text-2xl font-semibold">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card-glass p-5">
          <h2 className="font-serif text-lg font-semibold">Activité mensuelle</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="dossiers" name="Dossiers" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clients" name="Clients" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card-glass p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold">Échéances à venir</h2>
            <Link href="/calendar" className="text-sm text-accent hover:underline">
              Voir tout <ArrowRight className="ml-1 inline h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3 rounded-lg border p-3">
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: event.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(event.start, "dd MMM • HH:mm", { locale: fr })}
                  </p>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  {event.type === "court_date" ? "Audience" : event.type === "client_meeting" ? "RDV" : "Échéance"}
                </Badge>
              </div>
            ))}
            {upcomingEvents.length === 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">Aucune échéance à venir</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Cases */}
      <div className="mt-6">
        <div className="card-glass p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold">Dossiers récents</h2>
            <Link href="/cases" className="text-sm text-accent hover:underline">
              Voir tout <ArrowRight className="ml-1 inline h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border/50">
            {cases.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3">
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.clientName} • {c.caseNumber}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    open: { label: "Ouvert", color: "bg-primary/10 text-primary" },
    in_progress: { label: "En cours", color: "bg-accent/10 text-accent" },
    pending_court: { label: "Tribunal", color: "bg-warning/10 text-warning" },
    closed: { label: "Clos", color: "bg-muted/20 text-muted-foreground" },
  };
  const s = map[status] ?? { label: status, color: "bg-muted/20 text-muted-foreground" };
  return <Badge className={cn("text-xs", s.color)}>{s.label}</Badge>;
}
