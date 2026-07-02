import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ locale: string }> };

const articles = [
  { title: "RGPD 2025 : ce qui change pour les entreprises", category: "Droit numérique", date: "15 mars 2025", readingTime: "5 min" },
  { title: "La réforme du droit des contrats : impacts pratiques", category: "Droit civil", date: "28 février 2025", readingTime: "8 min" },
  { title: "Nouvelles obligations en matière de cybersécurité", category: "Droit numérique", date: "10 février 2025", readingTime: "6 min" },
  { title: "Les clés d'une négociation commerciale réussie", category: "Droit des affaires", date: "2 février 2025", readingTime: "4 min" },
  { title: "Divorce : comprendre la procédure et ses enjeux", category: "Droit de la famille", date: "20 janvier 2025", readingTime: "7 min" },
  { title: "La fiscalité des plus-values immobilières en 2025", category: "Droit immobilier", date: "12 janvier 2025", readingTime: "6 min" },
];

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl tracking-tight">Actualités & Publications</h1>
          <p className="mt-4 text-muted-foreground">
            Suivez l'actualité juridique
          </p>
        </div>
        <div className="mt-12 space-y-6">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group rounded-xl border bg-secondary/40 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {article.readingTime} de lecture
                    </span>
                  </div>
                  <h2 className="mt-3 font-serif text-xl font-semibold group-hover:text-accent">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Analyse et décryptage des dernières évolutions juridiques.
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">{article.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
