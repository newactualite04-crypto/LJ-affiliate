"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { TrendingUp, Mail, Lock, User, Eye, EyeOff, Loader2, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { register } from "@/app/actions/auth";

const initialState = { error: null as string | null, success: false };

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, initialState);
  const [showPassword, setShowPassword] = useState(false);

  /* ── Succès : confirmation email requise ── */
  if (state.success) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-sm w-full"
        >
          <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-7 h-7 text-green-400" />
          </div>
          <h2 className="text-[24px] font-bold tracking-tight mb-2">Vérifiez vos emails</h2>
          <p className="text-[13px] text-white/40 mb-6 leading-relaxed">
            Un lien de confirmation a été envoyé à votre adresse email. Cliquez dessus pour activer votre compte et accéder à votre dashboard.
          </p>
          <div className="relative p-4 rounded-xl bg-[#111113] border border-white/[0.06] text-left mb-6">
            <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-2">Expéditeur</div>
            <div className="text-[13px] text-white/60">noreply@supabase.io</div>
          </div>
          <Link href="/auth/login" className="btn-ghost inline-flex px-6 py-2.5 text-[13px] font-medium">
            Retour à la connexion
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-white/35 hover:text-white/65 text-[13px] transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Accueil
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-[#ff2020] flex items-center justify-center glow-red-sm">
            <TrendingUp className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-[15px]">LJ Affiliate</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[24px] font-bold tracking-tight mb-1">Créer un compte</h1>
          <p className="text-[13px] text-white/40">Rejoignez la plateforme et commencez à générer des revenus</p>
        </div>

        {/* Avantage badge */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-[#ff2020]/06 border border-[#ff2020]/12 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#ff5050] flex-shrink-0" />
          <span className="text-[12px] text-white/45">
            Lien affilié généré automatiquement — commissions jusqu'à 60%
          </span>
        </div>

        {/* Erreur */}
        {state.error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 rounded-xl bg-[#ff2020]/10 border border-[#ff2020]/20 text-[#ff6060] text-[13px]"
          >
            {state.error}
          </motion.div>
        )}

        <form action={formAction} className="space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-[11px] font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
              Nom complet
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
              <input
                type="text"
                name="fullName"
                required
                autoComplete="name"
                placeholder="Jean Dupont"
                className="input-premium w-full pl-10 pr-4 py-3 text-[13px]"
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Mot de passe */}
          <div>
            <label className="block text-[11px] font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Minimum 8 caractères"
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
            <p className="text-[11px] text-white/25 mt-1.5">
              Minimum 8 caractères, incluez chiffres et symboles
            </p>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn-red w-full py-3 text-[13px] font-semibold flex items-center justify-center gap-2 mt-2"
          >
            {isPending
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Création du compte...</>
              : "Créer mon compte gratuit"
            }
          </button>

          <p className="text-[11px] text-white/20 text-center">
            En vous inscrivant, vous acceptez nos{" "}
            <a href="#" className="text-white/35 hover:text-white/55 transition-colors">CGU</a>
            {" "}et{" "}
            <a href="#" className="text-white/35 hover:text-white/55 transition-colors">Politique de confidentialité</a>
          </p>
        </form>

        <p className="text-center text-[13px] text-white/30 mt-6">
          Déjà un compte ?{" "}
          <Link href="/auth/login" className="text-[#ff6060] hover:text-[#ff4040] font-semibold transition-colors">
            Se connecter
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
