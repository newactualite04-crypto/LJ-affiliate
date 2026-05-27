"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, LayoutDashboard, Link as LinkIcon, BarChart3,
  DollarSign, Settings, LogOut, Menu, X, Shield, Bell, ChevronRight
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const affiliateNav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/dashboard/links", icon: LinkIcon, label: "Mes liens" },
  { href: "/dashboard/stats", icon: BarChart3, label: "Statistiques" },
  { href: "/dashboard/commissions", icon: DollarSign, label: "Commissions" },
  { href: "/dashboard/settings", icon: Settings, label: "Paramètres" },
];

const adminNav = [
  { href: "/admin", icon: LayoutDashboard, label: "Vue d'ensemble" },
  { href: "/admin/affiliates", icon: TrendingUp, label: "Affiliés" },
  { href: "/admin/commissions", icon: DollarSign, label: "Commissions" },
  { href: "/admin/settings", icon: Settings, label: "Configuration" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
  userEmail?: string;
  userName?: string;
}

export default function DashboardLayout({ children, isAdmin, userEmail, userName }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nav = isAdmin ? adminNav : affiliateNav;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-lg leading-none">LJ Affiliate</div>
            {isAdmin && (
              <div className="flex items-center gap-1 mt-1">
                <Shield className="w-3 h-3 text-amber-400" />
                <span className="text-amber-400 text-xs font-medium">Admin</span>
              </div>
            )}
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-brand-400" : "text-gray-500 group-hover:text-gray-300")} />
              {item.label}
              {isActive && <ChevronRight className="w-3 h-3 ml-auto text-brand-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-brand-400 text-sm font-semibold">
              {(userName || userEmail || "U")[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">{userName || "Utilisateur"}</div>
            <div className="text-gray-600 text-xs truncate">{userEmail}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900/80 border-r border-white/10 flex-shrink-0 fixed inset-y-0">
        <Sidebar />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-white/10 z-50 lg:hidden flex flex-col"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-xl border-b border-white/10 px-4 lg:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
