"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TrendingUp, Mail, Lock, User, Eye, EyeOff, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-16 h-16 rounded-full bg-[#ff2020]/10 border border-[#ff2020]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-7 h-7 text-[#ff6060]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Compte créé</h2>
          <p className="text-white/45 text-sm mb-6">Vérifiez votre email pour confirmer votre compte avant de vous connecter.</p>
          <Link href="/auth/login" className="btn-red inline-flex px-6 py-2.5 text-sm">
            Aller à la connexion
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
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Accueil
        </Link>

        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-[#ff2020] flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-[15px]">LJ Affiliate</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-1">Créer un compte</h1>
        <p className="text-white/45 text-sm mb-8">Rejoignez LJ Affiliate et commencez à générer des revenus</p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 rounded-lg bg-[#ff2020]/10 border border-[#ff2020]/20 text-[#ff6060] text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Nom complet</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Jean Dupont"
                className="input-premium w-full pl-10 pr-4 py-3 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="vous@exemple.com"
                className="input-premium w-full pl-10 pr-4 py-3 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Minimum 8 caractères"
                className="input-premium w-full pl-10 pr-11 py-3 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-red w-full py-3 text-sm flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Création...</> : "Créer mon compte"}
          </button>
        </form>

        <p className="text-center text-white/35 text-sm mt-6">
          Déjà un compte ?{" "}
          <Link href="/auth/login" className="text-[#ff6060] hover:text-[#ff4040] font-medium transition-colors">
            Se connecter
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
