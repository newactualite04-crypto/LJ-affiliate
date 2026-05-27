-- ═══════════════════════════════════════════════════════════════
-- LJ Affiliate — Schema Supabase
-- Exécuter dans : Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── Table profiles ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT,
  email         TEXT,
  affiliate_code TEXT       UNIQUE NOT NULL,
  affiliate_link TEXT,
  avatar_url    TEXT,
  paypal_email  TEXT,
  is_admin      BOOLEAN     NOT NULL DEFAULT FALSE,
  is_active     BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index sur le code affilié (recherches fréquentes)
CREATE INDEX IF NOT EXISTS idx_profiles_affiliate_code ON public.profiles(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ─── RLS (Row Level Security) ─────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Un utilisateur voit uniquement son propre profil
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Un utilisateur peut modifier son propre profil
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Les admins voient tous les profils
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- ─── Fonction : générer un code affilié unique ────────────────
CREATE OR REPLACE FUNCTION public.generate_affiliate_code(name TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  base_code TEXT;
  candidate TEXT;
  counter   INT := 0;
BEGIN
  -- Nettoyer le nom : garder lettres/chiffres, majuscules, max 5 chars
  base_code := UPPER(REGEXP_REPLACE(name, '[^A-Za-z0-9]', '', 'g'));
  base_code := LEFT(base_code, 5);
  IF LENGTH(base_code) < 3 THEN
    base_code := LPAD(base_code, 3, 'X');
  END IF;

  LOOP
    -- Suffixe aléatoire 4 chars alphanumérique
    candidate := base_code || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 4));

    -- Vérifier l'unicité
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE affiliate_code = candidate) THEN
      RETURN candidate;
    END IF;

    counter := counter + 1;
    IF counter > 20 THEN
      -- Fallback : timestamp en base36
      candidate := UPPER(TO_HEX(EXTRACT(EPOCH FROM NOW())::BIGINT));
      RETURN LEFT(candidate, 9);
    END IF;
  END LOOP;
END;
$$;

-- ─── Trigger : créer le profil à l'inscription ───────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  aff_code TEXT;
  user_name TEXT;
BEGIN
  -- Récupérer le nom depuis les metadata
  user_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    SPLIT_PART(NEW.email, '@', 1)
  );

  -- Utiliser le code depuis les metadata si fourni, sinon générer
  aff_code := COALESCE(
    NEW.raw_user_meta_data->>'affiliate_code',
    public.generate_affiliate_code(user_name)
  );

  -- Insérer le profil
  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    affiliate_code,
    affiliate_link
  ) VALUES (
    NEW.id,
    user_name,
    NEW.email,
    aff_code,
    'https://lj-affiliate.com/r/' || aff_code
  );

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Ne pas bloquer l'inscription si le profil ne peut pas être créé
  RAISE WARNING 'handle_new_user error: %', SQLERRM;
  RETURN NEW;
END;
$$;

-- Attacher le trigger à auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── Fonction : mettre à jour updated_at ─────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ─── Table affiliate_links ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.affiliate_links (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id  UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name          TEXT        NOT NULL,
  code          TEXT        UNIQUE NOT NULL,
  target_url    TEXT        NOT NULL DEFAULT 'https://lj-affiliate.com',
  is_active     BOOLEAN     NOT NULL DEFAULT TRUE,
  clicks        INT         NOT NULL DEFAULT 0,
  conversions   INT         NOT NULL DEFAULT 0,
  revenue       NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Affiliates view own links"
  ON public.affiliate_links FOR SELECT
  USING (affiliate_id = auth.uid());

CREATE POLICY "Affiliates manage own links"
  ON public.affiliate_links FOR ALL
  USING (affiliate_id = auth.uid());

-- ─── Table commissions ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.commissions (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id  UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  period        TEXT        NOT NULL,  -- ex: "2024-08"
  amount        NUMERIC(12,2) NOT NULL DEFAULT 0,
  status        TEXT        NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending', 'approved', 'paid', 'rejected')),
  paid_at       TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Affiliates view own commissions"
  ON public.commissions FOR SELECT
  USING (affiliate_id = auth.uid());

-- ═══════════════════════════════════════════════════════════════
-- INSTRUCTIONS DE DÉPLOIEMENT
-- ═══════════════════════════════════════════════════════════════
-- 1. Ouvrir Supabase Dashboard > SQL Editor
-- 2. Coller et exécuter ce script
-- 3. Dans Authentication > Settings :
--    - Désactiver "Confirm email" pour un accès immédiat (dev)
--    - Ou laisser activé pour la production
-- 4. Dans Authentication > URL Configuration :
--    - Site URL: https://votre-domaine.replit.app
--    - Redirect URLs: https://votre-domaine.replit.app/auth/callback
-- ═══════════════════════════════════════════════════════════════
