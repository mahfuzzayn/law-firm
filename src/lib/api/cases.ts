import { api } from ".";
import type { Case, CaseTimelineEvent } from "@/types";

export async function getCases(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
}) {
  return api.get<{
    data: Case[];
    total: number;
    page: number;
    limit: number;
  }>("/cases", params as Record<string, string | number | undefined>);
}

export async function getCase(id: string) {
  return api.get<Case>(`/cases/${id}`);
}

export async function getCaseTimeline(id: string) {
  return api.get<CaseTimelineEvent[]>(`/cases/${id}/timeline`);
}

export async function createCase(data: Partial<Case>) {
  return api.post<Case>("/cases", data);
}

export async function updateCase(id: string, data: Partial<Case>) {
  return api.patch<Case>(`/cases/${id}`, data);
}
