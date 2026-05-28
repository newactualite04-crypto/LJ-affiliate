"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  BarChart3, TrendingUp, Link as LinkIcon, DollarSign, MousePointer,
  ArrowUpRight, Copy, Check, Bell, X, Home, Star, ChevronRight,
  Package, Clock, Award, Zap, ShoppingBag, ExternalLink,
  ArrowRight, CheckCircle, AlertCircle, Info, Gift,
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency, formatPercent } from "@/lib/utils";

/* ─── Static data (locale-safe) ─────────────────────────────── */
const STATS = {
  revenue:     12480.50,
  commissions:  1840.00,
  sales:             231,
  clicks:           4821,
  convRate:         4.79,
  growth:          "+12.4%",
};

const CHART  = [28, 42, 35, 58, 50, 72, 65, 80, 70, 88, 78, 95];
const MONTHS = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];

const HISTORY = [
  { id:"1", product:"Masterclass Marketing Digital", date:"27 mai 2026", amount:78.80,  commission:39.40, status:"paid"    as const },
  { id:"2", product:"Pack Templates Notion Pro",     date:"26 mai 2026", amount:24.50,  commission:12.25, status:"paid"    as const },
  { id:"3", product:"Cours React & Next.js Avancé",  date:"25 mai 2026", amount:103.95, commission:51.98, status:"pending" as const },
  { id:"4", product:"Guide SEO Automation 2025",     date:"24 mai 2026", amount:17.40,  commission:8.70,  status:"paid"    as const },
  { id:"5", product:"Masterclass Marketing Digital", date:"23 mai 2026", amount:78.80,  commission:39.40, status:"paid"    as const },
];

const PRODUCTS = [
  { id:"1", name:"Masterclass Marketing Digital", category:"Formation",     commission:"40%", rating:4.9, color:"#ff2020", clicks:892  },
  { id:"2", name:"Pack Templates Notion Pro",     category:"Templates",     commission:"50%", rating:4.8, color:"#a855f7", clicks:436  },
  { id:"3", name:"Cours React & Next.js Avancé",  category:"Développement", commission:"35%", rating:5.0, color:"#3b82f6", clicks:218  },
  { id:"4", name:"Guide SEO Automation 2025",     category:"Ebook",         commission:"60%", rating:4.7, color:"#f59e0b", clicks:1275 },
];

type NotifEntry = {
  id: string; type: string;
  icon: React.ElementType;
  title: string; desc: string; time: string; read: boolean;
};

const NOTIFS: NotifEntry[] = [
  { id:"1", type:"commission", icon:DollarSign,  title:"Commission reçue",   desc:"€39.40 crédités — Masterclass Marketing",    time:"Il y a 2h", read:false },
  { id:"2", type:"sale",       icon:ShoppingBag, title:"Nouvelle vente !",   desc:"Pack Templates Notion vendu via votre lien", time:"Il y a 5h", read:false },
  { id:"3", type:"info",       icon:Info,        title:"Paiement programmé", desc:"Virement €1 840 prévu le 1er juin",          time:"Hier",      read:true  },
  { id:"4", type:"award",      icon:Award,       title:"Objectif atteint !", desc:"Vous dépassez €10 000 de revenus cumulés",   time:"Il y a 2j", read:true  },
];

const NOTIF_COLORS: Record<string,string> = {
  commission: "bg-green-500/10 border-green-500/20 text-green-400",
  sale:       "bg-blue-500/10  border-blue-500/20  text-blue-400",
  info:       "bg-white/[0.05] border-white/[0.08] text-white/50",
  award:      "bg-amber-500/10 border-amber-500/20 text-amber-400",
};

/* ─── Framer variants — whileInView only (SSR-safe) ─────────── */
const fadeUp: Variants = {
  hidden: { opacity:0, y:22 },
  show:   { opacity:1, y:0, transition:{ duration:0.55, ease:"easeOut" } },
};
const stagger: Variants = { hidden:{}, show:{ transition:{ staggerChildren:0.07 } } };

/* ─── Component ──────────────────────────────────────────────── */
export default function DashboardClient({
  userName, affiliateCode, userEmail,
}: {
  userName: string; affiliateCode?: string; userEmail?: string;
}) {
  const [copied, setCopied]       = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs]       = useState<NotifEntry[]>(NOTIFS);

  const unread        = notifs.filter(n => !n.read).length;
  const avatarLetter  = (userName || userEmail || "A")[0].toUpperCase();
  const affiliateLink = affiliateCode ? `https://ljaffiliate.com/ref/${affiliateCode}` : null;

  const copyLink = () => {
    if (!affiliateLink) return;
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const statCards = [
    { title:"Revenus totaux",   value:formatCurrency(STATS.revenue),    icon:DollarSign,   color:"red"   as const, change:"12.4%", changePositive:true,  index:0 },
    { title:"Commissions dues", value:formatCurrency(STATS.commissions), icon:BarChart3,    color:"amber" as const, subtitle:"Versement le 1er juin",      index:1 },
    { title:"Ventes réalisées", value:String(STATS.sales),               icon:ShoppingBag,  color:"green" as const, change:"8.2%",  changePositive:true,  index:2 },
    { title:"Clics totaux",     value:String(STATS.clicks),              icon:MousePointer, color:"blue"  as const, subtitle:"30 derniers jours",          index:3 },
  ];

  return (
    <div className="space-y-6 max-w-[1200px]">

      {/* ─── HEADER ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up">
        {/* Avatar + identity */}
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background:"linear-gradient(135deg,rgba(255,32,32,0.25),rgba(255,32,32,0.05))",
                border:"1px solid rgba(255,32,32,0.28)",
                backdropFilter:"blur(20px)",
                boxShadow:"0 0 24px rgba(255,32,32,0.15)",
              }}
            >
              <span className="text-[#ff7070] text-[19px] font-bold">{avatarLetter}</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0a0a0b] pulse-dot" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-[20px] font-bold text-white tracking-tight">
                Bonjour, {userName}
              </h1>
              <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                <Award className="w-2.5 h-2.5 text-amber-400" />
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Pro</span>
              </span>
            </div>
            <p className="text-[13px] text-white/40 mt-0.5">
              Conversion{" "}
              <span className="text-[#ff5050] font-semibold">{formatPercent(STATS.convRate)}</span>
              {"  ·  "}{STATS.growth} ce mois
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium text-white/45 hover:text-white/75 border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Accueil</span>
          </Link>

          <button
            onClick={() => setNotifOpen(true)}
            className="relative p-2.5 rounded-xl text-white/40 hover:text-white border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200"
          >
            <Bell className="w-4 h-4" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-[#ff2020] rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ─── STAT CARDS ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {statCards.map(s => <StatCard key={s.index} {...s} />)}
      </div>

      {/* ─── AFFILIATE LINK BANNER ───────────────────────────── */}
      {affiliateLink && (
        <div
          className="animate-fade-up delay-300 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl overflow-hidden"
          style={{
            background:"rgba(255,32,32,0.04)",
            border:"1px solid rgba(255,32,32,0.15)",
            backdropFilter:"blur(20px)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff2020]/30 to-transparent" />

          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background:"rgba(255,32,32,0.15)", border:"1px solid rgba(255,32,32,0.25)" }}
            >
              <LinkIcon className="w-4 h-4 text-[#ff5050]" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-0.5">Votre lien affilié</div>
              <code className="text-[13px] font-mono text-[#ff6060] truncate block max-w-xs sm:max-w-sm lg:max-w-md">
                {affiliateLink}
              </code>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={affiliateLink} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg text-white/35 hover:text-white/65 border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200"
              style={copied
                ? { background:"rgba(74,222,128,0.1)", border:"1px solid rgba(74,222,128,0.25)", color:"#4ade80" }
                : { background:"rgba(255,32,32,0.12)", border:"1px solid rgba(255,32,32,0.25)",  color:"#ff6060" }}
            >
              {copied
                ? <><Check   className="w-3.5 h-3.5" /> Copié !</>
                : <><Copy   className="w-3.5 h-3.5" /> Copier le lien</>}
            </button>
          </div>
        </div>
      )}

      {/* ─── CHART + PERFORMANCE ─────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Revenue bar chart */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once:true, margin:"-60px" }}
          className="lg:col-span-2 relative p-5 rounded-2xl overflow-hidden"
          style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(20px)" }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[14px] font-semibold text-white">Revenus — 12 mois</div>
              <div className="text-[12px] text-white/35 mt-0.5">Total {formatCurrency(STATS.revenue)}</div>
            </div>
            <Link href="/dashboard/stats" className="flex items-center gap-1 text-[12px] text-[#ff5050] hover:text-[#ff4040] transition-colors">
              Détails <ArrowUpRight className="w-3 h-3" />
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex items-end gap-1 h-32">
            {CHART.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-[3px] grow-bar"
                style={{
                  height:`${h}%`, animationDelay:`${i * 0.04}s`,
                  background: i === CHART.length - 1
                    ? "linear-gradient(to top,#ff2020,#ff6060)"
                    : i >= CHART.length - 3 ? "rgba(255,32,32,0.28)" : "rgba(255,32,32,0.12)",
                }}
              />
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="flex justify-between mt-2">
            {MONTHS.map(m => <span key={m} className="text-[9px] text-white/20 flex-1 text-center">{m}</span>)}
          </motion.div>
        </motion.div>

        {/* Performance metrics */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once:true, margin:"-60px" }}
          className="relative p-5 rounded-2xl"
          style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(20px)" }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          <motion.div variants={fadeUp} className="text-[14px] font-semibold text-white mb-5">Performance</motion.div>
          <div className="space-y-5">
            {[
              { label:"Clics / jour",       val:"161",  pct:81 },
              { label:"Conversions / mois", val:"231",  pct:77 },
              { label:"Taux de rebond",     val:"28%",  pct:28 },
              { label:"Commission moy.",    val:"40%",  pct:40 },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="flex justify-between text-[12px] mb-1.5">
                  <span className="text-white/40">{item.label}</span>
                  <span className="text-white font-semibold">{item.val}</span>
                </div>
                <div className="h-[3px] rounded-full bg-white/[0.05] overflow-hidden">
                  <motion.div
                    initial={{ width:0 }} whileInView={{ width:`${item.pct}%` }}
                    viewport={{ once:true }}
                    transition={{ delay:0.1*i, duration:0.7, ease:[0.16,1,0.3,1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[#ff2020] to-[#ff5050]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} className="mt-5 pt-5 border-t border-white/[0.05] flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[12px] text-white/35">Position <span className="text-white font-semibold">#3</span> ce mois</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ─── HISTORY + PRODUCTS ──────────────────────────────── */}
      <div className="grid lg:grid-cols-5 gap-4">

        {/* Transaction history */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once:true, margin:"-60px" }}
          className="lg:col-span-3 relative rounded-2xl overflow-hidden"
          style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(20px)" }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          <motion.div variants={fadeUp} className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-white/30" strokeWidth={1.75} />
              <span className="text-[14px] font-semibold text-white">Historique des ventes</span>
            </div>
            <Link href="/dashboard/commissions" className="flex items-center gap-1 text-[12px] text-[#ff5050] hover:text-[#ff4040] transition-colors">
              Tout voir <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <div className="divide-y divide-white/[0.03]">
            {HISTORY.map(tx => (
              <motion.div key={tx.id} variants={fadeUp}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:"rgba(255,32,32,0.1)", border:"1px solid rgba(255,32,32,0.15)" }}>
                    <Package className="w-3.5 h-3.5 text-[#ff5050]" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-white truncate">{tx.product}</div>
                    <div className="text-[11px] text-white/30 mt-0.5">{tx.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-[13px] font-semibold text-white">{formatCurrency(tx.amount)}</div>
                    <div className="text-[11px] text-green-400 font-medium">+{formatCurrency(tx.commission)}</div>
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    tx.status === "paid"
                      ? "bg-green-500/10 border-green-500/20 text-green-400"
                      : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                  }`}>
                    {tx.status === "paid"
                      ? <><CheckCircle  className="w-2.5 h-2.5" /> Payé</>
                      : <><AlertCircle className="w-2.5 h-2.5" /> En attente</>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Affiliated products */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once:true, margin:"-60px" }}
          className="lg:col-span-2 relative rounded-2xl overflow-hidden flex flex-col"
          style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(20px)" }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          <motion.div variants={fadeUp} className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
            <div className="flex items-center gap-2.5">
              <Gift className="w-4 h-4 text-white/30" strokeWidth={1.75} />
              <span className="text-[14px] font-semibold text-white">Mes produits affiliés</span>
            </div>
            <Link href="/dashboard/links" className="flex items-center gap-1 text-[12px] text-[#ff5050] hover:text-[#ff4040] transition-colors">
              Gérer <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <div className="p-3 space-y-2 flex-1">
            {PRODUCTS.map(p => (
              <motion.div key={p.id} variants={fadeUp}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-200 cursor-pointer">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:`${p.color}18`, border:`1px solid ${p.color}28` }}>
                  <Package className="w-3.5 h-3.5" style={{ color:p.color }} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-white truncate">{p.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-white/30">{p.category}</span>
                    <span className="text-[10px] text-white/15">·</span>
                    <span className="text-[10px] font-bold" style={{ color:p.color }}>{p.commission}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-0.5 justify-end">
                    <Star className="w-2.5 h-2.5 fill-[#ff2020] text-[#ff2020]" />
                    <span className="text-[10px] font-semibold text-white/60">{p.rating}</span>
                  </div>
                  <div className="text-[11px] text-white/25 mt-0.5">{p.clicks} clics</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="px-4 pb-4">
            <Link href="/products"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-dashed border-white/[0.08] text-[12px] font-medium text-white/30 hover:text-white/55 hover:border-white/[0.15] transition-all duration-200">
              <TrendingUp className="w-3.5 h-3.5" />
              Parcourir 340+ produits
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ─── NOTIFICATION PANEL (AnimatePresence — CSR only) ─── */}
      <AnimatePresence>
        {notifOpen && (
          <>
            <motion.div key="overlay"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              style={{ backdropFilter:"blur(4px)" }}
              onClick={() => setNotifOpen(false)}
            />
            <motion.aside key="panel"
              initial={{ opacity:0, x:320 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:320 }}
              transition={{ type:"spring", damping:28, stiffness:220 }}
              className="fixed top-0 right-0 bottom-0 w-80 z-50 flex flex-col"
              style={{ background:"rgba(10,10,11,0.97)", borderLeft:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(32px)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-white/50" />
                  <span className="text-[15px] font-semibold text-white">Notifications</span>
                  {unread > 0 && (
                    <span className="min-w-[18px] h-[18px] px-1 bg-[#ff2020] rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                      {unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {unread > 0 && (
                    <button onClick={() => setNotifs(prev => prev.map(n => ({ ...n, read:true })))}
                      className="text-[11px] text-[#ff5050] hover:text-[#ff4040] px-2 py-1 font-medium transition-colors">
                      Tout lire
                    </button>
                  )}
                  <button onClick={() => setNotifOpen(false)}
                    className="p-1.5 rounded-lg text-white/35 hover:text-white hover:bg-white/[0.05] transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto">
                {notifs.map(n => (
                  <div key={n.id}
                    className={`relative flex gap-3.5 px-5 py-4 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${!n.read ? "bg-[#ff2020]/[0.025]" : ""}`}>
                    {!n.read && <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#ff2020]" />}
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${NOTIF_COLORS[n.type]}`}>
                      <n.icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <span className="text-[13px] font-semibold text-white leading-tight">{n.title}</span>
                        {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[#ff2020] flex-shrink-0 mt-1" />}
                      </div>
                      <div className="text-[12px] text-white/40 leading-relaxed">{n.desc}</div>
                      <div className="text-[11px] text-white/20 mt-1">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-white/[0.05]">
                <Link href="/dashboard/settings"
                  className="flex items-center justify-center gap-2 text-[12px] text-white/30 hover:text-white/50 transition-colors">
                  Préférences <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
