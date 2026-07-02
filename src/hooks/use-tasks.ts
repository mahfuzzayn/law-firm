"use client";

import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, updateTask } from "@/lib/api/tasks";
import type { Task, TaskStatus } from "@/types";

export function useTasks() {
  const [data, setData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const tasks = await getTasks();
      setData(tasks);
    } catch {} finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const updateTaskStatus = useCallback(async (id: string, status: TaskStatus) => {
    await updateTask(id, { status });
    setData((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  return { data, isLoading, refetch: fetch, updateTaskStatus };
}

export async function createTaskAction(data: Partial<Task>) {
  return createTask(data);
}
