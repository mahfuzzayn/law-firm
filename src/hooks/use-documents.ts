"use client";

import { useState, useEffect, useCallback } from "react";
import { getDocuments, uploadDocument } from "@/lib/api/documents";
import type { Document } from "@/types";

export function useDocuments(params?: { page?: number; search?: string; caseId?: string }) {
  const [data, setData] = useState<Document[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(params?.page ?? 1);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getDocuments({ ...params, page, limit: 10 });
      setData(result.data);
      setTotal(result.total);
    } catch {} finally { setIsLoading(false); }
  }, [page, params?.search, params?.caseId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, total, page, setPage, isLoading, refetch: fetch };
}

export async function uploadDocumentAction(formData: FormData) {
  return uploadDocument(formData);
}
