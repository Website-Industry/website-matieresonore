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
