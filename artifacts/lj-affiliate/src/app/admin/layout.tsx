import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <DashboardLayout
      isAdmin
      userEmail={user.email}
      userName={user.user_metadata?.full_name}
    >
      {children}
    </DashboardLayout>
  );
}
