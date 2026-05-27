"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, BarChart3, Link as LinkIcon, DollarSign, Shield, Zap, ChevronRight, Star, Globe, Lock } from "lucide-react";
import { useRef } from "react";

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const features = [
  { icon: LinkIcon, title: "Liens intelligents", desc: "Créez des liens d'affiliation trackés en un clic. Suivi précis de chaque clic et conversion en temps réel." },
  { icon: BarChart3, title: "Analytiques avancées", desc: "Tableaux de bord détaillés avec graphiques interactifs. Visualisez vos performances à la seconde près." },
  { icon: DollarSign, title: "Commissions auto", desc: "Calcul automatique des commissions. Approbation en un clic et versement direct vers vos affiliés." },
  { icon: Shield, title: "Fraude détectée", desc: "Algorithmes anti-fraude intégrés. Protégez votre programme des abus et maximisez votre ROI." },
  { icon: Globe, title: "Multi-devises", desc: "Gérez vos affiliés dans le monde entier. Convertissez automatiquement en EUR, USD, GBP et plus." },
  { icon: Zap, title: "API puissante", desc: "Intégrez LJ Affiliate dans votre stack existante. SDK JS, webhooks et endpoints RESTful complets." },
];

const stats = [
  { value: "2.4K+", label: "Affiliés actifs" },
  { value: "€1.2M", label: "Revenus générés" },
  { value: "18K+", label: "Liens créés" },
  { value: "4.8%", label: "Taux de conversion" },
];

const testimonials = [
  { name: "Marie Leclerc", role: "Directrice Marketing, ShopNow", text: "LJ Affiliate a multiplié nos ventes par 3 en 6 mois. L'interface est dingue, nos affiliés adorent.", avatar: "M" },
  { name: "Thomas B.", role: "CEO, TechStart", text: "Enfin une plateforme d'affiliation qui ressemble à 2025. Simple, puissante, sans bugs.", avatar: "T" },
  { name: "Sophie R.", role: "Growth Manager, Ecom Pro", text: "Le meilleur investissement de l'année. ROI x8 en 3 mois. Support réactif et interface premium.", avatar: "S" },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/[0.06]"
        style={{ backdropFilter: "blur(24px)" }}
      >
        <div className="container-lg h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#ff2020] flex items-center justify-center glow-red-sm group-hover:glow-red transition-all duration-300">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[15px] tracking-tight">LJ Affiliate</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {["Fonctionnalités", "Tarifs", "Affiliés", "API"].map((item) => (
              <a key={item} href="#" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="hidden sm:block text-sm text-white/60 hover:text-white transition-colors px-3 py-1.5">
              Connexion
            </Link>
            <Link href="/auth/register" className="btn-red px-4 py-2 text-sm flex items-center gap-1.5">
              Commencer
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ───────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 bg-grid opacity-100" />

        {/* Red glow orb */}
        <motion.div
          style={{
            y: heroY,
            background: "radial-gradient(ellipse at center, rgba(255,32,32,0.08) 0%, rgba(255,32,32,0.03) 40%, transparent 70%)",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[15%] w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,32,32,0.05) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 left-[10%] w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,32,32,0.04) 0%, transparent 70%)" }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 glass border border-white/08 rounded-full px-4 py-1.5 mb-8 text-sm"
          >
            <span className="dot-red" />
            <span className="text-white/60">Nouvelle version 2.0 disponible</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.95] mb-6"
          >
            Votre programme
            <br />
            d'affiliation{" "}
            <span className="text-gradient-red">premium</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            LJ Affiliate transforme vos affiliés en machine de croissance. Tracking précis, commissions automatiques, interface de référence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-3 justify-center"
          >
            <Link href="/auth/register" className="btn-red px-7 py-3.5 text-[15px] flex items-center gap-2 w-full sm:w-auto justify-center">
              Démarrer gratuitement
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/dashboard" className="btn-ghost px-7 py-3.5 text-[15px] flex items-center gap-2 w-full sm:w-auto justify-center">
              Voir la démo
              <span className="text-white/30">→</span>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-3 justify-center mt-10"
          >
            <div className="flex -space-x-2">
              {["M", "T", "S", "J", "P"].map((l, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/70">
                  {l}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#ff2020] text-[#ff2020]" />
                ))}
              </div>
              <span className="text-white/40 text-sm">2 400+ affiliés actifs</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0b] to-transparent pointer-events-none" />
      </section>

      {/* ── Stats ─────────────────────────────── */}
      <section className="py-16 border-y border-white/[0.04]">
        <div className="container-lg">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold tracking-tighter text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ──────────────────────────── */}
      <section className="section">
        <div className="container-lg">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="inline-block badge-red mb-4">
              Fonctionnalités
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-4">
              Tout pour scaler votre affiliation
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 max-w-xl mx-auto text-lg">
              Une suite complète d'outils conçue pour les équipes qui veulent des résultats, pas de la complexité.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card p-6 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ff2020]/10 border border-[#ff2020]/20 flex items-center justify-center mb-4 group-hover:bg-[#ff2020]/15 transition-colors">
                  <f.icon className="w-4.5 h-4.5 text-[#ff6060]" style={{ width: 18, height: 18 }} />
                </div>
                <h3 className="font-semibold text-white mb-2 text-[15px]">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Dashboard preview ─────────────────── */}
      <section className="section overflow-hidden">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow behind */}
            <div className="absolute inset-0 -z-10 rounded-3xl" style={{
              background: "radial-gradient(ellipse at 50% 100%, rgba(255,32,32,0.12) 0%, transparent 70%)"
            }} />

            <div className="card overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#111113] border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-[#0a0a0b] rounded-md px-3 py-1 text-xs text-white/30 text-center max-w-xs mx-auto">
                    app.lj-affiliate.com/dashboard
                  </div>
                </div>
              </div>
              {/* Dashboard preview content */}
              <div className="bg-[#0a0a0b] p-6">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: "Clics totaux", val: "18,421", color: "text-white" },
                    { label: "Conversions", val: "842", color: "text-[#4ade80]" },
                    { label: "Revenus", val: "€24,180", color: "text-white" },
                    { label: "Commissions", val: "€7,254", color: "text-[#fbbf24]" },
                  ].map((item, i) => (
                    <div key={i} className="bg-[#111113] border border-white/[0.06] rounded-xl p-4">
                      <div className="text-white/40 text-xs mb-2">{item.label}</div>
                      <div className={`text-xl font-bold tracking-tight ${item.color}`}>{item.val}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#111113] border border-white/[0.06] rounded-xl p-4 h-32 flex items-end gap-1">
                  {[30, 45, 35, 60, 55, 80, 70, 90, 75, 95, 85, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 rounded-t origin-bottom"
                      style={{
                        height: `${h}%`,
                        background: i === 11 ? "linear-gradient(to top, #ff2020, #ff6060)" : "rgba(255,32,32,0.2)"
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────── */}
      <section className="section">
        <div className="container-lg">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="inline-block badge-red mb-4">Témoignages</motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold tracking-tighter">
              Ils ont scalé leur affiliation
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-4"
          >
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="card p-6">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-[#ff2020] text-[#ff2020]" />
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff2020]/20 to-[#ff2020]/5 border border-[#ff2020]/20 flex items-center justify-center text-xs font-bold text-[#ff6060]">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section className="section">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative card-red p-12 sm:p-16 rounded-3xl text-center overflow-hidden"
          >
            <div className="absolute inset-0 -z-10" style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(255,32,32,0.15) 0%, transparent 60%)"
            }} />
            <div className="inline-block badge-red mb-4">Démarrez maintenant</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-4">
              Prêt à transformer votre
              <br />
              <span className="text-gradient-red">programme d'affiliation ?</span>
            </h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              Rejoignez 2 400+ affiliés qui utilisent LJ Affiliate pour maximiser leurs revenus.
            </p>
            <Link href="/auth/register" className="btn-red inline-flex items-center gap-2 px-8 py-4 text-base">
              Créer mon compte gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-white/25 text-xs mt-4 flex items-center gap-1.5 justify-center">
              <Lock className="w-3 h-3" />
              Aucune carte bancaire requise
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-12">
        <div className="container-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#ff2020] flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-[15px]">LJ Affiliate</span>
            </Link>
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/40">
              {["Fonctionnalités", "Tarifs", "API", "Support", "Confidentialité", "CGU"].map((item) => (
                <a key={item} href="#" className="hover:text-white/70 transition-colors">{item}</a>
              ))}
            </div>
          </div>
          <div className="divider pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
              <p className="text-white/25 text-sm">© 2026 LJ Affiliate. Tous droits réservés.</p>
              <div className="flex items-center gap-1.5 text-white/25 text-sm">
                <div className="dot-green" />
                Tous les systèmes opérationnels
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
