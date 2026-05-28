import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("_adm_session");

  if (!session || session.value !== "granted") {
    redirect("/");
  }

  return (
    <DashboardLayout isAdmin userName="Administrateur" userEmail="">
      {children}
    </DashboardLayout>
  );
}
