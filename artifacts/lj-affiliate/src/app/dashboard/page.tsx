import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/supabase/profile";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  /* Fallbacks depuis user_metadata */
  let userName      = user?.user_metadata?.full_name
                   || user?.email?.split("@")[0]
                   || "Affilié";
  let affiliateCode = user?.user_metadata?.affiliate_code as string | undefined;

  /* Source de vérité : table profiles */
  if (user) {
    const profile = await getProfile(supabase, user.id);
    if (profile) {
      userName      = profile.full_name      || userName;
      affiliateCode = profile.affiliate_code || affiliateCode;
    }
  }

  return (
    <DashboardClient
      userName={userName}
      affiliateCode={affiliateCode}
      userEmail={user?.email}
    />
  );
}
