# À faire

Reste à faire technique. Le pourquoi éditorial vit dans le projet Claude.

## Contenu

- [ ] Trancher la liste des tags

## Structure du site

- [ ] Navigation générale : pas d'en-tête pour l'instant
- [ ] Pied de page
- [ ] Page « À propos » : structure technique, le texte vient du projet Claude

## Identité visuelle

- [ ] Valider à l'œil les accents par type (tags, vert du Labo)
- [ ] Relire l'accueil d'après la maquette « v5 » de la conversation fondatrice
- [ ] Ondes SVG : prévues par l'identité, pas encore présentes
- [ ] Contraste du message d'attente sur le bandeau Labo (2,95:1)

## Build et qualité

- [ ] Build : `next/font/google` télécharge les polices au build ; sans accès à `fonts.googleapis.com`, il échoue (environnement cloud à surveiller)
- [ ] Lint : ni script ni ESLint

## Claude Code

- [ ] Environnement Claude Code cloud : pas encore créé
- [ ] Skills `nouvel-article` et `nouveau-projet-labo`, à écrire en prenant les deux pages publiées comme modèles
- [ ] Hook de formatage
- [ ] Skill `ui-ux-pro-max`, ignoré par git et donc absent du cloud : vérifier sa licence avant de la versionner ou de l'activer sur le compte claude.ai
- [ ] `.claude/settings.local.json` sur le poste : autorisations trop larges (`rm`, `Write(**)`) à resserrer
