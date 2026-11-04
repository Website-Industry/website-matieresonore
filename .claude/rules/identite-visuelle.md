---
paths:
  - "app/**/*.{css,tsx}"
  - "components/**/*.tsx"
---

# Identité visuelle

## Concept

Matière Sonore = l'eau comme matière physique, milieu d'immersion totale.
Pas de culture marine, pas d'ambiance bord de mer. La physique de l'eau :
ondes, propagation, cercles concentriques, transparence, profondeur.
Le bleu justifie la couleur. Les ondes SVG justifient les formes.
"Plongeons dans la musique" = l'invitation à entrer dans ce milieu.

## Textes de référence

- Titre principal : "Plongeons dans la musique."
- Tagline : "Ressentir ce qu'on comprend. Comprendre ce qu'on ressent."
- Sous-titre de position : "Un carnet d'immersions sonores par Marc Charton"

## Ambiance et typographie

- Light mode, fond crème chaud
- Syne pour les titres (display, bold), DM Sans pour le texte (body, léger)
- Accueil en deux colonnes égales sur le fond crème, Blog à gauche et Labo à droite ; aucun espace ne doit paraître secondaire
- En-tête collant sur toutes les pages : marque en cercles concentriques et nom à gauche, liens Blog et Labo à droite soulignés à la couleur de leur type

## Palette

- `--bg-base` : #f7f4ef (fond crème chaud, jamais blanc pur)
- `--bg-card` : #ffffff (cartes, contraste sur le crème)
- `--bg-dark` : #0d1a2e (sections sombres éventuelles, blocs de code)
- `--text-primary` : #0d1a2e
- `--text-muted` : #556677
- `--accent-blue` : #0096c7 (bleu électrique, couleur signature globale)
- `--accent-purple` : #7b2fff (violet, accent secondaire)
- `--line` : rgba(13, 26, 46, 0.1) (filets et bordures discrètes)

## Accents par type

- Blog : `--accent-blog` #f2601e et `--accent-blog-ink` #c2410c
- Labo : `--accent-labo` #1fb866 et `--accent-labo-ink` #0f7a43
- Les tons `-ink` servent au petit texte, les tons vifs aux surfaces, bordures et grands titres
- Exception : sur fond sombre, le petit texte prend le ton vif, car le ton `-ink` n'y est pas assez lisible
- Tags : contour en ton vif, texte en ton `-ink`, jamais de texte blanc sur un ton vif

## Motifs

- Ondes SVG en arrière-plan, motif physique récurrent : hero, thumbnails de cards
- Cercles concentriques : ils évoquent la propagation d'une onde dans l'eau, pas la décoration

## Règles

- Le bleu est la couleur signature : liens, tags actifs, ondes, highlights
- Le violet vient jouer avec le bleu, jamais seul en dominante
- Cartes toujours fond blanc sur fond crème, jamais d'alternance dans une grille
- Le blanc peut apparaître en interaction : retournement de carte au clic
