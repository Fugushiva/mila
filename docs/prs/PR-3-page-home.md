# PR #3 — Page Home

**Branche** : `feature/pr-3-page-home`
**Base** : `master` (après merge PR #2)

## Scope

Page d'accueil complète avec toutes les sections.

### Sections (dans l'ordre)

1. **Hero** plein écran ~85vh
   - Photo Bangkok skyline (Unsplash) avec overlay navy 60%
   - H1 "Conseil juridique francophone en Thaïlande"
   - Sous-titre 2 lignes
   - 2 CTA : "Prendre rendez-vous" (or) + "Nos expertises" (outline blanc)
   - `next/image` avec `priority` + dimensions explicites

2. **TrustBar** — bande crème
   - Eyebrow "Référencé dans"
   - 4 logos textuels : Springer, Brill, Cengage, Mahidol University

3. **ValueProposition** — grille 4 colonnes
   - 4 USP avec icônes Lucide (Scale, GraduationCap, Languages, MapPin)
   - "Avocats francophones" / "Référence académique" / "Trilingue FR/EN/IT" / "Bangkok + Hua Hin"

4. **ExpertiseGrid** preview
   - H2 "Nos domaines d'expertise"
   - Grille 4×3 avec 12 cartes (icône Lucide + titre + 1 ligne)
   - CTA "Voir toutes nos expertises" → `/[lang]/expertises`

5. **TeamPreview** — focus Pr. Stasi
   - Card horizontale grand format avec silhouette + bio courte
   - Mention "Auteur Springer/Brill/Cengage"
   - 3 cartes secondaires (autres membres)
   - CTA "Découvrir l'équipe" → `/[lang]/equipe`

6. **BookCards** — 3 publications
   - "Thai Private Law" (Springer 2020)
   - "Elements of Thai Civil Law" (Brill)
   - "A Primer of Thai Business Law" (Cengage)
   - Chaque card : illustration livre stylisée + titre + éditeur

7. **CTABand** — bande navy pleine largeur
   - H2 "Discutons de votre situation"
   - 2 CTA : "Prendre RDV" (or) + tel "+66 97 180 5845"

### Files

```
components/sections/
  Hero.tsx
  TrustBar.tsx
  ValueProposition.tsx
  ExpertiseCard.tsx
  ExpertiseGrid.tsx
  LawyerCard.tsx
  TeamPreview.tsx
  BookCard.tsx
  BooksSection.tsx
  CTABand.tsx
components/common/
  LawyerSilhouette.tsx        # SVG silhouette navy/or stylisée avec initiales
public/images/hero/
  bangkok-skyline.jpg         # Unsplash, optimized
app/[lang]/page.tsx           # MODIFIÉ: assemble les sections
dictionaries/
  fr.json                     # MODIFIÉ: home keys
  en.json                     # MODIFIÉ: home keys
lib/data/
  expertises.ts               # 12 expertises avec icône + i18n keys
  team.ts                     # 6 membres avec silhouette config
  books.ts                    # 3 publications
```

## Acceptance criteria

- [ ] Hero LCP < 1.5s (image priorisée)
- [ ] CLS = 0 (dimensions explicites partout)
- [ ] Aucune emoji icon (Lucide uniquement)
- [ ] Toutes les sections responsive 375/768/1024/1440
- [ ] H1 unique sur la page (les autres sections en H2/H3)
- [ ] Build + lint verts
- [ ] Lighthouse Perf ≥ 95
