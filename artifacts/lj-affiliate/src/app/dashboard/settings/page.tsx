"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Save, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Paramètres</h1>
        <p className="text-gray-500 text-sm mt-1">Gérez votre profil et vos préférences</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/80 border border-white/10 rounded-2xl p-6"
      >
        <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
          <User className="w-4 h-4 text-brand-400" />
          Informations personnelles
        </h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Nom complet</label>
            <input
              type="text"
              defaultValue="Jean Dupont"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                defaultValue="jean@exemple.com"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/50 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">URL de paiement PayPal</label>
            <input
              type="email"
              placeholder="votre-paypal@exemple.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/50 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Sauvegarde..." : saved ? "Sauvegardé !" : "Sauvegarder"}
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-gray-900/80 border border-white/10 rounded-2xl p-6"
      >
        <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
          <Lock className="w-4 h-4 text-brand-400" />
          Changer le mot de passe
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Mot de passe actuel</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/50 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Nouveau mot de passe</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/50 transition-colors" />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors border border-white/10">
            <Lock className="w-4 h-4" />
            Mettre à jour
          </button>
        </div>
      </motion.div>
    </div>
  );
}
