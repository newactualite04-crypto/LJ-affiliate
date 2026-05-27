"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Save, Loader2, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Section = ({ title, icon: Icon, children, delay = 0 }: { title: string; icon: React.ElementType; children: React.ReactNode; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl bg-[#111113] border border-white/[0.06] overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.04]">
        <div className="w-7 h-7 rounded-lg bg-[#ff2020]/10 border border-[#ff2020]/15 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-[#ff5050]" />
        </div>
        <div className="text-[14px] font-semibold text-white">{title}</div>
      </div>
      <div className="p-5">{children}</div>
    </motion.div>
  );

  return (
    <div className="space-y-4 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-semibold text-white tracking-tight">Paramètres</h1>
        <p className="text-[13px] text-white/40 mt-0.5">Gérez votre profil et vos préférences</p>
      </motion.div>

      <Section title="Profil" icon={User} delay={0.1}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-white/40 mb-1.5 uppercase tracking-wide">Nom complet</label>
              <input type="text" defaultValue="Jean Dupont" className="input-premium w-full px-3.5 py-2.5 text-[13px]" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-white/40 mb-1.5 uppercase tracking-wide">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                <input type="email" defaultValue="jean@exemple.com" className="input-premium w-full pl-9 pr-3.5 py-2.5 text-[13px]" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-white/40 mb-1.5 uppercase tracking-wide">Email de paiement (PayPal)</label>
            <input type="email" placeholder="paypal@exemple.com" className="input-premium w-full px-3.5 py-2.5 text-[13px]" />
          </div>
          <button type="submit" disabled={saving} className="btn-red flex items-center gap-2 px-4 py-2 text-[13px]">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? "Sauvegarde..." : saved ? "Sauvegardé !" : "Sauvegarder"}
          </button>
        </form>
      </Section>

      <Section title="Sécurité" icon={Lock} delay={0.15}>
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-white/40 mb-1.5 uppercase tracking-wide">Mot de passe actuel</label>
            <input type="password" placeholder="••••••••" className="input-premium w-full px-3.5 py-2.5 text-[13px]" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-white/40 mb-1.5 uppercase tracking-wide">Nouveau mot de passe</label>
            <input type="password" placeholder="Minimum 8 caractères" className="input-premium w-full px-3.5 py-2.5 text-[13px]" />
          </div>
          <button className="btn-ghost flex items-center gap-2 px-4 py-2 text-[13px]">
            <Lock className="w-3.5 h-3.5" />
            Mettre à jour
          </button>
        </div>
      </Section>

      <Section title="Notifications" icon={Bell} delay={0.2}>
        <div className="space-y-3">
          {[
            { label: "Nouvelles conversions", sub: "Alerte par email à chaque conversion" },
            { label: "Commissions approuvées", sub: "Notification quand vos commissions sont validées" },
            { label: "Résumé hebdomadaire", sub: "Rapport de performances chaque lundi matin" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
              <div>
                <div className="text-[13px] font-medium text-white">{item.label}</div>
                <div className="text-[11px] text-white/35 mt-0.5">{item.sub}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                <div className="w-9 h-5 bg-white/[0.08] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#ff2020] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
