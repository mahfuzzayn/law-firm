import { api } from ".";
import type { Client } from "@/types";

export async function getClients(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return api.get<{ data: Client[]; total: number; page: number; limit: number }>(
    "/clients",
    params as Record<string, string | number | undefined>,
  );
}

export async function getClient(id: string) {
  return api.get<Client>(`/clients/${id}`);
}

export async function createClient(data: Partial<Client>) {
  return api.post<Client>("/clients", data);
}

export async function updateClient(id: string, data: Partial<Client>) {
  return api.patch<Client>(`/clients/${id}`, data);
}
