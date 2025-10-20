// Script principal pour GourmeTech
document.addEventListener('DOMContentLoaded', function() {
    console.log('GourmeTech - Application chargée');
    
    // Initialisation du thème
    initializeTheme();
    
    // Initialisation des favoris
    initializeFavorites();
    
    // Gestion du thème
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            toggleTheme();
        });
    }
    
    // Fonction de recherche (placeholder)
    const searchButton = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Recherche pour:', searchTerm);
                searchRecipes(searchTerm);
                // Ici on ajoutera la logique de recherche
            }
        });
        
        // Recherche en temps réel pendant la frappe
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim();
            if (searchTerm.length > 2) {
                searchRecipes(searchTerm);
            } else if (searchTerm.length === 0) {
                showAllRecipes();
            }
        });
    }
    
    // Gestion des filtres
    const filterInputs = document.querySelectorAll('.filter-option input');
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log('Filtre changé:', this.name, this.value, this.checked);
            applyFilters();
            // Ici on ajoutera la logique de filtrage
        });
    });
});

// Gestion des favoris
function initializeFavorites() {
    // Récupération des favoris depuis le localStorage
    const favorites = getFavoritesFromStorage();
    
    // Initialisation des boutons favoris
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        const recipeId = button.getAttribute('data-recipe');
        
        // Mise à jour de l'affichage selon l'état favori
        if (favorites.includes(recipeId)) {
            button.classList.add('favorited');
            button.querySelector('.heart-icon').textContent = '❤️';
            button.setAttribute('aria-label', 'Retirer des favoris');
        }
        
        // Gestionnaire d'événement pour le clic
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(recipeId, button);
        });
    });
}

function toggleFavorite(recipeId, button) {
    let favorites = getFavoritesFromStorage();
    const heartIcon = button.querySelector('.heart-icon');
    
    if (favorites.includes(recipeId)) {
        // Retirer des favoris
        favorites = favorites.filter(id => id !== recipeId);
        button.classList.remove('favorited');
        heartIcon.textContent = '🤍';
        button.setAttribute('aria-label', 'Ajouter aux favoris');
        
        // Notification
        showNotification('Recette retirée des favoris', 'info');
    } else {
        // Ajouter aux favoris
        favorites.push(recipeId);
        button.classList.add('favorited');
        heartIcon.textContent = '❤️';
        button.setAttribute('aria-label', 'Retirer des favoris');
        
        // Notification
        showNotification('Recette ajoutée aux favoris', 'success');
    }
    
    // Sauvegarde dans le localStorage
    saveFavoritesToStorage(favorites);
    
    // Animation du bouton
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
}

function getFavoritesFromStorage() {
    const favorites = localStorage.getItem('gourmetech-favorites');
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavoritesToStorage(favorites) {
    localStorage.setItem('gourmetech-favorites', JSON.stringify(favorites));
}

function showNotification(message, type = 'info') {
    // Création d'une notification temporaire
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles de la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#ff6b35' : '#666'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        font-weight: 500;
        transform: translateX(300px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique après 3 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Fonctions de recherche et filtrage
function searchRecipes(searchTerm) {
    const recipeCards = document.querySelectorAll('.recipe-card');
    const searchTermLower = searchTerm.toLowerCase();
    
    recipeCards.forEach(card => {
        const title = card.querySelector('.recipe-title').textContent.toLowerCase();
        const category = card.querySelector('.meta-category').textContent.toLowerCase();
        
        if (title.includes(searchTermLower) || category.includes(searchTermLower)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.3s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

function showAllRecipes() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.3s ease-out';
    });
}

function applyFilters() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    // Récupération des filtres actifs
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(input => input.value);
    const selectedTime = document.querySelector('input[name="temps"]:checked')?.value;
    const selectedDifficulty = document.querySelector('input[name="difficulte"]:checked')?.value;
    
    recipeCards.forEach(card => {
        let shouldShow = true;
        
        // Filtre par catégorie
        if (selectedCategories.length > 0) {
            const cardCategory = card.getAttribute('data-category');
            if (!selectedCategories.includes(cardCategory)) {
                shouldShow = false;
            }
        }
        
        // Filtre par temps
        if (selectedTime && shouldShow) {
            const cardTime = card.getAttribute('data-time');
            if (cardTime !== selectedTime) {
                shouldShow = false;
            }
        }
        
        // Filtre par difficulté
        if (selectedDifficulty && shouldShow) {
            const cardDifficulty = card.getAttribute('data-difficulty');
            if (cardDifficulty !== selectedDifficulty) {
                shouldShow = false;
            }
        }
        
        // Affichage ou masquage de la carte
        if (shouldShow) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.3s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Vérification s'il y a des résultats
    const visibleCards = document.querySelectorAll('.recipe-card[style*="display: block"], .recipe-card:not([style*="display: none"])');
    if (visibleCards.length === 0) {
        showNotification('Aucune recette ne correspond à vos critères', 'info');
    }
}

// Gestion du thème
function initializeTheme() {
    // Récupération du thème sauvegardé
    const savedTheme = localStorage.getItem('gourmetech-theme');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Transfert de la classe du documentElement vers le body si nécessaire
    if (document.documentElement.classList.contains('dark-theme')) {
        document.body.classList.add('dark-theme');
        document.documentElement.classList.remove('dark-theme');
    }
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.textContent = '☀️';
        }
    } else {
        document.body.classList.remove('dark-theme');
        if (themeIcon) {
            themeIcon.textContent = '🌙';
        }
    }
}

function toggleTheme() {
    const themeIcon = document.querySelector('.theme-icon');
    
    document.body.classList.toggle('dark-theme');
    
    // Sauvegarde du thème
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('gourmetech-theme', isDark ? 'dark' : 'light');
    
    // Mise à jour de l'icône
    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
}

// Fonctionnalités du footer
function initializeFooter() {
    console.log('Initialisation du footer');
    
    // Animation au scroll
    const footer = document.querySelector('footer');
    if (footer) {
        // Observer pour l'animation d'apparition
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                }
            });
        }, {
            threshold: 0.1
        });
        
        footerObserver.observe(footer);
    }
    
    // Gestion des liens du footer
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si c'est un lien interne (ancre)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Scroll fluide vers l'élément
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Si l'élément n'existe pas sur cette page, rediriger vers l'accueil
                    console.log(`Navigation vers la section: ${targetId}`);
                    if (targetId === 'accueil') {
                        window.location.href = 'index.html';
                    } else if (targetId === 'recette') {
                        // Placeholder pour l'ajout de recette
                        showNotification('Fonctionnalité "Ajouter une recette" à venir !', 'info');
                    } else if (targetId === 'favoris') {
                        // Afficher les favoris (si on est sur l'accueil)
                        const favoritesSection = document.querySelector('.favorites-section');
                        if (favoritesSection) {
                            favoritesSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        } else {
                            showNotification('Section Favoris disponible sur la page d\'accueil', 'info');
                        }
                    } else if (targetId === 'apropos') {
                        showNotification('À propos de GourmeTech : Plateforme de recettes culinaires interactive', 'info');
                    }
                }
            }
        });
        
        // Effet de survol amélioré
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Fonction pour afficher des notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles inline pour la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'info' ? '#3498db' : '#e74c3c',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        zIndex: '9999',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        fontSize: '14px',
        lineHeight: '1.4'
    });
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Ajouter l'initialisation du footer au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // ... autres initialisations ...
    initializeFooter();
});