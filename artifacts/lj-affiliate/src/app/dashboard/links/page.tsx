"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Link as LinkIcon, Copy, ExternalLink, ToggleLeft, ToggleRight, Search, ArrowUpRight } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

const mockLinks = [
  { id: "1", name: "Promotion Printemps", code: "SPRING24", target_url: "https://exemple.com/promo", clicks: 1842, conversions: 89, revenue: 4250, is_active: true, created_at: "2024-03-01" },
  { id: "2", name: "Newsletter Mai", code: "NEWS05", target_url: "https://exemple.com/news", clicks: 956, conversions: 42, revenue: 2100, is_active: true, created_at: "2024-05-01" },
  { id: "3", name: "Campagne Instagram", code: "INSTA01", target_url: "https://exemple.com/insta", clicks: 2023, conversions: 100, revenue: 6130, is_active: false, created_at: "2024-04-15" },
  { id: "4", name: "Email Black Friday", code: "BF2024", target_url: "https://exemple.com/bf", clicks: 3210, conversions: 180, revenue: 9800, is_active: true, created_at: "2024-11-20" },
];

export default function LinksPage() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = mockLinks.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) || l.code.toLowerCase().includes(search.toLowerCase())
  );

  const copyLink = (code: string) => {
    navigator.clipboard.writeText(`https://lj-affiliate.com/r/${code}`);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-[1000px]">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Mes liens</h1>
          <p className="text-[13px] text-white/40 mt-0.5">{mockLinks.length} liens d'affiliation</p>
        </div>
        <button className="btn-red flex items-center gap-2 px-4 py-2.5 text-[13px]">
          <Plus className="w-3.5 h-3.5" />
          Créer un lien
        </button>
      </motion.div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
        <input
          type="text"
          placeholder="Rechercher par nom ou code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-premium w-full pl-10 pr-4 py-2.5 text-[13px]"
        />
      </div>

      {/* Links */}
      <div className="space-y-2">
        {filtered.map((link, i) => (
          <motion.div
            key={link.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative group p-4 rounded-2xl bg-[#111113] border border-white/[0.06] hover:border-white/[0.1] transition-all"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ff2020]/10 border border-[#ff2020]/15 flex items-center justify-center flex-shrink-0">
                  <LinkIcon className="w-4 h-4 text-[#ff5050]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[14px] font-semibold text-white">{link.name}</h3>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${link.is_active ? "bg-green-500/10 text-green-400 border border-green-500/15" : "bg-white/5 text-white/30 border border-white/08"}`}>
                      {link.is_active ? "Actif" : "Inactif"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-[11px] font-mono text-[#ff5050] bg-[#ff2020]/08 px-2 py-0.5 rounded-md border border-[#ff2020]/10">
                      {link.code}
                    </code>
                    <button onClick={() => copyLink(link.code)} className="text-white/25 hover:text-white/60 transition-colors">
                      {copied === link.code ? <span className="text-green-400 text-[10px]">Copié !</span> : <Copy className="w-3 h-3" />}
                    </button>
                    <a href={link.target_url} target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-white/60 transition-colors">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5 sm:gap-6">
                <div className="text-center">
                  <div className="text-[15px] font-bold text-white tracking-tight">{formatNumber(link.clicks)}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wide">Clics</div>
                </div>
                <div className="text-center">
                  <div className="text-[15px] font-bold text-white tracking-tight">{formatNumber(link.conversions)}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wide">Conv.</div>
                </div>
                <div className="text-center">
                  <div className="text-[15px] font-bold text-green-400 tracking-tight">{formatCurrency(link.revenue)}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wide">Revenus</div>
                </div>
                <button className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-colors">
                  {link.is_active ? <ToggleRight className="w-5 h-5 text-[#ff5050]" /> : <ToggleLeft className="w-5 h-5" />}
                </button>
                <a href="#" className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
