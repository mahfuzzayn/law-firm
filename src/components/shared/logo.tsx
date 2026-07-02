import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  locale: string;
  className?: string;
};

export function Logo({ locale, className }: LogoProps) {
  return (
    <Link
      href={`/${locale}`}
      className={cn(
        "font-serif text-xl tracking-tight text-foreground transition-colors hover:text-accent",
        className,
      )}
    >
      <span className="text-accent">C</span>Juridique
    </Link>
  );
}
