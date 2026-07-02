"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle } from "lucide-react";

// Fallback mock users for when MSW is unavailable
const MOCK_USERS = [
  { email: "admin@cabinet.fr", name: "Sophie Moreau", role: "admin" as const, id: "admin-1", barNumber: "BAR-AB1234", languages: ["Français", "Anglais"], practiceAreas: ["Droit des affaires", "Droit fiscal"], createdAt: new Date("2020-01-15"), avatar: "" },
  { email: "lawyer@cabinet.fr", name: "Thomas Bernard", role: "lawyer" as const, id: "lawyer-1", barNumber: "BAR-CD5678", languages: ["Français", "Anglais"], practiceAreas: ["Droit civil", "Droit immobilier"], createdAt: new Date("2019-06-01"), avatar: "" },
  { email: "staff@cabinet.fr", name: "Camille Petit", role: "staff" as const, id: "staff-1", barNumber: "BAR-EF9012", languages: ["Français"], practiceAreas: ["Droit numérique"], createdAt: new Date("2022-03-10"), avatar: "" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Attempt MSW-backed login
      const res = await fetch("/api/mock/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("mock-session", JSON.stringify(data));
        router.push("/dashboard");
        return;
      }

      // MSW didn't intercept (404 or won't connect) — fallback to direct mock
      const user = MOCK_USERS.find((u) => u.email === email);
      if (!user) throw new Error("Email non trouvé. Essayez: admin@cabinet.fr, lawyer@cabinet.fr, staff@cabinet.fr");

      const session = {
        user,
        token: `mock-token-${user.id}-${Date.now()}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      localStorage.setItem("mock-session", JSON.stringify(session));
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-24">
      <Container className="max-w-md">
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-semibold">Connexion</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Accédez à votre tableau de bord
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cabinet.fr"
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••• (ignoré)"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Se connecter
            </Button>
          </form>

          <div className="mt-6 space-y-2 rounded-lg bg-secondary/50 p-3">
            <p className="text-xs font-medium text-muted-foreground text-center">
              Identifiants de démonstration
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              {MOCK_USERS.map((u) => (
                <button
                  key={u.email}
                  type="button"
                  className="block w-full truncate rounded px-2 py-1 text-left transition-colors hover:bg-accent/10 hover:text-accent"
                  onClick={() => { setEmail(u.email); setPassword("any"); }}
                >
                  <span className="font-medium">{u.role}</span> — {u.email}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
