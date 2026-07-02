import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/shared/container";
import { ContactForm } from "@/components/public/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl tracking-tight">Contact</h1>
          <p className="mt-4 text-muted-foreground">
            Prenez rendez-vous ou envoyez-nous un message
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 text-accent" />
              <div>
                <h3 className="font-medium">Adresse</h3>
                <p className="text-sm text-muted-foreground">
                  1 place de la République<br />75003 Paris
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 text-accent" />
              <div>
                <h3 className="font-medium">Téléphone</h3>
                <p className="text-sm text-muted-foreground">+33 1 23 45 67 89</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 text-accent" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-sm text-muted-foreground">
                  contact@cabinet-juridique.fr
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="mt-1 h-5 w-5 text-accent" />
              <div>
                <h3 className="font-medium">Horaires</h3>
                <p className="text-sm text-muted-foreground">
                  Lundi–Vendredi : 9h–18h<br />
                  Samedi : sur rendez-vous
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
