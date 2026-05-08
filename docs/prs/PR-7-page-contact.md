# PR #7 — Page Contact

**Branche** : `feature/pr-7-page-contact`
**Base** : `master` (après merge PR #6)

## Scope

Page de conversion principale du site. Formulaire UI seulement (pas d'envoi serveur, toast success).

### Sections

1. **PageHero** — H1 "Contactez-nous" + sous-titre "Première consultation sur RDV. Réponse sous 24h ouvrées."

2. **ContactLayout** — Grid 60/40
   - **Gauche : ContactForm**
     - Nom* (input)
     - Email* (input)
     - Téléphone (input)
     - Sujet (select : 12 expertises + "Autre")
     - Message* (textarea)
     - Checkbox RGPD obligatoire
     - Submit Button (or, "Envoyer ma demande")
     - Toast success Sonner au submit (pas d'envoi réel)
     - Validation client uniquement (HTML5 + manuelle)

   - **Droite : ContactInfo**
     - 📍 Adresse complète (icône Lucide MapPin)
     - 📞 Téléphone clickable `tel:+66971805845`
     - 📧 Email `mailto:info@mila-law.com`
     - WhatsApp `https://wa.me/66971805845` (icône Lucide MessageCircle)
     - LINE (icône Lucide ChatBubble)
     - Horaires
     - Bouton "Prendre RDV en ligne" (lien externe placeholder Cal.com)

3. **MapEmbed** — iframe Google Maps statique pleine largeur 400px

4. **EmergencyBanner** — bande crème
   - Icon AlertCircle
   - "Citoyen français en situation d'urgence ?"
   - Lien ambassade de France à Bangkok

5. **CTABand** (hors prendre RDV — variant alternatif "appelez-nous")

### Files

```
app/[lang]/contact/page.tsx      # NEW
components/sections/
  ContactForm.tsx                 # 'use client' + Sonner toast
  ContactInfo.tsx
  MapEmbed.tsx
  EmergencyBanner.tsx
components/ui/
  Input.tsx                       # NEW
  Textarea.tsx                    # NEW
  Select.tsx                      # NEW
  Checkbox.tsx                    # NEW
  Label.tsx                       # NEW
package.json                      # ADD: sonner
```

## Acceptance criteria

- [ ] Formulaire valide les champs requis client-side
- [ ] Submit → toast success "Demande reçue" (UI only, console.log payload)
- [ ] Tel cliquable au format international
- [ ] WhatsApp ouvre dans nouvel onglet
- [ ] Map embed visible et responsive
- [ ] Tous les inputs ont des `<label>` associés
- [ ] Tab navigation logique
- [ ] Build + lint verts
