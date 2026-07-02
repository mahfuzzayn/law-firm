import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/shared/container";

type Props = { params: Promise<{ locale: string }> };

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold">Tableau de bord</h1>
      <p className="mt-1 text-sm text-muted-foreground">Vue d'ensemble de votre activité</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Dossiers actifs", value: "24" },
          { label: "Tâches en cours", value: "12" },
          { label: "Échéances", value: "5" },
          { label: "Revenu mensuel", value: "48 200 €" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border bg-card p-4">
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className="mt-1 font-serif text-2xl font-semibold">{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
