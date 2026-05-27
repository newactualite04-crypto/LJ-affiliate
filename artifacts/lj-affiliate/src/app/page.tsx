"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight, TrendingUp, BarChart3, Link as LinkIcon, DollarSign,
  Shield, Zap, ChevronRight, Star, Lock, Globe, Users, Package,
  MousePointer, ShoppingCart, CheckCircle, Sparkles, Play,
  BookOpen, Code, HeadphonesIcon, Award, Rocket
} from "lucide-react";

/* ─── Animation variants ───────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

/* ─── Data ──────────────────────────────────────────────── */
const globalStats = [
  { value: "12 400+", label: "Affiliés actifs", icon: Users },
  { value: "€2.8M", label: "Revenus distribués", icon: DollarSign },
  { value: "340+", label: "Produits digitaux", icon: Package },
  { value: "4.9%", label: "Taux de conversion", icon: TrendingUp },
];

const popularProducts = [
  {
    name: "Masterclass Marketing Digital",
    category: "Formation",
    price: "€197",
    commission: "40%",
    sales: 1842,
    rating: 4.9,
    icon: BookOpen,
    color: "from-[#ff2020]/20 to-[#ff2020]/5",
    border: "border-[#ff2020]/20",
  },
  {
    name: "Pack Templates Notion Pro",
    category: "Templates",
    price: "€49",
    commission: "50%",
    sales: 3210,
    rating: 4.8,
    icon: Package,
    color: "from-purple-500/20 to-purple-500/5",
    border: "border-purple-500/20",
  },
  {
    name: "Cours React & Next.js Avancé",
    category: "Développement",
    price: "€297",
    commission: "35%",
    sales: 921,
    rating: 5.0,
    icon: Code,
    color: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/20",
  },
  {
    name: "Guide SEO Automation 2025",
    category: "Ebook",
    price: "€29",
    commission: "60%",
    sales: 5480,
    rating: 4.7,
    icon: Zap,
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/20",
  },
];

const steps = [
  {
    number: "01",
    title: "Créez votre compte",
    desc: "Inscription gratuite en 2 minutes. Aucune carte bancaire requise pour démarrer.",
    icon: Rocket,
  },
  {
    number: "02",
    title: "Choisissez vos produits",
    desc: "Parcourez notre catalogue de 340+ produits digitaux à fort taux de commission.",
    icon: ShoppingCart,
  },
  {
    number: "03",
    title: "Partagez vos liens",
    desc: "Générez des liens trackés en un clic. Partagez sur vos réseaux, emails, blog.",
    icon: LinkIcon,
  },
  {
    number: "04",
    title: "Encaissez vos gains",
    desc: "Commissions versées automatiquement chaque mois. Suivi en temps réel depuis votre dashboard.",
    icon: DollarSign,
  },
];

const advantages = [
  {
    icon: Shield,
    title: "Tracking ultra-précis",
    desc: "Chaque clic, chaque vente tracké avec précision. Cookies 90 jours, attribution multi-touch.",
  },
  {
    icon: Zap,
    title: "Paiements automatiques",
    desc: "Virements mensuels automatiques dès €50. PayPal, virement bancaire, Wise disponibles.",
  },
  {
    icon: BarChart3,
    title: "Dashboard temps réel",
    desc: "Visualisez vos performances en direct. Graphiques, conversions, revenus — tout en un endroit.",
  },
  {
    icon: Globe,
    title: "Programme international",
    desc: "Opérez dans 40+ pays. Commissions en euro, dollar ou livre sterling selon vos préférences.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support dédié",
    desc: "Équipe support disponible 7j/7 par email et chat. Temps de réponse moyen : 2 heures.",
  },
  {
    icon: Award,
    title: "Commissions premium",
    desc: "Jusqu'à 60% de commission par vente. Les meilleurs taux du marché, sans conditions cachées.",
  },
];

const testimonials = [
  {
    name: "Camille Rossignol",
    role: "Créatrice de contenu",
    revenue: "€4 200 / mois",
    text: "En 3 mois avec LJ Affiliate, j'ai remplacé mon salaire. Le tracking est impeccable et les paiements toujours à l'heure.",
    avatar: "C",
  },
  {
    name: "Maxime Laval",
    role: "Développeur freelance",
    revenue: "€2 800 / mois",
    text: "J'ai ajouté quelques liens à mon blog tech et ça génère maintenant €2 800/mois en pilote automatique. Incroyable.",
    avatar: "M",
  },
  {
    name: "Sarah Boulanger",
    role: "Coach business",
    revenue: "€8 500 / mois",
    text: "La meilleure plateforme d'affiliation que j'ai testée. Interface claire, produits de qualité, commissions honnêtes.",
    avatar: "S",
  },
];

/* ─── Component ─────────────────────────────────────────── */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">

      {/* ════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05]"
        style={{ background: "rgba(10,10,11,0.85)", backdropFilter: "blur(24px)" }}
      >
        <div className="container-lg h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#ff2020] flex items-center justify-center glow-red-sm group-hover:glow-red transition-all duration-300">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[15px] tracking-tight">LJ Affiliate</span>
          </Link>

          {/* Nav links */}
          <div className="hidden lg:flex items-center gap-7">
            {[
              { label: "Produits", href: "/products" },
              { label: "Comment ça marche", href: "#how-it-works" },
              { label: "Avantages", href: "#advantages" },
              { label: "Affiliés", href: "/dashboard" },
            ].map((item) => (
              <a key={item.label} href={item.href}
                className="text-[13px] text-white/45 hover:text-white transition-colors duration-200">
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2.5">
            <Link href="/auth/login"
              className="hidden sm:block text-[13px] text-white/50 hover:text-white transition-colors px-3 py-1.5">
              Connexion
            </Link>
            <Link href="/auth/register" className="btn-red px-4 py-2 text-[13px] flex items-center gap-1.5">
              Commencer
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-100" />

        {/* Glow orbs */}
        <motion.div
          style={{
            y: heroY,
            background: "radial-gradient(ellipse at 50% 50%, rgba(255,32,32,0.1) 0%, rgba(255,32,32,0.03) 45%, transparent 70%)",
          }}
          className="absolute inset-0 pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 right-[12%] w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,32,32,0.06) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-[8%] w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,32,32,0.05) 0%, transparent 70%)" }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/[0.08] bg-white/[0.03]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ff5050]" />
            <span className="text-[13px] text-white/55">Plateforme #1 d'affiliation de produits digitaux en France</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
            className="text-[42px] sm:text-[58px] lg:text-[72px] xl:text-[84px] font-bold tracking-[-0.04em] leading-[0.92] mb-6"
          >
            Transformez vos ventes
            <br />
            <span className="relative">
              digitales en
              <span className="text-gradient-red"> revenus</span>
            </span>
            <br />
            automatiques.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            className="text-[16px] sm:text-[18px] text-white/45 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Plateforme moderne d'affiliation et de vente de produits digitaux.
            <br className="hidden sm:block" />
            Générez des revenus passifs en promouvant des formations, ebooks et outils premium.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-3 justify-center"
          >
            <Link href="/products"
              className="btn-red px-7 py-3.5 text-[14px] flex items-center gap-2 w-full sm:w-auto justify-center font-semibold">
              <Package className="w-4 h-4" />
              Découvrir les Produits
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/auth/register"
              className="btn-ghost px-7 py-3.5 text-[14px] flex items-center gap-2 w-full sm:w-auto justify-center font-medium">
              <TrendingUp className="w-4 h-4" />
              Devenir Affilié
              <span className="text-white/25 ml-1">→</span>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 justify-center mt-12"
          >
            <div className="flex items-center gap-2 text-[12px] text-white/30">
              <Lock className="w-3.5 h-3.5" />
              Aucune carte bancaire
            </div>
            <div className="w-px h-4 bg-white/[0.08]" />
            <div className="flex items-center gap-2 text-[12px] text-white/30">
              <CheckCircle className="w-3.5 h-3.5 text-green-500/60" />
              Inscription gratuite
            </div>
            <div className="w-px h-4 bg-white/[0.08]" />
            <div className="flex items-center gap-2 text-[12px] text-white/30">
              <Zap className="w-3.5 h-3.5 text-amber-500/60" />
              Commissions dès le 1er jour
            </div>
          </motion.div>

          {/* Social proof avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex items-center gap-3 justify-center mt-8"
          >
            <div className="flex -space-x-2">
              {["C", "M", "S", "J", "T", "A"].map((l, i) => (
                <div key={i}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border-2 border-[#0a0a0b] flex items-center justify-center text-[10px] font-bold text-white/60">
                  {l}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#ff2020] text-[#ff2020]" />
                ))}
              </div>
              <span className="text-[12px] text-white/35">12 400+ affiliés nous font confiance</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0b] to-transparent pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════
          STATS
      ════════════════════════════════════════ */}
      <section className="py-16 border-y border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(255,32,32,0.03) 0%, transparent 70%)"
        }} />
        <div className="container-lg relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {globalStats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[#ff2020]/10 border border-[#ff2020]/15 flex items-center justify-center">
                    <stat.icon className="w-3.5 h-3.5 text-[#ff5050]" />
                  </div>
                </div>
                <div className="text-[32px] sm:text-[38px] font-black tracking-[-0.04em] text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-[13px] text-white/35">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          POPULAR PRODUCTS
      ════════════════════════════════════════ */}
      <section className="section">
        <div className="container-lg">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 badge-red mb-4">
              <Package className="w-3 h-3" />
              Catalogue produits
            </motion.div>
            <motion.h2 variants={fadeUp}
              className="text-[32px] sm:text-[42px] lg:text-[52px] font-bold tracking-[-0.04em] mb-4">
              Produits populaires à promouvoir
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[15px] text-white/40 max-w-xl mx-auto">
              Sélectionnez les produits les plus vendus et commencez à générer des commissions dès aujourd'hui.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            {popularProducts.map((product, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl bg-[#111113] border border-white/[0.06] hover:border-white/[0.12] p-5 cursor-pointer transition-all duration-300 overflow-hidden"
              >
                {/* Subtle glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                <div className="relative">
                  {/* Icon + Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl border bg-gradient-to-br ${product.color} ${product.border} flex items-center justify-center`}>
                      <product.icon className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
                    </div>
                    <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                      {product.category}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-[14px] font-semibold text-white mb-3 leading-snug">{product.name}</h3>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[18px] font-bold text-white tracking-tight">{product.price}</div>
                    <div className="badge-green text-[11px]">{product.commission} comm.</div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-[11px] text-white/30 pt-3 border-t border-white/[0.05]">
                    <div className="flex items-center gap-1">
                      <ShoppingCart className="w-3 h-3" />
                      {product.sales.toLocaleString()} ventes
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-amber-400/80">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mt-8"
          >
            <Link href="/products"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-2.5 text-[13px] font-medium">
              Voir les 340+ produits
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════ */}
      <section id="how-it-works" className="section relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,32,32,0.06) 0%, transparent 55%)"
        }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff2020]/20 to-transparent" />

        <div className="container-lg relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 badge-red mb-4">
              <Play className="w-3 h-3" />
              Guide rapide
            </motion.div>
            <motion.h2 variants={fadeUp}
              className="text-[32px] sm:text-[42px] lg:text-[52px] font-bold tracking-[-0.04em] mb-4">
              Comment ça marche ?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[15px] text-white/40 max-w-xl mx-auto">
              En moins de 10 minutes, créez votre compte, choisissez vos produits et commencez à générer des revenus.
            </motion.p>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 relative"
          >
            {/* Connector line (desktop) */}
            <div className="hidden xl:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#ff2020]/20 to-transparent pointer-events-none" />

            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative">
                <div className="relative p-6 rounded-2xl bg-[#111113] border border-white/[0.06] hover:border-white/[0.1] transition-all group">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#ff2020]/10 border border-[#ff2020]/20 flex items-center justify-center group-hover:bg-[#ff2020]/15 transition-colors">
                      <step.icon className="w-4.5 h-4.5 text-[#ff5050]" style={{ width: 18, height: 18 }} />
                    </div>
                    <div className="text-[13px] font-black text-[#ff2020]/40 font-mono">{step.number}</div>
                  </div>

                  <h3 className="text-[15px] font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/auth/register"
              className="btn-red inline-flex items-center gap-2 px-8 py-3.5 text-[14px] font-semibold">
              <Rocket className="w-4 h-4" />
              Créer mon compte gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ADVANTAGES
      ════════════════════════════════════════ */}
      <section id="advantages" className="section">
        <div className="container-lg">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 badge-red mb-4">
              <Award className="w-3 h-3" />
              Pourquoi LJ Affiliate ?
            </motion.div>
            <motion.h2 variants={fadeUp}
              className="text-[32px] sm:text-[42px] lg:text-[52px] font-bold tracking-[-0.04em] mb-4">
              Tout pour réussir votre
              <br />
              <span className="text-gradient-red">affiliation digitale</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[15px] text-white/40 max-w-xl mx-auto">
              Des outils pensés pour les créateurs et affiliés sérieux qui veulent des résultats, pas de la complexité.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {advantages.map((adv, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative p-6 rounded-2xl bg-[#111113] border border-white/[0.06] hover:border-white/[0.11] transition-all group"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
                <div className="w-10 h-10 rounded-xl bg-[#ff2020]/10 border border-[#ff2020]/15 flex items-center justify-center mb-5 group-hover:bg-[#ff2020]/15 group-hover:border-[#ff2020]/25 transition-all">
                  <adv.icon className="w-4.5 h-4.5 text-[#ff5050]" style={{ width: 18, height: 18 }} />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2">{adv.title}</h3>
                <p className="text-[13px] text-white/40 leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════ */}
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
            <motion.h2 variants={fadeUp}
              className="text-[32px] sm:text-[42px] font-bold tracking-[-0.04em]">
              Ils génèrent des revenus en pilote automatique
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
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative p-6 rounded-2xl bg-[#111113] border border-white/[0.06] hover:border-white/[0.1] transition-all"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

                {/* Revenue badge */}
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-green-400 bg-green-500/10 border border-green-500/15 px-2.5 py-1 rounded-full mb-4">
                  <DollarSign className="w-3 h-3" />
                  {t.revenue}
                </div>

                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-[#ff2020] text-[#ff2020]" />
                  ))}
                </div>
                <p className="text-[13px] text-white/55 leading-relaxed mb-5">"{t.text}"</p>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff2020]/20 to-[#ff2020]/5 border border-[#ff2020]/20 flex items-center justify-center text-[12px] font-bold text-[#ff6060]">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white">{t.name}</div>
                    <div className="text-[11px] text-white/35">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════ */}
      <section className="section">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-12 sm:p-16 lg:p-20 text-center"
            style={{ background: "linear-gradient(135deg, rgba(255,32,32,0.08) 0%, rgba(255,32,32,0.03) 50%, rgba(10,10,11,0) 100%)", border: "1px solid rgba(255,32,32,0.12)" }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(255,32,32,0.15) 0%, transparent 65%)"
            }} />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff2020]/30 to-transparent" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 badge-red mb-6">
                <Rocket className="w-3 h-3" />
                Rejoignez la plateforme
              </div>

              <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold tracking-[-0.04em] leading-[0.95] mb-5">
                Prêt à transformer vos
                <br />
                <span className="text-gradient-red">ventes en revenus passifs ?</span>
              </h2>

              <p className="text-[15px] text-white/45 mb-10 max-w-lg mx-auto">
                Rejoignez 12 400+ affiliés qui génèrent des revenus automatiques grâce à notre plateforme.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <Link href="/products"
                  className="btn-ghost px-8 py-4 text-[14px] font-medium flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Package className="w-4 h-4" />
                  Découvrir les Produits
                </Link>
                <Link href="/auth/register"
                  className="btn-red px-8 py-4 text-[14px] font-semibold flex items-center gap-2 w-full sm:w-auto justify-center">
                  Devenir Affilié
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-[12px] text-white/20 mt-5 flex items-center gap-1.5 justify-center">
                <Lock className="w-3 h-3" />
                Gratuit pour toujours — commissions jusqu'à 60%
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER PREMIUM
      ════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.05] pt-14 pb-8">
        <div className="container-lg">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#ff2020] flex items-center justify-center glow-red-sm">
                  <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-[15px]">LJ Affiliate</span>
              </Link>
              <p className="text-[13px] text-white/35 leading-relaxed max-w-xs mb-5">
                La plateforme moderne d'affiliation et de vente de produits digitaux. Générez des revenus passifs en promouvant des produits de qualité.
              </p>
              <div className="flex items-center gap-1.5 text-[12px] text-white/25">
                <div className="dot-green" />
                Tous les systèmes opérationnels · 99.9% uptime
              </div>
            </div>

            {/* Links col 1 */}
            <div>
              <div className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">Plateforme</div>
              <div className="space-y-2.5">
                {["Produits", "Catalogue", "Affiliés", "Dashboard", "API"].map(item => (
                  <a key={item} href="#" className="block text-[13px] text-white/40 hover:text-white/70 transition-colors">{item}</a>
                ))}
              </div>
            </div>

            {/* Links col 2 */}
            <div>
              <div className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">Ressources</div>
              <div className="space-y-2.5">
                {["Documentation", "Guide affilié", "Blog", "Webinaires", "Support"].map(item => (
                  <a key={item} href="#" className="block text-[13px] text-white/40 hover:text-white/70 transition-colors">{item}</a>
                ))}
              </div>
            </div>

            {/* Links col 3 */}
            <div>
              <div className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">Légal</div>
              <div className="space-y-2.5">
                {["Confidentialité", "CGU", "Mentions légales", "Cookies", "RGPD"].map(item => (
                  <a key={item} href="#" className="block text-[13px] text-white/40 hover:text-white/70 transition-colors">{item}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="relative p-6 rounded-2xl bg-[#111113] border border-white/[0.06] mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <div>
              <div className="text-[14px] font-semibold text-white mb-0.5">Recevez nos tips d'affiliation</div>
              <div className="text-[12px] text-white/35">Stratégies, nouveaux produits, conseils exclusifs chaque semaine.</div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="input-premium px-3.5 py-2 text-[13px] flex-1 sm:w-52"
              />
              <button className="btn-red px-4 py-2 text-[13px] whitespace-nowrap flex-shrink-0">
                S'abonner
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="divider pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-white/20">© 2026 LJ Affiliate. Tous droits réservés.</p>
            <div className="flex items-center gap-5">
              {["Twitter", "LinkedIn", "YouTube", "Discord"].map(s => (
                <a key={s} href="#" className="text-[12px] text-white/25 hover:text-white/50 transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
