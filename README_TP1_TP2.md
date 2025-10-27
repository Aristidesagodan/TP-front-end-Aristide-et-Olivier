# README — TP1 et TP2 (GourmeTech)

Ce README regroupe les livrables présents dans ce dépôt et propose une correspondance entre les pages/fichiers et les deux travaux pratiques (TP1 / TP2) fournis dans les PDF :

- `TP 1 _ Développement d_une plateforme de recettes culinaires interactive _GourmeTech_ (1).pdf`
- `TP 2 _ Développement d_une plateforme de recettes culinaires interactive _GourmeTech_.pdf`

Remarque : je me base sur la structure du projet et les fichiers présents pour associer les pages aux TP. Si vous voulez une correspondance stricte, indiquez laquelle dans les PDFs et je mettrai à jour ce README.

## Hypothèses
- TP1 correspond à la version « fonctionnelle de base » (pages de présentation, listing de recettes, navigation, thème, système de favoris basique). 
- TP2 correspond à l'ajout de fonctionnalités avancées (formulaire d'ajout, recettes aléatoires, fonctionnalités JS avancées, tests manuels et extras). 

Si ces hypothèses ne conviennent pas, dites-moi et j'ajuste la répartition.

## Pages / fichiers et leur rôle (extrait)

Fichiers centraux :
- `index.html` — page d'accueil avec recherche, filtres, liste de recettes, boutons favoris et liens vers les recettes individuelles. (TP1)
- `styles.css` / `nav-styles.css` / `recipe-template.css` — styles globaux et composants. (TP1)
- `navigation.js` — gestion de la navigation et menu mobile. (TP1)
- `script.js` — script principal : initialisation du thème, gestion des favoris, recherche et filtres. (TP1)

Recettes individuelles (exemples inclus) :
- `soupe-potiron.html`, `ratatouille.html`, `tarte-pommes.html`, etc. — pages de recette individuelles avec images dans `ajax/`. (TP1)

Pages et fonctionnalités avancées (probablement TP2) :
- `ajouter-recette.html` — formulaire complet pour ajouter/publier une recette (gestion dynamique des ingrédients/instructions). (TP2)
- `recettes-aleatoires.html` + `recettes-aleatoires.js` — affichage et génération de recettes aléatoires, boutons d'impression, etc. (TP2)
- `advanced-features.js` — fonctionnalités avancées : recherche vocale, minuteur, mode impression optimisé, préférences utilisateur. (TP2)

Pages d'aide / QA / tests manuels :
- `test-favoris.html` — page de test manuelle pour le système de favoris (vérification de `localStorage`, images, boutons). (TP2 / QA)
- `test-theme.html` — page de test manuelle pour le thème sombre/clair et vérification de `localStorage`. (TP2 / QA)
- `TEST-NAVIGATION.md` — notes de test / checklist de navigation (si présente). (TP1/TP2 selon le contenu)

Ressources et autres :
- Dossier `ajax/` — images et médias des recettes.
- `maquettes.jpeg` — maquette(s) du design (utile pour référentiel graphique / TP1 design).

## Que contient chaque TP (proposition)
- TP1 (fonctionnalités minimales attendues) :
  - Page d'accueil (`index.html`) avec listing de recettes.
  - Styles et navigation.
  - Pages de recette individuelles (ex. `soupe-potiron.html`).
  - Système de favoris basique (stockage dans `localStorage` via `script.js`).
  - README / documentation minimale (à compléter si nécessaire).

- TP2 (extension / fonctionnalités avancées) :
  - Formulaire dynamique pour ajouter une recette (`ajouter-recette.html`).
  - Fonctionnalités avancées côté client (`advanced-features.js`) : impression, minuteur, recherche vocale.
  - Page de recettes aléatoires (`recettes-aleatoires.html` + JS).
  - Pages de test manuelles (`test-favoris.html`, `test-theme.html`) pour QA.

-## Comment visualiser le projet localement
La manière la plus simple est d'ouvrir `index.html` dans votre navigateur (double‑clic). Pour un comportement plus fiable (chemins relatifs, tests locaux, éviter certains problèmes de CORS), lancez un serveur HTTP local depuis la racine du projet.

Exemples (PowerShell) :

```powershell
# serveur local léger (Node.js)
npx http-server . -p 8000
# puis ouvrir http://localhost:8000/index.html

# ou, si vous utilisez VS Code, installez et utilisez l'extension "Live Server"
# (bouton "Go Live" dans la barre d'état) puis ouvrez la page via l'URL fournie
```

Ouvrez l'URL dans votre navigateur et naviguez vers :
- `index.html` — page d'accueil
- `ajouter-recette.html` — formulaire d'ajout
- `favoris.html` — page affichant les favoris
- `recettes-aleatoires.html` — page aléatoire
- `test-favoris.html` / `test-theme.html` — pages de QA manuelles

## Recommandations et prochaines étapes
- Si vous gardez les pages de test, ajoutez une petite doc (déjà faite) et conservez-les dans un dossier `qa/` pour clarifier leur usage.
- Si vous souhaitez une assurance automatisée, je peux convertir un ou deux tests manuels en tests E2E (Playwright ou Cypress) :
  - Exemple : test du toggle thème (vérifie la classe body et l'entry dans `localStorage`).
  - Exemple : test des favoris (cliquer sur un bouton favori, vérifier `localStorage` et page `favoris.html`).
- Nettoyage : si vous voulez alléger le dépôt, on peut déplacer les fichiers de démonstration (`test-*.html`, maquettes) dans un dossier `archive/` ou `qa/` puis ajouter un commit.

## Fichier PDF fourni
Les deux PDF suivants sont présents à la racine :
- `TP 1 _ Développement d_une plateforme de recettes culinaires interactive _GourmeTech_ (1).pdf`
- `TP 2 _ Développement d_une plateforme de recettes culinaires interactive _GourmeTech_.pdf`

Ils contiennent probablement le cahier des charges et les consignes pour chaque TP. Si vous voulez, je peux parcourir (lire) ces PDF et extraire la liste exacte des exigences pour mettre à jour la répartition fichier ↔ TP.

---

Si vous voulez, je peux maintenant :
- convertir un test manuel en test Playwright (création du test et exécution),
- déplacer les fichiers de test dans `qa/` et nettoyer la racine,
- ou lire les deux PDF et extraire automatiquement les exigences (si vous souhaitez que je fasse cette extraction). 

Indiquez l'option que vous préférez et je m'en occupe.