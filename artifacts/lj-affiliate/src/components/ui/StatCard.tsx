import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon: LucideIcon;
  color?: "red" | "green" | "amber" | "blue" | "white";
  index?: number;
  subtitle?: string;
}

const colorConfig = {
  red:   { icon: "bg-[#ff2020]/10 border-[#ff2020]/20 text-[#ff5050]",  glow: "hover:border-[#ff2020]/20 hover:shadow-[0_0_32px_rgba(255,32,32,0.08)]" },
  green: { icon: "bg-green-500/10 border-green-500/20 text-green-400",  glow: "hover:border-green-500/20 hover:shadow-[0_0_32px_rgba(74,222,128,0.07)]" },
  amber: { icon: "bg-amber-500/10 border-amber-500/20 text-amber-400",  glow: "hover:border-amber-500/20 hover:shadow-[0_0_32px_rgba(251,191,36,0.07)]" },
  blue:  { icon: "bg-blue-500/10  border-blue-500/20  text-blue-400",   glow: "hover:border-blue-500/20  hover:shadow-[0_0_32px_rgba(59,130,246,0.07)]" },
  white: { icon: "bg-white/5 border-white/10 text-white/60",            glow: "hover:border-white/10" },
};

export default function StatCard({
  title, value, change, changePositive, icon: Icon, color = "red", index = 0, subtitle,
}: StatCardProps) {
  const cfg = colorConfig[color];

  return (
    <div
      className={cn(
        "relative p-5 rounded-2xl border overflow-hidden transition-all duration-300 cursor-default group",
        "bg-white/[0.025] backdrop-blur-xl border-white/[0.06]",
        "animate-fade-up",
        cfg.glow
      )}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110",
          cfg.icon
        )}>
          <Icon className="w-4 h-4" strokeWidth={1.75} />
        </div>
        {change && (
          <div className={cn(
            "flex items-center gap-0.5 text-[11px] font-semibold px-2 py-1 rounded-lg",
            changePositive
              ? "bg-green-500/10 text-green-400 border border-green-500/15"
              : "bg-red-500/10 text-red-400 border border-red-500/15"
          )}>
            {changePositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {changePositive ? "+" : ""}{change}
          </div>
        )}
      </div>

      <div
        className="text-[1.75rem] font-bold tracking-[-0.04em] text-white leading-none mb-1.5 animate-count"
        style={{ animationDelay: `${0.1 + index * 0.07}s` }}
      >
        {value}
      </div>
      <div className="text-[13px] text-white/40 font-medium">{title}</div>
      {subtitle && <div className="text-[11px] text-white/25 mt-0.5">{subtitle}</div>}
    </div>
  );
}
