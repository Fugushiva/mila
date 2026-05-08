# Stratégie de refonte — MILA Law

**Pendant** : `01-current-site-audit.md`
**Date** : 2026-05-08
**Stack** : Next.js 16.2 + React 19 + Tailwind v4 + TypeScript strict (déjà configuré dans `package.json`)

---

## 1. Vision produit

> Un cabinet d'avocats francophone et italophone à Bangkok, **vu par lui-même** comme une boutique premium type Magic Circle, mais ancré dans la réalité tropicale et académique thaïlandaise. Le site doit être **le 1er point de contact d'un dossier à 5-50k €** : il doit signaler l'autorité, faciliter la prise de contact, et résister à l'examen d'un General Counsel CAC40.

### Cible primaire

| Persona | Besoin | Conversion attendue |
|---|---|---|
| **Expatrié FR/IT** (50-65 ans, RT, retraite) | Visa, succession, immobilier | Email + booking 30-min |
| **Dirigeant PME FR** (40-55 ans) qui exporte/installe | Setup company, contrats, fiscalité | Booking 1h + devis |
| **General Counsel** (équipe légale française cliente) | Audit, contentieux, M&A FR-TH | Email direct au Pr. Stasi |
| **Investisseur immobilier** (35-60 ans) | Due diligence, condo/lease | Brochure PDF + booking |

### Cible secondaire

- Avocats français cherchant un correspondant à Bangkok (réseau référent)
- Étudiants en droit (Mahidol) → pipeline recrutement junior

---

## 2. Architecture de l'information cible

```
/                                   → redirige vers /fr (proxy.ts existant)
/[lang]                             → home
/[lang]/cabinet                     → "Le cabinet" (histoire + Mahidol + valeurs)
/[lang]/equipe                      → "L'équipe" (LawyerCards + livres)
/[lang]/expertises                  → 4 piliers + 12 expertises catégorisées
/[lang]/expertises/[slug]           → 1 page par expertise (SEO long-tail) — phase 2
/[lang]/contact                     → formulaire + booking + map + WhatsApp
/[lang]/ressources                  → ex-"Lois et règlements" (guides PDF)
/[lang]/actualites                  → blog (MDX in-repo)
/[lang]/actualites/[slug]           → article — phase 2
/[lang]/mentions-legales            → mentions + RGPD + cookies (combinés)
```

**Sitemap** : généré via `app/sitemap.ts` (Next.js 16 native).
**hreflang** : auto-injecté via `alternates.languages` dans `generateMetadata`.

---

## 3. Stratégies UX appliquées (issues de l'audit)

### 3.1 Pattern global : "Trust & Authority + Editorial Minimal"

Inspiré des Magic Circle (Bredin Prat, A&O, Linklaters) avec **chaleur méditerranéenne** (italophone) et **ancrage local** (Thaïlande).

| Principe | Application |
|---|---|
| **Sobriété éditoriale** | Beaucoup d'espace blanc, peu d'éléments par viewport, hiérarchie claire |
| **Pyramide inverse** | Promesse > preuves (publications, ambassade) > expertises > équipe > CTA |
| **CTA doubles** | Primary "Prendre RDV" (or rosé) + Secondary "Nous appeler" (outline navy) |
| **No-emoji policy** | Lucide React 1.5px stroke uniquement |
| **Photos contrôlées** | Noir/blanc équipe + couleurs lieux Bangkok/Hua Hin, jamais stock générique |

### 3.2 Hero pattern (home)

```
┌────────────────────────────────────────────────────┐
│ [logo]              [nav floating]    [FR EN IT]  │
├────────────────────────────────────────────────────┤
│                                                    │
│  EYEBROW (Or rosé) : "Cabinet francophone & italophone"  │
│                                                    │
│  H1 (EB Garamond 500, 4xl-6xl) :                  │
│  "Conseil juridique de référence à Bangkok"       │
│                                                    │
│  Lead (Lato 18, 1.65) :                           │
│  "Avocats français et italiens, professeurs à     │
│   Mahidol University, conseillers de l'Ambassade  │
│   française et italienne en Thaïlande."           │
│                                                    │
│  [Prendre RDV (or)] [Nos expertises (outline)]    │
│                                                    │
│  ─── Trust band ──────────────────────────────────│
│  Référencé dans : Springer · Brill · Cengage     │
│                  · Mahidol University             │
│                                                    │
│  [Photo Bangkok skyline noir/blanc + overlay navy]│
└────────────────────────────────────────────────────┘
```

### 3.3 Sections home (ordre)

1. **Hero** (cf. ci-dessus)
2. **ValueProposition** : 4 piliers (Francophones, Académique, Trilingue FR/EN/IT, Bangkok+Hua Hin)
3. **ExpertiseGrid (preview)** : 6-8 cards expertises principales → CTA "Voir toutes les expertises"
4. **TeamPreview** : 3 portraits (Stasi + 2 associés) → CTA "Découvrir l'équipe"
5. **Books** : 3 cartes BookCards (publications Springer/Brill/Cengage)
6. **CTABand** (full-width navy) : "Un dossier à confier ? Échangeons 30 min." → booking
7. **Footer** 4 colonnes (Sitemap / Contact / Ressources / Mentions)

### 3.4 Header sticky floating (anti-pattern Wix actuel)

```css
.header {
  position: fixed;
  top: 1rem;       /* floating, pas top-0 */
  left: 1rem;
  right: 1rem;
  background: rgba(250, 250, 247, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  z-index: 50;
}
```

### 3.5 Mobile-first natif

- 1 colonne par défaut, breakpoint à `768px` puis `1024px`
- Touch targets ≥ 48×48 px (au-delà du minimum 44)
- Menu drawer slide-from-right avec overlay (Radix Dialog ou implémentation custom)
- Bouton WhatsApp flottant bottom-right `position: sticky` après scroll

### 3.6 Conversion paths

```
Visiteur → 4 chemins de conversion possibles :

1. Hot lead   : "Prendre RDV" → Cal.com embed → confirmation
2. Warm lead  : Formulaire contact → email transactionnel + Slack/email équipe
3. Cold lead  : Newsletter signup → drip + brochure PDF download
4. Direct     : WhatsApp / tel: cliquables (mobile)
```

### 3.7 Trust signals exploitation maximale

| Signal | Où l'afficher | Format |
|---|---|---|
| Mahidol University | Hero trust band + page Cabinet | Logo monochrome + texte |
| Springer / Brill / Cengage | Hero + page Équipe | BookCards avec ISBN |
| Ambassade FR / IT | Page Cabinet + Contact | "Avocats référencés par l'Ambassade" |
| Stasi PhD publications | Page Équipe | LawyerCard avec liste publications cliquables |
| 10+ ans d'existence (depuis 2012) | Footer + About | "Établi en 2012" |
| Trilingue FR/EN/IT | Header (lang switcher) + Footer | Visible toujours |

---

## 4. Stratégies SEO appliquées

### 4.1 Cibles mots-clés

**FR** (priorité 1) :
- "avocat français Bangkok" (3-4k recherches/mois)
- "avocat francophone Thaïlande" (1-2k)
- "cabinet avocat Bangkok" (1k)
- "succession Thaïlande" (500)
- "visa retraite Thaïlande" (3k)
- "achat condo Thaïlande" (2k)

**IT** (priorité 2) :
- "avvocato italiano Bangkok" (300-500)
- "studio legale Thailandia" (200)

**EN** (priorité 3, marché anglophone Bangkok) :
- "english speaking lawyer Bangkok" (1-2k)
- "Thai business law firm" (500)

### 4.2 Tactiques

1. **1 page = 1 intent** : pages d'expertise dédiées (`/expertises/visa-retraite`, `/expertises/achat-immobilier`, `/expertises/setup-company`)
2. **Maillage interne** : liens contextuels expertise ↔ équipe ↔ ressources
3. **Schema.org enrichi** :
   - `Organization` (root)
   - `LegalService` (par expertise) avec `serviceArea`
   - `Person` (Stasi, Tan, Atitaya...) avec `alumniOf` Mahidol
   - `Book` (publications avec ISBN)
   - `BreadcrumbList` (toutes pages)
   - `FAQPage` (par expertise — phase 2)
4. **OG images dynamiques** via `app/[lang]/[...]/opengraph-image.tsx`
5. **Sitemap propre** + **robots.txt** + **canonical** systématiques
6. **hreflang** auto via `alternates.languages`
7. **Pas de JS bloquant le rendu** : Next.js App Router + Server Components par défaut

---

## 5. Stratégies de performance

### 5.1 Targets (déjà définies dans MASTER.md)

| Métrique | Cible |
|---|---|
| LCP | < 1.5s |
| CLS | < 0.05 |
| INP | < 200ms |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| First Load JS | < 100 KB |

### 5.2 Tactiques

- **Server Components par défaut** : seuls Header/Footer/MobileMenu/ContactForm en client
- **Pas de framework UI lourd** : Tailwind v4 + composants maison (pas de Material/Chakra)
- **next/image** systématique avec `priority` sur le hero, `loading="lazy"` ailleurs
- **next/font** self-hosted (déjà fait pour EB Garamond + Lato)
- **AVIF + WebP** auto via next/image
- **Pas de Cal.com embed iframe sur la home** : seulement sur `/contact` (lazy)
- **Préchargement DNS** vers les domaines tiers (analytics) en `<link rel="dns-prefetch">` hors écran critique
- **HTTP/3 + Brotli** via Vercel (par défaut)
- **No tracking pixels lourds** : Plausible.io ou Vercel Analytics (12 KB max)

---

## 6. Stratégies a11y (WCAG 2.2 AA stricte)

| Critère | Implémentation |
|---|---|
| Skip link | Présent dans `app/[lang]/layout.tsx` ✅ déjà fait |
| Focus visible | Ring 2px or rosé + offset 2px (CSS global) ✅ déjà fait |
| `<html lang>` | Dynamique par locale ✅ déjà fait |
| Heading hierarchy | 1 H1 par page enforcement (lint custom) |
| Alt text | Validation via `<Image>` props obligatoires |
| Touch targets | Min `min-h-[48px]` sur tous boutons/liens nav |
| Reduced motion | `@media (prefers-reduced-motion)` ✅ déjà fait |
| Form labels | Pattern `<Label htmlFor>` strict |
| ARIA | Uniquement quand HTML sémantique insuffisant |
| Contrast ratio | Tout testé via Playwright + axe-core (CI) |

---

## 7. Stratégies de conversion

### 7.1 Form contact (page `/contact`)

Champs minimaux (3 obligatoires + 1 message) :
- Nom complet *
- Email *
- Téléphone (optionnel mais demandé pour appel)
- Type de demande (select : Expatriation / Affaires / Immobilier / Autre)
- Message *

Validation Zod côté serveur (Server Action).
Honeypot anti-spam + rate limit (Upstash Redis ou Vercel KV).
Envoi via Resend ou Postmark → email transactionnel + copie Slack équipe.
Toast success + email confirmation au visiteur.

### 7.2 Booking

Cal.com (open-source, RGPD-friendly) embed sur `/contact#book`.
Calendrier en LIGHT theme avec brand colors.
Slot type : "Premier échange — 30 min — gratuit".

### 7.3 WhatsApp / Tel

Bouton flottant bottom-right (mobile) après scroll de 200px.
Lien `wa.me/+66971805845?text=Bonjour,%20je%20souhaiterais...`
Lien `tel:+66971805845`
Tracking event "whatsapp_click" via Plausible.

### 7.4 Brochure PDF

Lead magnet "Guide juridique de l'expatriation FR en Thaïlande 2026" en PDF.
Form 2 champs (email + nom) → download immédiat + ajout newsletter.

---

## 8. Stratégies i18n

Architecture déjà en place dans le repo :
- Segment `[lang]` (Next.js 16 pattern officiel)
- Dictionaries JSON `dictionaries/fr.json` + `dictionaries/en.json`
- Italien à ajouter en phase 2 (`dictionaries/it.json`)
- Type safety via `satisfies Dictionary`
- Proxy de redirection auto via `proxy.ts` (Accept-Language négociation)

**Couverture i18n par phase** :
- Phase 1 (PRs 1-9) : FR + EN
- Phase 2 (post-launch) : ajout IT (pour préserver le marché italophone existant `/studio`)
- Phase 3 (si besoin) : TH (pour clientèle locale ?)

---

## 9. Direction artistique

### 9.1 Palette finale (validée dans MASTER.md)

```
Primary (Navy)    #0B1F3A   — headers, body text, navy bands
Primary Soft      #1A3556   — hovers
Secondary (Or)    #C8A96A   — CTAs primaires "Prendre RDV"
Secondary Soft    #D4B97E   — hovers or
Accent (Émeraude) #0F5132   — CTAs spécifiques (booking confirmé)
Background        #FAFAF7   — body crème (papier juridique)
Surface           #FFFFFF   — cards
Text              #1A1A1A   — body
Text Muted        #5A5A5A   — secondaire
Border            #E5E2D9   — dividers
```

### 9.2 Typographie

- **EB Garamond** (Google Fonts, self-hosted via next/font) — Display & H1/H2/H3
- **Lato** (Google Fonts, self-hosted) — Body & UI
- 2 polices uniquement, jamais plus.

### 9.3 Iconographie

- **Lucide React** uniquement (1.5px stroke)
- Taille standard `w-5 h-5` (20px) pour UI, `w-6 h-6` pour features
- Couleur héritée du contexte (currentColor)

### 9.4 Photographie

| Type | Style |
|---|---|
| Hero | Bangkok skyline (jour ou nuit) **noir/blanc**, overlay navy 30-50% |
| Équipe | Portraits noir/blanc, fond crème, regard caméra, demi-buste |
| Cabinet (intérieur) | Couleur, lumière naturelle, sobriété |
| Détails (Wat, livres) | Couleur, gros plan, profondeur de champ |

À sourcer : Unsplash + photos pro à commissionner.
**Jamais** : photos stock "marteau / balance / signature".

### 9.5 Layout & spacing

- 8pt grid (déjà tokenisé)
- Container `max-w-7xl` (1280px)
- Sections padding : `py-16 md:py-24` (mobile/desktop)
- Hero padding : `py-24 md:py-32`

---

## 10. Roadmap d'exécution (PRs)

Aligné avec `docs/prs/README.md` existant. **9 PRs séquentielles**, chacune mergée avant la suivante :

| PR | Scope | Estimation | Dépendances |
|---|---|---|---|
| **#1** Foundation | Tokens, fonts, layout root, dictionaries | 1j | — |
| **#2** Layout & Nav | Header sticky, Footer, MobileMenu, LangSwitcher, UI primitives | 2j | #1 |
| **#3** Home | Hero, ValueProp, ExpertiseGrid preview, TeamPreview, BookCards, CTABand | 2-3j | #2 |
| **#4** Cabinet | Histoire, valeurs, Mahidol, géo, chiffres clés | 1-2j | #2 |
| **#5** Équipe | LawyerCards (silhouettes SVG ou photos), BookCards | 2j | #2 |
| **#6** Expertises | 4 piliers, 12 expertises (1 page liste + 12 stubs) | 2-3j | #2 |
| **#7** Contact | Form (Server Action + Zod + Resend), ContactInfo, Map, bandeau ambassade | 2-3j | #2 |
| **#8** Mentions légales | RGPD + cookies + mentions (combinées) | 0.5j | #2 |
| **#9** SEO + Deploy | Sitemap, robots, JSON-LD, OG images, Vercel deploy | 1-2j | #1-#8 |

**Total estimé** : 13-19 jours de dev focus, à répartir selon disponibilité.

### Quick wins post-launch (phase 2)

- Pages dédiées par expertise (12 pages SEO)
- Blog MDX in-repo (3-5 articles initiaux)
- IT locale + dictionnaire complet
- Newsletter (form simple → Resend audience)
- Brochure PDF lead magnet
- Cal.com embed prod

---

## 11. Stack & outils

| Couche | Choix | Justification |
|---|---|---|
| Framework | Next.js 16.2 App Router | SSR + Server Components → perf + SEO native |
| UI | React 19 + Tailwind v4 | Modernité, perf, écosystème |
| Lang | TypeScript strict | Type safety pour i18n + Server Actions |
| Fonts | next/font self-hosted | RGPD + zéro CLS |
| Icons | Lucide React | Cohérence + tree-shake |
| Forms | Server Actions + Zod | Pas de runtime client lourd |
| Email | Resend | API moderne, prix raisonnable, RGPD-EU compliant |
| Booking | Cal.com (embed) | Open-source, RGPD-friendly |
| Analytics | Vercel Analytics ou Plausible | Privacy-first |
| Deploy | Vercel | Edge + ISR + Image Optimization gratuites |
| CMS (phase 2) | MDX in-repo | Pas de SaaS, contrôle total |

---

## 12. Validation & tests

À chaque PR :
- `npm run build` doit passer
- `npm run lint` doit passer
- `lsp_diagnostics` clean
- Lecture visuelle de la page concernée (Playwright snapshot manual)

Avant launch (PR-9) :
- Lighthouse CI : Performance ≥ 95, A11y = 100, SEO = 100, BP = 100
- axe-core via Playwright : 0 critical issues
- Test mobile réel (iPhone Safari + Android Chrome)
- Test multilang (FR + EN, IT en phase 2)
- Test formulaire de contact + Cal.com booking end-to-end
- Validation des CTAs et liens
- Vérif open-graph/Twitter Card via opengraph.xyz

---

## 13. Démarchage commercial du nouveau site

> Tu m'as dit : *"j'ai pour but de les démarcher avec un nouveau site web"*.

**Plan de démarche commerciale** :

1. **Livrer un MVP démontrable** (PR-1 à PR-3 mergés + déployé sur Vercel preview)
2. **Préparer un side-by-side** : screenshot actuel mila-law.com vs preview Vercel
3. **Document d'audit** (ce dossier `/docs/audit/`) à partager en PDF
4. **Email de prospection** au Pr. Stasi / `info@mila-law.com` :
   - Sujet : `Refonte mila-law.com — preview Next.js + audit complet`
   - Body : 2 paragraphes max + lien preview + lien audit PDF
5. **LinkedIn** : message direct au Pr. Alessandro Stasi avec teaser de la home
6. **Proposition commerciale** : forfait refonte + maintenance (3-6k € selon scope final)

**Argumentaire chiffré** :
- 90 scripts JS Wix → 8-10 scripts Next.js (10× plus rapide)
- 0 formulaire → 1 formulaire + booking (pipeline leads activé)
- 4-19 H1 → 1 H1 par page (SEO crédible)
- 26/45 cibles trop petites mobile → 100% conformes Apple HIG
- 6 polices → 2 polices (cohérence + perf)
- Aucun JSON-LD enrichi → 5 types schema.org

**ROI estimé** :
- +30-50% lead volume (form + WhatsApp)
- +20-40% organic traffic (12 mois)
- -60% bounce rate mobile

---

## 14. Annexes

- `01-current-site-audit.md` : audit détaillé site actuel
- `screenshots/` : captures Playwright (desktop + mobile)
- `docs/design-system/MASTER.md` : design system détaillé
- `docs/prs/` : roadmap PRs détaillée
