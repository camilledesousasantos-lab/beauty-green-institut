# Beauty Green Institut — site

Site vitrine de l'institut de beauté Beauty Green Institut (Rouen). Next.js 16 (App Router) +
Tailwind v4 + TypeScript strict. Base de données et back-office : Supabase.

## Commandes

```bash
pnpm install        # dépendances
pnpm dev            # http://localhost:3000
pnpm check          # lint + typecheck + tests + build (ce que la CI fait)
```

## Déploiement

Chaque `git push` sur `main` déclenche la CI GitHub Actions et le déploiement Vercel du projet
lié à ce dépôt. Une pull request reçoit une URL de prévisualisation.
