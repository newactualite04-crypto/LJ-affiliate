"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Link as LinkIcon, DollarSign, MousePointer, ArrowUpRight, ExternalLink, Copy } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { useState } from "react";

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

const chartData = [28, 42, 35, 58, 50, 72, 65, 80, 70, 88, 78, 95];

export default function DashboardClient({ userName }: { userName: string }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (code: string) => {
    navigator.clipboard.writeText(`https://lj-affiliate.com/r/${code}`);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const stats = [
    { title: "Clics totaux", value: formatNumber(mockStats.totalClicks), icon: MousePointer, color: "white" as const },
    { title: "Conversions", value: formatNumber(mockStats.totalConversions), icon: TrendingUp, color: "green" as const, change: "12.4%", changePositive: true },
    { title: "Revenus générés", value: formatCurrency(mockStats.totalRevenue), icon: BarChart3, color: "red" as const },
    { title: "Commissions dues", value: formatCurrency(mockStats.pendingCommissions), icon: DollarSign, color: "amber" as const },
  ];

  return (
    <div className="space-y-6 max-w-[1100px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Bonjour, {userName}</h1>
          <p className="text-[13px] text-white/40 mt-0.5">Voici vos performances du moment</p>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-white/40 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5">
          Conversion
          <span className="text-[#ff5050] font-semibold">{formatPercent(mockStats.conversionRate)}</span>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} index={i} />
        ))}
      </div>

      {/* Chart + mini stats */}
      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2 relative p-5 rounded-2xl bg-[#111113] border border-white/[0.06] overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[14px] font-semibold text-white">Revenus — 12 mois</div>
              <div className="text-[12px] text-white/40 mt-0.5">Total : {formatCurrency(mockStats.totalRevenue)}</div>
            </div>
            <a href="/dashboard/stats" className="flex items-center gap-1 text-[12px] text-[#ff5050] hover:text-[#ff4040] transition-colors">
              Détails <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="flex items-end gap-1.5 h-28">
            {chartData.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.35 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 rounded-t-md origin-bottom transition-all hover:opacity-80 cursor-default"
                style={{
                  height: `${h}%`,
                  background: i === chartData.length - 1
                    ? "linear-gradient(to top, #ff2020, #ff5050)"
                    : "rgba(255,32,32,0.15)"
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-5 rounded-2xl bg-[#111113] border border-white/[0.06]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="text-[14px] font-semibold text-white mb-4">Performance</div>
          <div className="space-y-4">
            {[
              { label: "Clics / jour (moy.)", val: "163", max: 200 },
              { label: "Conv. / mois", val: "231", max: 300 },
              { label: "Taux de rebond", val: "28%", max: 100, invert: true },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-[12px] mb-1.5">
                  <span className="text-white/45">{item.label}</span>
                  <span className="text-white font-semibold">{item.val}</span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(parseInt(item.val) / item.max) * 100}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[#ff2020] to-[#ff5050]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Links table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl bg-[#111113] border border-white/[0.06] overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
          <div className="text-[14px] font-semibold text-white">Liens d'affiliation</div>
          <a href="/dashboard/links" className="flex items-center gap-1 text-[12px] text-[#ff5050] hover:text-[#ff4040] transition-colors">
            Voir tout <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {["Nom du lien", "Code", "Clics", "Conv.", "Revenus", "Statut"].map((h, i) => (
                  <th key={i} className={`px-5 py-3 text-[11px] font-medium text-white/25 uppercase tracking-wider ${i > 1 ? "text-right" : "text-left"} ${i === 5 ? "text-center" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockLinks.map((link, i) => (
                <motion.tr
                  key={link.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#ff2020]/10 border border-[#ff2020]/20 flex items-center justify-center flex-shrink-0">
                        <LinkIcon className="w-3 h-3 text-[#ff5050]" />
                      </div>
                      <span className="text-[13px] font-medium text-white">{link.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <code className="text-[11px] font-mono text-[#ff5050] bg-[#ff2020]/08 px-2 py-0.5 rounded-md border border-[#ff2020]/10">
                        {link.code}
                      </code>
                      <button onClick={() => copy(link.code)} className="text-white/25 hover:text-white/60 transition-colors">
                        {copied === link.code ? <span className="text-green-400 text-[10px]">Copié</span> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right text-[13px] text-white/60">{formatNumber(link.clicks)}</td>
                  <td className="px-5 py-4 text-right text-[13px] text-white/60">{formatNumber(link.conversions)}</td>
                  <td className="px-5 py-4 text-right text-[13px] font-semibold text-white">{formatCurrency(link.revenue)}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${link.is_active ? "bg-green-500/10 text-green-400 border border-green-500/15" : "bg-white/5 text-white/30 border border-white/08"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${link.is_active ? "bg-green-400" : "bg-white/20"}`} />
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
