# Trace de Découverte — Claude Code

## Informations Projet
- **Nom du projet**: Matière Sonore (website-matieresonore)
- **Répertoire**: `D:\Dev\website-matieresonore`
- **Type**: Blog / Labo personnel (musique)
- **Date de création**: 14 avril 2026
- **Repo**: https://github.com/Website-Industry/website-matieresonore

---

## Objectif de ce Document

Trace d'apprentissage et de référence pour l'utilisation de Claude Code dans ce projet.
Mis à jour quand Marc le demande : ce qui a été fait, ce qui a été appris, les commandes utiles découvertes.

---

## État Actuel du Projet (04/11/2026)

### Ce qui est en place
- Site en ligne sur https://website-matieresonore.vercel.app, production sur `main`
- Accueil, `/blog` et `/labo`, alimentés par le registre `lib/registre.ts`
- Tout le contenu en pages TSX libres : `app/blog/<slug>/page.tsx` et `app/labo/<slug>/page.tsx`
- Deux premiers contenus : `/blog/ia-et-musique` et `/labo/jeu-modes`
- Identité visuelle en CSS : palette, accents par type, Syne + DM Sans, cercles concentriques
- Consignes versionnées : `CLAUDE.md`, `.claude/rules/`, `.claude/settings.json`

### Ce qui reste à faire
- Trancher la liste des tags
- Créer la page « À propos », seul endroit prévu pour mentionner Ghost-Note
- Ajouter une navigation générale : pas d'en-tête pour l'instant
- Ondes SVG : prévues par l'identité visuelle, pas encore présentes
- Lint : ni script ni ESLint
- Contraste du message d'attente sur le bandeau Labo (2,95:1)
- Vérifier la licence du skill `ui-ux-pro-max`, ignoré par git et donc absent du cloud

### Stack technique arrêtée
| Couche | Choix |
|---|---|
| Framework | Next.js 16 (App Router) |
| Contenu | Pages TSX libres, sans gabarit |
| Registre | `lib/registre.ts`, seule source des listes et des métadonnées |
| Style | Tailwind CSS v4 |
| Deploy | Vercel, production sur `main` |
| CMS | Aucun (tout en code) |

---

## Session 1 — 14/04/2026

Documentation projet posée : `CLAUDE.md`, `PROJET_CONTEXTE.md`, ce fichier de trace. Projet sans code.

---

## Session 2 — 14/04/2026

Scaffold Next.js (App Router, TypeScript, Tailwind v4) + Keystatic comme CMS Blog. Premier article de test en `.mdoc`.
Keystatic sera retiré dès la session suivante : trop lourd pour un auteur unique qui préfère tout garder en code.

---

## Session 3 — 15/07/2026

**Fait** : retrait de Keystatic, mise en place MDX (`gray-matter` + `next-mdx-remote`), création de `lib/articles.ts` et des pages `/blog` + `/blog/[slug]`, migration de l'article de test en `.mdx`.

**Apprentissages Claude Code :**
- Mode plan avant tout changement d'architecture (`Maj+Tab` côté utilisateur ; `EnterPlanMode` est l'outil interne de Claude) ; sous-agent `Plan` pour valider les choix de libs avant d'écrire le code
- `AskUserQuestion` pour trancher un choix (MDX vs Markdown) plutôt que deviner
- `Bash run_in_background` + `TaskStop` pour lancer/arrêter un serveur de dev
- Un build qui passe ≠ fonctionnalité qui marche : toujours vérifier le rendu réel (curl, dev server)
- Cache `.next` obsolète après migration → `rm -rf .next` puis rebuild
- `next-mdx-remote` bloque le JS dans le MDX par défaut (`blockJS: true`) — ajouter `options={{ blockJS: false }}` sur `<MDXRemote>` pour des articles écrits en local
- Permissions : `"Write"` (nom nu) autorise l'outil, pas `"Write(*)"`. Claude ne peut pas modifier `settings.local.json` lui-même.

---

## Session 4, 04/11/2026

**Fait** : inventaire et sauvegarde du poste ; architecture des consignes (`.claude/` versionné, règles par `paths`, pointeurs sans `@`, skills `vendor-`) ; passage en tout TSX avec le registre `lib/registre.ts` ; mise en ligne sur Vercel ; deux premiers contenus (`/blog/ia-et-musique`, `/labo/jeu-modes`).

**Apprentissages Claude Code :**
- La mémoire auto est locale à la machine : elle ne suit ni sur un autre poste ni dans le cloud
- Un `@` dans `CLAUDE.md` charge le fichier à chaque session : pour un simple pointeur, écrire le chemin entre backticks
- Les règles avec `paths` se chargent à la lecture ou à la modification d'un fichier correspondant
- Skills : seule la forme `.claude/skills/<nom>/SKILL.md` est documentée, les dossiers de regroupement ne le sont pas

---

## Référence : Outils Claude Code

### Outils fichiers
| Outil | Usage |
|---|---|
| `Read` | Lire un fichier (toujours lire avant de modifier) |
| `Write` | Créer un nouveau fichier |
| `Edit` | Modifier un fichier existant (envoie seulement le diff) |
| `Glob` | Rechercher des fichiers par pattern (`"**/*.tsx"`) |
| `Grep` | Rechercher dans le contenu des fichiers |

### Outils de travail
| Outil | Usage |
|---|---|
| `Agent` | Lancer un sous-agent spécialisé pour une tâche complexe |
| `EnterPlanMode` | Outil interne de Claude pour passer en mode plan. Côté utilisateur : `Maj+Tab` ou `/plan` |
| `AskUserQuestion` | Poser une question avec choix clairs plutôt que de deviner |
| `Bash` | Commandes shell (utiliser les outils dédiés dès que possible) |
| `TaskCreate` / `TaskUpdate` | Découper et suivre le travail de la session en cours |

### Slash commands utiles
| Commande | Action |
|---|---|
| `/plan` | Passer en mode plan |
| `/fast` | Activer ou couper le mode rapide : Opus uniquement, jusqu'à 2,5 fois plus rapide, coût au token plus élevé, payé en crédits d'usage sur les abonnements |
| `/help` | Aide Claude Code |

`/commit` et `/pr` ne sont pas des commandes intégrées : il suffit de demander à Claude de commiter ou d'ouvrir une pull request.

---

## Bonnes Pratiques Retenues

1. Toujours lire un fichier avant de le modifier
2. Expliquer ce que tu vas faire et pourquoi avant d'agir (surtout pour les changements multi-fichiers)
3. Passer en mode plan (`Maj+Tab`) pour tout changement d'architecture non trivial
4. Vérifier le rendu réel après un build réussi (curl, dev server)
5. Commits conventionnels : `feat:`, `fix:`, `content:`, `chore:`, `doc:`
6. MVP d'abord : ne pas complexifier sans vrai besoin
7. Tester `rm -rf .next` si le build se comporte bizarrement après une migration

---

## Informations Techniques

- **Plateforme** : Windows 11, shell bash
- **Node** : projet géré avec npm
- **Langue** : français partout (UI, commits, commentaires, ce fichier)

---

_Ce document est vivant et sera enrichi au fil du développement du projet._
