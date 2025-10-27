# GourmeTech - Instructions pour les Agents d'IA

## Vue d'ensemble du projet

GourmeTech est une plateforme web de recettes culinaires interactive développée en HTML/CSS/JavaScript vanilla. Le projet est structuré en deux phases (TP1/TP2) avec une architecture modulaire basée sur des fichiers séparés pour les fonctionnalités principales.

## Architecture et structure

### Fichiers de base (TP1)
- `index.html` : Page d'accueil principale avec recherche, filtres et listing de recettes
- `script.js` : Script principal gérant les thèmes, favoris, recherche et filtres
- `navigation.js` : Navigation fluide, gestion mobile et sections actives
- `styles.css` : Système de thèmes CSS avec variables custom properties
- `nav-styles.css` et `recipe-template.css` : Styles modulaires par composant

### Fonctionnalités avancées (TP2)
- `ajouter-recette.html` : Formulaire dynamique d'ajout de recettes
- `advanced-features.js` : Recherche vocale, minuteur, mode impression
- Pages de test manuelles : `test-favoris.html`, `test-theme.html`

### Ressources
- `ajax/` : Images des recettes (formats .jpeg et .jpg)
- Pages de recettes individuelles : `ratatouille.html`, `soupe-potiron.html`, `tarte-pommes.html`

## Patterns de développement spécifiques

### Système de thèmes
```css
/* Variables CSS dans styles.css */
:root { --bg-color: #ffffff; --text-color: #333333; }
body.dark-theme { --bg-color: #1a1a1a; --text-color: #ffffff; }
```
- Utilise des custom properties CSS pour les thèmes clair/sombre
- Sauvegarde persistante via `localStorage` dans `script.js`
- Toggle géré par le bouton `#themeToggle`

### Gestion des favoris
- Stockage local via `localStorage` avec clé `'favorites'`
- Synchronisation en temps réel entre les pages
- Fonction `initializeFavorites()` dans `script.js` à appeler au chargement

### Architecture modulaire JavaScript
```javascript
// Pattern d'initialisation standard dans tous les scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('Module chargé');
    initializeFeature();
});
```

### Convention de nommage
- Classes CSS : kebab-case (`.hero-section`, `.nav-link`)
- IDs : camelCase (`#themeToggle`, `#searchInput`)
- Fichiers : kebab-case avec suffixes descriptifs (`navigation-styles.css`)

## Flux de données et interactions

### Recherche et filtres
- Recherche en temps réel via `searchInput.addEventListener('input')`
- Filtres multiples gérés par checkboxes avec event listeners
- Fonction `searchRecipes()` et `showAllRecipes()` dans `script.js`

### Navigation
- Navigation single-page avec sections `#accueil`, `#recettes`
- Highlighting automatique via `initializeActiveNavigation()`
- Support mobile avec menu hamburger dans `navigation.js`

## Conventions de test

### Tests manuels
- Pages dédiées pour tester chaque fonctionnalité (`test-*.html`)
- Console logging extensif pour le debugging
- Vérification `localStorage` pour la persistance des données

### Structure de test
```html
<!-- Pattern de test dans test-favoris.html -->
<div class="test-section">
    <h2>Test : [Fonctionnalité]</h2>
    <div class="test-actions">
        <!-- Boutons de test -->
    </div>
</div>
```

## Points d'intégration critiques

### LocalStorage
- Clés utilisées : `'theme'`, `'favorites'`, `'userPreferences'`
- Format JSON pour les données complexes
- Vérification d'existence avant accès

### Gestion d'images
- Dossier `ajax/` pour toutes les images de recettes
- Convention : nom en minuscules avec tirets
- Formats supportés : `.jpeg`, `.jpg`

### Responsive Design
- Breakpoints dans `styles.css` : mobile-first approach
- Variables CSS pour les espacements et tailles
- Grid et flexbox pour les layouts

## Commandes de développement

### Lancement local
```bash
# Serveur de développement simple (si needed)
python -m http.server 8000
# ou
npx serve .
```

### Validation
- Pas de build process : HTML/CSS/JS vanilla
- Validation manuelle via les pages de test
- Console du navigateur pour le debugging

## Extensions futures

Lors d'ajouts de fonctionnalités, suivre ces patterns :
1. Script séparé dans un nouveau fichier `.js`
2. Initialisation via `DOMContentLoaded`
3. Utilisation des variables CSS pour le theming
4. Sauvegarde état via `localStorage` si nécessaire
5. Page de test dédiée pour validation manuelle