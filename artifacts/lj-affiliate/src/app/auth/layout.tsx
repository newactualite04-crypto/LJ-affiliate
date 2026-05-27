import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Layout serveur pour toutes les pages /auth/*.
 *
 * Si l'utilisateur est déjà connecté → /dashboard directement.
 * Cela évite qu'un utilisateur connecté voie la page de login
 * et crée une boucle login → dashboard → login.
 *
 * On ne vérifie que si Supabase est configuré (pas de placeholder).
 */
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabaseConfigured =
    url && key && url !== "https://placeholder.supabase.co";

  if (supabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/dashboard");
    }
  }

  return <>{children}</>;
}
