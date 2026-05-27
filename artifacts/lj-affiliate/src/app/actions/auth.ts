"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createOrUpdateProfile, generateAffiliateCode } from "@/lib/supabase/profile";

/* ─── Inscription ────────────────────────────────────────────── */
export async function register(
  prevState: { error: string | null; success: boolean },
  formData: FormData
) {
  const fullName = String(formData.get("fullName") || "").trim();
  const email    = String(formData.get("email")    || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!fullName || !email || !password) {
    return { error: "Tous les champs sont obligatoires.", success: false };
  }
  if (password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères.", success: false };
  }

  const supabase      = await createClient();
  const affiliateCode = generateAffiliateCode(fullName);
  const siteUrl       = process.env.NEXT_PUBLIC_SITE_URL || "";

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name:      fullName,
        affiliate_code: affiliateCode,
      },
      /*
       * Si la confirmation email est activée dans Supabase, l'utilisateur
       * sera redirigé vers /auth/callback après avoir cliqué le lien.
       * Si elle est désactivée, data.session est immédiatement disponible.
       */
      emailRedirectTo: siteUrl
        ? `${siteUrl}/auth/callback`
        : undefined,
    },
  });

  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("already registered") || msg.includes("user already registered")) {
      return { error: "Un compte avec cet email existe déjà.", success: false };
    }
    return { error: error.message, success: false };
  }

  /*
   * Confirmation email DÉSACTIVÉE → session immédiate.
   * On crée le profil maintenant et on redirige directement vers /dashboard.
   */
  if (data?.session && data?.user) {
    await createOrUpdateProfile(supabase, {
      id:             data.user.id,
      full_name:      fullName,
      email:          email,
      affiliate_code: affiliateCode,
      affiliate_link: siteUrl
        ? `${siteUrl}/ref/${affiliateCode}`
        : `/ref/${affiliateCode}`,
    });

    redirect("/dashboard");
  }

  /*
   * Confirmation email ACTIVÉE → session différée.
   * On stocke les données dans user_metadata (déjà fait ci-dessus).
   * Le profil sera créé dans /auth/callback après confirmation.
   * On retourne success: true pour afficher l'écran "vérifiez vos emails".
   */
  return { error: null, success: true };
}

/* ─── Connexion ─────────────────────────────────────────────── */
export async function login(
  prevState: { error: string | null },
  formData: FormData
) {
  const email    = String(formData.get("email")    || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email et mot de passe requis." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("invalid login credentials") || msg.includes("invalid_credentials")) {
      return { error: "Email ou mot de passe incorrect." };
    }
    return { error: error.message };
  }

  redirect("/dashboard");
}

/* ─── Déconnexion ───────────────────────────────────────────── */
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
