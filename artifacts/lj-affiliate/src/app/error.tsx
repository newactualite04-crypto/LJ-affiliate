"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-red-400 text-2xl">!</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Une erreur s'est produite</h1>
        <p className="text-gray-500 mb-8 text-sm">{error.message || "Erreur inattendue"}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors border border-white/10"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
