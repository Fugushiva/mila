# PR #8 — Page Mentions Légales & Confidentialité

**Branche** : `feature/pr-8-page-mentions-legales`
**Base** : `master` (après merge PR #7)

## Scope

Page combinée mentions légales + politique de confidentialité + cookies. Format prose typographique.

### Sections (page unique avec ancres)

1. **PageHero** — H1 "Mentions légales et confidentialité"

2. **Prose section** (max-w-2xl, mx-auto, EB Garamond pour H2/H3)
   - ## Éditeur du site
     - Raison sociale, adresse, téléphone, email, représentant légal (placeholders à valider)
   - ## Hébergement
     - Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
   - ## Propriété intellectuelle
     - Tous les contenus protégés, reproduction interdite
   - ## Données personnelles (RGPD)
     - Responsable de traitement, finalités, base légale, durée de conservation
     - Droits : accès, rectification, effacement, portabilité, opposition
     - Email pour exercer les droits
   - ## Cookies
     - "Nous utilisons Plausible Analytics qui ne pose aucun cookie ni traceur"
   - ## Loi applicable
     - Droit thaïlandais + français pour les ressortissants

3. **Footer** standard

### Files

```
app/[lang]/mentions-legales/page.tsx   # NEW
components/common/Prose.tsx            # NEW: container typographique pour textes longs
dictionaries/
  fr.json                              # ENRICHI: mentions-legales.* keys
  en.json                              # ENRICHI: legal-notice.* keys
```

## Acceptance criteria

- [ ] Page accessible via `/[lang]/mentions-legales` (FR) et `/en/legal-notice` (en option)
- [ ] Hiérarchie H1 → H2 → H3 propre
- [ ] Tab des matières en haut avec ancres
- [ ] Lien depuis le footer fonctionnel
- [ ] Prose lisible (max 75ch ligne, line-height 1.75)
- [ ] Build vert
