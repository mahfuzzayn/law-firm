import { api } from ".";
import type { TeamMember } from "@/types";

export async function getTeam() {
  return api.get<TeamMember[]>("/team");
}
