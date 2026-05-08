# PR #5 — Page Équipe

**Branche** : `feature/pr-5-page-equipe`
**Base** : `master` (après merge PR #4)

## Scope

Page liste de l'équipe avec mise en valeur des publications académiques.

### Sections

1. **PageHero** — H1 "Notre équipe" + intro 2 lignes positionnement académique

2. **TeamGrid** — 6 LawyerCards
   - Pr. Alessandro Stasi (Project Director, Mahidol U.)
   - Wichai Jakkrod (Project Manager)
   - Atitaya Srisawet (Project Manager)
   - Amrita Luthra (Legal Assistant)
   - Pasakorn Nuntutchote (Project Officer)
   - Nai Khunsriuchen (Legal Assistant)

   Chaque card :
   - Silhouette SVG navy/or 400×400 avec initiales
   - Nom (EB Garamond XL)
   - Titre (Lato uppercase or)
   - Langues parlées (badges Lato)
   - Bio courte 2 lignes
   - Liens email + LinkedIn (placeholder #)
   - Stasi : badge "Auteur Springer/Brill" en or

3. **PublicationsSection** — full-width
   - H2 "Nos publications académiques"
   - 3 BookCards horizontales avec couvertures stylisées :
     * Thai Private Law (Springer 2020) — 9783030562793
     * Elements of Thai Civil Law (Brill)
     * A Primer of Thai Business Law (Cengage)

4. **CTABand**

### Files

```
app/[lang]/equipe/page.tsx    # NEW
components/sections/
  TeamGrid.tsx
  PublicationsSection.tsx
  BookCard.tsx                # MODIFIÉ: variant horizontal large
components/common/
  LawyerCard.tsx              # NEW (depuis common/)
lib/data/
  team.ts                     # ENRICHI: bios complètes
  books.ts                    # ENRICHI: descriptions complètes
```

## Acceptance criteria

- [ ] Toutes les silhouettes SVG cohérentes (même style, même ratio)
- [ ] Initiales lisibles dessus
- [ ] Stasi visuellement mis en avant (badge + position)
- [ ] BookCards mentionnent éditeur + année + ISBN
- [ ] Build + lint verts
- [ ] Tab navigation logique entre cards
