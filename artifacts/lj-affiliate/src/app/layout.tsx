import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LJ Affiliate — Plateforme d'Affiliation",
  description: "Gérez vos liens d'affiliation, suivez vos performances et maximisez vos commissions.",
  keywords: ["affiliation", "marketing", "commissions", "liens"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
