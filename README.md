# Beauty Green Institut — site

Site vitrine de l'institut de beauté Beauty Green Institut (Rouen). Next.js 16 (App Router) +
Tailwind v4 + TypeScript strict, pages statiques. Aucune base de données en v1 : tout le contenu est
dans des fichiers du dépôt, que Camille modifie elle-même avec Pages CMS.

## Commandes

```bash
pnpm install        # dépendances
pnpm dev            # http://localhost:3000
pnpm check          # lint + typecheck + tests + build (ce que le job `check` de la CI fait)
pnpm e2e            # suite des stories (Playwright, 390 et 1440) — construit avec E2E_DRAFTS=1
pnpm e2e:smoke      # parcours de retest en lecture seule ; E2E_BASE_URL=<url> pour la production
pnpm guard          # garde des tests (kit de livraison) : --base <ref> --head <ref> --allow-file .delivery/stories-touched
pnpm extract        # ré-extrait la maquette validée vers design/maquette/
```

## Le contenu (ce que Camille modifie)

| Fichier | Contenu |
|---------|---------|
| `content/site.json` | nom, lien Planity, Instagram, téléphone, adresse, horaires |
| `content/pages/accueil.json` | accueil : accroche, texte de bienvenue, photo du haut, bloc institut, les 6 photos Instagram |
| `content/pages/prestations.json` | page « Cinq univers » |
| `content/prestations/*.json` | les 5 univers : textes, zones, blocs, bilan, **tarifs (prix en nombre)**, précautions, FAQ, photos |
| `content/pages/{institut,cheques-cadeaux,formations,journal}.json` | les autres pages |
| `content/journal/*.md` | les articles du Journal (`published: false` = brouillon, jamais en ligne) |
| `content/legal/*.md` | mentions légales et politique de confidentialité |
| `public/images/` | les photos (Pages CMS y dépose les nouvelles) |

`.pages.yml` déclare **toutes** les clés lues par le site, listes comprises (`settings.content.merge:
true` ne protège que les clés de premier niveau : une clé d'élément de liste non déclarée serait
perdue à la première sauvegarde). `lib/pages-config.test.ts` le vérifie sur chaque fichier. La mise
en page n'est jamais dans le contenu ; `ordre`, `imagePosition` et les champs SEO sont masqués.

`lib/content.ts` relit chaque fichier au build : une clé obligatoire vidée ou un prix tapé en
lettres fait **échouer le build Vercel** avec le fichier et la clé dans le message ; la version
précédente reste en ligne.

## Comment Camille modifie son site

https://app.pagescms.org → dépôt `beauty-green-institut`, branche `main`. Chaque « Enregistrer »
fait un commit « … (via Pages CMS) » ; Vercel redéploie en une minute environ. Photos : JPEG,
1 600 px de large au maximum, 500 Ko au maximum (rappelé dans la description de chaque champ image).
Le plan Vercel Hobby inclut 5 000 transformations d'images par mois.

## Deux interrupteurs

- `SITE_INDEXABLE=1` (environnement **production** de Vercel seulement) : retire le `noindex`
  (en-tête `X-Robots-Tag`, `<meta robots>`), ouvre `robots.txt` et fait pointer les liens canoniques
  vers `https://beautygreeninstitut.com`. Absent tant que le domaine n'a pas basculé. Posé et retiré
  par `scripts/beauty-green-go-live.py indexable` (hub), étape 5 du kit de mise en ligne.
- `E2E_DRAFTS=1` : rend les brouillons du Journal, **uniquement pour la suite de tests** (jamais
  quand `VERCEL_ENV=production`).

## Redirections

Les 4 anciennes adresses du site Wix redirigent en 308 (`lib/redirects.ts`) : `/reservations`,
`/ch-ques-cadeaux`, `/chou2`, `/photographies-1`. `www.` et `fr.` sont des redirections de domaine
configurées sur le projet Vercel (kit de mise en ligne), pas dans le code.

## La maquette

Les deux maquettes validées par Camille restent en ligne : `/maquette/desktop.html` (1440, 12 vues)
et `/maquette/mobile.html` (390). `design/maquette/` en est l'extraction lisible (tokens, textes,
modules) : la référence du rendu.

## Déploiement

Chaque `git push` sur `main` déclenche la CI GitHub Actions (jobs `check` et `e2e`) et le déploiement
Vercel de production. Les aperçus de branche sont protégés par la connexion Vercel.
