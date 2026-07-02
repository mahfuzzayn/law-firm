import { http, HttpResponse, delay } from "msw";
import { users } from "@/mocks/data";

// Phase 1: Mock auth — no real security
export const authHandlers = [
  http.post("/api/mock/auth/login", async ({ request }) => {
    await delay(400);

    const body = (await request.json()) as {
      email: string;
      password: string;
    };
    const user = users.find((u) => u.email === body.email);

    if (!user) {
      return HttpResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      user,
      token: `mock-token-${user.id}-${Date.now()}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  }),

  http.get("/api/mock/auth/me", async ({ request }) => {
    await delay(200);

    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer mock-token-")) {
      return HttpResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const userId = authHeader.replace("Bearer mock-token-", "").split("-")[0];
    // Reconstruct: mock-token-{userId}-{timestamp}
    const parts = authHeader.replace("Bearer mock-token-", "").split("-");
    if (parts.length < 2) {
      return HttpResponse.json({ error: "Token invalide" }, { status: 401 });
    }

    // Find user by matching the token pattern
    const user = users.find((u) => u.id.startsWith(parts[0]));
    if (!user) {
      return HttpResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    return HttpResponse.json({ user });
  }),

  http.post("/api/mock/auth/logout", async () => {
    await delay(100);
    return HttpResponse.json({ success: true });
  }),
];
