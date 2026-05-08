# PR Roadmap — MILA Law Refonte

Roadmap d'exécution séquentielle. Chaque PR a un scope précis, est ouverte en draft, implémentée, mergée puis la suivante démarre.

## Ordre d'exécution

| # | Branche | Scope | Statut |
|---|---------|-------|--------|
| 1 | `feature/pr-1-foundation` | Design system tokens, fonts EB Garamond/Lato, layout root i18n `[lang]`, dictionaries fr/en, cleanup template Next.js | 🟡 |
| 2 | `feature/pr-2-layout-navigation` | Header sticky, Footer 4 colonnes, MobileMenu drawer, LanguageSwitcher, UI primitives (Button, Container, SectionHeading, Logo) | ⏳ |
| 3 | `feature/pr-3-page-home` | Hero (Bangkok skyline + overlay navy), ValueProposition, ExpertiseGrid preview, TeamPreview, BookCards, CTABand | ⏳ |
| 4 | `feature/pr-4-page-cabinet` | Histoire, valeurs, lien Mahidol University, couverture géo Bangkok+Hua Hin, chiffres clés | ⏳ |
| 5 | `feature/pr-5-page-equipe` | LawyerCards avec silhouettes SVG navy/or stylisées, BookCards Springer/Brill/Cengage | ⏳ |
| 6 | `feature/pr-6-page-expertises` | 4 piliers (Personnes, Entreprises, Immobilier, Innovation), 12 expertises catégorisées | ⏳ |
| 7 | `feature/pr-7-page-contact` | Formulaire UI + toast success, ContactInfo, MapEmbed, bandeau urgence ambassade | ⏳ |
| 8 | `feature/pr-8-page-mentions-legales` | Page mentions légales + RGPD + cookies (combinée) | ⏳ |
| 9 | `feature/pr-9-seo-deploy` | sitemap.ts, robots.ts, JSON-LD (Organization, LegalService, Person), OG images dynamiques, deploy Vercel | ⏳ |

## Conventions

- **Branche source** : toujours `master` (rebase avant merge si besoin)
- **Commits** : Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **PR title** : `[PR #N] <scope>` en français
- **Merge strategy** : Squash and merge (historique propre)
- **Verification avant merge** : `npm run build` + `npm run lint` + lecture visuelle de la page concernée

## Stack

- Next.js 16.2.6 (App Router, React 19.2)
- TypeScript strict
- Tailwind CSS v4
- next/font self-hosted EB Garamond + Lato
- i18n via segment `[lang]` + dictionaries JSON (pattern officiel Next.js 16)
- MDX in-repo (phase 2)
- Vercel deploy
