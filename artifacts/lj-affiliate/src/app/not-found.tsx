import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-[120px] font-black text-[#ff2020]/20 leading-none mb-4 select-none" style={{ fontVariantNumeric: "tabular-nums" }}>
          404
        </div>
        <div className="flex items-center gap-2 justify-center mb-3">
          <div className="w-7 h-7 rounded-lg bg-[#ff2020] flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-white">LJ Affiliate</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Page introuvable</h1>
        <p className="text-white/40 text-[14px] mb-8">Cette page n'existe pas ou a été déplacée.</p>
        <Link href="/" className="btn-red inline-flex items-center gap-2 px-6 py-2.5 text-[13px]">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
