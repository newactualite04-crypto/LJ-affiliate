import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Rafraîchit les cookies de session Supabase.
 * NE fait AUCUNE redirection ici — les layouts gèrent leur propre auth.
 * Cela évite tout risque de double-redirection ou de boucle.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  /* Si Supabase non configuré, on passe directement */
  if (!url || !key || url === "https://placeholder.supabase.co") {
    return supabaseResponse;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(
            name,
            value,
            options as Parameters<typeof supabaseResponse.cookies.set>[2]
          )
        );
      },
    },
  });

  /*
   * IMPORTANT : ne pas appeler supabase.auth.getSession() ici.
   * getUser() valide le token côté serveur et est la seule méthode sûre.
   * Cet appel est nécessaire pour que les cookies soient rafraîchis.
   */
  await supabase.auth.getUser();

  return supabaseResponse;
}
