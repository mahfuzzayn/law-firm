"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const { setTheme, theme } = useTheme();
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      toast.success("Paramètres mis à jour");
      setSaving(false);
    }, 400);
  };

  return (
    <div>
      <div>
        <h1 className="font-serif text-2xl font-semibold">Paramètres</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez les paramètres de votre cabinet
        </p>
      </div>

      <Tabs defaultValue="firm" className="mt-6">
        <TabsList>
          <TabsTrigger value="firm">Cabinet</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
        </TabsList>

        <TabsContent value="firm" className="mt-6">
          <div className="card-glass max-w-2xl p-6">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nom du cabinet</Label>
                  <Input defaultValue="Cabinet Juridique" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="contact@cabinet-juridique.fr" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Adresse</Label>
                <Input defaultValue="1 place de la République, 75003 Paris" />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input defaultValue="+33 1 23 45 67 89" />
              </div>
              <Button type="submit" disabled={saving}>
                {saving ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="card-glass max-w-2xl p-6">
            <p className="text-sm text-muted-foreground">
              Les préférences de notification seront disponibles dans une prochaine phase.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <div className="card-glass max-w-2xl space-y-6 p-6">
            <div className="space-y-2">
              <Label>Thème</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">Système</SelectItem>
                  <SelectItem value="light">Clair</SelectItem>
                  <SelectItem value="dark">Sombre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
