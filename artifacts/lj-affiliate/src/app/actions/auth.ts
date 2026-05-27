"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/* ─── Génère un code affilié unique ─────────────────── */
function generateAffiliateCode(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 6)
    .padEnd(3, "x");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${base.toUpperCase()}${suffix}`;
}

/* ─── Inscription ────────────────────────────────────── */
export async function register(prevState: { error: string | null; success: boolean }, formData: FormData) {
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!fullName || !email || !password) {
    return { error: "Tous les champs sont obligatoires.", success: false };
  }
  if (password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères.", success: false };
  }

  const supabase = await createClient();
  const affiliateCode = generateAffiliateCode(fullName);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        affiliate_code: affiliateCode,
      },
      emailRedirectTo: undefined,
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "Un compte avec cet email existe déjà.", success: false };
    }
    return { error: error.message, success: false };
  }

  /* Si email confirmation désactivée → session immédiate → redirect */
  if (data?.session) {
    redirect("/dashboard");
  }

  /* Si email confirmation activée → retourner success: true pour afficher le message */
  return { error: null, success: true };
}

/* ─── Connexion ──────────────────────────────────────── */
export async function login(prevState: { error: string | null }, formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email et mot de passe requis." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Email ou mot de passe incorrect." };
    }
    return { error: error.message };
  }

  redirect("/dashboard");
}

/* ─── Déconnexion ────────────────────────────────────── */
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
