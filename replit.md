# LJ Affiliate

Plateforme SaaS d'affiliation moderne — gérez des liens, suivez les performances et versez des commissions.

## Run & Operate

- `pnpm --filter @workspace/lj-affiliate run dev` — lancer Next.js en dev (port 3000)
- `pnpm --filter @workspace/api-server run dev` — lancer l'API Express (port 8080)
- `pnpm run typecheck` — vérification TypeScript complète
- `pnpm --filter @workspace/lj-affiliate run build` — build production Next.js standalone

### Commande PM2 (production)
```bash
cd artifacts/lj-affiliate
pnpm build
HOSTNAME=0.0.0.0 PORT=3000 NODE_ENV=production pm2 start .next/standalone/server.js --name lj-affiliate
```

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- **Frontend** : Next.js 15 (App Router), React 19, TailwindCSS 3, Framer Motion
- **Auth + DB** : Supabase (Auth, PostgreSQL, Storage)
- **Icons** : Lucide React
- **Build** : Next.js standalone (pour PM2)
- API partagée : Express 5 (artifacts/api-server)

## Where things live

```
artifacts/lj-affiliate/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Landing page publique
│   │   ├── layout.tsx          # Layout racine
│   │   ├── auth/               # Login + Register
│   │   ├── dashboard/          # Espace affilié
│   │   │   ├── page.tsx        # Vue d'ensemble affilié
│   │   │   ├── links/          # Gestion des liens
│   │   │   ├── stats/          # Statistiques
│   │   │   ├── commissions/    # Commissions
│   │   │   └── settings/       # Paramètres compte
│   │   ├── admin/              # Panel admin
│   │   │   ├── page.tsx        # Vue d'ensemble admin
│   │   │   ├── affiliates/     # Gestion affiliés
│   │   │   ├── commissions/    # Approbation paiements
│   │   │   └── settings/       # Config plateforme
│   │   └── api/                # Route handlers
│   │       ├── health/         # Health check
│   │       ├── affiliates/     # API affiliés
│   │       └── stats/          # API stats
│   ├── components/
│   │   ├── layout/             # DashboardLayout (sidebar + nav)
│   │   └── ui/                 # StatCard, etc.
│   ├── lib/
│   │   ├── supabase/           # client.ts, server.ts, middleware.ts
│   │   └── utils.ts            # cn, formatCurrency, formatDate...
│   ├── types/index.ts          # Types partagés
│   └── middleware.ts           # Protection des routes
└── .env.example                # Variables à configurer
```

## Architecture decisions

- Next.js App Router avec Server Components pour les layouts protégés
- Supabase SSR pour la gestion des cookies d'auth côté serveur
- Middleware Next.js pour la protection des routes `/dashboard` et `/admin`
- TailwindCSS v3 (compatible Next.js 15, pas v4)
- Output standalone pour le déploiement PM2

## Product

- **Landing page** : présentation avec stats et CTA inscription
- **Auth** : connexion / inscription via Supabase Auth
- **Dashboard affilié** : stats, liens d'affiliation, commissions, paramètres
- **Panel admin** : gestion affiliés, approbation commissions, configuration

## User preferences

- Interface en français
- Design dark (slate-950 / gray-900)
- Brand color : indigo (#6366f1)
- Pas d'emojis dans l'UI

## Gotchas

- `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` doivent être configurés dans les secrets Replit avant de connecter Supabase
- Le middleware redirige `/dashboard` et `/admin` si non connecté
- Pour PM2 en production : `HOSTNAME=0.0.0.0` est obligatoire sinon le serveur n'écoute pas sur toutes les interfaces
- TailwindCSS v3 utilisé (pas v4) pour compatibilité Next.js

## Pointers

- Variables d'environnement Supabase : voir `.env.example`
- Voir le `pnpm-workspace` skill pour la structure du monorepo
