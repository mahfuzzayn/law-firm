"use client";

import { useCases } from "@/hooks/use-cases";
import { useInvoices, useTimeEntries } from "@/hooks/use-billing";
import { useTasks } from "@/hooks/use-tasks";
import { PageSkeleton } from "@/components/shared/page-skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["var(--color-primary)", "var(--color-accent)", "var(--color-success)", "var(--color-warning)", "var(--color-destructive)"];

export default function AnalyticsPage() {
  const { data: cases, isLoading: casesLoading } = useCases({ limit: 100 });
  const { data: invoices } = useInvoices({ limit: 100 });
  const { data: tasks } = useTasks();

  if (casesLoading) return <PageSkeleton />;

  // Cases by status
  const casesByStatus = ["open", "in_progress", "pending_court", "closed"].map((status) => ({
    name: status === "open" ? "Ouvert" : status === "in_progress" ? "En cours" : status === "pending_court" ? "Tribunal" : "Clos",
    value: cases.filter((c) => c.status === status).length,
  }));

  // Revenue data (by month)
  const revenueByStatus = [
    { name: "Payée", value: invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0) },
    { name: "Envoyée", value: invoices.filter((i) => i.status === "sent").reduce((s, i) => s + i.amount, 0) },
    { name: "En retard", value: invoices.filter((i) => i.status === "overdue").reduce((s, i) => s + i.amount, 0) },
  ];

  // Task completion
  const tasksByStatus = [
    { name: "À faire", value: tasks.filter((t) => t.status === "todo").length },
    { name: "En cours", value: tasks.filter((t) => t.status === "in_progress").length },
    { name: "Révision", value: tasks.filter((t) => t.status === "review").length },
    { name: "Terminé", value: tasks.filter((t) => t.status === "done").length },
  ];

  // Cases by practice area
  const practiceAreas = [...new Set(cases.map((c) => c.practiceArea))].slice(0, 8);
  const casesByArea = practiceAreas.map((area) => ({
    name: area.length > 18 ? area.slice(0, 16) + "..." : area,
    value: cases.filter((c) => c.practiceArea === area).length,
  }));

  return (
    <div>
      <div>
        <h1 className="font-serif text-2xl font-semibold">Analytiques</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Rapports et indicateurs de performance
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Cases by Status */}
        <div className="card-glass p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold">Dossiers par statut</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={casesByStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {casesByStatus.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Status */}
        <div className="card-glass p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold">Revenus par statut</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                  formatter={(v) => `${Number(v).toLocaleString("fr-FR")} €`}
                />
                <Bar dataKey="value" name="Montant" radius={[4, 4, 0, 0]}>
                  {revenueByStatus.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tasks by Status */}
        <div className="card-glass p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold">Tâches par statut</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={tasksByStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {tasksByStatus.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cases by Practice Area */}
        <div className="card-glass p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold">Dossiers par domaine</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={casesByArea} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="value" name="Dossiers" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
