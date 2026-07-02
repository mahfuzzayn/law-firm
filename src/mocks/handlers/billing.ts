import { http, HttpResponse, delay } from "msw";
import { invoices, timeEntries } from "@/mocks/data";
import type { InvoiceLineItem } from "@/types";

export const billingHandlers = [
  http.get("/api/mock/invoices", async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const limit = parseInt(url.searchParams.get("limit") ?? "10");
    const status = url.searchParams.get("status");

    let filtered = [...invoices];
    if (status) filtered = filtered.filter((i) => i.status === status);

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    return HttpResponse.json({ data: paged, total, page, limit });
  }),

  http.post("/api/mock/invoices/generate", async ({ request }) => {
    await delay(600);
    const body = (await request.json()) as {
      clientId: string;
      caseId: string;
      lineItems: InvoiceLineItem[];
    };

    const total = body.lineItems.reduce((s, i) => s + i.amount, 0);
    const newInvoice = {
      id: crypto.randomUUID(),
      invoiceNumber: `FACT-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(4, "0")}`,
      clientId: body.clientId,
      clientName: "Client",
      caseId: body.caseId,
      caseTitle: "Dossier",
      amount: total,
      status: "draft" as const,
      issuedAt: new Date(),
      dueAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      lineItems: body.lineItems,
    };
    invoices.unshift(newInvoice);
    return HttpResponse.json(newInvoice, { status: 201 });
  }),

  http.get("/api/mock/time-entries", async () => {
    await delay(200);
    return HttpResponse.json(timeEntries);
  }),

  http.post("/api/mock/time-entries", async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as Record<string, unknown>;
    const newEntry = {
      id: crypto.randomUUID(),
      date: new Date(),
      billed: false,
      ...body,
    };
    timeEntries.unshift(newEntry as typeof timeEntries[0]);
    return HttpResponse.json(newEntry, { status: 201 });
  }),
];
