"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, DollarSign, Link as LinkIcon, Shield, Save, Loader2 } from "lucide-react";

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

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Configuration</h1>
        <p className="text-gray-500 text-sm mt-1">Paramètres globaux de la plateforme</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900/80 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-brand-400" />
            Commissions
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Taux de commission (%)</label>
              <input type="number" defaultValue="30" min="0" max="100" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Seuil de paiement minimum (€)</label>
              <input type="number" defaultValue="50" min="0" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Période de validation (jours)</label>
              <input type="number" defaultValue="30" min="1" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Durée du cookie (jours)</label>
              <input type="number" defaultValue="90" min="1" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-500/50 transition-colors" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gray-900/80 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-brand-400" />
            Liens d'affiliation
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Domaine de tracking</label>
              <input type="text" defaultValue="track.lj-affiliate.com" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-500/50 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">URL de destination par défaut</label>
              <input type="url" defaultValue="https://votre-site.com" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-500/50 transition-colors" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-gray-900/80 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-400" />
            Approbation des affiliés
          </h2>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div>
              <div className="text-white font-medium">Approbation manuelle</div>
              <div className="text-gray-500 text-sm">Approuver manuellement chaque nouvel affilié</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-brand-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
            </label>
          </div>
        </motion.div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Sauvegarde..." : saved ? "Sauvegardé !" : "Sauvegarder la configuration"}
        </button>
      </form>
    </div>
  );
}
