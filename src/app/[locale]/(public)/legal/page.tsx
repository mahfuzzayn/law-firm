import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/shared/container";

type Props = { params: Promise<{ locale: string }> };

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sections = [
    { id: "mentions", title: "Mentions légales" },
    { id: "cgu", title: "Conditions générales d'utilisation" },
    { id: "privacy", title: "Politique de confidentialité" },
    { id: "cookies", title: "Politique des cookies" },
  ];

  return (
    <div className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl tracking-tight">Informations légales</h1>
          <p className="mt-4 text-muted-foreground">
            Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.
          </p>

          <div className="mt-12 space-y-16">
            <section id="mentions">
              <h2 className="font-serif text-2xl font-semibold">Mentions légales</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/80">
                <p><strong>Cabinet Juridique</strong> (société d'exercice libéral à responsabilité limitée)</p>
                <p>1 place de la République, 75003 Paris</p>
                <p>+33 1 23 45 67 89</p>
                <p>contact@cabinet-juridique.fr</p>
                <p>SIRET : 123 456 789 00012</p>
                <p>Code APE : 6910Z</p>
                <p>Directeur de la publication : Sophie Moreau</p>
              </div>
            </section>

            <section id="cgu">
              <h2 className="font-serif text-2xl font-semibold">Conditions générales d'utilisation</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/80">
                <p>Ce site web est proposé par le Cabinet Juridique. En accédant à ce site, vous acceptez les présentes conditions générales d'utilisation.</p>
                <p>Le contenu de ce site est fourni à titre informatif uniquement et ne constitue pas un conseil juridique. Les informations présentées ne sauraient se substituer à une consultation personnalisée auprès d'un avocat.</p>
                <p>Le Cabinet Juridique s'efforce d'assurer l'exactitude des informations publiées mais ne peut garantir leur exhaustivité ou leur actualité.</p>
              </div>
            </section>

            <section id="privacy">
              <h2 className="font-serif text-2xl font-semibold">Politique de confidentialité</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/80">
                <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, nous vous informons des modalités de traitement de vos données personnelles.</p>
                <p>Les données collectées via le formulaire de contact (nom, email, téléphone, message) sont utilisées uniquement pour traiter votre demande. Elles sont conservées pendant la durée nécessaire au traitement de votre demande et supprimées après 12 mois.</p>
                <p>Vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ces droits, contactez-nous à contact@cabinet-juridique.fr.</p>
              </div>
            </section>

            <section id="cookies">
              <h2 className="font-serif text-2xl font-semibold">Politique des cookies</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/80">
                <p>Ce site utilise uniquement des cookies fonctionnels nécessaires à son bon fonctionnement (session, préférences de langue et de thème).</p>
                <p>Nous n'utilisons pas de cookies de suivi publicitaire ou de réseaux sociaux. Les cookies de mesure d'audience sont anonymisés et ne permettent pas votre identification.</p>
                <p>Vous pouvez configurer vos préférences de cookies à tout moment via les paramètres de votre navigateur.</p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
