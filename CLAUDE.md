# Matière Sonore

## Le projet

Blog et labo personnels de Marc Charton, musicien et formateur : théorie, piano, découvertes, réflexions.
Site public. Lecteur curieux et autonome, débutant ou confirmé, qui veut comprendre en profondeur.
L'accueil pose l'esprit du lieu et relie le Blog et le Labo, sans être une landing page marketing.
Le dépôt est la mémoire du projet : rien ne doit dépendre de la mémoire auto ni d'un poste.
Le pourquoi éditorial vit hors du dépôt, dans le projet Claude « Matière Sonore ».

## Stack et commandes

- Next.js (App Router), TypeScript, Tailwind CSS, en ligne sur https://website-matieresonore.vercel.app, production sur `main`
- Dépôt : https://github.com/Website-Industry/website-matieresonore
- `npm install`, `npm run dev`, `npm run build`, `npm run start`

## Structure

- `app/page.tsx` : accueil, avec les derniers contenus de chaque espace
- `app/blog/page.tsx`, `app/labo/page.tsx` : les deux listes
- `app/blog/<slug>/page.tsx`, `app/labo/<slug>/page.tsx` : une page TSX par contenu
- `lib/registre.ts` : registre unique et typé de toutes les pages (slug, type, titre, date, extrait, tags), seule source des listes et des métadonnées
- Blog et Labo ne se distinguent que sur le plan éditorial. Une page à la fois blog et labo vit sous un seul préfixe et apparaît dans les deux listes

## Conventions

- Français partout : UI, commits, commentaires
- Commits conventionnels en français, tous les préfixes classiques (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`…), plus `content:` pour les publications
- MVP d'abord : on ne complexifie que si un vrai besoin l'exige
- Terrain d'apprentissage Claude Code : avant chaque action importante, expliquer ce qui va être fait et pourquoi
- Une session de travail donne un nouveau fichier dans `journal/`, quand Marc le demande
- Source unique : une information vit à un seul endroit. Le technique dans le dépôt, le pourquoi éditorial dans le projet Claude, vers lequel on pointe sans recopier

## Skills

- Une skill par dossier, à plat : `.claude/skills/<nom>/SKILL.md`
- Skills de tiers : préfixées `vendor-` et jamais modifiées

## Interdits

- Installer des dépendances lourdes sans demander
- Créer des fichiers de config complexes sans expliquer pourquoi
- Sur-architecturer : simple et lisible avant tout
- Inventer du faux contenu : toujours un placeholder explicite à la place
- Mentionner Ghost-Note sur le site ailleurs que dans l'à propos
- Pousser sur `main` ce qui ne compile pas : `main` part en production
- Le tiret long (U+2014) dans les textes du site

## Où trouver quoi

Le chargement automatique n'existe pas partout (les fils de projet cloud l'ignorent) : si une règle n'est pas en contexte, la lire avant de modifier les chemins indiqués.

- `.claude/rules/identite-visuelle.md` : chargée en travaillant sur `app/**/*.{css,tsx}` ou `components/**/*.tsx`. À lire avant toute modification visuelle
- `.claude/rules/blog.md` : chargée en travaillant sur `app/blog/**`. À lire avant de créer ou modifier une page du Blog
- `.claude/rules/labo.md` : chargée en travaillant sur `app/labo/**`. À lire avant de créer ou modifier une page du Labo
- `.claude/settings.json` : permissions, chargées au démarrage. À lire pour savoir ce qui est autorisé ou refusé
- `journal/` : historique et apprentissage. À ne lire que sur demande
- `A-FAIRE.md` : reste à faire technique. À lire avant de proposer la suite
- Drive pro de Marc, dossier `Outils / Claude / Projet Claude · Ghost Note - Matière Sonore /` : copie exportée de la mémoire et du contexte du projet Claude, à sens unique, jamais modifiée à la main. À ne lire que pour le pourquoi éditorial. Le même dossier contient les briefs de session, nommés `brief-AAAA-MM-JJ.md`
