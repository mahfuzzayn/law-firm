"use client";

import { useState, useEffect, useCallback } from "react";
import { getCases, getCase, getCaseTimeline, createCase, updateCase } from "@/lib/api/cases";
import type { Case, CaseTimelineEvent } from "@/types";

export function useCases(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
}) {
  const [data, setData] = useState<Case[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(params?.page ?? 1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getCases({ ...params, page, limit: params?.limit ?? 10 });
      setData(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setIsLoading(false);
    }
  }, [page, params?.limit, params?.search, params?.status, params?.sortBy, params?.sortOrder]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, total, page, setPage, isLoading, error, refetch: fetch };
}

export function useCase(id: string) {
  const [data, setData] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getCase(id)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { data, isLoading, error };
}

export function useCaseTimeline(caseId: string) {
  const [data, setData] = useState<CaseTimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!caseId) return;
    getCaseTimeline(caseId)
      .then(setData)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [caseId]);

  return { data, isLoading };
}

export async function createCaseAction(data: Partial<Case>) {
  return createCase(data);
}

export async function updateCaseAction(id: string, data: Partial<Case>) {
  return updateCase(id, data);
}
