# Matière Sonore — CLAUDE.md

## Le projet

Matière Sonore est le blog/labo personnel de Marc Charton, musicien et
formateur (Ghost-Note). Un espace pour poser des explorations musicales :
théorie, piano, découvertes, réflexions. Parfois un article de blog,
parfois une page de labo avec son propre univers technique.

Site public. Le lecteur type est curieux et autonome : il peut être
débutant en musique ou praticien confirmé, mais il a une appétence pour
comprendre les choses en profondeur. Ton : explorateur passionné, pas expert
condescendant.

Lié à la marque Ghost-Note (transmission musicale) sans en être la vitrine
officielle. Ghost-Note est mentionné dans le about, pas mis en avant partout.

## Stack technique

- Framework : Next.js (App Router)
- CMS : Keystatic (fichiers Markdown dans le repo, interface locale)
- Deploy : Vercel
- Repo : https://github.com/Website-Industry/website-matieresonore

## Architecture du site

Trois niveaux : une page d'accueil qui relie tout, et deux sections distinctes.

### Page d'accueil
- Présente les deux sections (Blog et Labo) avec leurs derniers contenus
- Pose l'identité du site : qui est Marc, quel est l'esprit du lieu
- Passerelle entre les deux univers, pas une landing page marketing

### Blog
- Articles écrits : avis, réflexions, tutos, critiques, analyses
- Géré par Keystatic (fichiers Markdown dans /content/articles/)
- Tags pour organiser les thématiques : théorie, IA, critique, sample, tuto...
- Intention : écrire, partager un point de vue, fidéliser

### Labo
- Pages custom vibe-codées, chacune avec son propre univers
- Hors CMS, directement dans Next.js (app/labo/[slug]/page.tsx)
- Format libre : ressource documentaire, outil interactif, page expérimentale
- Une ressource peut évoluer en outil pédagogique, pas de frontière stricte
- Intention : construire, approfondir, transmettre

## Identité visuelle

### Concept
Matière Sonore = l'eau comme matière physique, milieu d'immersion totale.
Pas de culture marine, pas d'ambiance bord de mer. La physique de l'eau :
ondes, propagation, cercles concentriques, transparence, profondeur.
Le bleu justifie la couleur. Les ondes SVG justifient les formes.
"Plongeons dans la musique" = l'invitation à entrer dans ce milieu.

### Textes de référence
- Titre principal : "Plongeons dans la musique."
- Tagline : "Ressentir ce qu'on ressent. Comprendre ce qu'on ressent."
- Sous-titre de position : "Un carnet d'immersions sonores par Marc Charton"

### Ambiance générale
Light mode, fond crème chaud. Typographie Syne (display, bold) + DM Sans
(body, léger). Ondes SVG en arrière-plan comme motif physique récurrent.
Cercles concentriques pour évoquer la propagation d'une onde dans l'eau.
Strip Labo en dark (#0d1a2e) comme zone de respiration sombre dans l'ensemble clair.

### Palette
- `--bg-base` : #f7f4ef (fond crème chaud, jamais blanc pur)
- `--bg-card` : #ffffff (cartes, contraste sur le crème)
- `--bg-dark` : #0d1a2e (strip Labo, sections sombres)
- `--text-primary` : #0d1a2e
- `--text-muted` : #556677
- `--accent-blue` : #0096c7 (bleu électrique, couleur signature globale)
- `--accent-purple` : #7b2fff (violet, accent secondaire)
- `--accent-orange` : #e87040 (orange, section Blog)

### Règles
- Le bleu #0096c7 est la couleur signature : liens, tags actifs, ondes, highlights
- Le violet #7b2fff vient jouer avec le bleu, jamais seul en dominante
- L'orange #e87040 est réservé au Blog (tags, accents éditoriaux)
- Les ondes SVG sont présentes dans le hero, les thumbnails de cards, le strip Labo
- Les cercles concentriques évoquent la propagation, pas la décoration
- Cartes toujours fond blanc sur fond crème, jamais d'alternance dans une grille
- Le blanc peut apparaître en interaction : retournement de carte au clic

## Conventions

- Langue : français partout (UI, commits, commentaires)
- Commits : conventionnels — feat:, fix:, content:, chore:
- MVP d'abord : on ne complexifie que si un vrai besoin l'exige
- Chaque page de labo est un projet indépendant avec ses propres choix techniques

## Ce projet est un terrain d'apprentissage Claude Code

Les apprentissages sont documentés dans `CLAUDE_CODE_DECOUVERTE.md`.
Concrètement : avant chaque action importante, expliquer ce que tu vas faire
et pourquoi. Après chaque session, une entrée est ajoutée dans ce fichier
avec ce qui a été fait, appris, et les commandes utiles découvertes.

## À ne pas faire

- Ne pas installer de dépendances lourdes sans demander
- Ne pas créer de fichiers de config complexes sans expliquer pourquoi
- Ne pas sur-architecturer : simple et lisible avant tout
- Ne pas mélanger la logique Blog et Labo : deux espaces distincts
- Ne pas inventer de contenu fictif dans les composants : utiliser des
  placeholders explicites du type [TITRE ARTICLE] ou [NOM PAGE LABO]
