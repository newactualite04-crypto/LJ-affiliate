-- ============================================================
-- Migration 001 — Table profiles (affiliés)
-- À exécuter dans Supabase Dashboard > SQL Editor
-- ============================================================

-- Table principale
CREATE TABLE IF NOT EXISTS public.profiles (
  id               UUID          PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name        TEXT          NOT NULL DEFAULT '',
  email            TEXT          NOT NULL DEFAULT '',
  affiliate_code   TEXT          UNIQUE NOT NULL,
  affiliate_link   TEXT          NOT NULL DEFAULT '',
  status           TEXT          NOT NULL DEFAULT 'active'
                   CHECK (status IN ('active', 'suspended', 'pending')),
  commission_rate  NUMERIC(5,2)  NOT NULL DEFAULT 30.00,
  total_clicks     INTEGER       NOT NULL DEFAULT 0,
  total_conversions INTEGER      NOT NULL DEFAULT 0,
  total_earnings   NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Index sur affiliate_code pour les lookups rapides
CREATE INDEX IF NOT EXISTS idx_profiles_affiliate_code ON public.profiles(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);

-- Trigger auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── Row Level Security ───────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Lire son propre profil
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Créer son propre profil (à l'inscription)
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- Modifier son propre profil
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Les admins lisent tous les profils (via service role ou role admin)
-- DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
-- CREATE POLICY "profiles_select_admin" ON public.profiles
--   FOR SELECT TO authenticated
--   USING (auth.jwt() ->> 'role' = 'admin');
