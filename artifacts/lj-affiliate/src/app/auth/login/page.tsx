"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TrendingUp, Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email ou mot de passe incorrect");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#0d0d0f] border-r border-white/[0.04]">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0" style={{
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
            <div className="text-4xl font-bold tracking-tighter mb-4">
              Gérez votre affiliation
              <br />
              <span className="text-gradient-red">avec précision.</span>
            </div>
            <p className="text-white/45 leading-relaxed max-w-sm">
              Rejoignez 2 400+ affiliés qui utilisent LJ Affiliate pour suivre leurs performances et maximiser leurs revenus.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { val: "€1.2M+", label: "Revenus générés" },
                { val: "4.8%", label: "Taux de conversion" },
                { val: "18K+", label: "Liens actifs" },
                { val: "99.9%", label: "Uptime garanti" },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <div className="text-2xl font-bold tracking-tight text-white">{s.val}</div>
                  <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-white/25 text-sm">
            <div className="dot-green" />
            Tous les systèmes opérationnels
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" />
            Accueil
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-lg bg-[#ff2020] flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[15px]">LJ Affiliate</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight mb-1">Bon retour</h1>
          <p className="text-white/45 text-sm mb-8">Connectez-vous à votre espace affilié</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 rounded-lg bg-[#ff2020]/10 border border-[#ff2020]/20 text-[#ff6060] text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wide">Mot de passe</label>
                <a href="#" className="text-xs text-[#ff6060] hover:text-[#ff4040] transition-colors">Oublié ?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
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
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Connexion...</> : "Se connecter"}
            </button>
          </form>

          <p className="text-center text-white/35 text-sm mt-6">
            Pas encore de compte ?{" "}
            <Link href="/auth/register" className="text-[#ff6060] hover:text-[#ff4040] font-medium transition-colors">
              Créer un compte
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
