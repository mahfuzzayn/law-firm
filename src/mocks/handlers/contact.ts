import { http, HttpResponse, delay } from "msw";

export const contactHandlers = [
  http.post("/api/mock/contact", async ({ request }) => {
    await delay(800);
    const body = await request.json();
    if (!body || typeof body !== "object" || !("name" in body)) {
      return HttpResponse.json({ error: "Données invalides" }, { status: 400 });
    }
    return HttpResponse.json({ success: true, message: "Message reçu" }, { status: 201 });
  }),
];
