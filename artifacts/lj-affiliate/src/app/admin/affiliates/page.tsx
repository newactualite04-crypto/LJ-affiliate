"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserCheck, UserX, ExternalLink, Mail, TrendingUp } from "lucide-react";
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

export default function AffiliatesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockAffiliates.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || a.status === filter;
    return matchSearch && matchFilter;
  });

  const statusConfig = {
    active: { label: "Actif", class: "bg-green-500/10 text-green-400 border-green-500/20" },
    suspended: { label: "Suspendu", class: "bg-red-500/10 text-red-400 border-red-500/20" },
    pending: { label: "En attente", class: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Gestion des affiliés</h1>
        <p className="text-gray-500 text-sm mt-1">{mockAffiliates.length} affiliés enregistrés</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher un affilié..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-900/80 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "suspended", "pending"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? "bg-brand-500 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}
            >
              {f === "all" ? "Tous" : f === "active" ? "Actifs" : f === "suspended" ? "Suspendus" : "En attente"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/80 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left text-gray-500 text-xs font-medium uppercase tracking-wide">Affilié</th>
                <th className="p-4 text-right text-gray-500 text-xs font-medium uppercase tracking-wide">Revenus</th>
                <th className="p-4 text-right text-gray-500 text-xs font-medium uppercase tracking-wide">Conv.</th>
                <th className="p-4 text-right text-gray-500 text-xs font-medium uppercase tracking-wide">Liens</th>
                <th className="p-4 text-center text-gray-500 text-xs font-medium uppercase tracking-wide">Statut</th>
                <th className="p-4 text-center text-gray-500 text-xs font-medium uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((affiliate, i) => {
                const cfg = statusConfig[affiliate.status as keyof typeof statusConfig];
                return (
                  <motion.tr
                    key={affiliate.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-brand-400 font-semibold text-sm">{affiliate.name[0]}</span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{affiliate.name}</div>
                          <div className="text-gray-600 text-xs">{affiliate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right text-green-400 font-semibold text-sm">{formatCurrency(affiliate.revenue)}</td>
                    <td className="p-4 text-right text-gray-300 text-sm">{formatNumber(affiliate.conversions)}</td>
                    <td className="p-4 text-right text-gray-300 text-sm">{affiliate.links}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.class}`}>{cfg.label}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 rounded-lg text-gray-500 hover:text-brand-400 hover:bg-brand-500/10 transition-colors" title="Voir stats">
                          <TrendingUp className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-500 hover:text-brand-400 hover:bg-brand-500/10 transition-colors" title="Envoyer email">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-500 hover:text-green-400 hover:bg-green-500/10 transition-colors" title="Activer">
                          <UserCheck className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Suspendre">
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
