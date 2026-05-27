"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-4">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#ff2020]/10 border border-[#ff2020]/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-6 h-6 text-[#ff5050]" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight mb-2">Une erreur s'est produite</h1>
        <p className="text-white/40 text-[13px] mb-8">{error.message || "Erreur inattendue. Veuillez réessayer."}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-red px-5 py-2.5 text-[13px]">Réessayer</button>
          <Link href="/" className="btn-ghost px-5 py-2.5 text-[13px]">Accueil</Link>
        </div>
      </div>
    </div>
  );
}
