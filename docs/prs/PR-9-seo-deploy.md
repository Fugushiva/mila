# PR #9 — SEO, JSON-LD, OG images & Deploy Vercel

**Branche** : `feature/pr-9-seo-deploy`
**Base** : `master` (après merge PR #8)

## Scope

Finition SEO, accessibilité, deploy production.

### Tâches

1. **`app/sitemap.ts`** — sitemap dynamique
   - 6 pages × 2 langues = 12 URLs
   - lastModified, changeFrequency, priority

2. **`app/robots.ts`** — robots.txt clean
   - Allow all
   - Disallow `/api/`, `/_next/`
   - Sitemap reference

3. **JSON-LD structured data**
   - `Organization` global (root layout)
   - `LegalService` + `LocalBusiness` sur Home
   - `Person` ×6 sur /equipe
   - `BreadcrumbList` sur toutes pages internes

4. **Open Graph images dynamiques** via `next/og` ImageResponse
   - Template OG : fond navy + logo MILA + titre page (EB Garamond) + ville
   - 1 par page (Home, Cabinet, Équipe, Expertises, Contact)
   - Dimensions 1200×630
   - Routes `app/[lang]/<page>/opengraph-image.tsx`

5. **Metadata API**
   - Title template "%s | MILA International Legal Advice"
   - Default description par locale
   - hreflang via `alternates.languages`
   - canonical par page

6. **`app/manifest.ts`** — PWA basique
   - Theme color navy
   - Icons placeholders 192/512

7. **Site verification meta** placeholders Google Search Console

8. **Vercel deploy**
   - Vérifier `vercel.json` non nécessaire
   - Déployer via `vercel --prod` ou auto-deploy GitHub
   - Vérifier les 12 URLs en prod
   - Tester Lighthouse en prod

9. **README.md final** — instructions setup, deploy, structure projet

### Files

```
app/sitemap.ts
app/robots.ts
app/manifest.ts
app/[lang]/layout.tsx              # MODIFIÉ: metadata template + JSON-LD Organization
app/[lang]/page.tsx                # MODIFIÉ: metadata + JSON-LD LegalService
app/[lang]/cabinet/page.tsx        # MODIFIÉ: metadata
app/[lang]/equipe/page.tsx         # MODIFIÉ: metadata + JSON-LD Person[]
app/[lang]/expertises/page.tsx     # MODIFIÉ: metadata
app/[lang]/contact/page.tsx        # MODIFIÉ: metadata
app/[lang]/mentions-legales/page.tsx # MODIFIÉ: metadata + noindex
app/[lang]/opengraph-image.tsx     # NEW: OG image home
app/[lang]/<page>/opengraph-image.tsx ×5
lib/seo/jsonld.ts                  # helpers JSON-LD typés
README.md                          # FINAL
```

## Acceptance criteria

- [ ] Sitemap.xml accessible et valide
- [ ] robots.txt accessible
- [ ] Schema.org validates (Google Rich Results Test) sur Home et /equipe
- [ ] OG image générée pour chaque page (test via opengraph.xyz)
- [ ] hreflang correct entre FR et EN
- [ ] Lighthouse SEO = 100 sur les 6 pages
- [ ] Lighthouse A11y ≥ 95
- [ ] Lighthouse Perf ≥ 90 mobile, ≥ 95 desktop
- [ ] Site déployé sur Vercel, URL fonctionnelle
- [ ] Pas de hardcoded `localhost`
