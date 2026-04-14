# Matière Sonore — Contexte global du projet

Ce document est un complément au CLAUDE.md. Il n'est pas lu systématiquement
par Claude Code mais sert de référence si on a besoin de retrouver le pourquoi
des décisions prises au démarrage du projet.

---

## Qui est Marc Charton

Marc est musicien, formateur musical et consultant no-code basé à Toulouse.
Il opère deux activités distinctes :

- **Ghost-Note** : sa marque de transmission musicale. Cours individuels
  (piano, Ableton, oreille, théorie), ateliers collectifs, mission de formation
  chez Sawup (programme Ableton). Ghost-Note est la vitrine professionnelle
  de Marc en tant que pédagogue musical.
- **NoCode Focus** : son activité de consulting et formation no-code/tech.

Matière Sonore est rattaché à Ghost-Note mais n'en est pas la vitrine
commerciale. C'est l'espace personnel de Marc, le carnet de bord de
l'explorateur derrière la marque.

---

## Pourquoi ce projet existe

Marc explore la musique depuis des années : théorie, production, instruments,
outils, cultures musicales du monde. Il n'avait pas d'espace pour partager
ces explorations autrement que ponctuellement sur les réseaux.

L'objectif premier est simple : avoir un lien à partager. "Hey, t'as entendu
parler de ça ?" ou "Regarde ce que j'ai fait" ou "Voilà ce que je pense de ça."

Un labo/blog personnel, pas un média, pas un portfolio, pas une landing page.

---

## Ce projet est aussi un apprentissage Claude Code

C'est le premier projet que Marc réalise intégralement avec Claude Code.
L'objectif secondaire est de monter en compétence sur l'outil au passage,
sans y consacrer du temps dédié — l'apprentissage se fait par la pratique
sur ce projet réel.

Les apprentissages sont documentés dans `CLAUDE_CODE_DECOUVERTE.md` pour
servir de base de transmission future (formations, partage avec d'autres).

---

## Décisions d'architecture et leur contexte

### Pourquoi Next.js
Familier pour Marc (profil full-stack, 10 ans d'expérience). App Router
pour rester sur les conventions actuelles. TypeScript par défaut.

### Pourquoi Keystatic plutôt que Sanity
Keystatic stocke tout en Markdown dans le repo Git : zéro base de données,
zéro abonnement, zéro infra à gérer. Pour un blog perso avec un seul auteur
c'est suffisant et plus simple à maintenir. Sanity serait justifié si le
contenu devenait plus structuré ou si plusieurs personnes publiaient.

Le choix reste réversible : les fichiers Markdown sont portables.

### Pourquoi deux sections distinctes (Blog / Labo) plutôt qu'une
La distinction est une question d'intention, pas de format :
- **Blog** : écrire, transmettre un point de vue. Le contenu est stable.
- **Labo** : construire quelque chose. Le contenu peut être interactif,
  évolutif, expérimental.

Mélanger les deux aurait rendu l'architecture floue pour Claude Code
et l'expérience utilisateur incohérente.

### Pourquoi pas de section "Créations" ou "Découvertes courtes"
Les créations perso (compositions) sont hors scope pour le MVP.
Les découvertes courtes ont été écartées : tout le contenu de Marc a
de la substance, un format "micro-post" ne correspond pas à sa façon
de publier.

---

## Contenu existant à intégrer progressivement

Marc a déjà du contenu à recycler ou adapter :

- Un ancien blog de critique d'albums (époque révolue, à réinterpréter)
- Un article sur l'IA et la musique (déjà rédigé, ton "pédago mais cash")
- Une page sur les accordages VST avec fichiers Scala téléchargeables
- Une documentation résumée de Strudel.cc
- Des idées d'articles sur des thèmes musicaux (Clair de lune, Misirlou,
  samples célèbres, VST spécifiques...)
- Des explorations personnelles non encore formalisées

Rien de tout ça n'est prioritaire pour le MVP. Le MVP c'est l'infrastructure
et un premier post, même court.

---

## Identité visuelle — contexte des décisions

### Le concept central
Matière Sonore = l'eau comme matière physique, milieu d'immersion totale.
Pas de culture marine, pas d'ambiance bord de mer. La physique de l'eau :
ondes qui se propagent, cercles concentriques, transparence, profondeur.

"Plongeons dans la musique" : on plonge dans une matière pour être en immersion.
La matière sonore c'est l'eau dans laquelle on plonge. Les ondes sonores et
les ondes de l'eau partagent la même forme, le même mot. Le bleu devient
la couleur évidente sans être marin.

### Pourquoi light mode et non dark
Après exploration d'un dark mode bleuté, le light mode s'est imposé naturellement.
Le fond crème (#f7f4ef) donne de la chaleur sans être blanc clinique. Le strip
Labo en dark (#0d1a2e) crée une respiration sombre intentionnelle dans l'ensemble clair.

### Typographie
- Display : Syne (bold, 800) — caractère fort, moderne, pas générique
- Body : DM Sans (300/400) — aéré, lisible, contraste avec le display

### Palette finale
- Fond : #f7f4ef (crème chaud)
- Cards : #ffffff (contraste sur crème)
- Dark sections : #0d1a2e
- Bleu électrique : #0096c7 (signature globale)
- Violet : #7b2fff (accent secondaire)
- Orange : #e87040 (Blog)

### Motifs visuels
Ondes SVG en arrière-plan récurrentes (hero, thumbnails, strip Labo).
Cercles concentriques pour la propagation. Rien de marin, tout de physique.

---

## Ce que ce projet n'est pas

- Pas un portfolio de Marc (Ghost-Note a sa propre vitrine)
- Pas un média ou une publication régulière avec cadence imposée
- Pas un e-commerce ou un site avec espace membre
- Pas une application complexe avec authentification utilisateur
- Pas un projet collaboratif (Marc est le seul auteur)
