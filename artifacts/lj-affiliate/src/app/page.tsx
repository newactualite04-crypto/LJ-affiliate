"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Link as LinkIcon, BarChart3, Shield, ArrowRight, Star, Users, DollarSign } from "lucide-react";

const features = [
  {
    icon: LinkIcon,
    title: "Liens intelligents",
    description: "Créez et gérez vos liens d'affiliation avec suivi en temps réel.",
  },
  {
    icon: BarChart3,
    title: "Analytiques avancées",
    description: "Visualisez vos performances avec des tableaux de bord détaillés.",
  },
  {
    icon: DollarSign,
    title: "Commissions optimisées",
    description: "Suivez et maximisez vos revenus d'affiliation automatiquement.",
  },
  {
    icon: Shield,
    title: "Sécurité totale",
    description: "Vos données et transactions protégées par Supabase Auth.",
  },
];

const stats = [
  { label: "Affiliés actifs", value: "2,400+", icon: Users },
  { label: "Revenus générés", value: "€1.2M+", icon: DollarSign },
  { label: "Liens créés", value: "18,000+", icon: LinkIcon },
  { label: "Taux de conversion", value: "4.8%", icon: TrendingUp },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-brand-950 to-slate-950">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-xl">LJ Affiliate</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Connexion
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
            <Star className="w-3 h-3" />
            Plateforme d'affiliation nouvelle génération
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Transformez vos liens en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
              revenus passifs
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            LJ Affiliate vous donne tous les outils pour créer, suivre et optimiser vos campagnes d'affiliation avec une précision chirurgicale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              Démarrer maintenant
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20"
            >
              Se connecter
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-20"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <stat.icon className="w-6 h-6 text-brand-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Une suite complète d'outils pour gérer votre programme d'affiliation de A à Z.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-500/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-bold">LJ Affiliate</span>
          </div>
          <p className="text-gray-600 text-sm">
            © 2026 LJ Affiliate. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
