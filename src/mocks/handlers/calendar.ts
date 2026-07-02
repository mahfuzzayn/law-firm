import { http, HttpResponse, delay } from "msw";
import { calendarEvents } from "@/mocks/data";

export const calendarHandlers = [
  http.get("/api/mock/calendar", async () => {
    await delay(300);
    return HttpResponse.json(calendarEvents);
  }),

  http.post("/api/mock/calendar", async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as Record<string, unknown>;
    const newEvent = {
      id: crypto.randomUUID(),
      ...body,
      color:
        (body as { type: string }).type === "court_date"
          ? "var(--color-destructive)"
          : (body as { type: string }).type === "client_meeting"
            ? "var(--color-accent)"
            : "var(--color-primary)",
    };
    calendarEvents.unshift(newEvent as typeof calendarEvents[0]);
    return HttpResponse.json(newEvent, { status: 201 });
  }),
];
