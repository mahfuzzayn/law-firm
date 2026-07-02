"use client";

import { useInvoices, useTimeEntries } from "@/hooks/use-billing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableSkeleton } from "@/components/shared/page-skeleton";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { Plus, Receipt, Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  draft: "bg-muted/20 text-muted-foreground",
  sent: "bg-accent/10 text-accent",
  paid: "bg-success/10 text-success",
  overdue: "bg-destructive/10 text-destructive",
};

export default function BillingPage() {
  const { data: invoices, total, page, setPage, isLoading, refetch } = useInvoices();
  const { data: timeEntries } = useTimeEntries();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Facture générée");
    setOpen(false);
    setLoading(false);
    refetch();
  };

  const totalRevenue = invoices
    .filter((i) => i.status === "paid")
    .reduce((s, i) => s + i.amount, 0);

  const totalPending = invoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((s, i) => s + i.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Facturation</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gestion des factures et du temps passé</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">
              <Plus className="mr-2 h-4 w-4" /> Nouvelle facture
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Générer une facture</DialogTitle>
              <DialogDescription>Créez une facture à partir du temps passé</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <Label>ID du dossier</Label>
                <Input name="caseId" placeholder="DOS-..." required />
              </div>
              <div className="space-y-2">
                <Label>Montant (€)</Label>
                <Input name="amount" type="number" placeholder="1500" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Génération..." : "Générer la facture"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPIs */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Revenu total (payé)</p>
          <p className="mt-1 font-serif text-2xl font-semibold">{totalRevenue.toLocaleString("fr-FR")} €</p>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">En attente</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-warning">{totalPending.toLocaleString("fr-FR")} €</p>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Heures facturables</p>
          <p className="mt-1 font-serif text-2xl font-semibold">
            {timeEntries.filter((t) => !t.billed).reduce((s, t) => s + t.hours, 0).toFixed(1)}h
          </p>
        </div>
      </div>

      {/* Invoices table */}
      <div className="mt-8">
        <h2 className="mb-4 font-serif text-lg font-semibold">Factures</h2>
        {isLoading ? (
          <TableSkeleton rows={6} />
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Facture</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-mono text-xs">{inv.invoiceNumber}</TableCell>
                      <TableCell className="max-w-[160px] truncate">{inv.clientName}</TableCell>
                      <TableCell className="text-right font-medium">
                        {inv.amount.toLocaleString("fr-FR")} €
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", statusColors[inv.status])}>
                          {inv.status === "draft" ? "Brouillon" : inv.status === "sent" ? "Envoyée" : inv.status === "paid" ? "Payée" : "En retard"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(inv.issuedAt, "dd/MM/yyyy", { locale: fr })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {invoices.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                        Aucune facture
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>{total} facture(s)</span>
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


