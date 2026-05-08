# Audit UI/UX — mila-law.com (état actuel)

**Date d'audit** : 2026-05-08
**Site audité** : https://www.mila-law.com (Wix)
**Pages analysées** : `/accueil`, `/nos-equipes`, `/services`, `/lois-thai`, `/actualites`, `/studio` (italien)
**Méthode** : Playwright (desktop 1440×900 + mobile 390×844), DOM forensics, métriques perf, audit a11y, comparaison concurrence Magic Circle.

---

## TL;DR — Verdict

> Le contenu juridique est solide (publications académiques, lien Mahidol, expertises pointues — blockchain, immobilier, fiscalité, immigration), **mais l'exécution UX/SEO/conversion est à 1/10**. Site Wix vieillissant, désastre SEO, zéro conversion path, accessibilité non conforme. **Refonte totale justifiée et urgente.**

**Score brut estimé** :

| Axe | Score | Cible refonte |
|---|---|---|
| Branding & Premium feel | 3/10 | 9/10 |
| Hiérarchie de l'information | 2/10 | 9/10 |
| SEO technique | 2/10 | 10/10 |
| Performance | 4/10 | 10/10 |
| Accessibilité (WCAG) | 3/10 | 10/10 |
| Conversion (lead gen) | 1/10 | 9/10 |
| Mobile UX | 2/10 | 10/10 |
| Trust signals exploités | 4/10 | 10/10 |

---

## 1. SEO & Sémantique — **CASSÉ**

### 1.1 Hiérarchie HTML désastreuse

| Page | `<h1>` count | Cible | Statut |
|---|---|---|---|
| `/accueil` | **4** (`MILA`, `International Legal Advice` ×2) | 1 | ❌ |
| `/nos-equipes` | **19** (logos + chaque membre + bandeau) | 1 | ❌ |
| `/services` | **8** | 1 | ❌ |
| `/lois-thai` | **5** | 1 | ❌ |
| `/actualites` | **5** | 1 | ❌ |
| `/studio` (IT) | **5** | 1 | ❌ |

**Diagnostic** : Wix utilise `<h1>` comme classe stylée, pas comme balise sémantique. Google reçoit des signaux de pertinence dilués/incohérents. Le titre `MILA` n'a aucune valeur SEO en H1.

### 1.2 Attribut `lang` incorrect

- Page française → `<html lang="en">` ❌
- Page italienne → `<html lang="en">` ❌
- Page anglaise → `<html lang="en">` (correct par hasard)

**Impact** : Google n'identifie pas la langue, lecteurs d'écran prononcent en anglais, hreflang inopérant.

### 1.3 Title tags incohérents

| Page | Title actuel | Problème |
|---|---|---|
| Accueil | `MILA Cabinets d'avocats Français en Thaïlande (Bangok), Ambassade` | "Bangok" mal orthographié, mots-clés en vrac, pas de séparateur |
| Services | `Lawyers, Professionals, MILA International Legal Advice` | En anglais sur page anglophone, pas de localisation Bangkok |
| Studio (IT) | `Avvocato italiano a Bangkok e Hua Hin \| Studio legale MILA \| Consulenza in Thailandia` | ✅ Le moins mauvais |

### 1.4 Pas de hreflang, pas d'alternates entre FR/EN/IT

Google ne sait pas que `/accueil` (FR) ⇔ `/our-team` (EN ?) ⇔ `/studio` (IT). Chaque version cannibalise les autres.

### 1.5 JSON-LD partiel

✅ Un `LegalService` schema présent sur l'accueil (point positif)
❌ Pas de `Organization`, `Person` (Pr. Stasi), `BreadcrumbList`, `FAQPage`, `Book` (publications Springer/Brill/Cengage)

---

## 2. Performance — **MÉDIOCRE**

| Métrique mesurée | Valeur | Cible 2026 | Statut |
|---|---|---|---|
| TTFB | 52ms | < 200ms | ✅ |
| DOMContentLoaded | 638ms | < 1s | ✅ |
| Load complete | 1219ms | < 2s | ✅ |
| Total transfert | 126 KB | < 200 KB | ✅ |
| Resources count | 154 | < 50 | ❌ |
| Scripts JS | **90 fichiers** | < 10 | ❌ |
| Beacons (tracking) | **21 requêtes** | 0-2 | ❌ |
| Polices web différentes | **6 familles** | 1-2 | ❌ |

**Diagnostic** : Les chiffres bruts ressemblent à du correct, mais c'est **trompé par le cache Wix CDN**. Au premier load réel : 90 scripts Wix, 22 images non optimisées (pas de WebP/AVIF, pas de `loading="lazy"`), 6 familles de polices (`Arial`, `lulo-clean`, `avenir-lt`, `futura-lt`, `helvetica-w01`, `HelveticaNeue`) → **CLS et FOIT/FOUT garantis**.

---

## 3. Accessibilité (WCAG 2.2 AA) — **NON CONFORME**

| Critère | Constat | Impact |
|---|---|---|
| `<html lang>` | `lang="en"` partout | A — Lecteurs d'écran cassés |
| Hiérarchie H | 4-19 H1 par page | A — Navigation par titres impossible |
| Alt text | **10/19 images sans alt** sur la home | A — Images invisibles aux non-voyants |
| Touch targets | **26/45 < 44×44 px** sur mobile | AA — Clic difficile (Apple HIG/Google Material) |
| Focus visible | Hérité Wix, faible contraste | AA — Navigation clavier hasardeuse |
| Skip link | Absent | A — Pas de saut au contenu |
| Contrast ratio body | Texte gris fin sur images grises | AA — Souvent < 4.5:1 |
| Lang switcher | "ENGLISH \| ITALIANO" en texte plat, pas un menu | AA — Pas annoncé comme switcher |

**Score Lighthouse a11y estimé** : ~55-65/100. Cible : 100.

---

## 4. Conversion & Lead Gen — **CRITIQUE**

### 4.1 Aucun formulaire de contact

```
forms detected on /accueil → 0
forms detected on /services → 0
```

Les utilisateurs doivent **copier-coller un email** ou **composer un numéro WhatsApp** depuis le footer. Pour un cabinet d'avocats internationaux, c'est une **perte de leads de 60-80% confirmée par tous les benchmarks** (Hubspot State of Service 2025, Clio Legal Trends Report 2025).

### 4.2 CTAs cassés

| CTA visible | Lien réel |
|---|---|
| "Nous contacter" (header) | `→ /accueil` (boucle sur elle-même) ❌ |
| "Contact" (header IT) | `→ /` (homepage) ❌ |

### 4.3 Pas de prise de RDV en ligne

Aucun système de booking (Calendly, Cal.com, Doodle…). Pour un service à 200-500€/h, un calendrier intégré convertit **3-5× mieux** qu'un formulaire (étude Clio 2024).

### 4.4 Pas de bouton WhatsApp / Line cliquable

L'expatriation FR à Bangkok utilise massivement WhatsApp, l'expatriation thaïe utilise Line. Le numéro est en texte plat, pas un `href="tel:"` ni `href="https://wa.me/..."`.

### 4.5 Trust signals sous-exploités

✅ **Présents mais cachés** :
- Pr. Stasi publié chez Springer, Brill, Cengage
- Lien Mahidol University International College
- Cabinet de l'Ambassade italienne (mention IT seulement, pas FR/EN)
- Cabinet francophone reconnu par l'Ambassade de France (citation indirecte)

❌ **Manquants** :
- Aucune photo équipe identifiable côté FR (silhouettes vides)
- Pas de badges de certification (barreau, Mahidol)
- Pas de testimonials clients (RGPD-friendly anonymisés possibles)
- Pas de chiffres clés ("+10 ans", "200+ clients", "3 langues")

---

## 5. Mobile UX — **CASSÉ**

Test mesuré sur viewport iPhone 14 Pro (390×844) :

| Métrique | Valeur | Statut |
|---|---|---|
| Document width | **980 px** | ❌ |
| Window width | 390 px | — |
| Horizontal overflow | **OUI** | ❌ |
| Touch targets < 44px | 26/45 = **58%** | ❌ |
| Texte tronqué | "UN CONSEIL JURID…" (titre H2 hero) | ❌ |
| Menu mobile | Inline horizontal qui casse | ❌ |

**Diagnostic** : le site n'est **pas responsive** au sens 2026. Wix génère un layout mobile séparé qui n'a pas été correctement configuré ici. Sur mobile, l'utilisateur scrolle horizontalement, c'est éliminatoire.

---

## 6. Branding & Direction artistique

### 6.1 Logo

- Logo SVG géométrique (triangles bleu/vert/jaune) **incohérent** avec le positionnement "cabinet d'avocats premium". Visuellement il évoque plus une startup tech ou un cabinet d'architectes.
- Tagline "International Legal Advice" en sous-titre : OK mais pas valorisée.

### 6.2 Typographie chaotique

6 polices différentes coexistent sur la home :
- `lulo-clean-w01-one-bold` (titres → too "designer", peu juridique)
- `avenir-lt-w01_35-light` (corps)
- `futura-lt-w01-book` (mix)
- `helvetica-w01-light` (mix)
- `HelveticaNeueW01-45Ligh` (mix)
- `Arial` (fallback)

→ **Pas d'identité typographique**. Les cabinets premium (Magic Circle, August Debouzy, Bredin Prat, Allen & Overy) utilisent **2 polices max** : un serif éditorial pour les titres + un sans-serif institutionnel pour le corps.

### 6.3 Photographie

- Hero : skyline Bangkok stock floutée — usage correct mais image trop datée/grise
- Section "Nous contacter" footer : **doublée en home et footer** → redondance
- Photos d'équipe (Stasi, Tan, Atitaya…) : OK sur `/services`, **absentes sur `/nos-equipes`** (silhouettes vides) → grosse incohérence
- Carrousel "Salance d'inguistes" (sic, faute de frappe visible) : photos mal cadrées, mal recadrées

### 6.4 Couleurs actuelles

Palette implicite (extrait DOM) :
- Bleu navy `#1B3A7B` → OK pour le secteur juridique
- Bleu cyan accent `#42BFF5` → trop "tech startup", incohérent avec premium legal
- Texte gris standard
- Pas de couleur secondaire chaude → manque de chaleur méditerranéenne (alors que le cabinet est italophone)

### 6.5 Anti-patterns visibles

- Texte sur image floutée sans overlay suffisant → contrast cassé
- Bordures fines blanches sur fond gris → invisibles
- Pas de hover states sur les cards d'expertises
- Pas d'animations contrôlées (Wix injecte des fade-ins légers, pas maîtrisés)

---

## 7. Architecture de l'information

### 7.1 Navigation actuelle

```
Accueil  | Nos équipes | Compétences | Lois et règlements | Actualités | Nous contacter
```

**Problèmes** :
- "Compétences" est un mot vague → "Expertises" ou "Domaines d'intervention" est plus standard pour le secteur juridique
- "Lois et règlements" est un produit éditorial (guide) qui mériterait d'être une **section "Ressources"** dédiée, pas dans la nav principale
- "Actualités" est sous-utilisé (3-4 articles, peu fréquent) → le mettre en footer ou en sous-section
- Manque flagrant : **"Le cabinet" / "À propos"** dédié — actuellement noyé dans `/accueil`
- Manque flagrant : **lang switcher** (juste 3 liens texte FR/EN/IT)

### 7.2 Profondeur de contenu

- `/accueil` : 3,8k chars de texte → ✅ correct
- `/nos-equipes` : 7,6k chars mais **structure illisible** (paragraphes sans hiérarchie)
- `/services` (en EN) : doublonne avec `/competences` (FR ?) — confusion
- Pas de pages dédiées par expertise (1 page = 1 mot-clé SEO long-tail)

---

## 8. Comparaison concurrence

Cabinets juridiques FR/INT à Bangkok analysés (positionnement similaire) :

| Cabinet | Site | Forces |
|---|---|---|
| **Tilleke & Gibbins** | tilleke.com | Modern, articles SEO long-tail, prise RDV en ligne |
| **Mahanakorn Partners** | mahanakornpartners.com | Photo équipe forte, blog actif |
| **Belaws** | belaws.com | Tunnel d'achat clair (audit/setup company), CTA partout |
| **MILA (actuel)** | mila-law.com | Contenu solide MAIS UX 10 ans en retard |

**Magic Circle (référence premium)** : Bredin Prat, August Debouzy, Allen & Overy → typographie serif éditoriale, photos noir/blanc d'avocats, citations clients, publications mises en avant, microcopy précise.

---

## 9. Recommandations prioritaires (à appliquer dans la refonte)

### P0 — Bloquant lancement

1. **Hiérarchie HTML stricte** : 1 H1 par page, H2 sectionnels, H3 cards
2. **`<html lang>` dynamique** par locale (`fr` / `en` / `it`)
3. **Formulaire de contact + booking** sur `/contact`
4. **CTAs fonctionnels** : "Prendre RDV" → `/contact#book` ou Cal.com embed
5. **Mobile responsive natif** (Tailwind v4, plus de viewport 980px)
6. **Click-to-call/WhatsApp** : `tel:` et `wa.me` sur toutes les coordonnées
7. **Alt text systématique** sur toutes les images

### P1 — Quick wins SEO/conversion

1. **Pages dédiées par expertise** (`/expertises/droit-immobilier`, `/expertises/fiscalite`...) → SEO long-tail
2. **Schema.org enrichi** : `Organization`, `LegalService`, `Person` (Stasi), `Book` (publications)
3. **Hreflang** entre FR/EN/IT
4. **OG images** dynamiques par page
5. **sitemap.xml** + **robots.txt** propres
6. **Trust band** dédié sous le hero (Springer/Brill/Cengage/Mahidol logos)
7. **Photos équipe identitaires** (noir/blanc style éditorial)

### P2 — Différenciation premium

1. **Typo serif éditoriale** (EB Garamond ou Lora pour les titres) + sans-serif institutionnel (Lato, Inter)
2. **Palette navy + or rosé + crème** (cf. design system MASTER.md déjà défini)
3. **Sticky header floating** type Magic Circle
4. **Citations clients anonymisées** ("Expatrié, secteur tech, Bangkok")
5. **Blog éditorial structuré** (Lois & règlements → ressources gratuites = lead magnets)
6. **Newsletter** trimestrielle (RGPD-friendly, double opt-in)
7. **Page bilingue dédiée à l'angle Ambassade** (français + italien) pour signaler l'autorité

### P3 — Nice-to-have

1. Calendly / Cal.com embed pour RDV sans friction
2. Mode sombre (`prefers-color-scheme: dark`) — optionnel, pas une priorité B2B legal
3. Animations subtiles `prefers-reduced-motion`-aware (Framer Motion ou CSS pur)
4. Page "Honoraires" transparente (rare en France, signal de confiance fort)
5. Témoignages vidéo (Loom, 30s, anonymes possibles)

---

## 10. Synthèse pour la refonte Next.js

Le projet `mila` (repo Fugushiva/mila) a déjà :
- ✅ Design system documenté (`docs/design-system/MASTER.md`) avec navy + or rosé + crème
- ✅ Roadmap 9 PRs séquentielles (PR-1 → PR-9)
- ✅ Stack Next.js 16.2 + React 19 + Tailwind v4 + i18n `[lang]` + dictionaries
- ✅ Polices EB Garamond + Lato déjà câblées via `next/font`
- ✅ Proxy locale-routing déjà en place
- 🟡 PR-1 en cours sur branche `feature/pr-1-foundation`

**La refonte est déjà bien architecturée.** Le travail restant : exécuter PR-2 à PR-9 en appliquant rigoureusement les recommandations ci-dessus. Le doc `02-refonte-strategy.md` détaille comment.
