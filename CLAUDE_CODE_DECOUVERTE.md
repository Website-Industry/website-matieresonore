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
Mis à jour après chaque session : ce qui a été fait, ce qui a été appris, les commandes utiles découvertes.

---

## État Actuel du Projet (15/07/2026)

### Ce qui est en place
- Scaffold Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- Infrastructure Blog : `lib/articles.ts` (gray-matter) + pages `/blog` et `/blog/[slug]` (next-mdx-remote)
- Un article de test : `content/articles/test-d-article.mdx`
- Identité visuelle définie dans CLAUDE.md (palette, typo, concept eau/ondes) — pas encore implémentée en CSS

### Ce qui reste à faire
- Page d'accueil : actuellement le template Next.js par défaut
- Identité visuelle : CSS custom properties, polices Syne + DM Sans, ondes SVG
- Section Labo : `app/labo/[slug]/page.tsx` (pas encore créée)
- Vrai premier article de fond (le fichier de test est un placeholder)
- Deploy Vercel

### Stack technique arrêtée
| Couche | Choix |
|---|---|
| Framework | Next.js 16 (App Router) |
| Contenu Blog | Fichiers MDX dans `/content/articles/` |
| Parsing MDX | `gray-matter` + `next-mdx-remote` |
| Style | Tailwind CSS v4 |
| Deploy | Vercel |
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
- `EnterPlanMode` avant tout changement d'architecture ; sous-agent `Plan` pour valider les choix de libs avant d'écrire le code
- `AskUserQuestion` pour trancher un choix (MDX vs Markdown) plutôt que deviner
- `Bash run_in_background` + `TaskStop` pour lancer/arrêter un serveur de dev
- Un build qui passe ≠ fonctionnalité qui marche : toujours vérifier le rendu réel (curl, dev server)
- Cache `.next` obsolète après migration → `rm -rf .next` puis rebuild
- `next-mdx-remote` bloque le JS dans le MDX par défaut (`blockJS: true`) — ajouter `options={{ blockJS: false }}` sur `<MDXRemote>` pour des articles écrits en local
- Permissions : `"Write"` (nom nu) autorise l'outil, pas `"Write(*)"`. Claude ne peut pas modifier `settings.local.json` lui-même.

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
| `EnterPlanMode` | Passer en mode conception avant de toucher au code |
| `AskUserQuestion` | Poser une question avec choix clairs plutôt que de deviner |
| `Bash` | Commandes shell (utiliser les outils dédiés dès que possible) |
| `TaskCreate` / `TaskUpdate` | Découper et suivre le travail de la session en cours |

### Slash commands utiles
| Commande | Action |
|---|---|
| `/commit` | Créer un commit Git conventionnel |
| `/pr` | Créer une pull request |
| `/fast` | Basculer en mode rapide (même modèle, sortie plus rapide) |
| `/help` | Aide Claude Code |

---

## Bonnes Pratiques Retenues

1. Toujours lire un fichier avant de le modifier
2. Expliquer ce que tu vas faire et pourquoi avant d'agir (surtout pour les changements multi-fichiers)
3. Utiliser `EnterPlanMode` pour tout changement d'architecture non trivial
4. Vérifier le rendu réel après un build réussi (curl, dev server)
5. Commits conventionnels : `feat:`, `fix:`, `content:`, `chore:`, `doc:`
6. MVP d'abord : ne pas complexifier sans vrai besoin
7. Tester `rm -rf .next` si le build se comporte bizarrement après une migration

---

## Informations Techniques

- **Modèle** : Claude Sonnet 4.6
- **Plateforme** : Windows 11, shell bash
- **Node** : projet géré avec npm
- **Langue** : français partout (UI, commits, commentaires, ce fichier)

---

_Ce document est vivant et sera enrichi au fil du développement du projet._
