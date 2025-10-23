/**
 * GourmeTech - Scripts JavaScript
 * Plateforme de recettes culinaires interactive
 * 
 * Fonctionnalités principales :
 * - Gestion des thèmes (clair/sombre)
 * - Recherche et filtrage des recettes
 * - Système de favoris avec localStorage
 * - Validation de formulaires
 * - Animations et interactions
 */

// ==========================================================================
// CONFIGURATION ET CONSTANTES
// ==========================================================================

const CONFIG = {
    STORAGE_KEYS: {
        THEME: 'gourmetech_theme',
        FAVORITES: 'gourmetech_favorites'
    },
    PAGINATION: {
        ITEMS_PER_PAGE: 12
    },
    ANIMATIONS: {
        DURATION: 300
    }
};

// Données des recettes (simulation d'une base de données)
const RECIPES_DATA = [
    {
        id: 1,
        title: "Tarte aux pommes",
        category: "dessert",
        time: 60,
        difficulty: "moyen",
        servings: 6,
        image: "ajax/tarte_aux_pommes.jpg",
        description: "Une délicieuse tarte aux pommes traditionnelle avec une pâte brisée maison et des pommes caramélisées.",
        ingredients: [
            { name: "Pâte brisée", quantity: "1", unit: "rouleau" },
            { name: "Pommes", quantity: "4", unit: "unités" },
            { name: "Sucre", quantity: "100", unit: "g" },
            { name: "Beurre", quantity: "30", unit: "g" },
            { name: "Cannelle", quantity: "1", unit: "c. à café" },
            { name: "Œuf", quantity: "1", unit: "unité" }
        ],
        instructions: [
            "Préchauffez le four à 180°C.",
            "Étalez la pâte brisée dans un moule à tarte.",
            "Épluchez et coupez les pommes en lamelles.",
            "Disposez les pommes sur la pâte et saupoudrez de sucre et cannelle.",
            "Ajoutez des noisettes de beurre sur les pommes.",
            "Enfournez pour 45 minutes jusqu'à ce que la pâte soit dorée."
        ]
    },
    {
        id: 2,
        title: "Ratatouille provençale",
        category: "plat",
        time: 45,
        difficulty: "facile",
        servings: 4,
        image: "ajax/la-vraie-ratatouille-nicoise.jpg",
        description: "Un plat traditionnel de légumes du soleil, parfait pour l'été. Savoureux et coloré.",
        ingredients: [
            { name: "Aubergines", quantity: "2", unit: "unités" },
            { name: "Courgettes", quantity: "2", unit: "unités" },
            { name: "Poivrons rouges", quantity: "2", unit: "unités" },
            { name: "Tomates", quantity: "4", unit: "unités" },
            { name: "Oignon", quantity: "1", unit: "unité" },
            { name: "Ail", quantity: "3", unit: "gousses" },
            { name: "Huile d'olive", quantity: "4", unit: "c. à soupe" },
            { name: "Herbes de Provence", quantity: "2", unit: "c. à café" }
        ],
        instructions: [
            "Coupez tous les légumes en dés de taille similaire.",
            "Faites chauffer l'huile d'olive dans une grande poêle.",
            "Faites revenir l'oignon et l'ail 3 minutes.",
            "Ajoutez les aubergines et faites cuire 5 minutes.",
            "Incorporez les courgettes et poivrons, cuisez 8 minutes.",
            "Ajoutez les tomates et les herbes, laissez mijoter 20 minutes.",
            "Assaisonnez avec sel et poivre selon votre goût."
        ]
    },
    {
        id: 3,
        title: "Velouté de potiron",
        category: "entree",
        time: 30,
        difficulty: "facile",
        servings: 4,
        image: "ajax/veloute-potimarron.jpg",
        description: "Un velouté onctueux et réconfortant, parfait pour les soirées d'automne.",
        ingredients: [
            { name: "Potiron", quantity: "800", unit: "g" },
            { name: "Pommes de terre", quantity: "200", unit: "g" },
            { name: "Oignon", quantity: "1", unit: "unité" },
            { name: "Bouillon de légumes", quantity: "1", unit: "L" },
            { name: "Crème fraîche", quantity: "100", unit: "ml" },
            { name: "Beurre", quantity: "20", unit: "g" },
            { name: "Muscade", quantity: "1", unit: "pincée" }
        ],
        instructions: [
            "Épluchez et coupez le potiron et les pommes de terre en cubes.",
            "Émincez l'oignon et faites-le revenir dans le beurre.",
            "Ajoutez le potiron et les pommes de terre.",
            "Versez le bouillon et portez à ébullition.",
            "Laissez cuire 20 minutes jusqu'à ce que les légumes soient tendres.",
            "Mixez le tout jusqu'à obtenir une texture lisse.",
            "Ajoutez la crème fraîche et la muscade, rectifiez l'assaisonnement."
        ]
    },
    {
        id: 4,
        title: "Tiramisu classique",
        category: "dessert",
        time: 20,
        difficulty: "moyen",
        servings: 8,
        image: "ajax/tiramisu.jpeg",
        description: "Le dessert italien par excellence, avec ses couches de mascarpone et de café.",
        ingredients: [
            { name: "Mascarpone", quantity: "500", unit: "g" },
            { name: "Œufs", quantity: "4", unit: "unités" },
            { name: "Sucre", quantity: "100", unit: "g" },
            { name: "Biscuits à la cuillère", quantity: "200", unit: "g" },
            { name: "Café fort", quantity: "200", unit: "ml" },
            { name: "Cacao en poudre", quantity: "2", unit: "c. à soupe" },
            { name: "Marsala", quantity: "2", unit: "c. à soupe" }
        ],
        instructions: [
            "Séparez les blancs des jaunes d'œufs.",
            "Fouettez les jaunes avec le sucre jusqu'à blanchiment.",
            "Incorporez le mascarpone au mélange jaunes-sucre.",
            "Montez les blancs en neige ferme et incorporez-les délicatement.",
            "Trempez rapidement les biscuits dans le café et disposez une couche.",
            "Recouvrez de crème au mascarpone, répétez l'opération.",
            "Réservez au frais 4h minimum. Saupoudrez de cacao avant de servir."
        ]
    },
    {
        id: 5,
        title: "Salade César",
        category: "entree",
        time: 15,
        difficulty: "facile",
        servings: 4,
        image: "ajax/Salade-cesar-Florette.jpg",
        description: "La célèbre salade américaine avec sa sauce crémeuse et ses croûtons croustillants.",
        ingredients: [
            { name: "Laitue romaine", quantity: "2", unit: "têtes" },
            { name: "Parmesan", quantity: "100", unit: "g" },
            { name: "Croûtons", quantity: "100", unit: "g" },
            { name: "Anchois", quantity: "4", unit: "filets" },
            { name: "Mayonnaise", quantity: "3", unit: "c. à soupe" },
            { name: "Citron", quantity: "1", unit: "unité" },
            { name: "Ail", quantity: "1", unit: "gousse" },
            { name: "Sauce Worcestershire", quantity: "1", unit: "c. à café" }
        ],
        instructions: [
            "Lavez et essorez la salade romaine, coupez-la en lanières.",
            "Préparez la sauce en mixant anchois, ail, jus de citron et mayonnaise.",
            "Ajoutez la sauce Worcestershire à la sauce.",
            "Mélangez la salade avec la sauce dans un grand saladier.",
            "Ajoutez les copeaux de parmesan et les croûtons.",
            "Servez immédiatement pour conserver le croustillant des croûtons."
        ]
    },
    {
        id: 6,
        title: "Bœuf bourguignon",
        category: "plat",
        time: 180,
        difficulty: "difficile",
        servings: 6,
        image: "ajax/boeuf-bourguignon-parfait.jpg",
        description: "Le grand classique de la cuisine française, mijoté longuement au vin rouge.",
        ingredients: [
            { name: "Bœuf à braiser", quantity: "1.5", unit: "kg" },
            { name: "Vin rouge", quantity: "750", unit: "ml" },
            { name: "Lardons", quantity: "200", unit: "g" },
            { name: "Champignons", quantity: "300", unit: "g" },
            { name: "Oignons grelots", quantity: "300", unit: "g" },
            { name: "Carottes", quantity: "3", unit: "unités" },
            { name: "Bouquet garni", quantity: "1", unit: "unité" },
            { name: "Farine", quantity: "2", unit: "c. à soupe" }
        ],
        instructions: [
            "Coupez le bœuf en cubes et faites-les revenir dans une cocotte.",
            "Retirez la viande et faites revenir les lardons.",
            "Ajoutez les oignons et carottes, puis la farine.",
            "Remettez la viande, versez le vin rouge et ajoutez le bouquet garni.",
            "Couvrez et laissez mijoter 2h30 à feu doux.",
            "Ajoutez les champignons 30 minutes avant la fin de cuisson.",
            "Rectifiez l'assaisonnement et servez avec des pommes de terre."
        ]
    }
];

// Variables globales
let currentRecipes = [...RECIPES_DATA];
let currentPage = 1;
let currentFilters = {
    search: '',
    category: '',
    time: '',
    difficulty: ''
};

// ==========================================================================
// INITIALISATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍽️ GourmeTech - Initialisation...');
    
    // Initialisation commune à toutes les pages
    initializeTheme();
    initializeNavigation();
    updateFavoritesCount();
    
    // Initialiser les FAQ sur toutes les pages si elles existent
    if (document.querySelector('.faq-section')) {
        console.log('📋 FAQ détectée - Initialisation...');
        initFAQ();
    }
    
    // Initialisation spécifique selon la page
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            initHomePage();
            break;
        case 'recette':
            initRecipePage();
            break;
        case 'favoris':
            initFavoritesPage();
            break;
        case 'a-propos':
            initAboutPage();
            break;
    }
    
    console.log('✅ GourmeTech initialisé avec succès !');
});

// Détecter la page actuelle
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().split('.')[0];
    
    if (filename === 'index' || filename === '') return 'index';
    if (filename === 'recette') return 'recette';
    if (filename === 'favoris') return 'favoris';
    if (filename === 'a-propos') return 'a-propos';
    
    return 'index'; // Par défaut
}

// ==========================================================================
// GESTION DES THÈMES
// ==========================================================================

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME) || 'light';
    
    // Appliquer le thème sauvegardé
    setTheme(savedTheme);
    
    // Gestionnaire d'événement pour le bouton de thème
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, theme);
    
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Animation de transition
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// ==========================================================================
// NAVIGATION
// ==========================================================================

function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMain = document.querySelector('.nav-main');
    
    if (menuToggle && navMain) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMain.classList.contains('show');
            
            if (isOpen) {
                navMain.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            } else {
                navMain.classList.add('show');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Fermer le menu mobile lors du clic sur un lien
        const navLinks = navMain.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMain.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Fermer le menu mobile lors du clic en dehors
        document.addEventListener('click', (e) => {
            if (!navMain.contains(e.target) && !menuToggle.contains(e.target)) {
                if (navMain.classList.contains('show')) {
                    navMain.classList.remove('show');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
        
        // Fermer le menu mobile avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMain.classList.contains('show')) {
                navMain.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Navigation au clavier dans le menu mobile
        menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuToggle.click();
            }
        });
    }
    
    // Navigation fluide vers les sections
    initSmoothScrolling();
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// GESTION DES FAVORIS
// ==========================================================================

function getFavorites() {
    try {
        const favorites = localStorage.getItem(CONFIG.STORAGE_KEYS.FAVORITES);
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
        return [];
    }
}

function saveFavorites(favorites) {
    try {
        localStorage.setItem(CONFIG.STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
        updateFavoritesCount();
    } catch (error) {
        console.error('Erreur lors de la sauvegarde des favoris:', error);
        showToast('Erreur lors de la sauvegarde', 'error');
    }
}

function toggleFavorite(recipeId) {
    const favorites = getFavorites();
    const index = favorites.indexOf(recipeId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Recette supprimée des favoris', 'success');
    } else {
        favorites.push(recipeId);
        showToast('Recette ajoutée aux favoris', 'success');
    }
    
    saveFavorites(favorites);
    updateFavoriteButtons();
    
    // Si on est sur la page des favoris, rafraîchir l'affichage
    if (getCurrentPage() === 'favoris') {
        displayFavorites();
    }
}

function updateFavoritesCount() {
    const favorites = getFavorites();
    const countElements = document.querySelectorAll('.favorites-count');
    
    countElements.forEach(element => {
        element.textContent = favorites.length;
    });
}

function updateFavoriteButtons() {
    const favorites = getFavorites();
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        const recipeId = parseInt(button.dataset.recipeId);
        const isFavorite = favorites.includes(recipeId);
        
        button.classList.toggle('active', isFavorite);
        button.querySelector('.favorite-icon').textContent = isFavorite ? '❤️' : '♡';
        button.setAttribute('aria-label', isFavorite ? 'Supprimer des favoris' : 'Ajouter aux favoris');
    });
}

// ==========================================================================
// PAGE D'ACCUEIL
// ==========================================================================

function initHomePage() {
    console.log('🏠 Initialisation de la page d\'accueil...');
    
    initializeSearch();
    initializeFilters();
    displayRecipes(currentRecipes);
    hideLoading();
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentFilters.search = this.value.toLowerCase().trim();
                applyFilters();
            }, 300);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                currentFilters.search = this.value.toLowerCase().trim();
                applyFilters();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchValue = searchInput.value.toLowerCase().trim();
            currentFilters.search = searchValue;
            applyFilters();
        });
    }
}

function initializeFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const timeFilter = document.getElementById('timeFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');
    const resetFiltersBtn = document.getElementById('resetFilters');
    
    // Gestionnaires d'événements pour les filtres
    [categoryFilter, timeFilter, difficultyFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', function() {
                currentFilters[this.id.replace('Filter', '')] = this.value;
                applyFilters();
            });
        }
    });
    
    // Bouton de réinitialisation
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetAllFilters);
    }
}

function applyFilters() {
    showLoading();
    
    // Simulation d'un délai de recherche
    setTimeout(() => {
        let filteredRecipes = [...RECIPES_DATA];
        
        // Filtre de recherche
        if (currentFilters.search) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.title.toLowerCase().includes(currentFilters.search) ||
                recipe.description.toLowerCase().includes(currentFilters.search) ||
                recipe.ingredients.some(ingredient => 
                    ingredient.name.toLowerCase().includes(currentFilters.search)
                )
            );
        }
        
        // Filtre par catégorie
        if (currentFilters.category) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.category === currentFilters.category
            );
        }
        
        // Filtre par temps
        if (currentFilters.time) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                switch (currentFilters.time) {
                    case 'quick': return recipe.time <= 30;
                    case 'medium': return recipe.time > 30 && recipe.time <= 60;
                    case 'long': return recipe.time > 60;
                    default: return true;
                }
            });
        }
        
        // Filtre par difficulté
        if (currentFilters.difficulty) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.difficulty === currentFilters.difficulty
            );
        }
        
        currentRecipes = filteredRecipes;
        currentPage = 1;
        displayRecipes(currentRecipes);
        hideLoading();
        
    }, 300);
}

function resetAllFilters() {
    // Réinitialiser les filtres
    currentFilters = {
        search: '',
        category: '',
        time: '',
        difficulty: ''
    };
    
    // Réinitialiser les champs du formulaire
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const timeFilter = document.getElementById('timeFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (timeFilter) timeFilter.value = '';
    if (difficultyFilter) difficultyFilter.value = '';
    
    // Réappliquer tous les filtres (ce qui va afficher toutes les recettes)
    applyFilters();
}

function displayRecipes(recipes) {
    const recipesGrid = document.getElementById('recipesGrid');
    const noResults = document.getElementById('noResults');
    const resultsNumber = document.getElementById('resultsNumber');
    
    // Mise à jour du compteur de résultats
    if (resultsNumber) {
        resultsNumber.textContent = recipes.length;
    }
    
    if (!recipesGrid) return;
    
    // Afficher message si aucun résultat
    if (recipes.length === 0) {
        recipesGrid.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    // Masquer le message "aucun résultat" et afficher la grille
    if (noResults) noResults.style.display = 'none';
    recipesGrid.style.display = 'grid';
    
    // Pagination
    const startIndex = (currentPage - 1) * CONFIG.PAGINATION.ITEMS_PER_PAGE;
    const endIndex = startIndex + CONFIG.PAGINATION.ITEMS_PER_PAGE;
    const paginatedRecipes = recipes.slice(startIndex, endIndex);
    
    // Générer le HTML des recettes
    recipesGrid.innerHTML = paginatedRecipes.map(recipe => createRecipeCard(recipe)).join('');
    
    // Ajouter les gestionnaires d'événements
    addRecipeCardListeners();
    updateFavoriteButtons();
    
    // Gérer la pagination
    setupPagination(recipes.length);
    
    // Animation d'apparition
    requestAnimationFrame(() => {
        recipesGrid.classList.add('fade-in');
    });
}

function createRecipeCard(recipe) {
    const timeText = getTimeText(recipe.time);
    const difficultyText = getDifficultyText(recipe.difficulty);
    const categoryText = getCategoryText(recipe.category);
    
    return `
        <article class="recipe-card" data-recipe-id="${recipe.id}">
            <div class="recipe-image-container">
                <img 
                    src="${recipe.image}" 
                    alt="${recipe.title}"
                    class="recipe-image"
                    loading="lazy"
                >
                <button 
                    class="favorite-btn" 
                    data-recipe-id="${recipe.id}"
                    onclick="toggleFavorite(${recipe.id})"
                    aria-label="Ajouter aux favoris"
                >
                    <span class="favorite-icon">♡</span>
                </button>
            </div>
            
            <div class="recipe-content">
                <h3 class="recipe-title">
                    <a href="recette.html?id=${recipe.id}">${recipe.title}</a>
                </h3>
                
                <div class="recipe-meta">
                    <div class="meta-item">
                        <span class="meta-icon">🏷️</span>
                        <span class="meta-value">${categoryText}</span>
                    </div>
                    
                    <div class="meta-item">
                        <span class="meta-icon">⏱️</span>
                        <span class="meta-value">${timeText}</span>
                    </div>
                    
                    <div class="meta-item">
                        <span class="meta-icon">📊</span>
                        <span class="meta-value">${difficultyText}</span>
                    </div>
                </div>
                
                <p class="recipe-description">${recipe.description}</p>
            </div>
        </article>
    `;
}

function addRecipeCardListeners() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        // Clic sur la carte pour aller vers la recette
        card.addEventListener('click', function(e) {
            // Ne pas déclencher si on clique sur le bouton favori
            if (e.target.closest('.favorite-btn')) return;
            
            const recipeId = this.dataset.recipeId;
            window.location.href = `recette.html?id=${recipeId}`;
        });
        
        // Effet hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ==========================================================================
// PAGE DE RECETTE
// ==========================================================================

function initRecipePage() {
    console.log('📝 Initialisation de la page de recette...');
    
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = parseInt(urlParams.get('id'));
    
    if (recipeId) {
        loadRecipe(recipeId);
    } else {
        showRecipeError();
    }
}

function loadRecipe(recipeId) {
    showRecipeLoading();
    
    // Simulation d'un chargement
    setTimeout(() => {
        const recipe = RECIPES_DATA.find(r => r.id === recipeId);
        
        if (recipe) {
            displayRecipe(recipe);
            loadSuggestions(recipe);
        } else {
            showRecipeError();
        }
        
        hideRecipeLoading();
    }, 500);
}

function displayRecipe(recipe) {
    // Mettre à jour le titre de la page
    document.title = `${recipe.title} - GourmeTech`;
    document.getElementById('pageTitle').textContent = `${recipe.title} - GourmeTech`;
    
    // Breadcrumb
    const breadcrumb = document.getElementById('recipeBreadcrumb');
    if (breadcrumb) {
        breadcrumb.textContent = recipe.title;
    }
    
    // Informations principales
    document.getElementById('recipeImage').src = recipe.image;
    document.getElementById('recipeImage').alt = recipe.title;
    document.getElementById('recipeTitle').textContent = recipe.title;
    document.getElementById('recipeCategory').textContent = getCategoryText(recipe.category);
    document.getElementById('recipeTime').textContent = getTimeText(recipe.time);
    document.getElementById('recipeDifficulty').textContent = getDifficultyText(recipe.difficulty);
    document.getElementById('recipeServings').textContent = `${recipe.servings} personnes`;
    document.getElementById('recipeDescription').textContent = recipe.description;
    
    // Bouton favori
    const favoriteBtn = document.getElementById('recipeFavoriteBtn');
    if (favoriteBtn) {
        favoriteBtn.dataset.recipeId = recipe.id;
        favoriteBtn.addEventListener('click', () => toggleFavorite(recipe.id));
    }
    
    // Ajusteur de portions
    const servingsInput = document.getElementById('servingsInput');
    if (servingsInput) {
        servingsInput.value = recipe.servings;
    }
    
    // Ingrédients
    displayIngredients(recipe.ingredients, recipe.servings);
    
    // Instructions
    displayInstructions(recipe.instructions);
    
    // Afficher la recette
    document.getElementById('recipeDetail').style.display = 'block';
    
    // Mettre à jour les boutons favoris
    updateFavoriteButtons();
}

function displayIngredients(ingredients, baseServings) {
    const ingredientsList = document.getElementById('ingredientsList');
    if (!ingredientsList) return;
    
    ingredientsList.innerHTML = ingredients.map(ingredient => {
        return `
            <li data-base-quantity="${ingredient.quantity}" data-unit="${ingredient.unit}">
                <span class="ingredient-quantity">${ingredient.quantity}</span>
                <span class="ingredient-unit">${ingredient.unit}</span>
                <span class="ingredient-name">${ingredient.name}</span>
            </li>
        `;
    }).join('');
}

function displayInstructions(instructions) {
    const instructionsList = document.getElementById('instructionsList');
    if (!instructionsList) return;
    
    instructionsList.innerHTML = instructions.map(instruction => {
        return `<li>${instruction}</li>`;
    }).join('');
}

function adjustServings(delta) {
    const servingsInput = document.getElementById('servingsInput');
    if (!servingsInput) return;
    
    let currentServings = parseInt(servingsInput.value);
    let newServings = currentServings + delta;
    
    // Limiter entre 1 et 20
    newServings = Math.max(1, Math.min(20, newServings));
    
    servingsInput.value = newServings;
    
    // Recalculer les quantités d'ingrédients
    updateIngredientQuantities(newServings);
}

function updateIngredientQuantities(newServings) {
    const ingredientItems = document.querySelectorAll('#ingredientsList li');
    const baseServings = parseInt(document.getElementById('recipeServings').textContent);
    
    ingredientItems.forEach(item => {
        const baseQuantity = parseFloat(item.dataset.baseQuantity);
        const unit = item.dataset.unit;
        
        if (!isNaN(baseQuantity)) {
            const ratio = newServings / baseServings;
            const newQuantity = (baseQuantity * ratio).toFixed(baseQuantity % 1 === 0 ? 0 : 1);
            
            item.querySelector('.ingredient-quantity').textContent = newQuantity;
        }
    });
}

function loadSuggestions(currentRecipe) {
    // Trouver des recettes similaires (même catégorie, exclure la recette actuelle)
    const suggestions = RECIPES_DATA
        .filter(recipe => 
            recipe.id !== currentRecipe.id && 
            recipe.category === currentRecipe.category
        )
        .slice(0, 3);
    
    if (suggestions.length > 0) {
        displaySuggestions(suggestions);
    }
}

function displaySuggestions(suggestions) {
    const suggestionsSection = document.getElementById('suggestionsSection');
    const suggestionsGrid = document.getElementById('suggestionsGrid');
    
    if (!suggestionsGrid || suggestions.length === 0) return;
    
    suggestionsGrid.innerHTML = suggestions.map(recipe => {
        return `
            <article class="suggestion-card">
                <a href="recette.html?id=${recipe.id}" class="suggestion-link">
                    <img src="${recipe.image}" alt="${recipe.title}" class="suggestion-image">
                    <h4 class="suggestion-title">${recipe.title}</h4>
                    <p class="suggestion-meta">
                        ${getCategoryText(recipe.category)} • ${getTimeText(recipe.time)}
                    </p>
                </a>
            </article>
        `;
    }).join('');
    
    suggestionsSection.style.display = 'block';
}

function shareRecipe() {
    const recipeTitle = document.getElementById('recipeTitle').textContent;
    const currentUrl = window.location.href;
    
    if (navigator.share) {
        // API Web Share (mobile)
        navigator.share({
            title: recipeTitle,
            text: `Découvrez cette délicieuse recette : ${recipeTitle}`,
            url: currentUrl
        }).catch(err => console.log('Erreur lors du partage:', err));
    } else {
        // Fallback : copier dans le presse-papier
        navigator.clipboard.writeText(currentUrl).then(() => {
            showToast('Lien copié dans le presse-papier', 'success');
        }).catch(() => {
            // Fallback pour navigateurs plus anciens
            const textArea = document.createElement('textarea');
            textArea.value = currentUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('Lien copié dans le presse-papier', 'success');
        });
    }
}

// ==========================================================================
// PAGE DES FAVORIS
// ==========================================================================

function initFavoritesPage() {
    console.log('❤️ Initialisation de la page des favoris...');
    
    initFavoritesFilters();
    displayFavorites();
}

function initFavoritesFilters() {
    const categoryFilter = document.getElementById('favoriteCategoryFilter');
    const sortFilter = document.getElementById('favoriteSortFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', displayFavorites);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', displayFavorites);
    }
}

function displayFavorites() {
    const favorites = getFavorites();
    const emptyFavorites = document.getElementById('emptyFavorites');
    const favoritesGrid = document.getElementById('favoritesGrid');
    const favoritesActions = document.getElementById('favoritesActions');
    const favoritesFilters = document.getElementById('favoritesFilters');
    const favoritesTotal = document.getElementById('favoritesTotal');
    
    if (favorites.length === 0) {
        // Afficher le message vide
        emptyFavorites.style.display = 'block';
        favoritesGrid.style.display = 'none';
        favoritesActions.style.display = 'none';
        favoritesFilters.style.display = 'none';
        return;
    }
    
    // Récupérer les recettes favorites
    let favoriteRecipes = RECIPES_DATA.filter(recipe => 
        favorites.includes(recipe.id)
    );
    
    // Appliquer les filtres
    const categoryFilter = document.getElementById('favoriteCategoryFilter');
    const sortFilter = document.getElementById('favoriteSortFilter');
    
    if (categoryFilter && categoryFilter.value) {
        favoriteRecipes = favoriteRecipes.filter(recipe => 
            recipe.category === categoryFilter.value
        );
    }
    
    // Appliquer le tri
    if (sortFilter) {
        const sortBy = sortFilter.value;
        
        favoriteRecipes.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'category':
                    return a.category.localeCompare(b.category);
                case 'time':
                    return a.time - b.time;
                case 'recent':
                default:
                    return favorites.indexOf(b.id) - favorites.indexOf(a.id);
            }
        });
    }
    
    // Mise à jour de l'affichage
    emptyFavorites.style.display = 'none';
    favoritesGrid.style.display = 'grid';
    favoritesActions.style.display = 'flex';
    favoritesFilters.style.display = 'flex';
    
    // Mise à jour du compteur
    if (favoritesTotal) {
        favoritesTotal.textContent = `${favoriteRecipes.length} recette(s) favorite(s)`;
    }
    
    // Générer les cartes
    favoritesGrid.innerHTML = favoriteRecipes.map(recipe => createRecipeCard(recipe)).join('');
    
    // Ajouter les gestionnaires d'événements
    addRecipeCardListeners();
    updateFavoriteButtons();
}

function clearAllFavorites() {
    if (confirm('Êtes-vous sûr de vouloir supprimer tous vos favoris ? Cette action est irréversible.')) {
        saveFavorites([]);
        displayFavorites();
        showToast('Tous les favoris ont été supprimés', 'success');
    }
}

function exportFavorites() {
    const favorites = getFavorites();
    const favoriteRecipes = RECIPES_DATA.filter(recipe => 
        favorites.includes(recipe.id)
    );
    
    if (favoriteRecipes.length === 0) {
        showToast('Aucune recette favorite à exporter', 'warning');
        return;
    }
    
    // Créer le contenu du fichier
    let content = '# Mes Recettes Favorites - GourmeTech\n\n';
    
    favoriteRecipes.forEach(recipe => {
        content += `## ${recipe.title}\n\n`;
        content += `**Catégorie:** ${getCategoryText(recipe.category)}\n`;
        content += `**Temps:** ${getTimeText(recipe.time)}\n`;
        content += `**Difficulté:** ${getDifficultyText(recipe.difficulty)}\n`;
        content += `**Portions:** ${recipe.servings} personnes\n\n`;
        content += `${recipe.description}\n\n`;
        
        content += `### Ingrédients\n\n`;
        recipe.ingredients.forEach(ingredient => {
            content += `- ${ingredient.quantity} ${ingredient.unit} ${ingredient.name}\n`;
        });
        
        content += `\n### Instructions\n\n`;
        recipe.instructions.forEach((instruction, index) => {
            content += `${index + 1}. ${instruction}\n`;
        });
        
        content += '\n---\n\n';
    });
    
    // Télécharger le fichier
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mes-recettes-favorites-gourmetech.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Favoris exportés avec succès', 'success');
}

// ==========================================================================
// PAGE À PROPOS
// ==========================================================================

function initAboutPage() {
    console.log('ℹ️ Initialisation de la page à propos...');
    
    initContactForm();
    initFAQ();
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        
        // Validation en temps réel
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.form-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Valider tous les champs
    const isValid = validateContactForm(form);
    
    if (!isValid) {
        showToast('Veuillez corriger les erreurs dans le formulaire', 'error');
        return;
    }
    
    // Désactiver le bouton et afficher le loading
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    // Simulation d'envoi
    setTimeout(() => {
        // Réactiver le bouton
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        
        // Afficher le succès
        form.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        
        // Réinitialiser le formulaire après un délai
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            document.getElementById('formSuccess').style.display = 'none';
            
            // Nettoyer les erreurs
            const errorMessages = form.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.classList.remove('show'));
            
        }, 5000);
        
    }, 2000);
}

function validateContactForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let errorMessage = '';
    let isValid = true;
    
    // Validation selon le type de champ
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                errorMessage = 'Le nom doit contenir au moins 2 caractères';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Veuillez saisir une adresse email valide';
                isValid = false;
            }
            break;
            
        case 'subject':
            if (!value) {
                errorMessage = 'Veuillez sélectionner un sujet';
                isValid = false;
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                errorMessage = 'Le message doit contenir au moins 10 caractères';
                isValid = false;
            }
            break;
            
        case 'consent':
            if (!field.checked) {
                errorMessage = 'Vous devez accepter l\'utilisation de vos données';
                isValid = false;
            }
            break;
    }
    
    // Afficher ou masquer l'erreur
    showFieldError(field, errorMessage, !isValid);
    
    return isValid;
}

function showFieldError(field, message, show) {
    const errorElement = document.getElementById(`${field.name}Error`);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.toggle('show', show);
    }
    
    field.classList.toggle('error', show);
}

function clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}Error`);
    
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    
    field.classList.remove('error');
}

function initFAQ() {
    console.log('🔧 Initialisation FAQ...');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqContainer = document.querySelector('.faq-container');
    
    console.log(`📋 ${faqQuestions.length} questions FAQ trouvées`);
    
    if (faqQuestions.length === 0) {
        console.warn('⚠️ Aucune question FAQ trouvée');
        return;
    }
    
    // Créer une barre de recherche FAQ si elle n'existe pas
    if (faqContainer && !document.querySelector('.faq-search')) {
        createFAQSearch();
    }
    
    faqQuestions.forEach((question, index) => {
        console.log(`🔧 Configuration FAQ ${index + 1}`);
        
        // Ajouter un ID unique si pas déjà présent
        if (!question.id) {
            question.id = `faq-question-${index + 1}`;
        }
        
        question.addEventListener('click', function() {
            console.log('🖱️ Clic sur FAQ:', this.textContent.trim().substring(0, 50) + '...');
            
            const faqItem = this.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const toggle = this.querySelector('.faq-toggle');
            const isOpen = this.getAttribute('aria-expanded') === 'true';
            
            console.log('📊 État actuel:', { isOpen, hasAnswer: !!answer, hasToggle: !!toggle });
            
            // Animation du toggle
            if (toggle) {
                toggle.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(45deg)';
            }
            
            // Fermer toutes les autres FAQ avec animation
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.closest('.faq-item');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherQuestion.querySelector('.faq-toggle');
                    
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.setAttribute('aria-hidden', 'true');
                    otherAnswer.classList.remove('show');
                    otherAnswer.style.maxHeight = '0px';
                    
                    if (otherToggle) {
                        otherToggle.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Basculer la FAQ actuelle avec animation fluide
            if (isOpen) {
                console.log('🔽 Fermeture de la FAQ');
                this.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
                answer.classList.remove('show');
                answer.style.maxHeight = '0px';
            } else {
                console.log('🔼 Ouverture de la FAQ');
                this.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
                answer.classList.add('show');
                
                // Calculer la hauteur réelle du contenu
                const scrollHeight = answer.scrollHeight;
                console.log('📏 Hauteur calculée:', scrollHeight + 'px');
                answer.style.maxHeight = `${scrollHeight + 40}px`;
                
                // Scroll automatique vers la question ouverte
                setTimeout(() => {
                    faqItem.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 300);
            }
        });
        
        // Support du clavier
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Fonction pour créer la barre de recherche FAQ
function createFAQSearch() {
    const faqSection = document.querySelector('.faq-section');
    const faqContainer = document.querySelector('.faq-container');
    
    if (!faqSection || !faqContainer) return;
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'faq-search-container';
    searchContainer.innerHTML = `
        <div class="faq-search">
            <input 
                type="text" 
                id="faqSearch" 
                placeholder="Rechercher dans les questions..." 
                class="faq-search-input"
                autocomplete="off"
            >
            <button type="button" class="faq-search-clear" id="faqSearchClear" title="Effacer la recherche">
                <span>×</span>
            </button>
        </div>
        <div class="faq-search-results" id="faqSearchResults"></div>
    `;
    
    // Insérer avant le container FAQ
    faqSection.insertBefore(searchContainer, faqContainer);
    
    // Initialiser la recherche FAQ
    initFAQSearch();
}

// Fonction pour la recherche dans la FAQ
function initFAQSearch() {
    const searchInput = document.getElementById('faqSearch');
    const clearButton = document.getElementById('faqSearchClear');
    const resultsDiv = document.getElementById('faqSearchResults');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!searchInput || !faqItems.length) return;
    
    // Fonction de recherche
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        let hasResults = false;
        
        if (searchTerm === '') {
            // Afficher toutes les FAQ
            faqItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('search-highlight');
            });
            resultsDiv.innerHTML = '';
            clearButton.style.display = 'none';
            return;
        }
        
        clearButton.style.display = 'block';
        
        // Filtrer les FAQ
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span:first-child');
            const answer = item.querySelector('.faq-answer');
            const questionText = question ? question.textContent.toLowerCase() : '';
            const answerText = answer ? answer.textContent.toLowerCase() : '';
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = 'block';
                item.classList.add('search-highlight');
                visibleCount++;
                hasResults = true;
            } else {
                item.style.display = 'none';
                item.classList.remove('search-highlight');
            }
        });
        
        // Afficher les résultats
        if (hasResults) {
            resultsDiv.innerHTML = `
                <div class="search-results-info">
                    <span class="results-count">${visibleCount} question${visibleCount > 1 ? 's' : ''} trouvée${visibleCount > 1 ? 's' : ''}</span>
                </div>
            `;
        } else {
            resultsDiv.innerHTML = `
                <div class="search-no-results">
                    <span>Aucune question trouvée pour "${searchTerm}"</span>
                    <p>Essayez avec d'autres mots-clés ou consultez notre formulaire de contact.</p>
                </div>
            `;
        }
    }
    
    // Events de recherche
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keyup', performSearch);
    
    // Réinitialiser l'état des FAQ après recherche
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            // Fermer toutes les FAQ ouvertes quand on efface la recherche
            document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(question => {
                const answer = question.closest('.faq-item').querySelector('.faq-answer');
                question.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
                answer.classList.remove('show');
                answer.style.maxHeight = '0px';
                
                const toggle = question.querySelector('.faq-toggle');
                if (toggle) {
                    toggle.style.transform = 'rotate(0deg)';
                }
            });
        }
    });
    
    // Bouton effacer
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        performSearch();
        searchInput.focus();
    });
    
    // Effacer avec Escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            performSearch();
        }
    });
}

// Fonction utilitaire pour ouvrir/fermer une FAQ spécifique
function toggleFAQ(faqNumber) {
    const faqItem = document.querySelector(`[data-faq="${faqNumber}"]`);
    if (faqItem) {
        const question = faqItem.querySelector('.faq-question');
        if (question) {
            question.click();
        }
    }
}

// Fonction pour ouvrir toutes les FAQ (utile pour le débogage)
function openAllFAQ() {
    document.querySelectorAll('.faq-question[aria-expanded="false"]').forEach(question => {
        question.click();
    });
}

// Fonction pour fermer toutes les FAQ
function closeAllFAQ() {
    document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(question => {
        question.click();
    });
}

// Fonction de test pour vérifier les FAQ
function testFAQ() {
    console.log('🧪 Test des FAQ...');
    const faqQuestions = document.querySelectorAll('.faq-question');
    console.log(`Nombre de questions: ${faqQuestions.length}`);
    
    faqQuestions.forEach((question, index) => {
        const answer = question.closest('.faq-item').querySelector('.faq-answer');
        console.log(`FAQ ${index + 1}:`, {
            question: question.textContent.trim().substring(0, 50),
            hasAnswer: !!answer,
            answerVisible: answer ? window.getComputedStyle(answer).maxHeight : 'N/A'
        });
    });
    
    // Test d'ouverture de la première FAQ
    if (faqQuestions.length > 0) {
        console.log('🔧 Test d\'ouverture de la première FAQ...');
        faqQuestions[0].click();
    }
}

// ==========================================================================
// UTILITAIRES
// ==========================================================================

function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'block';
        loading.setAttribute('aria-hidden', 'false');
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
        loading.setAttribute('aria-hidden', 'true');
    }
}

function showRecipeLoading() {
    const loading = document.getElementById('recipeLoading');
    if (loading) {
        loading.style.display = 'block';
    }
}

function hideRecipeLoading() {
    const loading = document.getElementById('recipeLoading');
    if (loading) {
        loading.style.display = 'none';
    }
}

function showRecipeError() {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.style.display = 'block';
    }
}

function setupPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / CONFIG.PAGINATION.ITEMS_PER_PAGE);
    const pagination = document.getElementById('pagination');
    
    if (!pagination || totalPages <= 1) {
        if (pagination) pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const numbersContainer = document.getElementById('paginationNumbers');
    
    // Boutons précédent/suivant
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayRecipes(currentRecipes);
        }
    };
    
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayRecipes(currentRecipes);
        }
    };
    
    // Numéros de pages
    numbersContainer.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-number';
        pageBtn.textContent = i;
        pageBtn.classList.toggle('active', i === currentPage);
        
        pageBtn.onclick = () => {
            currentPage = i;
            displayRecipes(currentRecipes);
        };
        
        numbersContainer.appendChild(pageBtn);
    }
}

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}
            </span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Animation d'entrée
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    // Suppression automatique après 3 secondes
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Fonctions utilitaires pour le formatage
function getTimeText(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h${remainingMinutes}` : `${hours}h`;
    }
}

function getDifficultyText(difficulty) {
    const difficulties = {
        'facile': '⭐ Facile',
        'moyen': '⭐⭐ Moyen',
        'difficile': '⭐⭐⭐ Difficile'
    };
    return difficulties[difficulty] || difficulty;
}

function getCategoryText(category) {
    const categories = {
        'entree': '🥗 Entrée',
        'plat': '🍽️ Plat principal',
        'dessert': '🍰 Dessert'
    };
    return categories[category] || category;
}

// Fonction pour filtrer par catégorie (appelée depuis le footer)
function filterByCategory(category) {
    // Rediriger vers la page d'accueil avec le filtre
    if (getCurrentPage() !== 'index') {
        window.location.href = `index.html#category=${category}`;
    } else {
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.value = category;
            currentFilters.category = category;
            applyFilters();
        }
    }
}

// Gestion des hash URLs pour les filtres
window.addEventListener('hashchange', handleHashChange);
window.addEventListener('load', handleHashChange);

function handleHashChange() {
    if (getCurrentPage() === 'index') {
        const hash = window.location.hash.substring(1);
        if (hash.startsWith('category=')) {
            const category = hash.split('=')[1];
            const categoryFilter = document.getElementById('categoryFilter');
            if (categoryFilter) {
                categoryFilter.value = category;
                currentFilters.category = category;
                applyFilters();
            }
        }
    }
}

// ==========================================================================
// FONCTIONS GLOBALES (accessibles depuis le HTML)
// ==========================================================================

// Exposer les fonctions nécessaires au niveau global
window.toggleFavorite = toggleFavorite;
window.adjustServings = adjustServings;
window.shareRecipe = shareRecipe;
window.clearAllFavorites = clearAllFavorites;
window.exportFavorites = exportFavorites;
window.filterByCategory = filterByCategory;
window.resetAllFilters = resetAllFilters;

// Fonctions d'initialisation pour les pages spécifiques (appelées depuis le HTML)
window.initRecipePage = initRecipePage;
window.initFavoritesPage = initFavoritesPage;
window.initAboutPage = initAboutPage;

console.log('📱 GourmeTech Scripts loaded successfully!');