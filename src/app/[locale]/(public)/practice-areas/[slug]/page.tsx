import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Building2,
  Globe,
  Shield,
  Users,
  Scale,
  FileText,
  BookOpen,
} from "lucide-react";

type Props = { params: Promise<{ locale: string; slug: string }> };

const practiceAreas = [
  { slug: "droit-des-affaires", name: "Droit des affaires", description: "Conseil et contentieux des affaires. Création d'entreprise, fusions-acquisitions, gouvernement d'entreprise.", icon: Building2, content: "Notre cabinet accompagne les entreprises de toutes tailles dans leurs opérations stratégiques et leur contentieux commercial. Nous intervenons en conseil comme en représentation devant les tribunaux de commerce et les cours d'appel." },
  { slug: "droit-civil", name: "Droit civil", description: "Droit des contrats, responsabilité civile, droit des obligations et contentieux général.", icon: Scale, content: "Le droit civil est le socle de notre pratique. Nous assistons nos clients dans la rédaction et la négociation de contrats, ainsi que dans la résolution de litiges civils devant les juridictions compétentes." },
  { slug: "droit-numerique", name: "Droit numérique", description: "RGPD, protection des données, e-commerce, cybersécurité, conformité numérique.", icon: Globe, content: "Face aux enjeux croissants du numérique, notre cabinet propose une expertise pointue en protection des données, conformité RGPD, droit de l'e-commerce et cybersécurité. Nous accompagnons les acteurs du digital dans leur mise en conformité et la gestion des contentieux." },
  { slug: "droit-du-travail", name: "Droit du travail", description: "Relations individuelles et collectives, négociations, contentieux prud'homal.", icon: Users, content: "Nous conseillons tant les employeurs que les salariés dans l'ensemble des relations de travail : contrats, négociations collectives, restructurations, contentieux prud'homal. Notre approche privilégie la résolution amiable des conflits." },
  { slug: "droit-immobilier", name: "Droit immobilier", description: "Transactions, baux commerciaux et d'habitation, construction, copropriété.", icon: Shield, content: "Notre équipe droit immobilier intervient dans toutes les phases de la vie d'un bien : acquisition, vente, location, construction, copropriété. Nous assistons particuliers et professionnels dans leurs projets immobiliers." },
  { slug: "droit-de-la-famille", name: "Droit de la famille", description: "Divorce, séparation, autorité parentale, succession, donation.", icon: Users, content: "Le droit de la famille est une pratique sensible qui requiert écoute et discrétion. Nous accompagnons nos clients dans les moments clés de leur vie familiale : divorce, séparation, autorité parentale, successions et donations." },
];

export default async function PracticeAreaDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const area = practiceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const Icon = area.icon;

  return (
    <div className="py-24">
      <Container>
        <Link
          href={`/${locale}/practice-areas`}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux domaines d'expertise
        </Link>
        <div className="flex items-start gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
            <Icon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h1 className="font-serif text-4xl tracking-tight">{area.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{area.description}</p>
          </div>
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="leading-relaxed text-foreground/80">{area.content}</p>
          </div>
          <div className="rounded-xl border bg-secondary/40 p-6">
            <h3 className="font-serif text-lg font-semibold">Réserver une consultation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Discutons de votre situation
            </p>
            <Button className="mt-4 w-full" variant="default" asChild>
              <Link href={`/${locale}/contact`}>Nous contacter</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
