# PR #4 — Page Cabinet (À propos)

**Branche** : `feature/pr-4-page-cabinet`
**Base** : `master` (après merge PR #3)

## Scope

Page institutionnelle détaillant l'histoire, les valeurs et la couverture du cabinet.

### Sections

1. **Hero compact** ~40vh
   - H1 "Le cabinet MILA"
   - Sous-titre : "Depuis 2012, conseil juridique de référence pour la communauté francophone et internationale en Thaïlande"

2. **NotreHistoire** — 2 colonnes texte/image
   - Texte rédactionnel placeholder (à compléter par le cabinet)
   - Image bureau / Bangkok stylisée

3. **NosValeurs** — 3 piliers icônes
   - Excellence académique (icon GraduationCap)
   - Approche pluriculturelle (icon Globe)
   - Disponibilité (icon Clock)

4. **MahidolConnection** — encadré premium
   - Card grande largeur fond crème + accent or
   - "Liens privilégiés avec Mahidol University"
   - Logo Mahidol (placeholder texte) + paragraphe

5. **CouvertureGeographique**
   - SVG carte Thaïlande stylisée avec marqueurs
   - Bullets villes : Bangkok (HQ), Hua Hin (bureau secondaire)
   - Mention interventions Phuket, Pattaya, Chiang Mai, Koh Samui

6. **ChiffresClés** — bande stats
   - 12+ années d'expérience | 3 langues | 12 domaines | 6 avocats

7. **CTABand**

### Files

```
app/[lang]/cabinet/page.tsx   # NEW
components/sections/
  PageHero.tsx                # Hero compact réutilisable
  Pillars.tsx                 # 3 colonnes piliers
  Stats.tsx                   # bande stats
  MahidolBlock.tsx
  CoverageMap.tsx
public/images/cabinet/
  thailand-map.svg
dictionaries/
  fr.json                     # MODIFIÉ: cabinet keys
  en.json                     # MODIFIÉ: cabinet keys
```

## Acceptance criteria

- [ ] Page accessible via `/[lang]/cabinet`
- [ ] H1 unique
- [ ] Carte Thaïlande SVG inline (pas d'image bitmap)
- [ ] Stats animées au scroll (avec respect `prefers-reduced-motion`)
- [ ] Build vert
