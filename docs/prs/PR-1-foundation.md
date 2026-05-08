# PR #1 — Foundation: Design System & i18n

**Branche** : `feature/pr-1-foundation`
**Base** : `master`

## Scope

Établir les fondations techniques et visuelles du projet :

1. **Design tokens** dans `app/globals.css` (CSS variables Tailwind v4 `@theme inline`)
2. **Fonts** EB Garamond (display) + Lato (body) via `next/font/google` self-hosted
3. **i18n routing** via segment `[lang]` (pattern officiel Next.js 16)
4. **Dictionaries** JSON `dictionaries/fr.json` + `dictionaries/en.json` avec helper `getDictionary`
5. **Root layout** `app/[lang]/layout.tsx` propre (lang dynamique, fonts attached)
6. **Page placeholder** `app/[lang]/page.tsx` minimal pour tester la chaîne
7. **Cleanup** : suppression du template Next.js (Geist fonts, page.tsx CRA-style, globals.css template)
8. **Redirect** `/` → `/fr` via `app/page.tsx` ou middleware proxy
9. **TypeScript paths** alias `@/lib`, `@/components`
10. **Lib utils** : `lib/utils.ts` (cn helper), `lib/i18n.ts` (locales config)

## Files

```
app/
  globals.css                 # tokens design system (réécrit)
  layout.tsx                  # SUPPRIMÉ (devient [lang]/layout.tsx)
  page.tsx                    # remplacé par redirect vers /fr
  [lang]/
    layout.tsx                # NEW: root layout avec lang dynamique
    page.tsx                  # NEW: placeholder home minimal
dictionaries/
  fr.json                     # NEW
  en.json                     # NEW
lib/
  i18n.ts                     # NEW: locales, getDictionary
  utils.ts                    # NEW: cn() helper
```

## Acceptance criteria

- [ ] `npm run build` exit 0
- [ ] `/` redirige vers `/fr`
- [ ] `/fr` rend une page minimaliste avec font EB Garamond visible sur le H1
- [ ] `/en` rend la même page avec contenu en anglais
- [ ] `<html lang="fr">` ou `<html lang="en">` correct selon le segment
- [ ] DevTools confirme : pas de requête Google Fonts (self-hosted)
- [ ] CSS variables exposées sur `:root` (`--color-primary`, etc.)
- [ ] Tailwind v4 `@theme inline` lit les variables
- [ ] Aucun warning TypeScript

## Verification

```bash
npm run build
npm run dev
# Open localhost:3000 → expect redirect to /fr
# Open localhost:3000/en → expect English content
```

## Notes techniques

- Next.js 16 : `params` est `Promise<{ lang: string }>` — toujours `await params`
- Pattern `PageProps<'/[lang]'>` global helper, pas d'import nécessaire
- `generateStaticParams` dans le layout pour SSG des deux locales
- Dictionaries chargés via dynamic import (`import 'server-only'`)
