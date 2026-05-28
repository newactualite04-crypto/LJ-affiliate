"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Package, Plus, Search, Edit3, Trash2, ToggleLeft, ToggleRight,
  Star, TrendingUp, DollarSign, ChevronRight,
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity:0, y:16 },
  show:   { opacity:1, y:0, transition:{ duration:0.45, ease:"easeOut" } },
};
const stagger: Variants = { hidden:{}, show:{ transition:{ staggerChildren:0.05 } } };

const MOCK_PRODUCTS = [
  { id:"1", name:"Masterclass Marketing Digital",  category:"Formation",     price:197, commission:40, sales:1842, rating:4.9, active:true,  revenue:36244 },
  { id:"2", name:"Pack Templates Notion Pro",      category:"Templates",     price:49,  commission:50, sales:3210, rating:4.8, active:true,  revenue:15729 },
  { id:"3", name:"Cours React & Next.js Avancé",  category:"Développement", price:297, commission:35, sales:921,  rating:5.0, active:true,  revenue:27354 },
  { id:"4", name:"Guide SEO Automation 2025",      category:"Ebook",         price:29,  commission:60, sales:5480, rating:4.7, active:true,  revenue:15892 },
  { id:"5", name:"Formation Copywriting Pro",      category:"Formation",     price:127, commission:45, sales:632,  rating:4.6, active:false, revenue:8031  },
  { id:"6", name:"Pack Presets Lightroom Studio",  category:"Photo",         price:39,  commission:55, sales:2100, rating:4.8, active:true,  revenue:8190  },
];

const CATEGORY_COLOR: Record<string,string> = {
  Formation:     "#ff2020",
  Templates:     "#a855f7",
  Développement: "#3b82f6",
  Ebook:         "#f59e0b",
  Photo:         "#10b981",
};

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  function toggleActive(id: string) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  }

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="animate-fade-up flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-white tracking-tight">Gestion produits</h1>
          <p className="text-[13px] text-white/40 mt-0.5">{products.length} produits dans le catalogue</p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200"
          style={{ background:"#ff2020", boxShadow:"0 0 20px rgba(255,32,32,0.3)" }}>
          <Plus className="w-3.5 h-3.5" />
          Ajouter un produit
        </button>
      </div>

      {/* Search */}
      <div className="animate-fade-up delay-100 relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un produit ou catégorie..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/25 outline-none transition-all duration-200"
          style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}
        />
      </div>

      {/* Products grid */}
      <motion.div
        variants={stagger} initial="hidden" whileInView="show"
        viewport={{ once:true }}
        className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {filtered.map(p => {
          const color = CATEGORY_COLOR[p.category] || "#ff2020";
          return (
            <motion.div key={p.id} variants={fadeUp}
              className="group relative rounded-2xl border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200 overflow-hidden"
              style={{ background:"rgba(255,255,255,0.025)", backdropFilter:"blur(20px)" }}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background:`${color}18`, border:`1px solid ${color}28` }}>
                    <Package className="w-4 h-4" style={{ color }} strokeWidth={1.75} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold border ${
                      p.active
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : "bg-white/5 border-white/10 text-white/30"
                    }`}>{p.active ? "Actif" : "Inactif"}</span>
                    <button onClick={() => toggleActive(p.id)} className="text-white/30 hover:text-white/60 transition-colors">
                      {p.active
                        ? <ToggleRight className="w-4 h-4 text-green-400" />
                        : <ToggleLeft className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-[13px] font-semibold text-white leading-tight mb-1">{p.name}</div>
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
                    style={{ background:`${color}15`, color, border:`1px solid ${color}25` }}>{p.category}</span>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] text-white/50 font-semibold">{p.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                    <div className="text-[13px] font-bold text-white">{formatCurrency(p.price)}</div>
                    <div className="text-[9px] text-white/30 mt-0.5">Prix</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                    <div className="text-[13px] font-bold" style={{ color }}>{p.commission}%</div>
                    <div className="text-[9px] text-white/30 mt-0.5">Commission</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                    <div className="text-[13px] font-bold text-white">{formatNumber(p.sales)}</div>
                    <div className="text-[9px] text-white/30 mt-0.5">Ventes</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                  <span className="text-[12px] text-green-400 font-semibold">{formatCurrency(p.revenue)} générés</span>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-colors">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
