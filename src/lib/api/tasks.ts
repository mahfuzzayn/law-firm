import { api } from ".";
import type { Task } from "@/types";

export async function getTasks() {
  return api.get<Task[]>("/tasks");
}

export async function createTask(data: Partial<Task>) {
  return api.post<Task>("/tasks", data);
}

export async function updateTask(id: string, data: Partial<Task>) {
  return api.patch<Task>(`/tasks/${id}`, data);
}
