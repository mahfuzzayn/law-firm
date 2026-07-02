"use client";

import { useTeam } from "@/hooks/use-team";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageSkeleton } from "@/components/shared/page-skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

const roleColors: Record<string, string> = {
  admin: "bg-primary/10 text-primary",
  lawyer: "bg-accent/10 text-accent",
  staff: "bg-muted/20 text-muted-foreground",
};

const roleLabels: Record<string, string> = {
  admin: "Administrateur",
  lawyer: "Avocat",
  staff: "Personnel",
};

export default function TeamPage() {
  const { data: team, isLoading } = useTeam();

  if (isLoading) return <PageSkeleton />;

  return (
    <div>
      <div>
        <h1 className="font-serif text-2xl font-semibold">Équipe</h1>
        <p className="mt-1 text-sm text-muted-foreground">{team.length} membre(s)</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <div key={member.id} className="card-glass p-5">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{member.name}</p>
                <p className="truncate text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Badge className={cn("text-xs", roleColors[member.role])}>
                {roleLabels[member.role] ?? member.role}
              </Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {member.practiceAreas.slice(0, 3).map((area) => (
                <Badge key={area} variant="secondary" className="text-[10px]">
                  {area}
                </Badge>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-3 text-center text-sm">
              <div>
                <p className="font-semibold">{member.openCases}</p>
                <p className="text-xs text-muted-foreground">Dossiers</p>
              </div>
              <div>
                <p className="font-semibold">{member.openTasks}</p>
                <p className="text-xs text-muted-foreground">Tâches</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
