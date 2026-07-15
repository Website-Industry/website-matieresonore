# 🤖 Trace de Découverte - Claude Code

## 📋 Informations Projet
- **Nom du projet**: Matière Sonore (website-matieresonore)
- **Répertoire**: `D:\Dev\website-matieresonore`
- **Type**: Site web
- **Date de création**: 11 février 2026

---

## 🎯 Objectif de ce Document
Ce document sert de trace d'apprentissage et de référence pour l'utilisation de Claude Code dans ce projet. Il sera mis à jour au fil des interactions et des découvertes.

---

## 🚀 Première Session (11/02/2026)

### État Initial
- Projet Git initialisé
- Répertoire vide (pas encore de code)
- Branche principale: `main`

### Commandes Claude Code Utiles

#### Navigation et Exploration
```bash
# Lister les fichiers
ls -la

# Explorer la structure
tree -L 2

# Rechercher des fichiers
/glob "**/*.js"

# Rechercher dans le contenu
/grep "pattern"
```

#### Gestion Git
```bash
# Voir le statut
git status

# Créer un commit
/commit

# Créer une pull request
/pr
```

#### Outils Claude Code
- **Read**: Lire un fichier
- **Write**: Créer un nouveau fichier
- **Edit**: Modifier un fichier existant
- **Glob**: Rechercher des fichiers par pattern
- **Grep**: Rechercher dans le contenu des fichiers
- **Task**: Lancer des agents spécialisés pour des tâches complexes

---

## 🚀 Deuxième Session (14/04/2026)

### Contexte
Mise en place technique du projet, à la suite de la documentation initiale (Session 1).

### Ce qui a été fait
- Scaffold Next.js (App Router, TypeScript, Tailwind CSS v4) via `create-next-app`
- Ajout de Keystatic comme CMS pour le Blog : `keystatic.config.ts` (collection "articles" avec title/date/tags/excerpt/body), route API `/api/keystatic`, UI d'admin `/keystatic`
- Premier article de test créé via Keystatic (`content/articles/test-d-article.mdoc`)
- Commit `1eab0e6` : 20 fichiers, ~6700 lignes (essentiellement config Next.js/Tailwind/TypeScript et dépendances)

→ Ce choix de CMS (Keystatic) sera reconsidéré et retiré dès la Session 3, une fois le besoin réel confronté à la pratique (voir plus bas).

---

## 🚀 Troisième Session (15/07/2026)

### Contexte
Remplacement de Keystatic (CMS avec UI d'admin) par des articles MDX écrits directement en fichiers : Marc est développeur et préfère tout garder en code plutôt que de passer par un CMS.

### Déroulé avec Claude Code
1. **État des lieux** : avant toute action, Claude a résumé le projet en lisant CLAUDE.md, PROJET_CONTEXTE.md et la structure du repo.
2. **Question ouverte** : "on garde Keystatic ou pas ?" a été traitée comme une question exploratoire — Claude a donné un avis en 2-3 phrases avec le compromis principal, sans partir direct en implémentation.
3. **Clarification** : `AskUserQuestion` utilisé pour trancher MDX (JSX dans les articles) vs Markdown simple, plutôt que de deviner.
4. **Mode Plan** : `EnterPlanMode` activé avant de toucher au code (plusieurs fichiers, choix d'outillage). Claude a délégué la recherche technique (gray-matter + next-mdx-remote vs `@next/mdx`, compatibilité Next 16 / React 19) à un sous-agent "Plan" pour valider l'approche avant d'écrire le plan final.
5. **Exécution** : retrait de Keystatic (fichiers + dépendances npm), ajout de `gray-matter` + `next-mdx-remote`, création de `lib/articles.ts` et des pages `/blog` + `/blog/[slug]`, migration du fichier de test en `.mdx`.
6. **Vérification réelle** : `npm run build` (a révélé un cache `.next` obsolète référençant l'ancienne route Keystatic, corrigé avec `rm -rf .next`), puis serveur de dev lancé en arrière-plan et `curl` sur les pages générées pour vérifier le HTML réel — pas juste "ça compile".

### Bug trouvé grâce au test réel (pas juste au build)
Le style JSX (`style={{ color: '#0096c7' }}`) d'un article ne s'affichait pas malgré un build réussi. En inspectant le code source de `next-mdx-remote`, Claude a trouvé que la librairie bloque par défaut les expressions JavaScript dans le MDX (option `blockJS: true`) — une protection anti-XSS pensée pour du contenu distant non fiable, inutile ici puisque les articles sont écrits à la main dans le repo. Correction : `options={{ blockJS: false }}` sur `<MDXRemote>`.
→ **Leçon** : un build qui passe ne garantit pas qu'une fonctionnalité marche. Toujours vérifier le rendu réel, surtout avec des libs qui ont des défauts de sécurité silencieux.

### Permissions Claude Code
- `.claude/settings.local.json` contient `permissions.allow`. Attention à la syntaxe : `"Write(*)"` n'autorise pas fiablement tous les usages de l'outil — pour un outil fichier, la forme "tout autoriser" est le nom nu (`"Write"`), sans parenthèses.
- Claude ne peut pas élargir ses propres permissions tout seul, même avec un accord oral de l'utilisateur : le "classificateur auto mode" bloque explicitement l'auto-modification de `settings.local.json`. Il faut éditer ce fichier soi-même.

### Commandes / outils découverts
- `EnterPlanMode` / `ExitPlanMode` : pour aligner sur une approche avant un changement non trivial
- `AskUserQuestion` : pour trancher un choix technique avec des options claires plutôt que deviner
- Agent de type `Plan` (via l'outil Agent) : sous-agent dédié à la conception d'un plan détaillé, utile pour valider des choix de librairies avant d'écrire le code
- `Bash` avec `run_in_background: true` + boucle `until grep -q "Ready" ...` : pour attendre qu'un serveur de dev soit prêt sans bloquer la conversation
- `TaskStop` : pour arrêter proprement un process en arrière-plan (ex. serveur de dev) une fois la vérification terminée

---

## 📝 Notes et Apprentissages

### Points Clés
- Claude Code peut explorer le projet de manière autonome
- Privilégier les outils dédiés (Read, Write, Edit) plutôt que les commandes bash
- Le système de tâches (Task) permet de gérer des workflows complexes

### Commandes Spéciales
- `/help`: Obtenir de l'aide
- `/commit`: Créer un commit Git
- `/pr`: Créer une pull request
- `/fast`: Activer le mode rapide

### Bonnes Pratiques
1. Toujours lire un fichier avant de le modifier
2. Utiliser des commits atomiques et descriptifs
3. Documenter les changements importants
4. Tester régulièrement le code

---

## 🔧 Configuration du Projet

### À Définir
- [ ] Stack technique (Framework, bibliothèques)
- [ ] Structure des dossiers
- [ ] Conventions de code
- [ ] Scripts de build/dev
- [ ] Tests
- [ ] CI/CD

---

## 📚 Ressources

### Documentation Claude Code
- GitHub: https://github.com/anthropics/claude-code
- Aide: Taper `/help` dans Claude Code

### Liens du Projet
- (À compléter au fur et à mesure)

---

## 📈 Historique des Sessions

### Session 1 - 14/04/2026
- **Action**: Création de la documentation projet (CLAUDE.md, PROJET_CONTEXTE.md, ce fichier de trace)
- **Apprentissage**: Exploration initiale du projet
- **Statut**: Documentation posée, projet encore sans code

### Session 2 - 14/04/2026
- **Action**: Scaffold Next.js (App Router, TypeScript, Tailwind v4) + ajout de Keystatic comme CMS pour le Blog
- **Apprentissage**: Premier choix d'architecture (CMS avec UI d'admin), remis en question à l'usage dès la session suivante
- **Statut**: Projet techniquement démarré, Keystatic configuré avec un article de test

### Session 3 - 15/07/2026
- **Action**: Retrait de Keystatic, mise en place d'une infra MDX pour le Blog (lib/articles.ts, pages /blog)
- **Apprentissage**: Mode Plan + AskUserQuestion pour cadrer une décision d'architecture ; toujours vérifier le rendu réel après un build réussi ; limites des permissions auto-modifiables par Claude
- **Statut**: Migration terminée et vérifiée (build + test du serveur de dev)

---

## 💡 Idées et TODOs

### Prochaines Étapes
- [ ] Définir la structure du projet
- [ ] Choisir le stack technique
- [ ] Mettre en place l'environnement de développement
- [ ] Créer les premiers fichiers de base

### Questions en Suspens
- Quel framework utiliser pour le site web ?
- Quelle est la cible du site (portfolio, blog, e-commerce, etc.) ?
- Besoins en termes de CMS ou backend ?

---

## 🎓 Apprentissages Techniques

### Claude Code
- Utilise le modèle Claude Sonnet 4.5
- Peut exécuter des commandes, lire/écrire des fichiers
- Supporte le mode parallèle pour les tâches indépendantes
- Conserve une mémoire entre les sessions

### Astuces
- Claude peut créer des commits automatiquement avec `/commit`
- Utiliser plusieurs appels d'outils en parallèle pour plus d'efficacité
- Le mode plan (`EnterPlanMode`) est utile pour les tâches complexes

---

_Ce document est vivant et sera enrichi au fil du développement du projet._
