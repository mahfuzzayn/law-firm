"use client";

import { useState, useEffect, useCallback } from "react";
import { getCalendarEvents, createCalendarEvent } from "@/lib/api/calendar";
import type { CalendarEvent } from "@/types";

export function useCalendarEvents() {
  const [data, setData] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const events = await getCalendarEvents();
      setData(events);
    } catch {} finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { data, isLoading, refetch: fetch };
}

export async function createCalendarEventAction(data: Partial<CalendarEvent>) {
  return createCalendarEvent(data);
}
