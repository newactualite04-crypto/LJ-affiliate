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
  paid: { label: "Payé", icon: CheckCircle, dot: "bg-green-400", badge: "bg-green-500/10 text-green-400 border-green-500/15" },
  approved: { label: "Approuvé", icon: Clock, dot: "bg-[#ff5050]", badge: "bg-[#ff2020]/10 text-[#ff5050] border-[#ff2020]/15" },
  pending: { label: "En attente", icon: Clock, dot: "bg-amber-400", badge: "bg-amber-500/10 text-amber-400 border-amber-500/15" },
  rejected: { label: "Rejeté", icon: XCircle, dot: "bg-red-500", badge: "bg-red-500/10 text-red-400 border-red-500/15" },
};

export default function CommissionsPage() {
  const total = mockCommissions.reduce((a, c) => a + c.amount, 0);
  const paid = mockCommissions.filter(c => c.status === "paid").reduce((a, c) => a + c.amount, 0);
  const pending = mockCommissions.filter(c => c.status === "pending").reduce((a, c) => a + c.amount, 0);

  return (
    <div className="space-y-6 max-w-[900px]">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-semibold text-white tracking-tight">Commissions</h1>
        <p className="text-[13px] text-white/40 mt-0.5">Suivi de vos paiements et versements</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard title="Total commissions" value={formatCurrency(total)} icon={DollarSign} color="red" index={0} />
        <StatCard title="Montant payé" value={formatCurrency(paid)} icon={CheckCircle} color="green" index={1} />
        <StatCard title="En attente" value={formatCurrency(pending)} icon={Clock} color="amber" index={2} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="relative rounded-2xl bg-[#111113] border border-white/[0.06] overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="px-5 py-4 border-b border-white/[0.04]">
          <div className="text-[14px] font-semibold text-white">Historique des commissions</div>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {mockCommissions.map((c, i) => {
            const cfg = statusConfig[c.status];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white/40" />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-white">{c.period}</div>
                    <div className="text-[12px] text-white/35 mt-0.5">
                      {c.paid_at ? `Versé le ${formatDate(c.paid_at)}` : "Paiement en cours"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${cfg.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                  <div className="text-right min-w-[80px]">
                    <div className="text-[15px] font-bold text-white tracking-tight">{formatCurrency(c.amount)}</div>
                    {c.status === "approved" && (
                      <button className="flex items-center gap-1 text-[#ff5050] hover:text-[#ff4040] text-[11px] mt-0.5 transition-colors ml-auto">
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
