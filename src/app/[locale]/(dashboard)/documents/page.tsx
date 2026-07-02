"use client";

import { useDocuments } from "@/hooks/use-documents";
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
import { useState, useRef } from "react";
import { Plus, Search, Upload, FileText, Download, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const { data, total, page, setPage, isLoading, refetch } = useDocuments({ search });
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileRef.current?.files?.[0]) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", fileRef.current.files[0]);
    try {
      const res = await fetch("/api/mock/documents/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error();
      toast.success("Document importé");
      setOpen(false);
      refetch();
    } catch {
      toast.error("Erreur lors de l'import");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">{total} document(s)</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Upload className="mr-2 h-4 w-4" /> Importer</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Importer un document</DialogTitle>
              <DialogDescription>Sélectionnez un fichier à importer</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label>Fichier</Label>
                <Input ref={fileRef} type="file" required />
              </div>
              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Import...</> : "Importer"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

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
                    <TableHead>Type</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Importé par</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="flex items-center gap-2 font-medium">
                        <FileText className="h-4 w-4 shrink-0 text-accent" />
                        <span className="max-w-[180px] truncate">{doc.name}</span>
                      </TableCell>
                      <TableCell><Badge variant="secondary" className="text-xs">{doc.type}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {(doc.size / 1024).toFixed(1)} KB
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground capitalize">{doc.category}</TableCell>
                      <TableCell className="text-sm">{doc.uploadedBy}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(doc.uploadedAt, "dd/MM/yyyy", { locale: fr })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {data.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                        Aucun document trouvé
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
