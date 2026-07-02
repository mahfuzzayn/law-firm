import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = { params: Promise<{ locale: string }> };

const attorneys = [
  { name: "Sophie Moreau", title: "Avocate associée", areas: ["Droit des affaires", "Droit fiscal"], initials: "SM" },
  { name: "Thomas Bernard", title: "Avocat associé", areas: ["Droit civil", "Droit immobilier"], initials: "TB" },
  { name: "Camille Petit", title: "Avocate", areas: ["Droit numérique", "Propriété intellectuelle"], initials: "CP" },
  { name: "Antoine Leroy", title: "Avocat", areas: ["Droit du travail", "Droit de la famille"], initials: "AL" },
  { name: "Marie Dubois", title: "Avocate", areas: ["Droit civil", "Droit de la famille"], initials: "MD" },
  { name: "Lucas Roux", title: "Avocat stagiaire", areas: ["Droit des affaires"], initials: "LR" },
];

export default async function AttorneysPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl tracking-tight">Notre équipe</h1>
          <p className="mt-4 text-muted-foreground">
            Des avocats expérimentés à votre écoute
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {attorneys.map((attorney) => (
            <Link
              key={attorney.name}
              href={`/${locale}/attorneys/${attorney.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group rounded-xl border bg-secondary/40 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <Avatar className="mb-4 h-16 w-16">
                <AvatarFallback className="bg-primary/5 text-lg font-semibold text-primary group-hover:text-accent">
                  {attorney.initials}
                </AvatarFallback>
              </Avatar>
              <h2 className="font-serif text-lg font-semibold">{attorney.name}</h2>
              <p className="text-sm text-muted-foreground">{attorney.title}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {attorney.areas.map((area) => (
                  <Badge key={area} variant="secondary" className="text-xs">
                    {area}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
