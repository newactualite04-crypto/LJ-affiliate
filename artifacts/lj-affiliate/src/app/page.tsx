"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, TrendingUp, BarChart3, Link as LinkIcon, DollarSign,
  Shield, Zap, ChevronRight, Star, Lock, Globe, Users, Package,
  MousePointer, ShoppingCart, CheckCircle, Sparkles,
  BookOpen, Code, HeadphonesIcon, Award, Rocket,
} from "lucide-react";

/* ─── Scroll-triggered variants (whileInView only — SSR safe) ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

/* ─── Data ──────────────────────────────────────────────────── */
const globalStats = [
  { value: "12 400+", label: "Affiliés actifs", icon: Users },
  { value: "€2.8M", label: "Revenus distribués", icon: DollarSign },
  { value: "340+", label: "Produits digitaux", icon: Package },
  { value: "4.9%", label: "Taux de conversion", icon: TrendingUp },
];

const popularProducts = [
  { name: "Masterclass Marketing Digital", category: "Formation", price: "€197", commission: "40%", sales: 1842, rating: 4.9, icon: BookOpen, accent: "#ff2020" },
  { name: "Pack Templates Notion Pro", category: "Templates", price: "€49", commission: "50%", sales: 3210, rating: 4.8, icon: Package, accent: "#a855f7" },
  { name: "Cours React & Next.js Avancé", category: "Développement", price: "€297", commission: "35%", sales: 921, rating: 5.0, icon: Code, accent: "#3b82f6" },
  { name: "Guide SEO Automation 2025", category: "Ebook", price: "€29", commission: "60%", sales: 5480, rating: 4.7, icon: Zap, accent: "#f59e0b" },
];

const steps = [
  { number: "01", title: "Créez votre compte", desc: "Inscription gratuite en 2 minutes. Aucune carte bancaire requise.", icon: Rocket },
  { number: "02", title: "Choisissez vos produits", desc: "Parcourez 340+ produits digitaux à fort taux de commission.", icon: ShoppingCart },
  { number: "03", title: "Partagez vos liens", desc: "Générez des liens trackés en un clic et diffusez-les partout.", icon: LinkIcon },
  { number: "04", title: "Encaissez vos gains", desc: "Commissions versées automatiquement chaque mois. Suivi temps réel.", icon: DollarSign },
];

const advantages = [
  { icon: Shield, title: "Tracking ultra-précis", desc: "Cookies 90 jours, attribution multi-touch. Chaque clic tracké." },
  { icon: Zap, title: "Paiements automatiques", desc: "Virements mensuels dès €50. PayPal, virement, Wise." },
  { icon: BarChart3, title: "Dashboard temps réel", desc: "Stats, conversions, revenus — tout centralisé." },
  { icon: Globe, title: "Programme international", desc: "40+ pays. Commissions en EUR, USD ou GBP." },
  { icon: HeadphonesIcon, title: "Support dédié 7j/7", desc: "Email et chat. Temps de réponse moyen : 2 heures." },
  { icon: Award, title: "Commissions premium", desc: "Jusqu'à 60% par vente. Meilleurs taux du marché." },
];

const testimonials = [
  { name: "Camille Rossignol", role: "Créatrice de contenu", revenue: "€4 200 / mois", text: "En 3 mois, j'ai remplacé mon salaire. Le tracking est impeccable et les paiements toujours à l'heure.", initial: "C" },
  { name: "Maxime Laval", role: "Développeur freelance", revenue: "€2 800 / mois", text: "Quelques liens sur mon blog tech génèrent maintenant €2 800/mois en pilote automatique.", initial: "M" },
  { name: "Sarah Boulanger", role: "Coach business", revenue: "€8 500 / mois", text: "La meilleure plateforme d'affiliation que j'ai testée. Interface claire, produits de qualité.", initial: "S" },
];

/* ─── Page ──────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">

      {/* ═══ NAVBAR — CSS animation, no framer SSR ═════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] animate-slide-down"
        style={{ background: "rgba(10,10,11,0.85)", backdropFilter: "blur(24px)" }}
      >
        <div className="container-lg h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#ff2020] flex items-center justify-center glow-red-sm group-hover:glow-red transition-all duration-300">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[15px] tracking-tight">LJ Affiliate</span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {[
              { label: "Produits", href: "/products" },
              { label: "Comment ça marche", href: "#how-it-works" },
              { label: "Avantages", href: "#advantages" },
              { label: "Témoignages", href: "#testimonials" },
            ].map((item) => (
              <a key={item.label} href={item.href}
                className="text-[13px] text-white/45 hover:text-white transition-colors duration-200">
                {item.label}
              </a>
            ))}
          </div>

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
      </nav>

      {/* ═══ HERO — CSS animations, no framer SSR ══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,32,32,0.08) 0%, transparent 70%)" }} />

        {/* Floating orbs — CSS animation */}
        <div className="absolute top-24 right-[10%] w-[420px] h-[420px] rounded-full pointer-events-none animate-float-orb"
          style={{ background: "radial-gradient(circle, rgba(255,32,32,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-24 left-[8%] w-[320px] h-[320px] rounded-full pointer-events-none animate-float-orb-slow"
          style={{ background: "radial-gradient(circle, rgba(255,32,32,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />

        {/* Content — staggered CSS animations */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/[0.08] bg-white/[0.03] animate-scale-in">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5050]" />
            <span className="text-[13px] text-white/55">Plateforme #1 d'affiliation de produits digitaux en France</span>
          </div>

          {/* Headline */}
          <h1 className="text-[44px] sm:text-[60px] lg:text-[76px] xl:text-[88px] font-bold tracking-[-0.04em] leading-[0.92] mb-6 animate-fade-up delay-100">
            Transformez vos ventes
            <br />
            <span className="relative inline-block">
              digitales en{" "}
              <span className="text-gradient-red">revenus</span>
            </span>
            <br />
            automatiques.
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] sm:text-[18px] text-white/45 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-200">
            Plateforme moderne d'affiliation et de vente de produits digitaux.
            <br className="hidden sm:block" />
            Générez des revenus passifs en promouvant des formations, ebooks et outils premium.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center animate-fade-up delay-300">
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
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-6 justify-center mt-12 animate-fade-in delay-400">
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
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 justify-center mt-8 animate-fade-in delay-500">
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
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0b] to-transparent pointer-events-none" />
      </section>

      {/* ═══ STATS — framer whileInView (safe post-hydration) ═══ */}
      <section className="py-16 border-y border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,32,32,0.03) 0%, transparent 70%)" }} />
        <div className="container-lg relative">
          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {globalStats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[#ff2020]/10 border border-[#ff2020]/15 flex items-center justify-center">
                    <stat.icon className="w-3.5 h-3.5 text-[#ff5050]" />
                  </div>
                </div>
                <div className="text-[34px] sm:text-[40px] font-black tracking-[-0.04em] text-white mb-1">{stat.value}</div>
                <div className="text-[13px] text-white/35">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ POPULAR PRODUCTS ══════════════════════════════════ */}
      <section className="section">
        <div className="container-lg">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-block badge-red mb-4">Produits populaires</motion.div>
            <motion.h2 variants={fadeUp} className="text-[30px] sm:text-[42px] font-bold tracking-[-0.04em] mb-4">
              Les produits qui génèrent
              <br /><span className="text-gradient-red">le plus de commissions</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[15px] text-white/40 max-w-xl mx-auto">
              340+ produits digitaux sélectionnés pour leur qualité et leur taux de conversion élevé.
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularProducts.map((p, i) => (
              <motion.div key={i} variants={fadeUp}
                className="group relative p-5 rounded-2xl bg-[#111113] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300 cursor-pointer">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}28` }}>
                  <p.icon className="w-[18px] h-[18px]" style={{ color: p.accent }} strokeWidth={1.75} />
                </div>
                <div className="text-[11px] font-medium text-white/30 uppercase tracking-wider mb-1.5">{p.category}</div>
                <div className="text-[14px] font-semibold text-white leading-snug mb-4">{p.name}</div>
                <div className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#ff2020] text-[#ff2020]" />
                    <span className="text-white/60 font-medium">{p.rating}</span>
                    <span className="text-white/25 ml-0.5">({p.sales.toLocaleString()})</span>
                  </div>
                  <div className="font-bold text-white/80">{p.price}</div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                  <span className="text-[11px] text-white/30">Commission</span>
                  <span className="text-[13px] font-bold" style={{ color: p.accent }}>{p.commission}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-10">
            <Link href="/products" className="btn-ghost inline-flex items-center gap-2 px-6 py-3 text-[13px] font-medium">
              Voir les 340+ produits
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ══════════════════════════════════════ */}
      <section id="how-it-works" className="section relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,32,32,0.04) 0%, transparent 70%)" }} />
        <div className="container-lg relative">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <motion.div variants={fadeUp} className="inline-block badge-red mb-4">Comment ça marche</motion.div>
            <motion.h2 variants={fadeUp} className="text-[30px] sm:text-[42px] font-bold tracking-[-0.04em]">
              Démarrez en <span className="text-gradient-red">4 étapes simples</span>
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%_-_24px)] w-full h-px bg-gradient-to-r from-white/[0.08] to-transparent z-0" />
                )}
                <div className="relative z-10 p-6 rounded-2xl bg-[#111113] border border-white/[0.06] h-full">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#ff2020]/10 border border-[#ff2020]/20 flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-[#ff5050]" />
                    </div>
                    <span className="text-[32px] font-black text-white/[0.06] tracking-[-0.05em] leading-none">{step.number}</span>
                  </div>
                  <h3 className="text-[15px] font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ ADVANTAGES ═══════════════════════════════════════ */}
      <section id="advantages" className="section">
        <div className="container-lg">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-block badge-red mb-4">Pourquoi LJ Affiliate</motion.div>
            <motion.h2 variants={fadeUp} className="text-[30px] sm:text-[42px] font-bold tracking-[-0.04em]">
              Tout ce qu'il vous faut pour
              <br /><span className="text-gradient-red">scaler votre business</span>
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((adv, i) => (
              <motion.div key={i} variants={fadeUp}
                className="group p-6 rounded-2xl bg-[#111113] border border-white/[0.06] hover:border-[#ff2020]/20 hover:bg-[#ff2020]/[0.02] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#ff2020]/10 border border-[#ff2020]/15 flex items-center justify-center mb-4 group-hover:bg-[#ff2020]/15 group-hover:border-[#ff2020]/25 transition-all duration-300">
                  <adv.icon className="w-[18px] h-[18px] text-[#ff5050]" strokeWidth={1.75} />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2">{adv.title}</h3>
                <p className="text-[13px] text-white/40 leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ══════════════════════════════════════ */}
      <section id="testimonials" className="section">
        <div className="container-lg">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-12">
            <motion.div variants={fadeUp} className="inline-block badge-red mb-4">Témoignages</motion.div>
            <motion.h2 variants={fadeUp} className="text-[30px] sm:text-[42px] font-bold tracking-[-0.04em]">
              Ils génèrent des revenus
              <br /><span className="text-gradient-red">en pilote automatique</span>
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative p-6 rounded-2xl bg-[#111113] border border-white/[0.06] hover:border-white/[0.1] transition-all">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-green-400 bg-green-500/10 border border-green-500/15 px-2.5 py-1 rounded-full mb-4">
                  <DollarSign className="w-3 h-3" />{t.revenue}
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-[#ff2020] text-[#ff2020]" />
                  ))}
                </div>
                <p className="text-[13px] text-white/55 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff2020]/20 to-[#ff2020]/5 border border-[#ff2020]/20 flex items-center justify-center text-[12px] font-bold text-[#ff6060]">
                    {t.initial}
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

      {/* ═══ CTA BANNER ═══════════════════════════════════════ */}
      <section className="section">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-12 sm:p-16 lg:p-20 text-center"
            style={{ background: "linear-gradient(135deg, rgba(255,32,32,0.08) 0%, rgba(255,32,32,0.03) 50%, rgba(10,10,11,0) 100%)", border: "1px solid rgba(255,32,32,0.12)" }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,32,32,0.12) 0%, transparent 65%)" }} />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff2020]/30 to-transparent" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 badge-red mb-6">
                <Rocket className="w-3 h-3" />Rejoignez la plateforme
              </div>
              <h2 className="text-[34px] sm:text-[48px] lg:text-[60px] font-bold tracking-[-0.04em] leading-[0.95] mb-5">
                Prêt à transformer vos
                <br /><span className="text-gradient-red">ventes en revenus passifs ?</span>
              </h2>
              <p className="text-[15px] text-white/45 mb-10 max-w-lg mx-auto">
                Rejoignez 12 400+ affiliés qui génèrent des revenus automatiques grâce à notre plateforme.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <Link href="/products" className="btn-ghost px-8 py-4 text-[14px] font-medium flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Package className="w-4 h-4" />Découvrir les Produits
                </Link>
                <Link href="/auth/register" className="btn-red px-8 py-4 text-[14px] font-semibold flex items-center gap-2 w-full sm:w-auto justify-center">
                  Devenir Affilié<ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-[12px] text-white/20 mt-5 flex items-center gap-1.5 justify-center">
                <Lock className="w-3 h-3" />Gratuit pour toujours — commissions jusqu'à 60%
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.05] pt-14 pb-8">
        <div className="container-lg">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
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

            {[
              { title: "Plateforme", links: ["Produits", "Catalogue", "Affiliés", "Dashboard", "API"] },
              { title: "Ressources", links: ["Documentation", "Guide affilié", "Blog", "Webinaires", "Support"] },
              { title: "Légal", links: ["Confidentialité", "CGU", "Mentions légales", "Cookies", "RGPD"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">{col.title}</div>
                <div className="space-y-2.5">
                  {col.links.map((item) => (
                    <a key={item} href="#" className="block text-[13px] text-white/40 hover:text-white/70 transition-colors">{item}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="relative p-6 rounded-2xl bg-[#111113] border border-white/[0.06] mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <div>
              <div className="text-[14px] font-semibold text-white mb-0.5">Recevez nos tips d'affiliation</div>
              <div className="text-[12px] text-white/35">Stratégies, nouveaux produits, conseils exclusifs chaque semaine.</div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input type="email" placeholder="votre@email.com" className="input-premium px-3.5 py-2 text-[13px] flex-1 sm:w-52" />
              <button className="btn-red px-4 py-2 text-[13px] whitespace-nowrap flex-shrink-0">S'abonner</button>
            </div>
          </div>

          <div className="divider pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-white/20">© 2026 LJ Affiliate. Tous droits réservés.</p>
            <div className="flex items-center gap-5">
              {["Twitter", "LinkedIn", "YouTube", "Discord"].map((s) => (
                <a key={s} href="#" className="text-[12px] text-white/25 hover:text-white/50 transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
