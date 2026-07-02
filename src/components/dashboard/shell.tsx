"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Calendar,
  Receipt,
  ListTodo,
  Building2,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Bell,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const sidebarLinks = [
  { href: "/dashboard", label: "dashboard", icon: LayoutDashboard },
  { href: "/cases", label: "Dossiers", icon: Briefcase },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/calendar", label: "Calendrier", icon: Calendar },
  { href: "/billing", label: "Facturation", icon: Receipt },
  { href: "/tasks", label: "Tâches", icon: ListTodo },
  { href: "/team", label: "Équipe", icon: Building2 },
  { href: "/analytics", label: "Analytiques", icon: BarChart3 },
  { href: "/settings", label: "Paramètres", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Phase 1 mock user
  const mockUser = { name: "Sophie Moreau", role: "admin", initials: "SM" };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border/50 bg-background transition-all duration-200",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className={cn("flex h-16 items-center border-b border-border/50 px-4", collapsed && "justify-center")}>
          {collapsed ? (
            <span className="font-serif text-lg text-accent font-semibold">C</span>
          ) : (
            <Logo locale="fr" />
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === `/${link.href}` || pathname.startsWith(`/${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-secondary",
                  collapsed && "justify-center px-2",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground",
                )}
                title={collapsed ? link.label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/50 p-3">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                {mockUser.initials}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{mockUser.name}</p>
                <p className="truncate text-xs text-muted-foreground capitalize">{mockUser.role}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn("mt-2", collapsed && "mx-auto block")}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Déplier" : "Replier"}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className={cn("flex flex-1 flex-col transition-all duration-200", collapsed ? "ml-16" : "ml-64")}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-9 h-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
