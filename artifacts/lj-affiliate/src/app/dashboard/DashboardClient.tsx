"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Link as LinkIcon, DollarSign, MousePointer, ArrowUpRight, ExternalLink } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

const mockStats = {
  totalClicks: 4821,
  totalConversions: 231,
  totalRevenue: 12480.50,
  pendingCommissions: 1840.00,
  conversionRate: 4.79,
};

const mockLinks = [
  { id: "1", name: "Promotion Printemps", code: "SPRING24", clicks: 1842, conversions: 89, revenue: 4250, is_active: true },
  { id: "2", name: "Newsletter Mai", code: "NEWS05", clicks: 956, conversions: 42, revenue: 2100, is_active: true },
  { id: "3", name: "Campagne Insta", code: "INSTA01", clicks: 2023, conversions: 100, revenue: 6130.50, is_active: false },
];

interface DashboardClientProps {
  userName: string;
}

export default function DashboardClient({ userName }: DashboardClientProps) {
  const stats = [
    { title: "Clics totaux", value: formatNumber(mockStats.totalClicks), icon: MousePointer, color: "brand" as const },
    { title: "Conversions", value: formatNumber(mockStats.totalConversions), icon: TrendingUp, color: "green" as const, change: "12.4%", changePositive: true },
    { title: "Revenus générés", value: formatCurrency(mockStats.totalRevenue), icon: BarChart3, color: "brand" as const },
    { title: "Commissions en attente", value: formatCurrency(mockStats.pendingCommissions), icon: DollarSign, color: "amber" as const },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Bonjour, {userName} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Voici un apercu de vos performances</p>
        </div>
        <div className="text-sm text-gray-500 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
          Taux de conversion : <span className="text-brand-400 font-semibold">{formatPercent(mockStats.conversionRate)}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-900/80 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white font-semibold text-lg">Mes liens d'affiliation</h2>
            <p className="text-gray-500 text-sm">Performances de vos derniers liens</p>
          </div>
          <a href="/dashboard/links" className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors">
            Voir tout
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="pb-3 text-gray-500 text-xs font-medium uppercase tracking-wide">Nom</th>
                <th className="pb-3 text-gray-500 text-xs font-medium uppercase tracking-wide">Code</th>
                <th className="pb-3 text-gray-500 text-xs font-medium uppercase tracking-wide text-right">Clics</th>
                <th className="pb-3 text-gray-500 text-xs font-medium uppercase tracking-wide text-right">Conv.</th>
                <th className="pb-3 text-gray-500 text-xs font-medium uppercase tracking-wide text-right">Revenus</th>
                <th className="pb-3 text-gray-500 text-xs font-medium uppercase tracking-wide text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockLinks.map((link, i) => (
                <motion.tr
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-3.5 h-3.5 text-gray-600" />
                      <span className="text-white text-sm font-medium">{link.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5">
                      <code className="text-xs font-mono text-brand-400 bg-brand-500/10 px-2 py-1 rounded">{link.code}</code>
                      <button className="text-gray-600 hover:text-gray-400 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 text-right text-gray-300 text-sm">{formatNumber(link.clicks)}</td>
                  <td className="py-4 text-right text-gray-300 text-sm">{formatNumber(link.conversions)}</td>
                  <td className="py-4 text-right text-white text-sm font-semibold">{formatCurrency(link.revenue)}</td>
                  <td className="py-4 text-center">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${link.is_active ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-gray-500/10 text-gray-500 border border-gray-500/20"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${link.is_active ? "bg-green-400" : "bg-gray-500"}`} />
                      {link.is_active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
