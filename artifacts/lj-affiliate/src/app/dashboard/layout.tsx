import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile, createOrUpdateProfile, generateAffiliateCode } from "@/lib/supabase/profile";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  /*
   * Pas de session → retour au login.
   * Exception : Supabase placeholder (dev sans config) pour éviter les redirects
   * infinis quand les variables d'env ne sont pas encore configurées.
   */
  const isPlaceholder =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co";

  if (!user && !isPlaceholder) {
    redirect("/auth/login");
  }

  /* Valeurs par défaut depuis user_metadata */
  let userName      = user?.user_metadata?.full_name
                   || user?.email?.split("@")[0]
                   || "Affilié";
  let affiliateCode = user?.user_metadata?.affiliate_code as string | undefined;

  /* Lecture du profil en base (source de vérité) */
  if (user) {
    let profile = await getProfile(supabase, user.id);

    /*
     * Profil inexistant (ex : compte créé avant la migration, ou
     * confirmation email qui a contourné le callback).
     * On le crée automatiquement ici en dernier recours.
     */
    if (!profile) {
      const code = affiliateCode || generateAffiliateCode(userName);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
      profile = await createOrUpdateProfile(supabase, {
        id:             user.id,
        full_name:      userName,
        email:          user.email || "",
        affiliate_code: code,
        affiliate_link: siteUrl ? `${siteUrl}/ref/${code}` : `/ref/${code}`,
      });
    }

    if (profile) {
      userName      = profile.full_name || userName;
      affiliateCode = profile.affiliate_code || affiliateCode;
    }
  }

  return (
    <DashboardLayout
      userEmail={user?.email}
      userName={userName}
      affiliateCode={affiliateCode}
    >
      {children}
    </DashboardLayout>
  );
}
