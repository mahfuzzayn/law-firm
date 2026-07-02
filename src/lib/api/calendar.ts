import { api } from ".";
import type { CalendarEvent } from "@/types";

export async function getCalendarEvents() {
  return api.get<CalendarEvent[]>("/calendar");
}

export async function createCalendarEvent(data: Partial<CalendarEvent>) {
  return api.post<CalendarEvent>("/calendar", data);
}
