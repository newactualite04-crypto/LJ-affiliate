"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Link as LinkIcon, Shield, Save, Loader2, Sliders } from "lucide-react";

export default function AdminSettingsPage() {
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

  const Toggle = ({ label, sub, defaultChecked = true }: { label: string; sub: string; defaultChecked?: boolean }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
      <div>
        <div className="text-[13px] font-medium text-white">{label}</div>
        <div className="text-[11px] text-white/35 mt-0.5">{sub}</div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
        <div className="w-9 h-5 bg-white/[0.08] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#ff2020] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
      </label>
    </div>
  );

  return (
    <div className="space-y-4 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-semibold text-white tracking-tight">Configuration</h1>
        <p className="text-[13px] text-white/40 mt-0.5">Paramètres globaux de la plateforme</p>
      </motion.div>

      <form onSubmit={handleSave} className="space-y-4">
        <Section title="Commissions" icon={DollarSign} delay={0.1}>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Taux de commission (%)", val: "30", type: "number" },
              { label: "Seuil de paiement minimum (€)", val: "50", type: "number" },
              { label: "Période de validation (jours)", val: "30", type: "number" },
              { label: "Durée du cookie (jours)", val: "90", type: "number" },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-[11px] font-medium text-white/40 mb-1.5 uppercase tracking-wide">{f.label}</label>
                <input type={f.type} defaultValue={f.val} className="input-premium w-full px-3.5 py-2.5 text-[13px]" />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Liens d'affiliation" icon={LinkIcon} delay={0.15}>
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-white/40 mb-1.5 uppercase tracking-wide">Domaine de tracking</label>
              <input type="text" defaultValue="track.lj-affiliate.com" className="input-premium w-full px-3.5 py-2.5 text-[13px]" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-white/40 mb-1.5 uppercase tracking-wide">URL de destination par défaut</label>
              <input type="url" defaultValue="https://votre-site.com" className="input-premium w-full px-3.5 py-2.5 text-[13px]" />
            </div>
          </div>
        </Section>

        <Section title="Modération" icon={Shield} delay={0.2}>
          <div>
            <Toggle label="Approbation manuelle" sub="Approuver manuellement chaque nouvel affilié" />
            <Toggle label="Validation des conversions" sub="Révision manuelle avant de valider les commissions" />
            <Toggle label="Détection de fraude" sub="Algorithmes anti-fraude automatiques" />
            <Toggle label="Limite de liens par affilié" sub="Restreindre le nombre de liens créés par compte" defaultChecked={false} />
          </div>
        </Section>

        <Section title="Plateforme" icon={Sliders} delay={0.25}>
          <div>
            <Toggle label="Inscriptions ouvertes" sub="Permettre à tout le monde de s'inscrire" />
            <Toggle label="Dashboard affilié" sub="Activer l'accès au dashboard pour les affiliés" />
            <Toggle label="Mode maintenance" sub="Basculer en mode maintenance (accès admin uniquement)" defaultChecked={false} />
          </div>
        </Section>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <button type="submit" disabled={saving} className="btn-red flex items-center gap-2 px-5 py-2.5 text-[13px]">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? "Sauvegarde..." : saved ? "Configuration sauvegardée !" : "Sauvegarder"}
          </button>
        </motion.div>
      </form>
    </div>
  );
}
