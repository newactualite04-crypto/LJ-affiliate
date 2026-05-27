"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, Link as LinkIcon, TrendingUp, ArrowUpRight, Shield } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

const mockAdminStats = {
  totalAffiliates: 247,
  totalRevenue: 128450,
  totalCommissionsPaid: 38535,
  activeLinks: 1842,
  conversionRate: 4.21,
};

const topAffiliates = [
  { id: "1", name: "Marie Martin", email: "marie@ex.com", revenue: 12480, conversions: 89, links: 8 },
  { id: "2", name: "Pierre Durand", email: "pierre@ex.com", revenue: 9870, conversions: 72, links: 5 },
  { id: "3", name: "Sophie Leclerc", email: "sophie@ex.com", revenue: 8240, conversions: 61, links: 12 },
  { id: "4", name: "Thomas Bernard", email: "thomas@ex.com", revenue: 7650, conversions: 55, links: 6 },
  { id: "5", name: "Julie Moreau", email: "julie@ex.com", revenue: 6890, conversions: 49, links: 9 },
];

const recentActivity = [
  { id: "1", type: "conversion", user: "Marie Martin", amount: 240, time: "Il y a 2 min" },
  { id: "2", type: "commission", user: "Pierre Durand", amount: 1120, time: "Il y a 15 min" },
  { id: "3", type: "signup", user: "Nouveau affilié", amount: 0, time: "Il y a 1h" },
  { id: "4", type: "conversion", user: "Sophie Leclerc", amount: 180, time: "Il y a 2h" },
];

export default function AdminPage() {
  const stats = [
    { title: "Affiliés actifs", value: formatNumber(mockAdminStats.totalAffiliates), icon: Users, color: "brand" as const },
    { title: "Revenus totaux", value: formatCurrency(mockAdminStats.totalRevenue), icon: DollarSign, color: "green" as const, change: "23%", changePositive: true },
    { title: "Commissions versées", value: formatCurrency(mockAdminStats.totalCommissionsPaid), icon: TrendingUp, color: "amber" as const },
    { title: "Liens actifs", value: formatNumber(mockAdminStats.activeLinks), icon: LinkIcon, color: "brand" as const },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl font-bold text-white">Administration</h1>
          </div>
          <p className="text-gray-500 text-sm">Vue d'ensemble de la plateforme</p>
        </div>
        <div className="text-sm text-gray-500 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
          Taux global : <span className="text-brand-400 font-semibold">{formatPercent(mockAdminStats.conversionRate)}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => <StatCard key={i} {...stat} index={i} />)}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900/80 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Top affiliés</h2>
            <a href="/admin/affiliates" className="flex items-center gap-1 text-brand-400 hover:text-brand-300 text-sm transition-colors">
              Voir tout <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="space-y-3">
            {topAffiliates.map((affiliate, i) => (
              <motion.div
                key={affiliate.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-400 text-xs font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{affiliate.name}</div>
                    <div className="text-gray-600 text-xs">{affiliate.conversions} conv. · {affiliate.links} liens</div>
                  </div>
                </div>
                <div className="text-green-400 font-semibold text-sm">{formatCurrency(affiliate.revenue)}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-gray-900/80 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-white font-semibold mb-5">Activité récente</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${activity.type === "conversion" ? "bg-green-400" : activity.type === "commission" ? "bg-brand-400" : "bg-amber-400"}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">{activity.user}</div>
                  <div className="text-gray-500 text-xs capitalize">
                    {activity.type === "conversion" ? "Nouvelle conversion" : activity.type === "commission" ? "Commission versée" : "Inscription"}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  {activity.amount > 0 && <div className="text-white text-sm font-semibold">{formatCurrency(activity.amount)}</div>}
                  <div className="text-gray-600 text-xs">{activity.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
