# PR #2 — Layout & Navigation

**Branche** : `feature/pr-2-layout-navigation`
**Base** : `master` (après merge PR #1)

## Scope

Construire le layout global réutilisable et les composants UI primitifs.

### Composants

1. **`components/ui/Button.tsx`** — variants: `primary` (or), `secondary` (outline navy), `ghost-dark` (sur navy)
2. **`components/ui/Container.tsx`** — `max-w-7xl mx-auto px-6 lg:px-8`
3. **`components/ui/SectionHeading.tsx`** — Eyebrow Lato uppercase + H2 EB Garamond + intro
4. **`components/common/Logo.tsx`** — wordmark SVG MILA inline (responsive, navy/or)
5. **`components/layout/Header.tsx`** — sticky avec backdrop-blur, logo + nav + LanguageSwitcher + CTA "Prendre RDV"
6. **`components/layout/MobileMenu.tsx`** — drawer plein écran avec close button
7. **`components/layout/LanguageSwitcher.tsx`** — FR ↔ EN, change `[lang]` segment
8. **`components/layout/Footer.tsx`** — 4 colonnes : Brand, Plan, Contact, Légal + copyright

### Files

```
components/
  ui/
    Button.tsx
    Container.tsx
    SectionHeading.tsx
  common/
    Logo.tsx
  layout/
    Header.tsx
    MobileMenu.tsx
    LanguageSwitcher.tsx
    Footer.tsx
app/[lang]/
  layout.tsx                  # MODIFIÉ: intègre Header + Footer
dictionaries/
  fr.json                     # MODIFIÉ: nav + footer keys
  en.json                     # MODIFIÉ: nav + footer keys
```

## Acceptance criteria

- [ ] Header sticky reste visible au scroll, avec backdrop-blur
- [ ] Logo cliquable → home `/[lang]`
- [ ] Nav desktop: Cabinet, Équipe, Expertises, Contact
- [ ] LanguageSwitcher fonctionne : `/fr` ↔ `/en`, garde le path
- [ ] CTA "Prendre RDV" / "Book a meeting" toujours visible (or)
- [ ] Mobile : burger ouvre drawer, click outside ferme
- [ ] Footer affiche bien adresse, tél (`tel:+66971805845`), email
- [ ] `cursor-pointer` partout
- [ ] Focus ring visible sur tous les liens
- [ ] Build vert, lint vert
- [ ] Lighthouse A11y ≥ 95 sur la page

## Verification

- Naviguer FR ↔ EN, vérifier que le path est conservé
- Resize 375 / 768 / 1024 / 1440 — pas de scroll horizontal
- Tab navigation fonctionne entièrement
