"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon: LucideIcon;
  color?: "brand" | "green" | "amber" | "red";
  index?: number;
}

const colorMap = {
  brand: "bg-brand-500/10 text-brand-400 border-brand-500/20",
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  red: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function StatCard({ title, value, change, changePositive, icon: Icon, color = "brand", index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="p-6 rounded-2xl bg-gray-900/80 border border-white/10 hover:border-white/20 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0", colorMap[color])}>
          <Icon className="w-5 h-5" />
        </div>
        {change && (
          <span className={cn("text-xs font-medium px-2 py-1 rounded-full", changePositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>
            {changePositive ? "+" : ""}{change}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-500 text-sm">{title}</div>
    </motion.div>
  );
}
