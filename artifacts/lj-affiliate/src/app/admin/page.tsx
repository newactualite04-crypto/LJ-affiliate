"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Users, DollarSign, Package, ShoppingCart, BarChart3, TrendingUp,
  ArrowUpRight, Shield, Home, ChevronRight, Settings, Sliders,
  CheckCircle, Clock, UserPlus, CreditCard, Activity,
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

/* ─── Data ───────────────────────────────────────────────────── */
const PLATFORM_STATS = {
  affiliates:   247,
  revenue:      128450,
  commissions:  38535,
  products:     342,
  orders:       1248,
  convRate:     4.21,
};

const CHART = [42, 58, 48, 72, 65, 80, 74, 92, 82, 96, 88, 100];
const MONTHS = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];

const ACTIVITY = [
  { id:"1", type:"conversion", user:"Marie Martin",   amount:240,  time:"2 min"  },
  { id:"2", type:"commission", user:"Pierre Durand",  amount:1120, time:"15 min" },
  { id:"3", type:"signup",     user:"Nicolas Petit",  amount:0,    time:"1h"     },
  { id:"4", type:"conversion", user:"Sophie Leclerc", amount:180,  time:"2h"     },
  { id:"5", type:"paid",       user:"Thomas Bernard", amount:960,  time:"3h"     },
];

const ACTIVITY_CFG: Record<string,{
  Icon: React.ElementType; dot: string; label: string; color: string;
}> = {
  conversion: { Icon:TrendingUp, dot:"bg-green-400",  label:"Conversion",  color:"text-green-400"  },
  commission: { Icon:DollarSign, dot:"bg-[#ff5050]",  label:"Commission",  color:"text-[#ff5050]"  },
  signup:     { Icon:UserPlus,   dot:"bg-amber-400",  label:"Inscription", color:"text-amber-400"  },
  paid:       { Icon:CreditCard, dot:"bg-blue-400",   label:"Paiement",    color:"text-blue-400"   },
};

const TOP_AFFILIATES = [
  { id:"1", name:"Marie Martin",    conversions:89, revenue:12480, rank:1 },
  { id:"2", name:"Pierre Durand",   conversions:72, revenue:9870,  rank:2 },
  { id:"3", name:"Sophie Leclerc",  conversions:61, revenue:8240,  rank:3 },
  { id:"4", name:"Thomas Bernard",  conversions:55, revenue:7650,  rank:4 },
  { id:"5", name:"Julie Moreau",    conversions:49, revenue:6890,  rank:5 },
];

const QUICK_ACCESS = [
  { href:"/admin/affiliates", icon:Users,       label:"Affiliés",     desc:"Gérer les affiliés",        color:"#ff2020", count:formatNumber(PLATFORM_STATS.affiliates) },
  { href:"/admin/products",   icon:Package,     label:"Produits",     desc:"Catalogue & commissions",   color:"#a855f7", count:String(PLATFORM_STATS.products) },
  { href:"/admin/orders",     icon:ShoppingCart,label:"Commandes",    desc:"Suivi des transactions",    color:"#3b82f6", count:formatNumber(PLATFORM_STATS.orders) },
  { href:"/admin/commissions",icon:CreditCard,  label:"Paiements",    desc:"Approuver les versements",  color:"#10b981", count:formatCurrency(PLATFORM_STATS.commissions) },
  { href:"/admin/stats",      icon:BarChart3,   label:"Statistiques", desc:"Analytics plateforme",      color:"#f59e0b", count:"12 mois" },
  { href:"/admin/platform",   icon:Sliders,     label:"Plateforme",   desc:"Modifier les stats",        color:"#6366f1", count:"Config" },
];

/* ─── Framer variants (whileInView — SSR-safe) ───────────────── */
const fadeUp: Variants = {
  hidden: { opacity:0, y:20 },
  show:   { opacity:1, y:0, transition:{ duration:0.5, ease:"easeOut" } },
};
const stagger: Variants = { hidden:{}, show:{ transition:{ staggerChildren:0.06 } } };

/* ─── Component ──────────────────────────────────────────────── */
export default function AdminPage() {
  const stats = [
    { title:"Affiliés actifs",     value:formatNumber(PLATFORM_STATS.affiliates),  icon:Users,       color:"white" as const, change:"18%",  changePositive:true,  index:0 },
    { title:"Revenus plateforme",  value:formatCurrency(PLATFORM_STATS.revenue),   icon:DollarSign,  color:"green" as const, change:"23%",  changePositive:true,  index:1 },
    { title:"Commissions versées", value:formatCurrency(PLATFORM_STATS.commissions),icon:TrendingUp, color:"red"   as const, change:"11%",  changePositive:true,  index:2 },
    { title:"Commandes ce mois",   value:formatNumber(PLATFORM_STATS.orders),      icon:ShoppingCart,color:"blue"  as const, change:"5.2%", changePositive:true,  index:3 },
  ];

  return (
    <div className="space-y-6 max-w-[1200px]">

      {/* ─── HEADER ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background:"rgba(251,191,36,0.1)", border:"1px solid rgba(251,191,36,0.2)" }}>
            <Shield className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-white tracking-tight">Dashboard PDG</h1>
            <p className="text-[13px] text-white/40 mt-0.5">
              Vue d'ensemble de la plateforme · Taux global{" "}
              <span className="text-[#ff5050] font-semibold">{formatPercent(PLATFORM_STATS.convRate)}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link href="/"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium text-white/45 hover:text-white/75 border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200">
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Accueil</span>
          </Link>
          <Link href="/admin/settings"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium text-white/45 hover:text-white/75 border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200">
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Config</span>
          </Link>
        </div>
      </div>

      {/* ─── STAT CARDS ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {stats.map(s => <StatCard key={s.index} {...s} />)}
      </div>

      {/* ─── CHART + ACTIVITY ────────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-4">

        <motion.div
          variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once:true, margin:"-60px" }}
          className="lg:col-span-2 relative p-5 rounded-2xl overflow-hidden"
          style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(20px)" }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[14px] font-semibold text-white">Revenus plateforme — 12 mois</div>
              <div className="text-[12px] text-white/35 mt-0.5">Total {formatCurrency(PLATFORM_STATS.revenue)}</div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-green-400 bg-green-500/10 border border-green-500/15 px-2.5 py-1 rounded-full font-semibold">
              <TrendingUp className="w-3 h-3" />+23%
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="flex items-end gap-1 h-32">
            {CHART.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-[3px] grow-bar"
                style={{
                  height:`${h}%`, animationDelay:`${i*0.04}s`,
                  background: i === CHART.length-1
                    ? "linear-gradient(to top,#ff2020,#ff6060)"
                    : i >= CHART.length-3 ? "rgba(255,32,32,0.28)" : "rgba(255,32,32,0.12)",
                }}
              />
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="flex justify-between mt-2">
            {MONTHS.map(m => <span key={m} className="text-[9px] text-white/20 flex-1 text-center">{m}</span>)}
          </motion.div>
        </motion.div>

        {/* Activity feed */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="show"
          viewport={{ once:true, margin:"-60px" }}
          className="relative p-5 rounded-2xl"
          style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(20px)" }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-white/30" strokeWidth={1.75} />
            <span className="text-[14px] font-semibold text-white">Activité récente</span>
          </motion.div>
          <div className="space-y-0.5">
            {ACTIVITY.map(a => {
              const cfg = ACTIVITY_CFG[a.type];
              return (
                <motion.div key={a.id} variants={fadeUp}
                  className="flex items-center gap-3 py-3 border-b border-white/[0.03] last:border-0">
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

      {/* ─── QUICK ACCESS ────────────────────────────────────── */}
      <motion.div
        variants={stagger} initial="hidden" whileInView="show"
        viewport={{ once:true, margin:"-60px" }}
      >
        <motion.div variants={fadeUp} className="text-[14px] font-semibold text-white mb-3">
          Gestion rapide
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_ACCESS.map(item => (
            <motion.div key={item.href} variants={fadeUp}>
              <Link href={item.href}
                className="group flex items-center gap-3 p-4 rounded-2xl border border-white/[0.06] hover:border-white/[0.1] bg-white/[0.025] hover:bg-white/[0.04] transition-all duration-200 block"
                style={{ backdropFilter:"blur(20px)" }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                  style={{ background:`${item.color}18`, border:`1px solid ${item.color}28` }}>
                  <item.icon className="w-4 h-4" style={{ color:item.color }} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-white">{item.label}</div>
                  <div className="text-[11px] text-white/35 mt-0.5 truncate">{item.desc}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] font-bold text-white/50">{item.count}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── TOP AFFILIATES ──────────────────────────────────── */}
      <motion.div
        variants={stagger} initial="hidden" whileInView="show"
        viewport={{ once:true, margin:"-60px" }}
        className="relative rounded-2xl overflow-hidden"
        style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(20px)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <motion.div variants={fadeUp} className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-white/30" strokeWidth={1.75} />
            <span className="text-[14px] font-semibold text-white">Top affiliés du mois</span>
          </div>
          <Link href="/admin/affiliates" className="flex items-center gap-1 text-[12px] text-[#ff5050] hover:text-[#ff4040] transition-colors">
            Voir tout <ArrowUpRight className="w-3 h-3" />
          </Link>
        </motion.div>
        <div className="divide-y divide-white/[0.03]">
          {TOP_AFFILIATES.map((a, i) => (
            <motion.div key={a.id} variants={fadeUp}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                  i === 0 ? "bg-amber-500/20 text-amber-400 border border-amber-500/20"
                          : "bg-white/[0.04] text-white/30 border border-white/[0.06]"}`}>
                  {a.rank}
                </div>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:"rgba(255,32,32,0.1)", border:"1px solid rgba(255,32,32,0.15)" }}>
                  <span className="text-[#ff6060] text-[12px] font-bold">{a.name[0]}</span>
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white">{a.name}</div>
                  <div className="text-[11px] text-white/30">{a.conversions} conversions</div>
                </div>
              </div>
              <div className="text-[15px] font-bold text-white tracking-[-0.02em]">{formatCurrency(a.revenue)}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
