# PR #6 — Page Expertises

**Branche** : `feature/pr-6-page-expertises`
**Base** : `master` (après merge PR #5)

## Scope

Vue d'ensemble des 12 domaines d'expertise organisés en 4 piliers.

### Sections

1. **PageHero** — H1 "Nos expertises" + intro

2. **PillarsNavigation** — 4 ancres scroll
   - Personnes & Famille (icon UserRound)
   - Entreprises (icon Building2)
   - Immobilier (icon Home)
   - Innovation (icon Sparkles)

3. **PillarSection** ×4 (avec ID pour ancres)
   - **Personnes & Famille** : Famille/Divorce, Visa & Immigration, Successions, Pénal
   - **Entreprises** : Droit des Affaires, Sociétés/M&A, Fiscalité, Commerce International
   - **Immobilier** : Immobilier, Foncier
   - **Innovation** : Blockchain/Web3, Propriété Intellectuelle, Biotech

   Chaque expertise = card avec icône Lucide + titre + 2 lignes description + lien "En savoir plus" (placeholder phase 2)

4. **CTABand**

### Files

```
app/[lang]/expertises/page.tsx   # NEW
components/sections/
  PillarsNav.tsx                  # 4 ancres flottantes scroll
  PillarSection.tsx               # 1 pilier avec ses cartes
lib/data/
  pillars.ts                      # définition des 4 piliers + mapping expertises
  expertises.ts                   # MODIFIÉ: ajouter pillarId à chaque expertise
dictionaries/
  fr.json                         # ENRICHI: descriptions des 12 expertises
  en.json                         # ENRICHI: descriptions des 12 expertises
```

## Acceptance criteria

- [ ] 4 piliers + 12 cartes affichées
- [ ] Scroll smooth vers les ancres
- [ ] Icônes Lucide cohérentes (24×24, 1.5px stroke)
- [ ] Pas de fiche détaillée individuelle (phase 2)
- [ ] Build vert
