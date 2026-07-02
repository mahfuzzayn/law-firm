import type { Session } from "@/types";

/**
 * Phase 1 mock auth API — no real security.
 * Uses MSW endpoints under /api/mock.
 *
 * Future: swap to a real auth provider (Auth.js, Clerk, etc.).
 */
const BASE_URL = "/api/mock";

export async function loginAPI(email: string, password: string): Promise<Session> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Échec de connexion" }));
    throw new Error(err.error ?? "Échec de connexion");
  }

  const data = await res.json();

  // Persist mock session
  localStorage.setItem("mock-session", JSON.stringify(data));

  return data;
}

export async function getSessionAPI(): Promise<Session | null> {
  const stored = localStorage.getItem("mock-session");
  if (!stored) return null;

  const session = JSON.parse(stored) as Session & { expiresAt: string };

  // Check expiry
  if (new Date(session.expiresAt) < new Date()) {
    localStorage.removeItem("mock-session");
    return null;
  }

  return session;
}

export async function logoutAPI(): Promise<void> {
  await fetch(`${BASE_URL}/auth/logout`, { method: "POST" });
  localStorage.removeItem("mock-session");
}
