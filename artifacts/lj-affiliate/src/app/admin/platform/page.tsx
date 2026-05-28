"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Sliders, Save, RotateCcw, TrendingUp, Users, DollarSign,
  Package, BarChart3, CheckCircle, AlertCircle,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity:0, y:16 },
  show:   { opacity:1, y:0, transition:{ duration:0.45, ease:"easeOut" } },
};
const stagger: Variants = { hidden:{}, show:{ transition:{ staggerChildren:0.07 } } };

type PlatformStats = {
  totalAffiliates:   number;
  totalRevenue:      number;
  totalCommissions:  number;
  totalProducts:     number;
  conversionRate:    number;
  monthlyGrowth:     number;
  averageCommission: number;
  activeLinks:       number;
};

const DEFAULTS: PlatformStats = {
  totalAffiliates:   247,
  totalRevenue:      128450,
  totalCommissions:  38535,
  totalProducts:     342,
  conversionRate:    4.21,
  monthlyGrowth:     23,
  averageCommission: 40,
  activeLinks:       1842,
};

export default function AdminPlatformPage() {
  const [stats, setStats]   = useState<PlatformStats>(DEFAULTS);
  const [saved, setSaved]   = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(key: keyof PlatformStats, value: string) {
    setStats(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
    setSaved(false);
  }

  function handleSave() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  }

  function handleReset() {
    setStats(DEFAULTS);
    setSaved(false);
  }

  const fields: { key: keyof PlatformStats; label: string; desc: string; prefix?: string; suffix?: string; icon: React.ElementType; color: string }[] = [
    { key:"totalAffiliates",   label:"Affiliés actifs",          desc:"Nombre total d'affiliés inscrits",             icon:Users,     color:"#ff2020",  suffix:"" },
    { key:"totalRevenue",      label:"Revenus totaux (€)",       desc:"Chiffre d'affaires cumulé de la plateforme",   icon:DollarSign,color:"#10b981",  suffix:"€" },
    { key:"totalCommissions",  label:"Commissions versées (€)",  desc:"Total des commissions payées aux affiliés",    icon:TrendingUp,color:"#f59e0b",  suffix:"€" },
    { key:"totalProducts",     label:"Produits actifs",          desc:"Nombre de produits dans le catalogue",         icon:Package,   color:"#a855f7",  suffix:"" },
    { key:"conversionRate",    label:"Taux de conversion (%)",   desc:"Taux moyen de conversion sur la plateforme",   icon:BarChart3, color:"#3b82f6",  suffix:"%" },
    { key:"monthlyGrowth",     label:"Croissance mensuelle (%)", desc:"Pourcentage de croissance mois sur mois",      icon:TrendingUp,color:"#ff2020",  suffix:"%" },
    { key:"averageCommission", label:"Commission moyenne (%)",   desc:"Taux de commission moyen sur les produits",    icon:DollarSign,color:"#f59e0b",  suffix:"%" },
    { key:"activeLinks",       label:"Liens actifs",             desc:"Nombre total de liens d'affiliation actifs",   icon:BarChart3, color:"#10b981",  suffix:"" },
  ];

  return (
    <div className="space-y-6 max-w-[900px]">

      <div className="animate-fade-up flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-white tracking-tight">Statistiques plateforme</h1>
          <p className="text-[13px] text-white/40 mt-0.5">Modifier les données affichées sur la page d'accueil</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium text-white/45 border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200">
            <RotateCcw className="w-3.5 h-3.5" />
            Réinitialiser
          </button>
          <button onClick={handleSave} disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 disabled:opacity-60"
            style={{ background: saved ? "#10b981" : "#ff2020", boxShadow: saved ? "0 0 16px rgba(16,185,129,0.3)" : "0 0 16px rgba(255,32,32,0.25)" }}>
            {saved
              ? <><CheckCircle className="w-3.5 h-3.5" /> Sauvegardé</>
              : loading
                ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
                : <><Save className="w-3.5 h-3.5" /> Sauvegarder</>}
          </button>
        </div>
      </div>

      {/* Warning */}
      <div className="animate-fade-up delay-100 flex items-start gap-3 p-4 rounded-2xl border border-amber-500/20"
        style={{ background:"rgba(245,158,11,0.06)", backdropFilter:"blur(20px)" }}>
        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-[13px] font-semibold text-amber-400 mb-0.5">Données de présentation</div>
          <div className="text-[12px] text-white/40 leading-relaxed">
            Ces statistiques sont affichées sur la landing page publique. Elles n'affectent pas les données réelles du système.
          </div>
        </div>
      </div>

      {/* Fields grid */}
      <motion.div
        variants={stagger} initial="hidden" whileInView="show"
        viewport={{ once:true }}
        className="grid sm:grid-cols-2 gap-4"
      >
        {fields.map(f => (
          <motion.div key={f.key} variants={fadeUp}
            className="p-4 rounded-2xl border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
            style={{ background:"rgba(255,255,255,0.025)", backdropFilter:"blur(20px)" }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background:`${f.color}15`, border:`1px solid ${f.color}25` }}>
                <f.icon className="w-3.5 h-3.5" style={{ color:f.color }} strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-white">{f.label}</div>
                <div className="text-[10px] text-white/35">{f.desc}</div>
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                value={stats[f.key]}
                onChange={e => handleChange(f.key, e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-[15px] font-bold text-white outline-none transition-all duration-200"
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)" }}
                step={f.key === "conversionRate" || f.key === "monthlyGrowth" || f.key === "averageCommission" ? "0.01" : "1"}
              />
              {f.suffix && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-white/30 font-medium">
                  {f.suffix}
                </span>
              )}
            </div>
            <div className="mt-2 text-[11px] text-white/25">
              Valeur actuelle :{" "}
              <span className="text-white/50 font-semibold">
                {f.key === "totalRevenue" || f.key === "totalCommissions"
                  ? formatCurrency(stats[f.key])
                  : `${stats[f.key]}${f.suffix}`}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
