"use client";

import { useState, useEffect } from "react";
import { getTeam } from "@/lib/api/team";
import type { TeamMember } from "@/types";

export function useTeam() {
  const [data, setData] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { getTeam().then(setData).catch(() => {}).finally(() => setIsLoading(false)); }, []);
  return { data, isLoading };
}
