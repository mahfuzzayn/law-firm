import { http, HttpResponse, delay } from "msw";
import { users } from "@/mocks/data";
import type { TeamMember } from "@/types";

export const teamHandlers = [
  http.get("/api/mock/team", async () => {
    await delay(300);
    const team: TeamMember[] = users.map((u) => ({
      id: u.id,
      userId: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      practiceAreas: u.practiceAreas,
      openCases: 0,
      openTasks: 0,
      avatar: u.avatar,
      joinedAt: u.createdAt,
    }));
    return HttpResponse.json(team);
  }),
];
