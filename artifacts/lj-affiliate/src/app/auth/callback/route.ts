import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createOrUpdateProfile } from "@/lib/supabase/profile";

/**
 * Callback Supabase après confirmation email.
 * 1. Échange le code PKCE contre une session.
 * 2. Crée le profil affilié si inexistant.
 * 3. Redirige vers /dashboard (jamais de boucle car session est valide).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=missing_code`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] exchangeCodeForSession:", error.message);
    return NextResponse.redirect(`${origin}/auth/login?error=auth_error`);
  }

  /* Création du profil (flux confirmation email) */
  if (data?.user) {
    const meta           = data.user.user_metadata || {};
    const fullName       = meta.full_name  || data.user.email?.split("@")[0] || "Affilié";
    const affiliateCode  = meta.affiliate_code || generateFallbackCode(data.user.id);

    await createOrUpdateProfile(supabase, {
      id:             data.user.id,
      full_name:      fullName,
      email:          data.user.email || "",
      affiliate_code: affiliateCode,
      affiliate_link: `${origin}/ref/${affiliateCode}`,
    });
  }

  /* Redirection sécurisée — jamais d'URL externe */
  const destination = next.startsWith("/") ? `${origin}${next}` : `${origin}/dashboard`;
  return NextResponse.redirect(destination);
}

function generateFallbackCode(userId: string): string {
  return userId.replace(/-/g, "").slice(0, 8).toUpperCase();
}
