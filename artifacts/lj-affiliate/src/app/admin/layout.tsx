import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user && !error?.message?.includes("placeholder")) {
    redirect("/auth/login");
  }

  const userName = user?.user_metadata?.full_name
    || user?.email?.split("@")[0]
    || "Admin";

  return (
    <DashboardLayout
      isAdmin
      userEmail={user?.email}
      userName={userName}
      affiliateCode={user?.user_metadata?.affiliate_code}
    >
      {children}
    </DashboardLayout>
  );
}
