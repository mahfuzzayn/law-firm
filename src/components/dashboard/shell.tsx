"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useUIStore } from "@/stores/ui-store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  ChevronLeft,
  Bell,
  Search,
  PanelLeft,
  LogOut,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

const sidebarLinks = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
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

function SidebarContent({ collapsed, onNav }: { collapsed: boolean; onNav?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex h-16 items-center border-b border-border/50", collapsed ? "justify-center px-3" : "px-5")}>
        {collapsed ? (
          <span className="font-serif text-lg font-semibold text-accent">C</span>
        ) : (
          <Link href="/dashboard" className="font-serif text-xl tracking-tight text-foreground">
            <span className="text-accent">C</span>Juridique
          </Link>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const path = `/${link.href}`;
          const isActive = pathname === path || pathname.startsWith(`${path}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNav}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
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
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
              {user ? `${user.name.charAt(0)}${user.name.split(" ")[1]?.charAt(0) ?? ""}` : "SM"}
            </AvatarFallback>
          </Avatar>
          {!collapsed && user && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={cn("mt-2 w-full justify-start gap-2 text-muted-foreground", collapsed && "justify-center px-0")}
          onClick={() => { logout(); window.location.href = "/login"; }}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && "Déconnexion"}
        </Button>
      </div>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed, toggleSidebar, mobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  const { restoreSession, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    restoreSession().then(() => {});
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !pathname.startsWith("/login")) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated && !pathname.startsWith("/login")) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-secondary/20">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-30 hidden h-screen flex-col border-r border-border/50 bg-background transition-all duration-200 lg:flex",
          sidebarCollapsed ? "w-16" : "w-60",
        )}
      >
        <SidebarContent collapsed={sidebarCollapsed} />
      </aside>

      {/* Mobile sidebar (Sheet) */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed left-3 top-3 z-40 lg:hidden">
            <PanelLeft className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-60 p-0">
          <SidebarContent collapsed={false} onNav={() => setMobileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main */}
      <div className={cn("flex flex-1 flex-col transition-all duration-200", sidebarCollapsed ? "lg:ml-16" : "lg:ml-60")}>
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            onClick={toggleSidebar}
            aria-label="Replier la sidebar"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", sidebarCollapsed && "rotate-180")} />
          </Button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher..." className="h-9 pl-9" />
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
