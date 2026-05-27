"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, MousePointer, ShoppingCart } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

const monthlyData = [
  { month: "Jan", clicks: 320, conversions: 14, revenue: 680 },
  { month: "Fév", clicks: 480, conversions: 22, revenue: 1050 },
  { month: "Mar", clicks: 620, conversions: 31, revenue: 1480 },
  { month: "Avr", clicks: 740, conversions: 38, revenue: 1820 },
  { month: "Mai", clicks: 890, conversions: 45, revenue: 2150 },
  { month: "Jun", clicks: 1050, conversions: 53, revenue: 2540 },
];

const maxClicks = Math.max(...monthlyData.map(d => d.clicks));
const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

export default function StatsPage() {
  return (
    <div className="space-y-6 max-w-[1000px]">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-xl font-semibold text-white tracking-tight">Statistiques</h1>
        <p className="text-[13px] text-white/40 mt-0.5">Performances sur les 6 derniers mois</p>
      </motion.div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <StatCard title="Clics totaux" value={formatNumber(4100)} icon={MousePointer} color="white" index={0} />
        <StatCard title="Conversions" value={formatNumber(203)} icon={ShoppingCart} color="green" index={1} change="18%" changePositive={true} />
        <StatCard title="Revenus" value={formatCurrency(9720)} icon={TrendingUp} color="red" index={2} />
        <StatCard title="Taux moyen" value={formatPercent(4.95)} icon={BarChart3} color="amber" index={3} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Clics chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-5 rounded-2xl bg-[#111113] border border-white/[0.06]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="text-[14px] font-semibold text-white mb-5">Clics mensuels</div>
          <div className="flex items-end gap-2 h-36">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-t-md origin-bottom relative group cursor-default"
                  style={{ height: `${(d.clicks / maxClicks) * 100}%`, background: "rgba(255,32,32,0.2)" }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1a1a1d] border border-white/[0.08] text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {formatNumber(d.clicks)}
                  </div>
                </motion.div>
                <span className="text-[10px] text-white/25">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Revenue chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-5 rounded-2xl bg-[#111113] border border-white/[0.06]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="text-[14px] font-semibold text-white mb-5">Revenus mensuels</div>
          <div className="flex items-end gap-2 h-36">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-t-md origin-bottom relative group cursor-default"
                  style={{
                    height: `${(d.revenue / maxRevenue) * 100}%`,
                    background: i === monthlyData.length - 1
                      ? "linear-gradient(to top, #ff2020, #ff5050)"
                      : "rgba(74,222,128,0.18)"
                  }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1a1a1d] border border-white/[0.08] text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {formatCurrency(d.revenue)}
                  </div>
                </motion.div>
                <span className="text-[10px] text-white/25">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="relative rounded-2xl bg-[#111113] border border-white/[0.06] overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="px-5 py-4 border-b border-white/[0.04]">
          <div className="text-[14px] font-semibold text-white">Détail mensuel</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {["Mois", "Clics", "Conversions", "Taux", "Revenus"].map((h, i) => (
                  <th key={i} className={`px-5 py-3 text-[11px] font-medium text-white/25 uppercase tracking-wider ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((d) => (
                <tr key={d.month} className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5 text-white font-medium">{d.month} 2024</td>
                  <td className="px-5 py-3.5 text-right text-white/60">{formatNumber(d.clicks)}</td>
                  <td className="px-5 py-3.5 text-right text-white/60">{formatNumber(d.conversions)}</td>
                  <td className="px-5 py-3.5 text-right text-[#ff5050]">{formatPercent((d.conversions / d.clicks) * 100)}</td>
                  <td className="px-5 py-3.5 text-right text-white font-semibold">{formatCurrency(d.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
