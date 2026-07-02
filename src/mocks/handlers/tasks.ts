import { http, HttpResponse, delay } from "msw";
import { tasks } from "@/mocks/data";

export const tasksHandlers = [
  http.get("/api/mock/tasks", async () => {
    await delay(300);
    return HttpResponse.json(tasks);
  }),

  http.post("/api/mock/tasks", async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as Record<string, unknown>;
    const newTask = {
      id: crypto.randomUUID(),
      status: "todo" as const,
      order: tasks.length,
      createdAt: new Date(),
      ...body,
    };
    tasks.unshift(newTask as typeof tasks[0]);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.patch("/api/mock/tasks/:id", async ({ params, request }) => {
    await delay(200);
    const idx = tasks.findIndex((t) => t.id === params.id);
    if (idx === -1) return HttpResponse.json({ error: "Tâche non trouvée" }, { status: 404 });
    const body = (await request.json()) as Record<string, unknown>;
    tasks[idx] = { ...tasks[idx], ...body } as typeof tasks[0];
    return HttpResponse.json(tasks[idx]);
  }),
];
