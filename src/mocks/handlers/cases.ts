import { http, HttpResponse, delay } from "msw";
import { cases, caseTimelines } from "@/mocks/data";

export const casesHandlers = [
  http.get("/api/mock/cases", async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const limit = parseInt(url.searchParams.get("limit") ?? "10");
    const search = url.searchParams.get("search")?.toLowerCase();
    const status = url.searchParams.get("status");
    const sortBy = url.searchParams.get("sortBy") ?? "updatedAt";
    const sortOrder = url.searchParams.get("sortOrder") ?? "desc";

    let filtered = [...cases];

    if (search) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(search) ||
          c.caseNumber.toLowerCase().includes(search) ||
          c.clientName.toLowerCase().includes(search),
      );
    }
    if (status) {
      filtered = filtered.filter((c) => c.status === status);
    }

    filtered.sort((a, b) => {
      const aVal = a[sortBy as keyof typeof a];
      const bVal = b[sortBy as keyof typeof b];
      if (!aVal || !bVal) return 0;
      const cmp = aVal < bVal ? -1 : 1;
      return sortOrder === "asc" ? cmp : -cmp;
    });

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    return HttpResponse.json({ data: paged, total, page, limit });
  }),

  http.get("/api/mock/cases/:id", async ({ params }) => {
    await delay(200);
    const c = cases.find((c) => c.id === params.id);
    if (!c) return HttpResponse.json({ error: "Dossier non trouvé" }, { status: 404 });
    return HttpResponse.json(c);
  }),

  http.get("/api/mock/cases/:id/timeline", async ({ params }) => {
    await delay(200);
    const events = caseTimelines.get(params.id as string) ?? [];
    return HttpResponse.json(events);
  }),

  http.post("/api/mock/cases", async ({ request }) => {
    await delay(500);
    const body = (await request.json()) as Record<string, unknown>;
    const newCase = {
      id: crypto.randomUUID(),
      caseNumber: `DOS-${new Date().getFullYear()}-${String(cases.length + 1).padStart(4, "0")}`,
      status: "open",
      openedAt: new Date(),
      updatedAt: new Date(),
      ...body,
    };
    cases.unshift(newCase as typeof cases[0]);
    return HttpResponse.json(newCase, { status: 201 });
  }),

  http.patch("/api/mock/cases/:id", async ({ params, request }) => {
    await delay(300);
    const idx = cases.findIndex((c) => c.id === params.id);
    if (idx === -1) return HttpResponse.json({ error: "Dossier non trouvé" }, { status: 404 });
    const body = (await request.json()) as Record<string, unknown>;
    cases[idx] = { ...cases[idx], ...body, updatedAt: new Date() } as typeof cases[0];
    return HttpResponse.json(cases[idx]);
  }),
];
