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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Statistiques</h1>
        <p className="text-gray-500 text-sm mt-1">Performances sur les 6 derniers mois</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Clics totaux" value={formatNumber(4100)} icon={MousePointer} color="brand" index={0} />
        <StatCard title="Conversions" value={formatNumber(203)} icon={ShoppingCart} color="green" index={1} change="18%" changePositive={true} />
        <StatCard title="Revenus" value={formatCurrency(9720)} icon={TrendingUp} color="brand" index={2} />
        <StatCard title="Taux moyen" value={formatPercent(4.95)} icon={BarChart3} color="amber" index={3} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-gray-900/80 border border-white/10 rounded-2xl"
        >
          <h3 className="text-white font-semibold mb-6">Clics mensuels</h3>
          <div className="flex items-end gap-3 h-40">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  style={{ height: `${(d.clicks / maxClicks) * 100}%` }}
                  className="w-full bg-brand-500/30 hover:bg-brand-500/50 rounded-t-lg transition-colors origin-bottom relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {formatNumber(d.clicks)}
                  </div>
                </motion.div>
                <span className="text-gray-600 text-xs">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-6 bg-gray-900/80 border border-white/10 rounded-2xl"
        >
          <h3 className="text-white font-semibold mb-6">Revenus mensuels</h3>
          <div className="flex items-end gap-3 h-40">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  className="w-full bg-green-500/30 hover:bg-green-500/50 rounded-t-lg transition-colors origin-bottom relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {formatCurrency(d.revenue)}
                  </div>
                </motion.div>
                <span className="text-gray-600 text-xs">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 bg-gray-900/80 border border-white/10 rounded-2xl overflow-x-auto"
      >
        <h3 className="text-white font-semibold mb-4">Détail mensuel</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="pb-3 text-left text-gray-500 text-xs uppercase">Mois</th>
              <th className="pb-3 text-right text-gray-500 text-xs uppercase">Clics</th>
              <th className="pb-3 text-right text-gray-500 text-xs uppercase">Conversions</th>
              <th className="pb-3 text-right text-gray-500 text-xs uppercase">Taux</th>
              <th className="pb-3 text-right text-gray-500 text-xs uppercase">Revenus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {monthlyData.map((d) => (
              <tr key={d.month} className="hover:bg-white/5 transition-colors">
                <td className="py-3 text-white font-medium">{d.month} 2024</td>
                <td className="py-3 text-right text-gray-300">{formatNumber(d.clicks)}</td>
                <td className="py-3 text-right text-gray-300">{formatNumber(d.conversions)}</td>
                <td className="py-3 text-right text-brand-400">{formatPercent((d.conversions / d.clicks) * 100)}</td>
                <td className="py-3 text-right text-green-400 font-semibold">{formatCurrency(d.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
