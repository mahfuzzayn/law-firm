import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "font-serif text-xl tracking-tight text-foreground transition-colors hover:text-accent",
        className,
      )}
    >
      <span className="text-accent">C</span>Juridique
    </Link>
  );
}
