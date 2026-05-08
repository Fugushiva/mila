# MILA Law — Design System Master

> Source de vérité globale. Toute page peut surcharger via `docs/design-system/pages/[page].md`.
> Version locale du design system généré via `ui-ux-pro-max` skill, avec ajustements brand.

---

**Project:** MILA International Legal Advice
**Generated:** 2026-05-08
**Category:** Legal Services (Law Firm)
**Pattern:** Trust & Authority + Minimal

---

## Brand Direction

**Positioning** : Cabinet d'avocats francophone et italophone à Bangkok et Hua Hin. Lien académique avec Mahidol University. Fondateur (Pr. Alessandro Stasi) publié chez Springer, Brill, Cengage. Cible : expatriés francophones, corporate international, particuliers anglophones.

**Personality** : Sobriété éditoriale haut-de-gamme. Inspiration Magic Circle (Bredin Prat, August Debouzy) avec une touche de chaleur méditerranéenne (lien italophone) et l'ancrage tropical (Thaïlande). Aucun cliché juridique (pas de balance, pas de marteau).

---

## Color Palette (Brand-tuned)

| Role | Hex | Usage | Tailwind |
|------|-----|-------|----------|
| Primary (Navy) | `#0B1F3A` | Headers, navy band, primary text on light | `--color-primary` |
| Primary Soft | `#1A3556` | Hover navy, accents | `--color-primary-soft` |
| Secondary (Or rosé) | `#C8A96A` | CTAs principaux, accents premium | `--color-secondary` |
| Secondary Soft | `#D4B97E` | Hover or | `--color-secondary-soft` |
| Background | `#FAFAF7` | Body background (warm off-white) | `--color-bg` |
| Surface | `#FFFFFF` | Cards, sections sur fond crème | `--color-surface` |
| Text | `#1A1A1A` | Body text | `--color-text` |
| Text Muted | `#5A5A5A` | Secondary text, captions | `--color-text-muted` |
| Border | `#E5E2D9` | Subtle borders, dividers | `--color-border` |
| Accent (Émeraude) | `#0F5132` | "Prendre RDV" CTA spécifique | `--color-accent` |

**Notes brand** :
- Navy `#0B1F3A` choisi vs `#1E3A8A` recommandé par la skill : plus profond, plus premium, lit mieux sur fond crème
- Or rosé `#C8A96A` vs `#B45309` : moins agressif, plus éditorial
- Background crème `#FAFAF7` vs blanc pur : signal "papier juridique" haut-de-gamme

---

## Typography

| Role | Font | Weights | Notes |
|------|------|---------|-------|
| Display / Headings | **EB Garamond** | 400, 500, 600, 700 | Serif éditoriale traditionnelle, recommandation officielle pour Law Firms |
| Body / UI | **Lato** | 300, 400, 700 | Sans-serif chaude institutionnelle |

**Loading** : `next/font/google` self-hosted (zero CLS, RGPD-friendly, pas de requête vers Google)

**Type Scale** (1.25 modular) :
| Token | Mobile | Desktop |
|-------|--------|---------|
| `text-xs` | 0.75rem | 0.75rem |
| `text-sm` | 0.875rem | 0.875rem |
| `text-base` | 1rem | 1rem |
| `text-lg` | 1.125rem | 1.125rem |
| `text-xl` | 1.25rem | 1.5rem |
| `text-2xl` | 1.5rem | 1.875rem |
| `text-3xl` | 1.875rem | 2.5rem |
| `text-4xl` | 2.25rem | 3.5rem |
| `text-display` | 2.75rem | 4.5rem |

**Règles** :
- `<h1>` toujours en EB Garamond, weight 500, tracking `-0.02em`
- `<h2>` EB Garamond weight 500
- `<h3>` Lato weight 700, uppercase optionnel pour eyebrows
- Body Lato 400, line-height 1.65 pour les textes longs

---

## Spacing (8pt grid)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 0.5rem (8px) | Tight gaps |
| `--space-2` | 1rem (16px) | Standard padding |
| `--space-3` | 1.5rem (24px) | Card padding |
| `--space-4` | 2rem (32px) | Section padding mobile |
| `--space-6` | 3rem (48px) | Section spacing |
| `--space-8` | 4rem (64px) | Section padding desktop |
| `--space-12` | 6rem (96px) | Hero padding |
| `--space-16` | 8rem (128px) | Hero desktop |

**Container** : `max-w-7xl` (1280px) avec padding horizontal `1.5rem` mobile / `2rem` desktop.

---

## Radii & Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Inputs, badges |
| `--radius-md` | 8px | Buttons |
| `--radius-lg` | 12px | Cards |
| `--shadow-sm` | `0 1px 2px rgba(11,31,58,0.04)` | Subtle |
| `--shadow-md` | `0 4px 12px rgba(11,31,58,0.08)` | Cards lift |
| `--shadow-lg` | `0 12px 32px rgba(11,31,58,0.12)` | Hover states |

---

## Component Specs

### Buttons

**Primary CTA** (Or rosé) — used for "Prendre RDV", "Nous contacter"
```
bg-secondary text-primary font-bold
px-6 py-3 rounded-md
hover:bg-secondary-soft transition-colors duration-200
focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2
cursor-pointer
```

**Secondary** (outline navy)
```
bg-transparent text-primary border-2 border-primary font-medium
px-6 py-3 rounded-md
hover:bg-primary hover:text-white transition-colors duration-200
```

**Ghost dark** (sur fond navy)
```
bg-transparent text-white border border-white/30
hover:bg-white/10 transition-colors duration-200
```

### Cards

```
bg-surface border border-border rounded-lg p-6
shadow-sm hover:shadow-md transition-shadow duration-200
```

### Inputs

```
bg-white border border-border rounded-md px-4 py-3
text-base placeholder:text-muted
focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
transition-colors duration-200
```

---

## Page Pattern: Trust & Authority

**CTA Placement** : Above fold (hero) + sticky in header
**Section Order** : Hero → Trust signals (publications) → Features (expertises) → Team → CTA

### Mandatory trust elements

- Publications académiques (Springer, Brill, Cengage) — visible sur Home & Équipe
- Lien Mahidol University — encadré dédié sur /cabinet
- Couverture géographique précise (BTS Thong Lor / Ekkamai) — Footer & Contact
- Coordonnées toujours visibles dans le footer

---

## Anti-patterns (BLOCKING)

- ❌ Emojis comme icônes — utiliser **Lucide React** (1.5px stroke)
- ❌ Gradient violet/rose AI-style
- ❌ Photos stock "balance + marteau"
- ❌ Hover transforms qui shift le layout (utiliser color/opacity transitions)
- ❌ Glass cards en fond clair (`bg-white/10` invisible)
- ❌ Texte gris-400 ou plus clair sur fond clair (contraste insuffisant)
- ❌ Sticky navbar qui colle aux bords (top-0) — préférer flottant `top-4`
- ❌ Layout shift au load (toujours `next/font` + `next/image` avec dimensions)

---

## Accessibility Targets

| Critère | Cible |
|---------|-------|
| Contraste body text | ≥ 4.5:1 (WCAG AA) |
| Contraste heading | ≥ 3:1 |
| Focus visible | Ring 2px secondary avec offset |
| `prefers-reduced-motion` | Désactiver toute animation > 200ms |
| Navigation clavier | Tab order logique, skip link |
| Lang attribute | `<html lang={locale}>` (jamais `en` en dur) |
| Alt text | Tous descriptifs, jamais "image" |

---

## Performance Targets

| Métrique | Cible |
|----------|-------|
| LCP | < 1.5s |
| CLS | < 0.05 |
| INP | < 200ms |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| Lighthouse SEO | 100 |
| First Load JS | < 100 KB |

---

## Pre-Delivery Checklist

Visual quality:
- [ ] Pas d'emojis comme icônes (Lucide uniquement)
- [ ] Hover sans layout shift
- [ ] Brand colors via CSS variables, pas en dur
- [ ] Photos optimisées via `next/image` avec `priority` sur hero

Interaction:
- [ ] `cursor-pointer` sur tous les éléments cliquables
- [ ] Transitions 150-300ms
- [ ] Focus states visibles

Layout:
- [ ] Responsive 375 / 768 / 1024 / 1440
- [ ] Pas de scroll horizontal mobile
- [ ] Header floating ne cache pas le contenu

Accessibilité:
- [ ] Alt text sur toutes images
- [ ] Labels sur inputs
- [ ] `prefers-reduced-motion` respecté
- [ ] `<html lang>` correct (fr/en)
