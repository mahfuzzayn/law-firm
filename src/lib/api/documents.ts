import { api } from ".";
import type { Document } from "@/types";

export async function getDocuments(params?: {
  page?: number;
  limit?: number;
  search?: string;
  caseId?: string;
  clientId?: string;
}) {
  return api.get<{ data: Document[]; total: number; page: number; limit: number }>(
    "/documents",
    params as Record<string, string | number | undefined>,
  );
}

export async function uploadDocument(formData: FormData) {
  return api.post<Document>("/documents/upload", formData);
}
