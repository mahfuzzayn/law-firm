import { http, HttpResponse, delay } from "msw";
import { clients } from "@/mocks/data";

export const clientsHandlers = [
  http.get("/api/mock/clients", async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const limit = parseInt(url.searchParams.get("limit") ?? "10");
    const search = url.searchParams.get("search")?.toLowerCase();

    let filtered = [...clients];
    if (search) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search),
      );
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    return HttpResponse.json({ data: paged, total, page, limit });
  }),

  http.get("/api/mock/clients/:id", async ({ params }) => {
    await delay(200);
    const c = clients.find((c) => c.id === params.id);
    if (!c) return HttpResponse.json({ error: "Client non trouvé" }, { status: 404 });
    return HttpResponse.json(c);
  }),

  http.post("/api/mock/clients", async ({ request }) => {
    await delay(500);
    const body = (await request.json()) as Record<string, unknown>;
    const newClient = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...body,
    };
    clients.unshift(newClient as typeof clients[0]);
    return HttpResponse.json(newClient, { status: 201 });
  }),

  http.patch("/api/mock/clients/:id", async ({ params, request }) => {
    await delay(300);
    const idx = clients.findIndex((c) => c.id === params.id);
    if (idx === -1) return HttpResponse.json({ error: "Client non trouvé" }, { status: 404 });
    const body = (await request.json()) as Record<string, unknown>;
    clients[idx] = { ...clients[idx], ...body, updatedAt: new Date() } as typeof clients[0];
    return HttpResponse.json(clients[idx]);
  }),
];
