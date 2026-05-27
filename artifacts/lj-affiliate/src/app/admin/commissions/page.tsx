"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, XCircle, DollarSign, Filter } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency, formatDate } from "@/lib/utils";

const mockCommissions = [
  { id: "1", affiliate: "Marie Martin", amount: 1240, status: "pending" as const, period: "Août 2024", created_at: "2024-09-01" },
  { id: "2", affiliate: "Pierre Durand", amount: 980, status: "approved" as const, period: "Août 2024", created_at: "2024-09-01" },
  { id: "3", affiliate: "Sophie Leclerc", amount: 840, status: "paid" as const, period: "Juillet 2024", created_at: "2024-08-01" },
  { id: "4", affiliate: "Thomas Bernard", amount: 760, status: "paid" as const, period: "Juillet 2024", created_at: "2024-08-01" },
  { id: "5", affiliate: "Julie Moreau", amount: 680, status: "pending" as const, period: "Août 2024", created_at: "2024-09-01" },
  { id: "6", affiliate: "Nicolas Petit", amount: 420, status: "approved" as const, period: "Août 2024", created_at: "2024-09-01" },
];

const statusConfig = {
  pending: { label: "En attente", icon: Clock, class: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  approved: { label: "Approuvé", icon: CheckCircle, class: "bg-brand-500/10 text-brand-400 border-brand-500/20" },
  paid: { label: "Payé", icon: CheckCircle, class: "bg-green-500/10 text-green-400 border-green-500/20" },
};

export default function AdminCommissionsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = mockCommissions.filter(c => filter === "all" || c.status === filter);

  const totalPending = mockCommissions.filter(c => c.status === "pending").reduce((a, c) => a + c.amount, 0);
  const totalApproved = mockCommissions.filter(c => c.status === "approved").reduce((a, c) => a + c.amount, 0);
  const totalPaid = mockCommissions.filter(c => c.status === "paid").reduce((a, c) => a + c.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Commissions</h1>
        <p className="text-gray-500 text-sm mt-1">Gestion des paiements des affiliés</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="En attente d'approbation" value={formatCurrency(totalPending)} icon={Clock} color="amber" index={0} />
        <StatCard title="Approuvées (à payer)" value={formatCurrency(totalApproved)} icon={DollarSign} color="brand" index={1} />
        <StatCard title="Total payé ce mois" value={formatCurrency(totalPaid)} icon={CheckCircle} color="green" index={2} />
      </div>

      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <div className="flex gap-2">
          {["all", "pending", "approved", "paid"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f ? "bg-brand-500 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}
            >
              {f === "all" ? "Tous" : f === "pending" ? "En attente" : f === "approved" ? "Approuvés" : "Payés"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/80 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left text-gray-500 text-xs uppercase">Affilié</th>
                <th className="p-4 text-left text-gray-500 text-xs uppercase">Période</th>
                <th className="p-4 text-right text-gray-500 text-xs uppercase">Montant</th>
                <th className="p-4 text-center text-gray-500 text-xs uppercase">Statut</th>
                <th className="p-4 text-center text-gray-500 text-xs uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((c, i) => {
                const cfg = statusConfig[c.status];
                const Icon = cfg.icon;
                return (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 text-white font-medium text-sm">{c.affiliate}</td>
                    <td className="p-4 text-gray-400 text-sm">{c.period}</td>
                    <td className="p-4 text-right text-white font-bold">{formatCurrency(c.amount)}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.class}`}>
                        <Icon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {c.status === "pending" && (
                          <button className="px-3 py-1 text-xs font-medium bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 rounded-lg border border-brand-500/20 transition-colors">
                            Approuver
                          </button>
                        )}
                        {c.status === "approved" && (
                          <button className="px-3 py-1 text-xs font-medium bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg border border-green-500/20 transition-colors">
                            Marquer payé
                          </button>
                        )}
                        {c.status !== "paid" && (
                          <button className="px-3 py-1 text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg border border-red-500/20 transition-colors">
                            Rejeter
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
      </div>
    </div>
  );
}
