"use client";

import { motion, type Variants } from "framer-motion";
import {
  BarChart3, TrendingUp, Users, DollarSign, MousePointer,
  ArrowUpRight, ArrowDownRight, Calendar,
} from "lucide-react";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity:0, y:16 },
  show:   { opacity:1, y:0, transition:{ duration:0.5, ease:"easeOut" } },
};
const stagger: Variants = { hidden:{}, show:{ transition:{ staggerChildren:0.06 } } };

const MONTHLY = [
  { month:"Jan", revenue:8200,  affiliates:198, orders:842  },
  { month:"Fév", revenue:9800,  affiliates:203, orders:961  },
  { month:"Mar", revenue:8600,  affiliates:207, orders:901  },
  { month:"Avr", revenue:11200, affiliates:215, orders:1080 },
  { month:"Mai", revenue:10400, affiliates:220, orders:1010 },
  { month:"Jun", revenue:13500, affiliates:228, orders:1220 },
  { month:"Jul", revenue:12800, affiliates:232, orders:1150 },
  { month:"Aoû", revenue:15800, affiliates:238, orders:1410 },
  { month:"Sep", revenue:14200, affiliates:241, orders:1290 },
  { month:"Oct", revenue:17500, affiliates:245, orders:1580 },
  { month:"Nov", revenue:16200, affiliates:246, orders:1460 },
  { month:"Déc", revenue:19250, affiliates:247, orders:1750 },
];

const maxRevenue = Math.max(...MONTHLY.map(m => m.revenue));

const TOP_PRODUCTS = [
  { name:"Masterclass Marketing Digital", revenue:36244, pct:82 },
  { name:"Cours React & Next.js Avancé",  revenue:27354, pct:62 },
  { name:"Guide SEO Automation 2025",      revenue:15892, pct:36 },
  { name:"Pack Templates Notion Pro",     revenue:15729, pct:35 },
  { name:"Pack Presets Lightroom Studio",  revenue:8190,  pct:18 },
];

export default function AdminStatsPage() {
  const totals = {
    revenue:    MONTHLY.reduce((s,m)=>s+m.revenue,0),
    orders:     MONTHLY.reduce((s,m)=>s+m.orders,0),
    affiliates: 247,
    convRate:   4.21,
  };

  const kpis = [
    { label:"Revenus annuels",     value:formatCurrency(totals.revenue),  sub:"+23% vs année préc.", up:true,  color:"#ff2020" },
    { label:"Commandes totales",   value:formatNumber(totals.orders),     sub:"+18% vs année préc.", up:true,  color:"#10b981" },
    { label:"Affiliés actifs",     value:String(totals.affiliates),        sub:"+49 cette année",    up:true,  color:"#3b82f6" },
    { label:"Taux de conversion",  value:formatPercent(totals.convRate),  sub:"-0.3% vs an préc.",  up:false, color:"#f59e0b" },
  ];

  return (
    <div className="space-y-6 max-w-[1200px]">

      <div className="animate-fade-up flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-white tracking-tight">Statistiques plateforme</h1>
          <p className="text-[13px] text-white/40 mt-0.5">Analyse complète — année 2026</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-xl text-[13px] text-white/40 border border-white/[0.06] bg-white/[0.02]">
          <Calendar className="w-3.5 h-3.5" />
          Jan → Déc 2026
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k,i) => (
          <div key={k.label}
            className="animate-fade-up p-5 rounded-2xl border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
            style={{ background:"rgba(255,255,255,0.025)", backdropFilter:"blur(20px)", animationDelay:`${i*0.07}s` }}>
            <div className="text-[1.6rem] font-bold tracking-[-0.04em] mb-1" style={{ color:k.color }}>
              {k.value}
            </div>
            <div className="text-[13px] text-white font-medium mb-0.5">{k.label}</div>
            <div className={`flex items-center gap-1 text-[11px] font-medium ${k.up ? "text-green-400" : "text-red-400"}`}>
              {k.up
                ? <ArrowUpRight   className="w-3 h-3" />
                : <ArrowDownRight className="w-3 h-3" />}
              {k.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue + Orders chart */}
      <motion.div
        variants={stagger} initial="hidden" whileInView="show"
        viewport={{ once:true, margin:"-60px" }}
        className="relative p-5 rounded-2xl overflow-hidden"
        style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(20px)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[14px] font-semibold text-white">Revenus mensuels</div>
            <div className="text-[12px] text-white/35 mt-0.5">Total {formatCurrency(totals.revenue)}</div>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background:"#ff2020" }} />
              <span className="text-white/40">Revenus</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-end gap-1.5 h-40">
          {MONTHLY.map((m, i) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-[3px] grow-bar relative group cursor-default"
                style={{
                  height:`${(m.revenue/maxRevenue)*100}%`,
                  animationDelay:`${i*0.04}s`,
                  background: i === MONTHLY.length-1
                    ? "linear-gradient(to top,#ff2020,#ff6060)"
                    : i >= MONTHLY.length-3 ? "rgba(255,32,32,0.3)" : "rgba(255,32,32,0.14)",
                }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#111113] border border-white/[0.1] rounded-lg px-2 py-1 text-[10px] text-white font-semibold whitespace-nowrap z-10">
                  {formatCurrency(m.revenue)}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} className="flex justify-between mt-2">
          {MONTHLY.map(m => <span key={m.month} className="text-[9px] text-white/20 flex-1 text-center">{m.month}</span>)}
        </motion.div>
      </motion.div>

      {/* Top products + Monthly breakdown */}
      <div className="grid lg:grid-cols-2 gap-4">

        <motion.div
          variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once:true, margin:"-60px" }}
          className="relative p-5 rounded-2xl"
          style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(20px)" }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          <motion.div variants={fadeUp} className="text-[14px] font-semibold text-white mb-4">Meilleurs produits</motion.div>
          <div className="space-y-4">
            {TOP_PRODUCTS.map((p,i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="flex justify-between text-[12px] mb-1.5">
                  <span className="text-white/60 truncate flex-1 mr-3">{p.name}</span>
                  <span className="text-white font-semibold flex-shrink-0">{formatCurrency(p.revenue)}</span>
                </div>
                <div className="h-[3px] rounded-full bg-white/[0.05] overflow-hidden">
                  <motion.div
                    initial={{ width:0 }} whileInView={{ width:`${p.pct}%` }}
                    viewport={{ once:true }}
                    transition={{ delay:0.1*i, duration:0.7, ease:"easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#ff2020] to-[#ff5050]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once:true, margin:"-60px" }}
          className="relative rounded-2xl overflow-hidden"
          style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(20px)" }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          <div className="px-5 py-4 border-b border-white/[0.04]">
            <div className="text-[14px] font-semibold text-white">Détail mensuel</div>
          </div>
          <div className="overflow-auto max-h-[280px]">
            <table className="w-full">
              <thead className="sticky top-0">
                <tr className="border-b border-white/[0.04]" style={{ background:"rgba(13,13,15,0.95)" }}>
                  {["Mois","Revenus","Commandes","Affiliés"].map((h,i) => (
                    <th key={h} className={`px-4 py-2.5 text-[11px] font-semibold text-white/25 uppercase tracking-wider ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MONTHLY.map((m,i) => (
                  <motion.tr key={m.month} variants={fadeUp}
                    className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-[13px] text-white font-medium">{m.month}</td>
                    <td className="px-4 py-3 text-right text-[13px] font-semibold text-white">{formatCurrency(m.revenue)}</td>
                    <td className="px-4 py-3 text-right text-[13px] text-white/60">{formatNumber(m.orders)}</td>
                    <td className="px-4 py-3 text-right text-[13px] text-white/60">{m.affiliates}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
