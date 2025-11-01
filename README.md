# 🍽️ GourmeTech - Plateforme de Recettes Culinaires Interactive

## 📋 Description

GourmeTech est une plateforme web interactive dédiée aux recettes culinaires, développée dans le cadre d'un projet pédagogique. Elle permet aux utilisateurs de découvrir, explorer et sauvegarder leurs recettes favorites avec une interface moderne et responsive.

## ✨ Fonctionnalités

### 🎨 Interface Utilisateur
- **Design moderne et responsive** adapté à tous les appareils
- **Navigation intuitive** avec indicateurs visuels de page active
- **Thème sombre/clair** avec basculement en temps réel
- **Animations fluides** et effets de transition élégants
- **Logo interactif** avec effets de rotation et de brillance

### 🍳 Gestion des Recettes
- **Catalogue de recettes** avec trois recettes complètes :
  - Ratatouille niçoise traditionnelle
  - Soupe de potiron veloutée
  - Tarte aux pommes classique
- **Système de favoris** avec sauvegarde locale
- **Recherche interactive** avec filtrage en temps réel
- **Pages de recettes détaillées** avec ingrédients et instructions

### 🔧 Fonctionnalités Techniques
- **Sauvegarde persistante** des préférences utilisateur
- **Système de notifications** pour les actions utilisateur
- **Optimisation des performances** avec chargement rapide
- **Accessibilité** avec labels ARIA et navigation clavier

## 📁 Structure du Projet

```
tp-frontendAO-espacecréation/
├── 📄 index.html                    # Page d'accueil principale
├── 📄 ratatouille.html             # Page recette - Ratatouille
├── 📄 soupe-potiron.html           # Page recette - Soupe de potiron
├── 📄 tarte-pommes.html            # Page recette - Tarte aux pommes
├── 📄 test-theme.html              # Page de test pour les thèmes
├── 🎨 styles.css                   # Styles principaux et thème
├── 🎨 navigation-styles.css        # Styles spécifiques à la navigation
├── 🎨 recipe-template.css          # Styles pour les pages de recettes
├── 📜 script.js                    # Logique JavaScript principale
├── 📁 ajax/                        # Dossier des ressources images
│   ├── 🖼️ la-vraie-ratatouille-nicoise.jpg
│   ├── 🖼️ tarte_aux_pommes.jpg
│   ├── 🖼️ veloute-potimarron.jpg
│   └── 📄 .gitkeep
├── 🖼️ maquettes.jpeg              # Maquettes de design
├── 📄 README.md                    # Documentation du projet
└── 📋 Fichiers de cahier des charges (PDF)
```

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique et accessible
- **CSS3** - Styles modernes avec variables CSS, Flexbox et Grid
- **JavaScript ES6+** - Logique interactive et manipulation du DOM
- **LocalStorage API** - Sauvegarde des préférences utilisateur
- **Responsive Design** - Adaptation multi-appareils

## 📱 Pages et Fonctionnalités Détaillées

### 🏠 Page d'Accueil (`index.html`)
- **Section héro** avec titre accrocheur et description
- **Barre de recherche** interactive avec suggestions
- **Grille de recettes** avec aperçus visuels
- **Section à propos** présentant la plateforme
- **Footer informatif** avec liens et copyright

### 🍽️ Pages de Recettes
Chaque page de recette comprend :
- **En-tête visuel** avec image haute qualité
- **Informations nutritionnelles** (calories, temps de préparation)
- **Liste d'ingrédients** organisée et claire
- **Instructions étape par étape** numérotées
- **Bouton favori** pour sauvegarder la recette
- **Navigation breadcrumb** pour le retour

### 🎨 Système de Thèmes
- **Mode clair** : Design lumineux avec tons oranges
- **Mode sombre** : Interface sombre pour le confort visuel
- **Basculement instantané** sans rechargement de page
- **Sauvegarde automatique** de la préférence utilisateur

## 🎨 Design et Styles

### Palette de Couleurs
- **Orange principal** : `#ff6b35` - Couleur de marque dynamique
- **Orange secondaire** : `#f7931e` - Accents et dégradés
- **Texte principal** : Variables selon le thème
- **Arrière-plans** : Blanc/Gris sombre selon le thème

### Typographie
- **Police principale** : Arial, Helvetica, sans-serif
- **Tailles** : Hiérarchie claire de h1 à h6
- **Poids** : Normal (400) à Extra Bold (900)

### Effets Visuels
- **Dégradés** : Orange vers orange foncé
- **Ombres** : Effets de profondeur subtils
- **Transitions** : Animations fluides (0.3s ease)
- **Transformations** : Scaling et rotation au hover

## 💻 Installation et Utilisation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur local pour les tests (optionnel)

### Lancement Rapide
1. **Cloner ou télécharger** le projet
2. **Ouvrir `index.html`** dans un navigateur
3. **Explorer** les recettes et fonctionnalités

### Serveur Local (Optionnel)


## 🔧 Fonctionnalités JavaScript

### Gestion du Thème
```javascript
// Basculement automatique entre mode clair/sombre
// Sauvegarde dans localStorage
// Application instantanée sans rechargement
```

### Système de Favoris
```javascript
// Ajout/suppression de recettes favorites
// Persistance des données localement
// Interface utilisateur mise à jour en temps réel
```

### Recherche Interactive
```javascript
// Filtrage en temps réel des recettes
// Recherche par nom et ingrédients
// Interface responsive aux saisies utilisateur
```

### Notifications
```javascript
// Système d'alertes utilisateur
// Feedback visuel pour les actions
// Messages temporaires non-intrusifs
```

## 🎯 Objectifs Pédagogiques Atteints

### Développement Front-end
- ✅ **HTML sémantique** et structure accessible
- ✅ **CSS moderne** avec variables et layouts avancés
- ✅ **JavaScript interactif** avec manipulation du DOM
- ✅ **Responsive design** multi-appareils

### Bonnes Pratiques
- ✅ **Code organisé** et commenté
- ✅ **Séparation des préoccupations** (HTML/CSS/JS)
- ✅ **Optimisation des performances**
- ✅ **Accessibilité web** (ARIA, navigation clavier)

### Expérience Utilisateur
- ✅ **Interface intuitive** et moderne
- ✅ **Feedback utilisateur** approprié
- ✅ **Navigation fluide** entre les pages
- ✅ **Sauvegarde des préférences**

## 🚀 Fonctionnalités Avancées

### Navigation Active
- Indication visuelle de la page courante
- Boutons de navigation colorés selon le contexte
- États hover et focus bien définis

### Performance
- Chargement optimisé des ressources
- CSS modulaire pour une maintenance facile
- JavaScript non-bloquant

### Accessibilité
- Labels ARIA pour les éléments interactifs
- Navigation au clavier supportée
- Contrastes de couleurs respectés

## 📊 Métriques du Projet

- **Lignes de code HTML** : ~1000+
- **Lignes de code CSS** : ~800+
- **Lignes de code JavaScript** : ~400+
- **Nombre de pages** : 5 pages principales
- **Recettes incluses** : 3 recettes complètes
- **Images** : 3 images haute qualité

## 🔄 Évolutions Futures Possibles

### Fonctionnalités
- [ ] Base de données pour plus de recettes
      
- [ ] Partage social des recettes
      
      

### Techniques
API REST
    

## 👥 Contributeurs

- **Aristide** - Développement front-end et design
- **Olivier** - Développement front-end et design

## 📄 Licence

Projet éducatif - Usage pédagogique uniquement

## 📞 Contact

Pour toute question concernant ce projet :
- Repository GitHub : [TP-front-end-Aristide-et-Olivier](https://github.com/Aristidesagodan/TP-front-end-Aristide-et-Olivier)
- Branche active : `main`

---

