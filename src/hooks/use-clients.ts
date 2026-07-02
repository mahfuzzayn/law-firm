"use client";

import { useState, useEffect, useCallback } from "react";
import { getClients, getClient, createClient, updateClient } from "@/lib/api/clients";
import type { Client } from "@/types";

export function useClients(params?: { page?: number; search?: string }) {
  const [data, setData] = useState<Client[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(params?.page ?? 1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getClients({ ...params, page, limit: 10 });
      setData(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setIsLoading(false);
    }
  }, [page, params?.search]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, total, page, setPage, isLoading, error, refetch: fetch };
}

export function useClient(id: string) {
  const [data, setData] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { if (id) getClient(id).then(setData).catch(() => {}).finally(() => setIsLoading(false)); }, [id]);
  return { data, isLoading };
}
