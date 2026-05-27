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

  const initial = (userName || userEmail || "U")[0].toUpperCase();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.04]">
        <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#ff2020] flex items-center justify-center glow-red-sm group-hover:glow-red transition-all duration-300">
            <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-bold text-[14px] tracking-tight text-white">LJ Affiliate</div>
            {isAdmin && (
              <div className="flex items-center gap-1">
                <Shield className="w-2.5 h-2.5 text-[#fbbf24]" />
                <span className="text-[10px] text-[#fbbf24] font-medium uppercase tracking-wider">Admin</span>
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <div className="text-[10px] font-semibold text-white/20 uppercase tracking-widest px-3 py-2 mb-1">
          {isAdmin ? "Administration" : "Navigation"}
        </div>
        {nav.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/dashboard" && item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-[#ff2020]/10 text-white border border-[#ff2020]/15"
                  : "text-white/45 hover:text-white/80 hover:bg-white/[0.03]"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#ff2020] rounded-full glow-red-sm" />
              )}
              <item.icon
                className={cn("w-4 h-4 flex-shrink-0 transition-colors",
                  isActive ? "text-[#ff4040]" : "text-white/30 group-hover:text-white/60"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="w-3 h-3 text-[#ff4040]/50" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-white/[0.04]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-1">
          <div className="w-7 h-7 rounded-lg bg-[#ff2020]/15 border border-[#ff2020]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[#ff6060] text-xs font-bold">{initial}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-[13px] font-medium truncate leading-none mb-0.5">{userName || "Affilié"}</div>
            <div className="text-white/30 text-[11px] truncate">{userEmail}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-white/35 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 xl:w-60 fixed inset-y-0 left-0 bg-[#0d0d0f] border-r border-white/[0.04]">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed inset-y-0 left-0 w-60 bg-[#0d0d0f] border-r border-white/[0.04] z-50 lg:hidden flex flex-col"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-56 xl:ml-60 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 lg:px-6 bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-white/[0.04]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="hidden lg:flex items-center gap-2 text-[13px] text-white/30">
            <span>{isAdmin ? "Admin" : "Dashboard"}</span>
            {pathname !== (isAdmin ? "/admin" : "/dashboard") && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/60 capitalize">
                  {pathname.split("/").pop()?.replace("-", " ")}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 rounded-lg text-white/35 hover:text-white hover:bg-white/[0.05] transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#ff2020] rounded-full glow-red-sm" />
            </button>
            <div className="w-7 h-7 rounded-lg bg-[#ff2020]/15 border border-[#ff2020]/20 flex items-center justify-center">
              <span className="text-[#ff6060] text-xs font-bold">{initial}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
