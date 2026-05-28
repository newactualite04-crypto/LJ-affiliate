import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  /*
   * Fix Replit proxy: x-forwarded-host lacks port, causing Next.js 15
   * Server Actions CSRF check to fail ("origin does not match host").
   * We normalise x-forwarded-host to match the origin's host+port.
   */
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const originHost = new URL(origin).host; // e.g. "hostname:3000"
      const fwdHost = request.headers.get("x-forwarded-host") ?? "";
      if (originHost && originHost !== fwdHost) {
        const newHeaders = new Headers(request.headers);
        newHeaders.set("x-forwarded-host", originHost);
        const fixedRequest = new NextRequest(request.url, {
          method:  request.method,
          headers: newHeaders,
          body:    request.body,
          // @ts-ignore — duplex required when body may be a ReadableStream
          duplex: "half",
        });
        return await updateSession(fixedRequest);
      }
    } catch { /* ignore URL parse errors */ }
  }

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
