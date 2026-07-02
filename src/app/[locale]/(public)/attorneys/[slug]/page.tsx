import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, GraduationCap, Globe, Scale } from "lucide-react";

type Props = { params: Promise<{ locale: string; slug: string }> };

const attorneys = [
  { slug: "sophie-moreau", name: "Sophie Moreau", title: "Avocate associée", initials: "SM", areas: ["Droit des affaires", "Droit fiscal"], languages: ["Français", "Anglais", "Allemand"], bio: "Sophie Moreau est avocate associée depuis 2010. Spécialisée en droit des affaires et droit fiscal, elle accompagne les entreprises dans leurs opérations stratégiques et leur développement. Ancienne élève de l'École de Formation du Barreau (EFB), elle est également diplômée d'un Master en droit des affaires de l'Université Paris II Panthéon-Assas.", barNumber: "BAR-AB1234" },
  { slug: "thomas-bernard", name: "Thomas Bernard", title: "Avocat associé", initials: "TB", areas: ["Droit civil", "Droit immobilier"], languages: ["Français", "Anglais"], bio: "Thomas Bernard est avocat associé spécialisé en droit civil et droit immobilier. Il intervient tant en conseil qu'en contentieux pour les particuliers et les professionnels. Il est diplômé d'un Master en droit immobilier de l'Université Paris I Panthéon-Sorbonne.", barNumber: "BAR-CD5678" },
  { slug: "camille-petit", name: "Camille Petit", title: "Avocate", initials: "CP", areas: ["Droit numérique", "Propriété intellectuelle"], languages: ["Français", "Anglais", "Espagnol"], bio: "Camille Petit est avocate spécialisée en droit numérique et propriété intellectuelle. Elle conseille les startups et les entreprises technologiques sur les questions de protection des données, RGPD, et droit des marques.", barNumber: "BAR-EF9012" },
  { slug: "antoine-leroy", name: "Antoine Leroy", title: "Avocat", initials: "AL", areas: ["Droit du travail", "Droit de la famille"], languages: ["Français", "Anglais"], bio: "Antoine Leroy exerce en droit du travail et droit de la famille. Il assiste ses clients dans les négociations collectives, les contentieux prud'homaux et les procédures familiales.", barNumber: "BAR-GH3456" },
];

export default async function AttorneyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const attorney = attorneys.find((a) => a.slug === slug);
  if (!attorney) notFound();

  return (
    <div className="py-24">
      <Container>
        <Link
          href={`/${locale}/attorneys`}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l'équipe
        </Link>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center lg:col-span-1">
            <Avatar className="mb-4 h-32 w-32">
              <AvatarFallback className="bg-primary/10 text-3xl font-semibold text-primary">
                {attorney.initials}
              </AvatarFallback>
            </Avatar>
            <h1 className="font-serif text-2xl font-semibold">{attorney.name}</h1>
            <p className="text-muted-foreground">{attorney.title}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Barreau de Paris · {attorney.barNumber}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {attorney.areas.map((area) => (
                <Badge key={area} variant="secondary">{area}</Badge>
              ))}
            </div>
            <Button className="mt-6 w-full" variant="accent" asChild>
              <Link href={`/${locale}/contact`}>Réserver une consultation</Link>
            </Button>
          </div>
          <div className="lg:col-span-2">
            <p className="leading-relaxed text-foreground/80">{attorney.bio}</p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-accent" />
                <span className="text-sm">EFB · Paris II Panthéon-Assas</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-accent" />
                <span className="text-sm">{attorney.languages.join(" · ")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Scale className="h-5 w-5 text-accent" />
                <span className="text-sm">Barreau de Paris</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
