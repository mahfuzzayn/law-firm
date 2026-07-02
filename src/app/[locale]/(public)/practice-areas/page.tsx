import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/container";
import {
  Building2,
  Globe,
  Shield,
  Users,
  Scale,
  FileText,
  BookOpen,
} from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const practiceAreas = [
  { name: "Droit des affaires", description: "Conseil et contentieux des affaires. Création d'entreprise, fusions-acquisitions, gouvernement d'entreprise.", icon: Building2 },
  { name: "Droit civil", description: "Droit des contrats, responsabilité civile, droit des obligations et contentieux général.", icon: Scale },
  { name: "Droit numérique", description: "RGPD, protection des données, e-commerce, cybersécurité, conformité numérique.", icon: Globe },
  { name: "Droit du travail", description: "Relations individuelles et collectives, négociations, contentieux prud'homal.", icon: Users },
  { name: "Droit immobilier", description: "Transactions, baux commerciaux et d'habitation, construction, copropriété.", icon: Shield },
  { name: "Droit de la famille", description: "Divorce, séparation, autorité parentale, succession, donation.", icon: Users },
  { name: "Droit fiscal", description: "Fiscalité des entreprises et des particuliers, optimisation fiscale, contentieux.", icon: FileText },
  { name: "Droit de la propriété intellectuelle", description: "Brevets, marques, droits d'auteur, secrets d'affaires.", icon: BookOpen },
];

export default async function PracticeAreasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl tracking-tight">{t("practiceAreas.title")}</h1>
          <p className="mt-4 text-muted-foreground">{t("practiceAreas.subtitle")}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area) => (
            <Link
              key={area.name}
              href={`/${locale}/practice-areas/${area.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group rounded-xl border bg-secondary/40 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-accent/10 group-hover:text-accent">
                <area.icon className="h-6 w-6" />
              </div>
              <h2 className="font-serif text-lg font-semibold">{area.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{area.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
