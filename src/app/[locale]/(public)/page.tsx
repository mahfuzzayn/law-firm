import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Globe,
  Shield,
  Users,
  Scale,
  FileText,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const practiceAreaIcons: Record<string, React.ReactNode> = {
  "Droit des affaires": <Building2 className="h-6 w-6" />,
  "Droit civil": <Scale className="h-6 w-6" />,
  "Droit numérique": <Globe className="h-6 w-6" />,
  "Droit du travail": <Users className="h-6 w-6" />,
  "Droit immobilier": <Shield className="h-6 w-6" />,
  "Droit de la famille": <Users className="h-6 w-6" />,
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  const practiceAreas = [
    { name: "Droit des affaires", description: "Conseil et contentieux des affaires" },
    { name: "Droit civil", description: "Droit des contrats, responsabilité civile" },
    { name: "Droit numérique", description: "RGPD, e-commerce, données personnelles" },
    { name: "Droit du travail", description: "Relations individuelles et collectives" },
    { name: "Droit immobilier", description: "Transactions, baux, construction" },
    { name: "Droit de la famille", description: "Divorce, succession, autorité parentale" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 to-background" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-6 border-accent/30 text-accent">
              Cabinet d'avocats — Paris
            </Badge>
            <h1 className="font-serif text-4xl tracking-tight sm:text-6xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" variant="default" asChild>
                <Link href="/contact">{t("cta.button")}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/practice-areas">Nos expertises</Link>
              </Button>
            </div>
            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">Barreau de Paris</span>
              <span className="flex items-center gap-1.5">15+ ans d'expérience</span>
              <span className="flex items-center gap-1.5">FR / EN / ES</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Practice Areas */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl tracking-tight sm:text-4xl">
              {t("practiceAreas.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("practiceAreas.subtitle")}
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area) => (
              <Link
                key={area.name}
                href="/practice-areas"
                className="group rounded-xl border bg-secondary/40 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-accent/10 group-hover:text-accent">
                  {practiceAreaIcons[area.name] || <FileText className="h-6 w-6" />}
                </div>
                <h3 className="font-serif text-lg font-semibold">{area.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{area.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border/50 bg-secondary/30 py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {[
              { value: "500+", label: t("stats.cases") },
              { value: "200+", label: t("stats.clients") },
              { value: "15+", label: t("stats.years") },
              { value: "8", label: t("stats.lawyers") },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-semibold text-accent sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl tracking-tight sm:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("cta.subtitle")}</p>
            <div className="mt-8">
              <Button size="lg" variant="default" asChild>
                <Link href="/contact">{t("cta.button")}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
