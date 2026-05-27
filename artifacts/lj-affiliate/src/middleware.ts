import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  /*
   * Le middleware se contente de rafraîchir les cookies de session.
   * Toute logique de protection de route est gérée par les layouts
   * (dashboard/layout.tsx et admin/layout.tsx) via redirect() serveur.
   * Ce pattern évite les boucles de redirection "too many redirects".
   */
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Exclure les ressources statiques et les fichiers spéciaux Next.js.
     * Le middleware s'applique uniquement aux pages et routes API.
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
