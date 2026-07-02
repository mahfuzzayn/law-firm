"use client";

import { useState, useEffect, useCallback } from "react";
import { getInvoices, getTimeEntries, generateInvoice, createTimeEntry } from "@/lib/api/billing";
import type { Invoice, InvoiceLineItem, TimeEntry } from "@/types";

export function useInvoices(params?: { page?: number; limit?: number; status?: string }) {
  const [data, setData] = useState<Invoice[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(params?.page ?? 1);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getInvoices({ ...params, page, limit: params?.limit ?? 10 });
      setData(result.data);
      setTotal(result.total);
    } catch {} finally { setIsLoading(false); }
  }, [page, params?.limit, params?.status]);

  useEffect(() => { fetch(); }, [fetch]);
  return { data, total, page, setPage, isLoading, refetch: fetch };
}

export function useTimeEntries() {
  const [data, setData] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { getTimeEntries().then(setData).catch(() => {}).finally(() => setIsLoading(false)); }, []);
  return { data, isLoading };
}
