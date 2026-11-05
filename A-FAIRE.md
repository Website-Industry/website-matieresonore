# À faire

Reste à faire technique. Le pourquoi éditorial vit dans le projet Claude.

## Contenu

- [ ] Trancher la liste des tags

## Structure du site

- [x] Navigation générale
- [ ] Pied de page
- [ ] Page « À propos » : structure et premier texte en ligne ; parcours de Marc et Ghost-Note en placeholders, texte à valider dans le projet Claude

## Identité visuelle

- [ ] Valider à l'œil les accents par type (tags, vert du Labo)
- [ ] Relire l'accueil d'après la maquette « v5 » de la conversation fondatrice
- [ ] Ondes SVG : prévues par l'identité, pas encore présentes

## Build et qualité

- [ ] Build : `next/font/google` télécharge les polices au build ; sans accès à `fonts.googleapis.com`, il échoue (environnement cloud à surveiller)
- [ ] `npm run dev` : erreur 500 sur toutes les pages sur le poste de Marc (Turbopack, `next/font/google queries have exactly one entry`), cause non trouvée ; contournement : `npx next dev --webpack`. La même erreur a fait échouer un build Vercel le 5/11 (`content/a-propos`, commit `e918f54`) ; le même commit redéployé est passé : bug intermittent, à surveiller avant chaque fusion sur `main`
- [ ] Lint : ni script ni ESLint

## Claude Code

- [x] Environnement Claude Code cloud : pas encore créé
  - [x] Script d'initialisation de l'environnement (privé, hors dépôt) qui écrit l'emplacement du Drive, comme `CLAUDE.local.md` sur le poste
  - [x] Tester si une session cloud a accès au connecteur Google Drive ; sinon, coller le brief dans le premier message
- [ ] Skills `nouvel-article` et `nouveau-projet-labo`, à écrire en prenant les deux pages publiées comme modèles
- [ ] Hook de formatage
- [ ] Skill `ui-ux-pro-max`, ignoré par git et donc absent du cloud : vérifier sa licence avant de la versionner ou de l'activer sur le compte claude.ai
- [ ] `.claude/settings.local.json` sur le poste : autorisations trop larges (`rm`, `Write(**)`) à resserrer
