"use client";

import { useState } from "react";
import { useCases } from "@/hooks/use-cases";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TableSkeleton } from "@/components/shared/page-skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { Plus, Search, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; color: string }> = {
  open: { label: "Ouvert", color: "bg-primary/10 text-primary" },
  in_progress: { label: "En cours", color: "bg-accent/10 text-accent" },
  pending_court: { label: "Tribunal", color: "bg-warning/10 text-warning" },
  closed: { label: "Clos", color: "bg-muted/20 text-muted-foreground" },
};

export default function CasesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const { data, total, page, setPage, isLoading, refetch } = useCases({
    search,
    status: statusFilter,
    sortBy,
    sortOrder,
  });
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      title: form.get("title") as string,
      description: form.get("description") as string,
      clientName: form.get("clientName") as string,
      practiceArea: form.get("practiceArea") as string,
    };
    try {
      const res = await fetch("/api/mock/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast.success("Dossier créé");
      setOpen(false);
      refetch();
    } catch {
      toast.error("Erreur lors de la création");
    } finally {
      setCreating(false);
    }
  };

  const handleSort = (col: string) => {
    if (sortBy === col) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortOrder("desc");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Dossiers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total} dossier(s) — Gérez vos dossiers et litiges
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nouveau dossier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouveau dossier</DialogTitle>
              <DialogDescription>Créez un nouveau dossier client</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input id="title" name="title" required placeholder="Litige commercial..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientName">Client</Label>
                <Input id="clientName" name="clientName" required placeholder="Nom du client" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="practiceArea">Domaine</Label>
                <Input id="practiceArea" name="practiceArea" required placeholder="Droit des affaires" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={3} />
              </div>
              <Button type="submit" className="w-full" disabled={creating}>
                {creating ? "Création..." : "Créer le dossier"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un dossier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tous</SelectItem>
            <SelectItem value="open">Ouvert</SelectItem>
            <SelectItem value="in_progress">En cours</SelectItem>
            <SelectItem value="pending_court">Tribunal</SelectItem>
            <SelectItem value="closed">Clos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="mt-4">
        {isLoading ? (
          <TableSkeleton rows={8} />
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("caseNumber")}>
                      <span className="flex items-center gap-1">N° Dossier <ArrowUpDown className="h-3 w-3" /></span>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                      <span className="flex items-center gap-1">Titre <ArrowUpDown className="h-3 w-3" /></span>
                    </TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Domaine</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("updatedAt")}>
                      <span className="flex items-center gap-1">Mis à jour <ArrowUpDown className="h-3 w-3" /></span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((c) => (
                    <TableRow key={c.id} className="cursor-pointer hover:bg-secondary/50">
                      <TableCell className="font-mono text-xs">{c.caseNumber}</TableCell>
                      <TableCell className="max-w-[200px] truncate font-medium">{c.title}</TableCell>
                      <TableCell className="max-w-[140px] truncate">{c.clientName}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{c.practiceArea}</TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", statusConfig[c.status]?.color)}>
                          {statusConfig[c.status]?.label ?? c.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(c.updatedAt, "dd/MM/yyyy", { locale: fr })}
                      </TableCell>
                    </TableRow>
                  ))}
                  {data.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                        Aucun dossier trouvé
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>{total} résultat(s)</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                  Précédent
                </Button>
                <Button variant="outline" size="sm" disabled={page * 10 >= total} onClick={() => setPage(page + 1)}>
                  Suivant
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
