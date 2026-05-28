"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ShoppingCart, Search, Filter, CheckCircle, Clock, XCircle,
  ArrowUpRight, Download, Package,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity:0, y:16 },
  show:   { opacity:1, y:0, transition:{ duration:0.45, ease:"easeOut" } },
};
const stagger: Variants = { hidden:{}, show:{ transition:{ staggerChildren:0.05 } } };

type OrderStatus = "completed" | "pending" | "refunded";

const ORDERS = [
  { id:"CMD-2026-1248", product:"Masterclass Marketing Digital",  affiliate:"Marie Martin",    amount:197,  commission:78.80, status:"completed" as OrderStatus, date:"27 mai 2026" },
  { id:"CMD-2026-1247", product:"Pack Templates Notion Pro",      affiliate:"Pierre Durand",   amount:49,   commission:24.50, status:"completed" as OrderStatus, date:"27 mai 2026" },
  { id:"CMD-2026-1246", product:"Cours React & Next.js Avancé",  affiliate:"Sophie Leclerc",  amount:297,  commission:103.95,status:"pending"   as OrderStatus, date:"26 mai 2026" },
  { id:"CMD-2026-1245", product:"Guide SEO Automation 2025",      affiliate:"Thomas Bernard",  amount:29,   commission:17.40, status:"completed" as OrderStatus, date:"26 mai 2026" },
  { id:"CMD-2026-1244", product:"Formation Copywriting Pro",      affiliate:"Julie Moreau",    amount:127,  commission:57.15, status:"refunded"  as OrderStatus, date:"25 mai 2026" },
  { id:"CMD-2026-1243", product:"Pack Presets Lightroom Studio",  affiliate:"Nicolas Petit",   amount:39,   commission:21.45, status:"completed" as OrderStatus, date:"25 mai 2026" },
  { id:"CMD-2026-1242", product:"Masterclass Marketing Digital",  affiliate:"Emma Richard",    amount:197,  commission:78.80, status:"pending"   as OrderStatus, date:"24 mai 2026" },
  { id:"CMD-2026-1241", product:"Cours React & Next.js Avancé",  affiliate:"Marie Martin",    amount:297,  commission:103.95,status:"completed" as OrderStatus, date:"24 mai 2026" },
];

const STATUS_CFG: Record<OrderStatus,{ icon: React.ElementType; label:string; badge:string }> = {
  completed: { icon:CheckCircle, label:"Complété",  badge:"bg-green-500/10 border-green-500/20 text-green-400"  },
  pending:   { icon:Clock,       label:"En attente",badge:"bg-amber-500/10 border-amber-500/20 text-amber-400"  },
  refunded:  { icon:XCircle,     label:"Remboursé", badge:"bg-red-500/10   border-red-500/20   text-red-400"    },
};

export default function AdminOrdersPage() {
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState<"all" | OrderStatus>("all");

  const filtered = ORDERS.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.affiliate.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || o.status === filter;
    return matchSearch && matchFilter;
  });

  const totals = {
    revenue:     ORDERS.filter(o=>o.status!=="refunded").reduce((s,o)=>s+o.amount,0),
    commissions: ORDERS.filter(o=>o.status!=="refunded").reduce((s,o)=>s+o.commission,0),
    completed:   ORDERS.filter(o=>o.status==="completed").length,
    pending:     ORDERS.filter(o=>o.status==="pending").length,
  };

  return (
    <div className="space-y-6 max-w-[1200px]">

      <div className="animate-fade-up flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-white tracking-tight">Gestion commandes</h1>
          <p className="text-[13px] text-white/40 mt-0.5">{ORDERS.length} commandes · {totals.pending} en attente</p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium text-white/60 border border-white/[0.08] hover:border-white/[0.15] bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-200">
          <Download className="w-3.5 h-3.5" />
          Exporter CSV
        </button>
      </div>

      {/* Summary cards */}
      <div className="animate-fade-up delay-100 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label:"Revenus ce mois",    value:formatCurrency(totals.revenue),     color:"#ff2020" },
          { label:"Commissions dues",   value:formatCurrency(totals.commissions),  color:"#f59e0b" },
          { label:"Commandes OK",       value:String(totals.completed),            color:"#10b981" },
          { label:"En attente",         value:String(totals.pending),              color:"#a855f7" },
        ].map(c => (
          <div key={c.label} className="p-4 rounded-2xl border border-white/[0.06]"
            style={{ background:"rgba(255,255,255,0.025)", backdropFilter:"blur(20px)" }}>
            <div className="text-[1.4rem] font-bold tracking-[-0.03em]" style={{ color:c.color }}>{c.value}</div>
            <div className="text-[12px] text-white/40 mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher commande, produit ou affilié..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/25 outline-none"
            style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}
          />
        </div>
        <div className="flex gap-2">
          {(["all","completed","pending","refunded"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-[12px] font-medium transition-all duration-200 ${
                filter === f
                  ? "bg-[#ff2020]/15 border-[#ff2020]/25 text-white border"
                  : "border border-white/[0.06] text-white/40 hover:text-white/60"}`}>
              {f === "all" ? "Tout" : STATUS_CFG[f].label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders table */}
      <motion.div
        variants={stagger} initial="hidden" whileInView="show"
        viewport={{ once:true }}
        className="rounded-2xl overflow-hidden border border-white/[0.06]"
        style={{ background:"rgba(255,255,255,0.025)", backdropFilter:"blur(20px)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {["ID", "Produit", "Affilié", "Montant", "Commission", "Statut", "Date"].map((h,i) => (
                  <th key={h} className={`px-4 py-3 text-[11px] font-semibold text-white/25 uppercase tracking-wider ${i > 2 ? "text-right" : "text-left"} ${i === 5 ? "text-center" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => {
                const cfg = STATUS_CFG[o.status];
                return (
                  <motion.tr key={o.id} variants={fadeUp}
                    className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3.5">
                      <code className="text-[11px] font-mono text-white/40">{o.id}</code>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background:"rgba(255,32,32,0.1)", border:"1px solid rgba(255,32,32,0.15)" }}>
                          <Package className="w-3 h-3 text-[#ff5050]" />
                        </div>
                        <span className="text-[13px] text-white font-medium truncate max-w-[160px]">{o.product}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-white/60">{o.affiliate}</td>
                    <td className="px-4 py-3.5 text-right text-[13px] font-semibold text-white">{formatCurrency(o.amount)}</td>
                    <td className="px-4 py-3.5 text-right text-[13px] font-semibold text-green-400">{formatCurrency(o.commission)}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
                        <cfg.icon className="w-2.5 h-2.5" />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right text-[12px] text-white/35">{o.date}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
