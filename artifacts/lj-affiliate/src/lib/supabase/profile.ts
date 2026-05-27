import type { SupabaseClient } from "@supabase/supabase-js";

/* ─── Types ─────────────────────────────────────────────────── */
export interface Profile {
  id: string;
  full_name: string;
  email: string;
  affiliate_code: string;
  affiliate_link: string;
  status: "active" | "suspended" | "pending";
  commission_rate: number;
  total_clicks: number;
  total_conversions: number;
  total_earnings: number;
  created_at: string;
  updated_at: string;
}

export interface ProfileInsert {
  id: string;
  full_name: string;
  email: string;
  affiliate_code: string;
  affiliate_link: string;
}

/* ─── Génère un code affilié ────────────────────────────────── */
export function generateAffiliateCode(name: string): string {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 5)
    .padEnd(3, "x");
  const suffix = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `${base.toUpperCase()}${suffix}`;
}

/* ─── Upsert profil ─────────────────────────────────────────── */
export async function createOrUpdateProfile(
  supabase: SupabaseClient,
  data: ProfileInsert
): Promise<Profile | null> {
  const { data: profile, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: data.id,
        full_name: data.full_name,
        email: data.email,
        affiliate_code: data.affiliate_code,
        affiliate_link: data.affiliate_link,
      },
      { onConflict: "id" }
    )
    .select()
    .single();

  if (error) {
    if (error.code === "42P01") {
      console.warn("[profile] Table 'profiles' introuvable. Lancez la migration SQL.");
    } else {
      console.error("[profile] createOrUpdateProfile:", error.message);
    }
    return null;
  }

  return profile as Profile;
}

/* ─── Lire un profil ────────────────────────────────────────── */
export async function getProfile(
  supabase: SupabaseClient,
  userId: string
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code !== "PGRST116" && error.code !== "42P01") {
      console.error("[profile] getProfile:", error.message);
    }
    return null;
  }

  return data as Profile;
}
