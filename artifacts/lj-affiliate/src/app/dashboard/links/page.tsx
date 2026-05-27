"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Link as LinkIcon, Copy, ExternalLink, ToggleLeft, ToggleRight, Search } from "lucide-react";
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
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.code.toLowerCase().includes(search.toLowerCase())
  );

  const copyLink = (code: string) => {
    navigator.clipboard.writeText(`https://lj-affiliate.com/r/${code}`);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Mes liens</h1>
          <p className="text-gray-500 text-sm mt-1">{mockLinks.length} liens d'affiliation</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-xl transition-colors">
          <Plus className="w-4 h-4" />
          Créer un lien
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Rechercher un lien..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-900/80 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/50 transition-colors"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((link, i) => (
          <motion.div
            key={link.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="p-5 bg-gray-900/80 border border-white/10 rounded-2xl hover:border-white/20 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <LinkIcon className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold">{link.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${link.is_active ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-500"}`}>
                      {link.is_active ? "Actif" : "Inactif"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">{link.code}</code>
                    <button onClick={() => copyLink(link.code)} className="text-gray-600 hover:text-gray-300 transition-colors">
                      {copied === link.code ? <span className="text-green-400 text-xs">Copié !</span> : <Copy className="w-3 h-3" />}
                    </button>
                    <a href={link.target_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-300 transition-colors">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-white font-semibold">{formatNumber(link.clicks)}</div>
                  <div className="text-gray-500 text-xs">Clics</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">{formatNumber(link.conversions)}</div>
                  <div className="text-gray-500 text-xs">Conv.</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-semibold">{formatCurrency(link.revenue)}</div>
                  <div className="text-gray-500 text-xs">Revenus</div>
                </div>
                <button className="text-gray-500 hover:text-brand-400 transition-colors">
                  {link.is_active ? <ToggleRight className="w-6 h-6 text-brand-400" /> : <ToggleLeft className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
