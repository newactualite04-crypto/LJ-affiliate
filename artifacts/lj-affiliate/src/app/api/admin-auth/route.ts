import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = "adminneW";
const COOKIE_NAME    = "_adm_session";
const COOKIE_VALUE   = "granted";

export async function POST(req: NextRequest) {
  let body: { password?: string } = {};
  try { body = await req.json(); } catch { /* empty body */ }

  if (body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 403 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "strict",
    maxAge:   60 * 60 * 8,   // 8 h
    path:     "/",
    secure:   process.env.NODE_ENV === "production",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("_adm_session");
  return res;
}
