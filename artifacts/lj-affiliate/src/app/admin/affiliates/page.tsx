"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserCheck, UserX, Mail, TrendingUp, MoreHorizontal } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

const mockAffiliates = [
  { id: "1", name: "Marie Martin", email: "marie@exemple.com", revenue: 12480, conversions: 89, links: 8, status: "active", joined: "2024-01-15" },
  { id: "2", name: "Pierre Durand", email: "pierre@exemple.com", revenue: 9870, conversions: 72, links: 5, status: "active", joined: "2024-02-08" },
  { id: "3", name: "Sophie Leclerc", email: "sophie@exemple.com", revenue: 8240, conversions: 61, links: 12, status: "active", joined: "2024-01-22" },
  { id: "4", name: "Thomas Bernard", email: "thomas@exemple.com", revenue: 7650, conversions: 55, links: 6, status: "suspended", joined: "2024-03-11" },
  { id: "5", name: "Julie Moreau", email: "julie@exemple.com", revenue: 6890, conversions: 49, links: 9, status: "active", joined: "2024-02-28" },
  { id: "6", name: "Nicolas Petit", email: "nicolas@exemple.com", revenue: 4200, conversions: 31, links: 3, status: "active", joined: "2024-04-05" },
  { id: "7", name: "Emma Richard", email: "emma@exemple.com", revenue: 2100, conversions: 18, links: 4, status: "pending", joined: "2024-05-20" },
];

const statusCfg = {
  active: { label: "Actif", dot: "bg-green-400", badge: "bg-green-500/10 text-green-400 border-green-500/15" },
  suspended: { label: "Suspendu", dot: "bg-red-400", badge: "bg-red-500/10 text-red-400 border-red-500/15" },
  pending: { label: "En attente", dot: "bg-amber-400", badge: "bg-amber-500/10 text-amber-400 border-amber-500/15" },
};

export default function AffiliatesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockAffiliates.filter(a => {
    const match = a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase());
    const filt = filter === "all" || a.status === filter;
    return match && filt;
  });

  const filters = [
    { key: "all", label: "Tous", count: mockAffiliates.length },
    { key: "active", label: "Actifs", count: mockAffiliates.filter(a => a.status === "active").length },
    { key: "suspended", label: "Suspendus", count: mockAffiliates.filter(a => a.status === "suspended").length },
    { key: "pending", label: "En attente", count: mockAffiliates.filter(a => a.status === "pending").length },
  ];

  return (
    <div className="space-y-6 max-w-[1100px]">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-semibold text-white tracking-tight">Gestion des affiliés</h1>
        <p className="text-[13px] text-white/40 mt-0.5">{mockAffiliates.length} affiliés enregistrés</p>
      </motion.div>

      {/* Filters + Search */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-premium w-full pl-10 pr-4 py-2.5 text-[13px]"
          />
        </div>
        <div className="flex gap-1.5">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-2 rounded-xl text-[12px] font-medium transition-all flex items-center gap-1.5 ${filter === f.key ? "btn-red" : "btn-ghost"}`}
            >
              {f.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${filter === f.key ? "bg-white/20" : "bg-white/[0.05]"}`}>{f.count}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="relative rounded-2xl bg-[#111113] border border-white/[0.06] overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {["Affilié", "Revenus", "Conversions", "Liens", "Statut", ""].map((h, i) => (
                  <th key={i} className={`px-5 py-3 text-[11px] font-medium text-white/25 uppercase tracking-wider ${i === 0 ? "text-left" : i === 4 ? "text-center" : i === 5 ? "" : "text-right"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => {
                const cfg = statusCfg[a.status as keyof typeof statusCfg];
                return (
                  <motion.tr
                    key={a.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.04 }}
                    className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#ff2020]/10 border border-[#ff2020]/15 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#ff6060] text-[12px] font-bold">{a.name[0]}</span>
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-white">{a.name}</div>
                          <div className="text-[11px] text-white/35">{a.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right text-[14px] font-bold text-white">{formatCurrency(a.revenue)}</td>
                    <td className="px-5 py-4 text-right text-[13px] text-white/60">{formatNumber(a.conversions)}</td>
                    <td className="px-5 py-4 text-right text-[13px] text-white/60">{a.links}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${cfg.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg text-white/30 hover:text-[#ff5050] hover:bg-[#ff2020]/08 transition-colors" title="Stats">
                          <TrendingUp className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-colors" title="Email">
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-white/30 hover:text-green-400 hover:bg-green-500/08 transition-colors" title="Activer">
                          <UserCheck className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/08 transition-colors" title="Suspendre">
                          <UserX className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-colors">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
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
