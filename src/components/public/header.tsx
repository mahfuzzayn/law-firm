"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  locale: string;
};

const navLinks = [
  { href: "/", labelKey: "common.nav.home" },
  { href: "/practice-areas", labelKey: "common.nav.practiceAreas" },
  { href: "/attorneys", labelKey: "common.nav.attorneys" },
  { href: "/insights", labelKey: "common.nav.insights" },
  { href: "/contact", labelKey: "common.nav.contact" },
] as const;

export function PublicHeader({ locale }: Props) {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </Container>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border/50 bg-background md:hidden">
          <Container className="flex flex-col gap-2 py-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </Container>
        </nav>
      )}
    </header>
  );
}
