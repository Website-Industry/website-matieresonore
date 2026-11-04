---
paths:
  - "app/blog/**"
---

# Pages du Blog

- Intention : écrire, partager un point de vue, fidéliser
- Contenus : avis, réflexions, tutos, critiques, analyses
- Ton : explorateur passionné, pas expert condescendant
- Forme libre : chaque page compose sa mise en page, sans gabarit imposé
- Texte que Marc n'a pas encore fourni : `[TITRE ARTICLE]`, `[EXTRAIT ARTICLE]`, `[CORPS ARTICLE]`
- Tags : la liste n'est pas encore arrêtée, ne pas en fixer une sans demander à Marc

## Inscription obligatoire

Toute nouvelle page reçoit son entrée dans `lib/registre.ts`, dans le même commit,
et lit ses métadonnées avec `metadataPour('<slug>')`.
