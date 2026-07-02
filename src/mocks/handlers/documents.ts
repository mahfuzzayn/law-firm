import { http, HttpResponse, delay } from "msw";
import { documents } from "@/mocks/data";

export const documentsHandlers = [
  http.get("/api/mock/documents", async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const limit = parseInt(url.searchParams.get("limit") ?? "10");
    const search = url.searchParams.get("search")?.toLowerCase();
    const caseId = url.searchParams.get("caseId");
    const clientId = url.searchParams.get("clientId");

    let filtered = [...documents];
    if (search) {
      filtered = filtered.filter((d) =>
        d.name.toLowerCase().includes(search),
      );
    }
    if (caseId) filtered = filtered.filter((d) => d.caseId === caseId);
    if (clientId) filtered = filtered.filter((d) => d.clientId === clientId);

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    return HttpResponse.json({ data: paged, total, page, limit });
  }),

  http.post("/api/mock/documents/upload", async ({ request }) => {
    await delay(1000);
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const caseId = formData.get("caseId") as string | null;
    const clientId = formData.get("clientId") as string | null;

    const newDoc = {
      id: crypto.randomUUID(),
      name: file?.name ?? "document.pdf",
      type: file?.type ?? "application/pdf",
      size: file?.size ?? 0,
      caseId: caseId ?? undefined,
      clientId: clientId ?? undefined,
      uploadedBy: "Moi",
      uploadedAt: new Date(),
      category: "note",
      url: `https://mock-storage.example.com/documents/${crypto.randomUUID()}`,
    };

    documents.unshift(newDoc);
    return HttpResponse.json(newDoc, { status: 201 });
  }),
];
