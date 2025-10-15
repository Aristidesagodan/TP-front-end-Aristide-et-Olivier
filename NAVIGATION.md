# Documentation - Navigation Standardisée GourmeTech

## Vue d'ensemble
Cette documentation explique comment maintenir une navigation cohérente sur toutes les pages du projet GourmeTech.

## Structure de la Navigation

### HTML Standardisé
```html
<nav class="main-nav">
    <ul class="nav-list">
        <li><a href="#accueil" class="nav-link">Accueil</a></li>
        <li><a href="#recettes" class="nav-link">Recettes</a></li>
        <li><a href="#favoris" class="nav-link" aria-label="Mes favoris">Favoris</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
    </ul>
</nav>
```

### Classes CSS Standardisées
- `.nav-link` : Classe utilisée pour TOUS les liens de navigation
- `.nav-link.active` : Classe pour marquer le lien de la page actuelle
- `.main-nav` : Container principal de la navigation
- `.nav-list` : Liste des liens de navigation

## Fichiers Standardisés

### 1. navigation.js
- **Fonction** : Composant JavaScript réutilisable pour la navigation
- **Utilisation** : Génère automatiquement la structure HTML de navigation
- **Avantage** : Une seule source de vérité pour la structure de navigation

### 2. navigation-styles.css
- **Fonction** : Styles CSS dédiés à la navigation
- **Inclus** : Responsive design, thème sombre/clair, animations
- **Variables CSS** : Utilise des variables pour faciliter la personnalisation

### 3. Inclusion dans index.html
```html
<link rel="stylesheet" href="navigation-styles.css">
<script src="navigation.js"></script>
```

## Comment Ajouter une Nouvelle Page

### Méthode 1 : HTML Statique
1. Copiez la structure HTML standardisée
2. Assurez-vous d'utiliser uniquement la classe `nav-link`
3. Ajoutez `aria-label` si nécessaire pour l'accessibilité

### Méthode 2 : JavaScript Dynamique
1. Ajoutez un div avec la classe `navigation-container` dans votre HTML
2. Incluez le fichier `navigation.js`
3. La navigation sera générée automatiquement

```html
<div class="navigation-container"></div>
<script src="navigation.js"></script>
```

## Bonnes Pratiques

### ✅ À Faire
- Toujours utiliser la classe `nav-link` pour les liens
- Maintenir l'ordre des liens : Accueil → Recettes → Favoris → Contact
- Utiliser `aria-label` pour l'accessibilité
- Marquer la page active avec la classe `active`

### ❌ À Éviter
- Ne pas utiliser de classes personnalisées comme `favorites-link`
- Ne pas modifier l'ordre des liens sans consensus
- Ne pas oublier d'inclure les fichiers CSS et JS

## Gestion du Thème

Le composant navigation inclut un bouton de changement de thème :
- **Clair** : 🌙 (icône lune)
- **Sombre** : ☀️ (icône soleil)

## Variables CSS Personnalisables

```css
:root {
    --primary-color: #667eea;
    --text-primary: #2d3436;
    --text-secondary: #636e72;
    --header-bg: #ffffff;
    --border-color: #ddd;
    --hover-bg: rgba(102, 126, 234, 0.1);
    --active-bg: rgba(102, 126, 234, 0.15);
}
```

## Support Responsive

La navigation est optimisée pour :
- **Desktop** : Navigation complète avec espacement généreux
- **Tablet** : Navigation adaptée avec espacement réduit
- **Mobile** : Navigation compacte avec texte plus petit

## Exemples d'Utilisation

### Marquer un lien comme actif
```javascript
const nav = new NavigationComponent();
nav.render(document.body);
nav.setActiveLink('recettes'); // Marque "Recettes" comme actif
```

### Gestion du thème
```javascript
// Le thème est géré automatiquement par le bouton
// Ou manuellement :
document.body.classList.toggle('dark-theme');
```

## Maintenance

Pour modifier la navigation sur toutes les pages :
1. Modifiez uniquement le fichier `navigation.js`
2. Les changements se répercuteront automatiquement partout
3. Testez sur une page avant de déployer

## Conclusion

Cette approche garantit :
- **Cohérence** : Même apparence sur toutes les pages
- **Maintenabilité** : Modifications centralisées
- **Accessibilité** : Respect des standards ARIA
- **Responsive** : Adaptation à tous les écrans