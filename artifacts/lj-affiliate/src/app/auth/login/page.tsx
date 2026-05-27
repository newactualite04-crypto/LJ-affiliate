"use client";

import { useActionState, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TrendingUp, Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { login } from "@/app/actions/auth";

const initialState = { error: null as string | null };

/* ── Sous-composant pour lire les searchParams sans hydration mismatch ── */
function SearchParamError() {
  const params = useSearchParams();
  const err = params.get("error");
  if (!err) return null;
  const msg = err === "auth_error"
    ? "Lien expiré. Veuillez vous reconnecter."
    : "Une erreur s'est produite.";
  return (
    <div className="mb-5 p-3 rounded-xl bg-[#ff2020]/10 border border-[#ff2020]/20 text-[#ff6060] text-[13px]">
      {msg}
    </div>
  );
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex">

      {/* ── Panel gauche ── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#0d0d0f] border-r border-white/[0.04]">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(255,32,32,0.08) 0%, transparent 60%)"
        }} />

        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ff2020] flex items-center justify-center glow-red-sm">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[15px]">LJ Affiliate</span>
          </Link>

          <div>
            <div className="text-[38px] font-bold tracking-[-0.04em] leading-[0.95] mb-4">
              Gérez votre affiliation
              <br />
              <span className="text-gradient-red">avec précision.</span>
            </div>
            <p className="text-[14px] text-white/40 leading-relaxed max-w-sm mb-8">
              Rejoignez 12 400+ affiliés qui utilisent LJ Affiliate pour générer des revenus passifs en promouvant des produits digitaux.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: "€2.8M+", label: "Revenus distribués" },
                { val: "4.9%", label: "Taux de conversion" },
                { val: "340+", label: "Produits disponibles" },
                { val: "99.9%", label: "Uptime garanti" },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <div className="text-[22px] font-bold tracking-tight text-white">{s.val}</div>
                  <div className="text-[11px] text-white/35 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[12px] text-white/25">
            <div className="dot-green" />
            Tous les systèmes opérationnels
          </div>
        </div>
      </div>

      {/* ── Panel droit ── */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm animate-fade-up">
          <Link href="/" className="inline-flex items-center gap-2 text-white/35 hover:text-white/65 text-[13px] transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" />
            Accueil
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-lg bg-[#ff2020] flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[15px]">LJ Affiliate</span>
          </div>

          <h1 className="text-[24px] font-bold tracking-tight mb-1">Bon retour</h1>
          <p className="text-[13px] text-white/40 mb-8">Connectez-vous à votre espace affilié</p>

          {/* Erreur URL param (confirmation email expirée etc.) */}
          <Suspense fallback={null}>
            <SearchParamError />
          </Suspense>

          {/* Erreur action serveur */}
          {state.error && (
            <div className="mb-5 p-3 rounded-xl bg-[#ff2020]/10 border border-[#ff2020]/20 text-[#ff6060] text-[13px] animate-fade-up">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  className="input-premium w-full pl-10 pr-4 py-3 text-[13px]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                  Mot de passe
                </label>
                <a href="#" className="text-[12px] text-[#ff6060] hover:text-[#ff4040] transition-colors">
                  Oublié ?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="input-premium w-full pl-10 pr-11 py-3 text-[13px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn-red w-full py-3 text-[13px] font-semibold flex items-center justify-center gap-2 mt-2"
            >
              {isPending
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Connexion...</>
                : "Se connecter"
              }
            </button>
          </form>

          <p className="text-center text-[13px] text-white/30 mt-6">
            Pas encore de compte ?{" "}
            <Link href="/auth/register" className="text-[#ff6060] hover:text-[#ff4040] font-semibold transition-colors">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
