import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const userName = user?.user_metadata?.full_name
    || user?.email?.split("@")[0]
    || "Affilié";

  const affiliateCode = user?.user_metadata?.affiliate_code as string | undefined;

  return <DashboardClient userName={userName} affiliateCode={affiliateCode} />;
}
