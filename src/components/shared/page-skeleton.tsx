import { cn } from "@/lib/utils";

export function PageSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="h-8 w-64 animate-pulse rounded-lg bg-muted/30" />
      <div className="h-4 w-96 animate-pulse rounded-lg bg-muted/20" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-muted/20" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-xl bg-muted/10" />
    </div>
  );
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="h-9 flex-1 animate-pulse rounded-lg bg-muted/20" />
        <div className="h-9 w-24 animate-pulse rounded-lg bg-muted/20" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="h-6 flex-[2] animate-pulse rounded bg-muted/10" />
          <div className="h-6 flex-1 animate-pulse rounded bg-muted/10" />
          <div className="h-6 flex-1 animate-pulse rounded bg-muted/10" />
          <div className="h-6 w-20 animate-pulse rounded bg-muted/10" />
        </div>
      ))}
    </div>
  );
}
