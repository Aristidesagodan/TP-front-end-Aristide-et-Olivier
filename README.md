# 🍽️ GourmeTech - Plateforme de Recettes Culinaires

## 📖 Description

GourmeTech est une plateforme web interactive dédiée aux passionnés de cuisine. Elle permet aux utilisateurs de découvrir, rechercher, organiser et partager des recettes culinaires dans une interface moderne et responsive.

## ✨ Fonctionnalités Principales

### 🏠 Page d'Accueil
- **Recherche intelligente** : Recherche par nom, ingrédients ou description
- **Filtrage avancé** : Par catégorie (entrée, plat, dessert), temps de préparation, et difficulté
- **Affichage en grille** : Interface responsive avec pagination
- **Système de favoris** : Ajout/suppression en un clic
- **Navigation intégrée** : Accès direct aux nouvelles fonctionnalités

### 🎲 Page Découverte (generer.html) - **NOUVEAU**
- **Générateur aléatoire** : Découvrez des recettes surprises depuis TheMealDB API
- **Filtrages par catégorie** : Beef, Chicken, Dessert, Pasta, Seafood, etc.
- **Chef Surprise** : Mode découverte totalement aléatoire
- **Sauvegarde intelligente** : Ajoutez vos découvertes en favoris
- **Partage natif** : Via Web Share API ou copie vers presse-papier
- **Export PDF** : Imprimez vos recettes préférées
- **Interface moderne** : Design responsive avec animations fluides

### 📊 Page Statistiques (historique.html) - **NOUVEAU**
- **Dashboard analytique** : Vue d'ensemble de vos découvertes culinaires
- **Métriques avancées** : Recettes générées, sauvegardées, pays et catégories explorés
- **Graphiques visuels** : Analyse des préférences par catégorie
- **Historique temporel** : Timeline de toutes vos découvertes
- **Export de données** : Rapports PDF et exports JSON
- **Partage des stats** : Partagez vos statistiques culinaires
- **Gestion des données** : Réinitialisation complète avec confirmation

### 📝 Page de Recette Détaillée
- **Affichage complet** : Ingrédients, instructions étape par étape
- **Ajustement des portions** : Recalcul automatique des quantités
- **Partage social** : Copie du lien vers le presse-papier
- **Suggestions** : Recettes similaires basées sur la catégorie

### ❤️ Gestion des Favoris
- **Sauvegarde locale** : Persistance avec localStorage
- **Filtrage et tri** : Organisation personnalisée des favoris
- **Export** : Téléchargement au format Markdown
- **Actions en lot** : Suppression groupée

### 🌟 Fonctionnalités Avancées
- **Thèmes multiples** : Mode clair/sombre avec transition fluide
- **Interface responsive** : Optimisée mobile, tablette et desktop
- **Accessibilité** : Conformité WCAG 2.1, navigation clavier
- **Notifications** : System de toast pour les actions utilisateur

## 🏗️ Structure du Projet

```
gourmeTech/
│
├── index.html              # Page d'accueil principale
├── recette.html           # Page de détail des recettes
├── favoris.html           # Page de gestion des favoris
├── a-propos.html          # Page à propos avec formulaire de contact
├── test.html              # Page de test des fonctionnalités JS
├── generer.html           # Page de génération de recettes aléatoires
├── README.md              # Documentation du projet
│
├── css/
│   └── styles.css         # Styles CSS complets (2000+ lignes)
│
├── js/
│   ├── scripts.js         # Logique JavaScript (1500+ lignes)
│   └── generer.js         # Logique pour la génération de recettes (à venir)
│
└── assets/
    ├── images/            # Images du projet (à venir)
    └── icons/             # Icônes personnalisées (à venir)
```

## 🚀 Technologies Utilisées

### Frontend
- **HTML5** : Structure sémantique avec ARIA
- **CSS3** : 
  - Custom Properties (variables CSS)
  - Grid et Flexbox pour la mise en page
  - Media queries responsive
  - Animations et transitions
- **JavaScript ES6+** :
  - Vanilla JavaScript (aucune dépendance)
  - localStorage pour la persistance
  - API moderne (navigator.share, clipboard)
  - Programmation asynchrone

### Fonctionnalités CSS Avancées
- **Thèmes dynamiques** avec CSS Custom Properties
- **Design responsive** avec breakpoints multiples
- **Animations fluides** et micro-interactions
- **Système de grille** adaptatif
- **Mode d'impression** optimisé

### Fonctionnalités JavaScript
- **Architecture modulaire** avec fonctions pures
- **Gestion d'état** avec localStorage
- **Recherche en temps réel** avec debouncing
- **Pagination dynamique**
- **Validation de formulaires** en temps réel

## 📦 Installation et Utilisation

### Prérequis
- Navigateur web moderne (Chrome 70+, Firefox 65+, Safari 12+)
- Serveur HTTP local (optionnel pour le développement)

### Installation Rapide

1. **Cloner ou télécharger le projet** :
```bash
git clone [URL_DU_REPO]
cd gourmeTech
```

2. **Ouvrir directement dans le navigateur** :
   - Double-clic sur `index.html`
   - Ou serveur local : `python -m http.server 8080`

3. **Accès aux pages** :
   - **Accueil** : `index.html`
   - **Test** : `test.html` (validation des fonctionnalités)
   - **Générer** : `generer.html` (découverte de recettes aléatoires)

### Serveur Local (Recommandé)

```bash
# Avec Python
python -m http.server 8080

# Avec Node.js (http-server)
npx http-server -p 8080

# Avec PHP
php -S localhost:8080
```

Puis accéder à : `http://localhost:8080`

## 🧪 Tests et Validation

### Page de Test Intégrée
Une page `test.html` est incluse pour valider toutes les fonctionnalités :
- ✅ Chargement des données de recettes
- ✅ Fonctionnement du système de favoris
- ✅ Tests des filtres et recherche
- ✅ Validation localStorage
- ✅ Tests d'interface utilisateur

### Tests Manuels Recommandés
1. **Navigation** : Tester tous les liens entre pages
2. **Recherche** : Rechercher par différents termes
3. **Favoris** : Ajouter/supprimer des recettes
4. **Thèmes** : Basculer entre clair/sombre
5. **Responsive** : Tester sur mobile/tablette
6. **Formulaires** : Remplir le formulaire de contact

## 🎨 Personnalisation

### Thèmes
Les thèmes sont gérés via CSS Custom Properties dans `:root` :

```css
:root {
  --primary-color: #e74c3c;
  --secondary-color: #2c3e50;
  --background-color: #ffffff;
  --text-color: #333333;
}

[data-theme="dark"] {
  --background-color: #2c3e50;
  --text-color: #ffffff;
}
```

### Ajout de Recettes
Les recettes sont stockées dans `js/scripts.js` dans l'array `RECIPES_DATA` :

```javascript
const RECIPES_DATA = [
  {
    id: 1,
    title: "Nom de la recette",
    category: "plat", // "entree", "plat", "dessert"
    time: 30, // minutes
    difficulty: "facile", // "facile", "moyen", "difficile"
    servings: 4,
    image: "URL_de_l_image",
    description: "Description de la recette...",
    ingredients: [
      { name: "Ingrédient", quantity: "100", unit: "g" }
    ],
    instructions: [
      "Étape 1...",
      "Étape 2..."
    ]
  }
];
```

## 📱 Compatibilité

### Navigateurs Supportés
- ✅ **Chrome** 70+ (recommandé)
- ✅ **Firefox** 65+
- ✅ **Safari** 12+
- ✅ **Edge** 79+

### Résolutions d'Écran
- 📱 **Mobile** : 320px - 768px
- 📊 **Tablette** : 768px - 1024px
- 🖥️ **Desktop** : 1024px+

### Fonctionnalités Progressives
- **localStorage** : Sauvegarde des favoris et préférences
- **Web Share API** : Partage natif sur mobile
- **Clipboard API** : Copie automatique des liens
- **CSS Grid** : Mise en page avancée avec fallback

## 🔧 Architecture Technique

### Patrons de Conception
- **Module Pattern** : Organisation du code en modules logiques
- **Observer Pattern** : Gestion des événements et états
- **Responsive Design** : Mobile-first approach

### Performance
- **Lazy Loading** : Images chargées à la demande
- **Debouncing** : Optimisation de la recherche en temps réel
- **CSS Minification** : Styles optimisés
- **Code Splitting** : Séparation logique HTML/CSS/JS

### Sécurité
- **XSS Protection** : Échappement des contenus utilisateur
- **Input Validation** : Validation côté client et sanitisation
- **HTTPS Ready** : Compatible avec les certificats SSL

## 🤝 Contribution

### Guidelines de Développement
1. **Code Style** : Suivre les conventions JavaScript ES6+
2. **Commits** : Messages descriptifs en français
3. **Tests** : Utiliser `test.html` pour valider les changements
4. **Documentation** : Commenter les fonctions complexes

### Structure de Branches Recommandée
```
main           # Version stable
develop        # Développement actif
feature/xxx    # Nouvelles fonctionnalités
hotfix/xxx     # Corrections urgentes
```

## 📋 Roadmap

### Version 1.1 (Prochaine)
- [ ] **Backend** : API REST pour les recettes
- [ ] **Base de données** : Stockage persistant
- [ ] **Authentification** : Comptes utilisateurs
- [ ] **Upload** : Ajout de recettes personnelles

### Version 1.2
- [ ] **PWA** : Application web progressive
- [ ] **Mode hors ligne** : Cache des recettes
- [ ] **Notifications** : Rappels de cuisine
- [ ] **Partage social** : Intégration réseaux sociaux

### Améliorations Continues
- [ ] **Accessibilité** : Amélioration continue WCAG
- [ ] **Performance** : Optimisation des images
- [ ] **SEO** : Métadonnées et structure
- [ ] **Analytics** : Suivi de l'utilisation

## 📞 Support

### Problèmes Courants

**Q: Les favoris ne se sauvegardent pas**
R: Vérifiez que localStorage est activé dans votre navigateur

**Q: Les images ne s'affichent pas**
R: Vérifiez la connexion internet et les URLs des images

**Q: La recherche ne fonctionne pas**
R: Assurez-vous que JavaScript est activé

### Contact
- **Email** : [Votre email de contact]
- **GitHub** : [URL du repository]
- **Documentation** : Ce fichier README.md

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 🥄 Nouvelle fonctionnalité : Générer une recette aléatoire

### Page : `generer.html`
- Permet à l'utilisateur de découvrir une recette aléatoire en un clic.
- Utilise l'API publique TheMealDB : [https://www.themealdb.com/api.php](https://www.themealdb.com/api.php)
- Affiche dynamiquement :
  - Image du plat
  - Nom du plat
  - Catégorie
  - Origine (area)
  - Liste des ingrédients et mesures
  - Instructions de préparation
- Bouton animé pour générer une nouvelle recette sans recharger la page
- Gestion des erreurs réseau et affichage d'un loader pendant la récupération
- Code JavaScript vanilla, structuré et commenté (`js/generer.js`)
- Style intégré et responsive, cohérent avec le reste du site

#### Exemple d'utilisation
1. Ouvrir `generer.html` dans le navigateur
2. Cliquer sur "Générer une recette"
3. La recette s'affiche instantanément avec tous les détails

#### API utilisée
- Endpoint : `https://www.themealdb.com/api/json/v1/1/random.php`
- Format de réponse : JSON
- Extraction dynamique des ingrédients et mesures

#### Bonus
- Possibilité d'ajouter la recette aux favoris (à venir)
- Loader animé pendant la récupération

---

**🍽️ Bon appétit et bonne cuisine avec GourmeTech ! 🍽️**