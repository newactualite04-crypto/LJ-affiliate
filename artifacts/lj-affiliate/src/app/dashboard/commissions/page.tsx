"use client";

import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle, XCircle, ArrowDownToLine } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency, formatDate } from "@/lib/utils";

const mockCommissions = [
  { id: "1", period: "Juin 2024", amount: 840, status: "paid" as const, paid_at: "2024-07-05" },
  { id: "2", period: "Juillet 2024", amount: 1120, status: "approved" as const, paid_at: null },
  { id: "3", period: "Août 2024", amount: 960, status: "pending" as const, paid_at: null },
  { id: "4", period: "Mai 2024", amount: 720, status: "paid" as const, paid_at: "2024-06-05" },
];

const statusConfig = {
  paid: { label: "Payé", icon: CheckCircle, class: "bg-green-500/10 text-green-400 border-green-500/20" },
  approved: { label: "Approuvé", icon: Clock, class: "bg-brand-500/10 text-brand-400 border-brand-500/20" },
  pending: { label: "En attente", icon: Clock, class: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  rejected: { label: "Rejeté", icon: XCircle, class: "bg-red-500/10 text-red-400 border-red-500/20" },
};

export default function CommissionsPage() {
  const total = mockCommissions.reduce((a, c) => a + c.amount, 0);
  const paid = mockCommissions.filter(c => c.status === "paid").reduce((a, c) => a + c.amount, 0);
  const pending = mockCommissions.filter(c => c.status === "pending").reduce((a, c) => a + c.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Commissions</h1>
        <p className="text-gray-500 text-sm mt-1">Suivi de vos paiements et versements</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total commissions" value={formatCurrency(total)} icon={DollarSign} color="brand" index={0} />
        <StatCard title="Montant payé" value={formatCurrency(paid)} icon={CheckCircle} color="green" index={1} />
        <StatCard title="En attente" value={formatCurrency(pending)} icon={Clock} color="amber" index={2} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-900/80 border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-white font-semibold">Historique des commissions</h2>
        </div>
        <div className="divide-y divide-white/5">
          {mockCommissions.map((commission, i) => {
            const cfg = statusConfig[commission.status];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={commission.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.07 }}
                className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${cfg.class}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{commission.period}</div>
                    <div className="text-gray-500 text-sm">
                      {commission.paid_at ? `Payé le ${formatDate(commission.paid_at)}` : "Paiement en cours"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.class}`}>
                    {cfg.label}
                  </span>
                  <div className="text-right">
                    <div className="text-white font-bold">{formatCurrency(commission.amount)}</div>
                    {commission.status === "approved" && (
                      <button className="flex items-center gap-1 text-brand-400 hover:text-brand-300 text-xs mt-0.5 transition-colors">
                        <ArrowDownToLine className="w-3 h-3" />
                        Demander
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
