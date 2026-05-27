"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, Link as LinkIcon, TrendingUp, ArrowUpRight, Shield } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

const topAffiliates = [
  { id: "1", name: "Marie Martin", conversions: 89, revenue: 12480, rank: 1 },
  { id: "2", name: "Pierre Durand", conversions: 72, revenue: 9870, rank: 2 },
  { id: "3", name: "Sophie Leclerc", conversions: 61, revenue: 8240, rank: 3 },
  { id: "4", name: "Thomas Bernard", conversions: 55, revenue: 7650, rank: 4 },
  { id: "5", name: "Julie Moreau", conversions: 49, revenue: 6890, rank: 5 },
];

const recentActivity = [
  { id: "1", type: "conversion", user: "Marie Martin", amount: 240, time: "2 min" },
  { id: "2", type: "commission", user: "Pierre Durand", amount: 1120, time: "15 min" },
  { id: "3", type: "signup", user: "Nicolas Petit", amount: 0, time: "1h" },
  { id: "4", type: "conversion", user: "Sophie Leclerc", amount: 180, time: "2h" },
  { id: "5", type: "paid", user: "Thomas Bernard", amount: 960, time: "3h" },
];

const activityConfig = {
  conversion: { dot: "bg-green-400", label: "Conversion", color: "text-green-400" },
  commission: { dot: "bg-[#ff5050]", label: "Commission", color: "text-[#ff5050]" },
  signup: { dot: "bg-amber-400", label: "Inscription", color: "text-amber-400" },
  paid: { dot: "bg-blue-400", label: "Paiement", color: "text-blue-400" },
};

const chartBars = [42, 58, 48, 72, 65, 80, 74, 92, 82, 96, 88, 100];

export default function AdminPage() {
  const stats = [
    { title: "Affiliés actifs", value: formatNumber(247), icon: Users, color: "white" as const },
    { title: "Revenus totaux", value: formatCurrency(128450), icon: DollarSign, color: "green" as const, change: "23%", changePositive: true },
    { title: "Commissions versées", value: formatCurrency(38535), icon: TrendingUp, color: "red" as const },
    { title: "Liens actifs", value: formatNumber(1842), icon: LinkIcon, color: "amber" as const },
  ];

  return (
    <div className="space-y-6 max-w-[1100px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
            <Shield className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white tracking-tight">Administration</h1>
            <p className="text-[13px] text-white/40">Vue d'ensemble de la plateforme</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-white/40 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5">
          Taux global
          <span className="text-[#ff5050] font-semibold">{formatPercent(4.21)}</span>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {stats.map((s, i) => <StatCard key={i} {...s} index={i} />)}
      </div>

      {/* Chart + activity */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2 relative p-5 rounded-2xl bg-[#111113] border border-white/[0.06]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[14px] font-semibold text-white">Revenus plateforme</div>
              <div className="text-[12px] text-white/40 mt-0.5">Sur 12 mois — {formatCurrency(128450)}</div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-green-400 bg-green-500/10 border border-green-500/15 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              +23%
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-28">
            {chartBars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.35 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 rounded-t-sm origin-bottom"
                style={{
                  height: `${h}%`,
                  background: i === chartBars.length - 1
                    ? "linear-gradient(to top, #ff2020, #ff5050)"
                    : "rgba(255,32,32,0.18)"
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-white/20">
            {["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </motion.div>

        {/* Activity feed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-5 rounded-2xl bg-[#111113] border border-white/[0.06]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="text-[14px] font-semibold text-white mb-4">Activité récente</div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => {
              const cfg = activityConfig[a.type as keyof typeof activityConfig];
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="flex items-center gap-3 py-2.5 border-b border-white/[0.03] last:border-0"
                >
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-white truncate">{a.user}</div>
                    <div className="text-[11px] text-white/35">{cfg.label}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {a.amount > 0 && <div className={`text-[13px] font-semibold ${cfg.color}`}>{formatCurrency(a.amount)}</div>}
                    <div className="text-[10px] text-white/25">il y a {a.time}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Top affiliates */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative rounded-2xl bg-[#111113] border border-white/[0.06] overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
          <div className="text-[14px] font-semibold text-white">Top affiliés</div>
          <a href="/admin/affiliates" className="flex items-center gap-1 text-[12px] text-[#ff5050] hover:text-[#ff4040] transition-colors">
            Voir tout <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {topAffiliates.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 + i * 0.05 }}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold ${i === 0 ? "bg-amber-500/20 text-amber-400 border border-amber-500/20" : "bg-white/[0.04] text-white/30 border border-white/[0.06]"}`}>
                  {a.rank}
                </div>
                <div className="w-8 h-8 rounded-xl bg-[#ff2020]/10 border border-[#ff2020]/15 flex items-center justify-center">
                  <span className="text-[#ff6060] text-[12px] font-bold">{a.name[0]}</span>
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white">{a.name}</div>
                  <div className="text-[11px] text-white/30">{a.conversions} conversions</div>
                </div>
              </div>
              <div className="text-[15px] font-bold text-white tracking-tight">{formatCurrency(a.revenue)}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
