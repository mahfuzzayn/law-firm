"use client";

import { useClients } from "@/hooks/use-clients";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { TableSkeleton } from "@/components/shared/page-skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { useState } from "react";
import { Plus, Search, Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const { data, total, page, setPage, isLoading, refetch } = useClients({ search });
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    const form = new FormData(e.currentTarget);
    try {
      const payload = {
        name: form.get("name") as string,
        email: form.get("email") as string,
        phone: form.get("phone") as string,
        address: form.get("address") as string,
        type: "individual",
      };
      const res = await fetch("/api/mock/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast.success("Client créé");
      setOpen(false);
      refetch();
    } catch {
      toast.error("Erreur");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Clients</h1>
          <p className="mt-1 text-sm text-muted-foreground">{total} client(s)</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Nouveau client</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouveau client</DialogTitle>
              <DialogDescription>Ajoutez un client à votre base</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Nom / Société</Label>
                <Input name="name" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label>Téléphone</Label>
                  <Input name="phone" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Adresse</Label>
                <Input name="address" />
              </div>
              <Button type="submit" className="w-full" disabled={creating}>
                {creating ? "Création..." : "Créer le client"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mt-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher un client..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      {/* Table */}
      <div className="mt-4">
        {isLoading ? (
          <TableSkeleton rows={6} />
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date d'ajout</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.phone}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {c.type === "individual" ? "Particulier" : "Société"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(c.createdAt, "dd/MM/yyyy", { locale: fr })}
                      </TableCell>
                    </TableRow>
                  ))}
                  {data.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                        Aucun client trouvé
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>{total} résultat(s)</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Précédent</Button>
                <Button variant="outline" size="sm" disabled={page * 10 >= total} onClick={() => setPage(page + 1)}>Suivant</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
