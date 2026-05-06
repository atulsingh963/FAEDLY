"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  FileEdit, 
  TrendingUp, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  Sparkles
} from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { logoutUser } from "@/lib/firebase/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Tutor", href: "/dashboard/tutor", icon: MessageSquare },
  { name: "Practice", href: "/dashboard/practice", icon: BookOpen },
  { name: "Notes", href: "/dashboard/notes", icon: FileEdit },
  { name: "Progress", href: "/dashboard/progress", icon: TrendingUp },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading } = useAuthStore();

  const handleLogout = async () => {
    await logoutUser();
    // Middleware handles redirect
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-border/50 bg-card transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-border/50">
            <Link href="/dashboard" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-violet-500 to-cyan-500 p-1.5 rounded-lg text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/70">
                FAEDLY
              </span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group",
                    isActive 
                      ? "bg-violet-500/10 text-violet-600 dark:text-violet-400" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-violet-600 dark:text-violet-400" : "text-muted-foreground group-hover:text-foreground")} />
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 w-1 h-6 bg-violet-600 dark:bg-violet-400 rounded-r-full" 
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-border/50">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden sm:block text-sm text-muted-foreground">
              {sidebarLinks.find((l) => l.href === pathname)?.name || "Dashboard"}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 border-2 border-background" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-sm">
              {user?.displayName?.charAt(0).toUpperCase() || user?.email.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
