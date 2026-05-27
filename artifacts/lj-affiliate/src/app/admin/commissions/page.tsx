"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, DollarSign, Filter, Check, X } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency } from "@/lib/utils";

const mockCommissions = [
  { id: "1", affiliate: "Marie Martin", amount: 1240, status: "pending" as const, period: "Août 2024", created_at: "2024-09-01" },
  { id: "2", affiliate: "Pierre Durand", amount: 980, status: "approved" as const, period: "Août 2024", created_at: "2024-09-01" },
  { id: "3", affiliate: "Sophie Leclerc", amount: 840, status: "paid" as const, period: "Juillet 2024", created_at: "2024-08-01" },
  { id: "4", affiliate: "Thomas Bernard", amount: 760, status: "paid" as const, period: "Juillet 2024", created_at: "2024-08-01" },
  { id: "5", affiliate: "Julie Moreau", amount: 680, status: "pending" as const, period: "Août 2024", created_at: "2024-09-01" },
  { id: "6", affiliate: "Nicolas Petit", amount: 420, status: "approved" as const, period: "Août 2024", created_at: "2024-09-01" },
];

const statusCfg = {
  pending: { label: "En attente", dot: "bg-amber-400", badge: "bg-amber-500/10 text-amber-400 border-amber-500/15" },
  approved: { label: "Approuvé", dot: "bg-[#ff5050]", badge: "bg-[#ff2020]/10 text-[#ff5050] border-[#ff2020]/15" },
  paid: { label: "Payé", dot: "bg-green-400", badge: "bg-green-500/10 text-green-400 border-green-500/15" },
};

export default function AdminCommissionsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = mockCommissions.filter(c => filter === "all" || c.status === filter);
  const totalPending = mockCommissions.filter(c => c.status === "pending").reduce((a, c) => a + c.amount, 0);
  const totalApproved = mockCommissions.filter(c => c.status === "approved").reduce((a, c) => a + c.amount, 0);
  const totalPaid = mockCommissions.filter(c => c.status === "paid").reduce((a, c) => a + c.amount, 0);

  const filters = [
    { key: "all", label: "Toutes" },
    { key: "pending", label: "En attente" },
    { key: "approved", label: "Approuvées" },
    { key: "paid", label: "Payées" },
  ];

  return (
    <div className="space-y-6 max-w-[1000px]">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-semibold text-white tracking-tight">Commissions</h1>
        <p className="text-[13px] text-white/40 mt-0.5">Gestion des paiements des affiliés</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard title="À approuver" value={formatCurrency(totalPending)} icon={Clock} color="amber" index={0} />
        <StatCard title="À payer" value={formatCurrency(totalApproved)} icon={DollarSign} color="red" index={1} />
        <StatCard title="Payé ce mois" value={formatCurrency(totalPaid)} icon={CheckCircle} color="green" index={2} />
      </div>

      {/* Filter tabs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-white/25" />
        <div className="flex gap-1.5">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${filter === f.key ? "bg-[#ff2020]/15 text-[#ff5050] border border-[#ff2020]/20" : "bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white/70"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative rounded-2xl bg-[#111113] border border-white/[0.06] overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {["Affilié", "Période", "Montant", "Statut", "Actions"].map((h, i) => (
                  <th key={i} className={`px-5 py-3 text-[11px] font-medium text-white/25 uppercase tracking-wider ${i === 0 || i === 1 ? "text-left" : i === 3 ? "text-center" : i === 4 ? "text-right" : "text-right"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const cfg = statusCfg[c.status];
                return (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#ff2020]/10 border border-[#ff2020]/15 flex items-center justify-center">
                          <span className="text-[#ff6060] text-[11px] font-bold">{c.affiliate[0]}</span>
                        </div>
                        <span className="text-[13px] font-semibold text-white">{c.affiliate}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-white/50">{c.period}</td>
                    <td className="px-5 py-4 text-right text-[15px] font-bold text-white tracking-tight">{formatCurrency(c.amount)}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${cfg.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {c.status === "pending" && (
                          <button className="flex items-center gap-1 text-[11px] font-medium px-3 py-1.5 rounded-lg bg-[#ff2020]/10 text-[#ff5050] hover:bg-[#ff2020]/15 border border-[#ff2020]/15 transition-colors">
                            <Check className="w-3 h-3" />
                            Approuver
                          </button>
                        )}
                        {c.status === "approved" && (
                          <button className="flex items-center gap-1 text-[11px] font-medium px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/15 border border-green-500/15 transition-colors">
                            <DollarSign className="w-3 h-3" />
                            Payer
                          </button>
                        )}
                        {c.status !== "paid" && (
                          <button className="p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/08 transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
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
