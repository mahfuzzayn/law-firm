"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Building2,
  Globe,
  Shield,
  Users,
  Scale,
  ArrowRight,
  Star,
} from "lucide-react";
import { useRef } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const practiceAreas = [
  { name: "Droit des affaires", description: "Conseil et contentieux des affaires", icon: Building2, color: "from-primary/20 to-primary/5" },
  { name: "Droit civil", description: "Droit des contrats, responsabilité civile", icon: Scale, color: "from-accent/20 to-accent/5" },
  { name: "Droit numérique", description: "RGPD, e-commerce, données personnelles", icon: Globe, color: "from-blue-500/20 to-blue-500/5" },
  { name: "Droit du travail", description: "Relations individuelles et collectives", icon: Users, color: "from-emerald-500/20 to-emerald-500/5" },
  { name: "Droit immobilier", description: "Transactions, baux, construction", icon: Shield, color: "from-violet-500/20 to-violet-500/5" },
  { name: "Droit de la famille", description: "Divorce, succession, autorité parentale", icon: Users, color: "from-rose-500/20 to-rose-500/5" },
];

const testimonials = [
  { name: "Philippe D.", role: "CEO, TechCorp", text: "Un accompagnement juridique d'une rare qualité. Réactifs, précis et humains.", rating: 5 },
  { name: "Marie L.", role: "Particulière", text: "Sophie Moreau a su gérer mon dossier avec une grande délicatesse. Je recommande.", rating: 5 },
  { name: "Antoine B.", role: "Fondateur, StartupAI", text: "Le meilleur cabinet pour les sujets droit numérique. Une expertise pointue.", rating: 5 },
];

const stats = [
  { value: "500+", label: "Dossiers traités" },
  { value: "200+", label: "Clients accompagnés" },
  { value: "15+", label: "Années d'exercice" },
  { value: "8", label: "Avocats" },
];

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const t = useTranslations("home");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden py-24 sm:py-32 lg:py-44">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge variant="outline" className="mb-6 border-accent/30 text-accent">
              Cabinet d'avocats — Paris
            </Badge>
            <h1 className="font-serif text-4xl tracking-tight sm:text-6xl lg:text-7xl text-balance">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Button size="lg" variant="default" asChild>
                <Link href="/contact">
                  {t("cta.button")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/practice-areas">Nos expertises</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs text-muted-foreground"
            >
              {["Barreau de Paris", "15+ ans d'expérience", "FR / EN / ES", "88% satisfaction"].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Practice Areas */}
      <Section className="py-20 sm:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl text-balance">
              {t("practiceAreas.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("practiceAreas.subtitle")}</p>
          </FadeIn>
          <motion.div variants={stagger} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area) => {
              const Icon = area.icon;
              return (
                <motion.div key={area.name} variants={fadeInUp}>
                  <Link
                    href="/practice-areas"
                    className="group card-glass block p-6 card-hover"
                  >
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${area.color} text-primary`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold">{area.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{area.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* Stats */}
      <Section className="border-y border-border/50 bg-gradient-to-b from-secondary/40 to-background py-16">
        <Container>
          <FadeIn className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-4xl font-semibold text-accent sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </FadeIn>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section className="py-20 sm:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Témoignages</h2>
            <p className="mt-4 text-muted-foreground">Ce que nos clients disent de nous</p>
          </FadeIn>
          <motion.div variants={stagger} className="mt-12 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeInUp} className="card-glass p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3 border-t pt-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-xs text-primary">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <Container className="relative">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl text-balance">
              {t("cta.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("cta.subtitle")}</p>
            <div className="mt-8">
              <Button size="lg" variant="accent" asChild>
                <Link href="/contact">
                  {t("cta.button")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </div>
  );
}
