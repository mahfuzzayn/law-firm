"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { Link } from "@/i18n/navigation";

type Props = {
  locale: string;
};

export function PublicFooter({ locale }: Props) {
  const t = useTranslations();

  return (
    <footer className="border-t border-border/50 bg-secondary/30">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              {t("common.tagline")}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">
              {t("common.nav.practiceAreas")}
            </h3>
            <p className="text-sm text-muted-foreground">
              Droit des affaires, droit civil, droit numérique, droit du travail
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">
              {t("common.nav.contact")}
            </h3>
            <p className="text-sm text-muted-foreground">
              1 place de la République, 75003 Paris
            </p>
            <p className="text-sm text-muted-foreground">+33 1 23 45 67 89</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Informations</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/legal">{t("footer.legal")}</Link>
              <Link href="/legal">{t("footer.cgu")}</Link>
              <Link href="/legal">{t("footer.privacy")}</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Cabinet Juridique.{" "}
          {t("footer.rights")}
        </div>
      </Container>
    </footer>
  );
}
