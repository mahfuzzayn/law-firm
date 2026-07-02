import { api } from ".";
import type { Invoice, InvoiceLineItem, TimeEntry } from "@/types";

export async function getInvoices(params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return api.get<{ data: Invoice[]; total: number; page: number; limit: number }>(
    "/invoices",
    params as Record<string, string | number | undefined>,
  );
}

export async function generateInvoice(data: {
  clientId: string;
  caseId: string;
  lineItems: InvoiceLineItem[];
}) {
  return api.post<Invoice>("/invoices/generate", data);
}

export async function getTimeEntries() {
  return api.get<TimeEntry[]>("/time-entries");
}

export async function createTimeEntry(data: Partial<TimeEntry>) {
  return api.post<TimeEntry>("/time-entries", data);
}
