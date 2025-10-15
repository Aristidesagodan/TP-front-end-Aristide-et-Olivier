// Gestion du changement de thème et des interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeToggle();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
});

// Gestion du changement de thème
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Vérifier le thème sauvegardé dans localStorage
    const savedTheme = localStorage.getItem('gourmeTech-theme') || 'light';
    applyTheme(savedTheme);
    
    // Écouter le clic sur le bouton de changement de thème
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Appliquer le nouveau thème avec animation
        applyTheme(newTheme);
        
        // Animation du bouton
        this.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
    
    // Fonction pour appliquer un thème
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('gourmeTech-theme', theme);
        updateThemeIcon(theme);
    }
    
    // Fonction pour mettre à jour l'icône du thème
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('.theme-icon');
        if (theme === 'dark') {
            icon.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Passer au thème clair');
        } else {
            icon.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Passer au thème sombre');
        }
    }
}

// Gestion de la navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.hash || '#accueil';
    
    // Marquer le lien actuel
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
        
        // Gérer les clics sur les liens de navigation
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Retirer la classe active de tous les liens
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Ajouter la classe active au lien cliqué
                this.classList.add('active');
                
                // Smooth scroll vers la section
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Si la section n'existe pas, simuler le changement de page
                    console.log(`Navigation vers ${href}`);
                    // Ici, vous pourriez ajouter la logique de routage
                }
                
                // Mettre à jour l'URL
                window.history.pushState(null, '', href);
            }
        });
    });
    
    // Gérer le bouton retour du navigateur
    window.addEventListener('popstate', function() {
        const hash = window.location.hash || '#accueil';
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    });
}

// Effets de scroll
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header qui se cache/montre au scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll vers le bas - cacher le header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut - montrer le header
            header.style.transform = 'translateY(0)';
        }
        
        // Ajouter une ombre plus prononcée au scroll
        if (scrollTop > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px var(--header-shadow)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Animations et effets visuels
function initializeAnimations() {
    // Effet de survol amélioré sur le logo
    const logo = document.querySelector('.logo');
    const logoLetter = document.querySelector('.logo-letter');
    
    logo.addEventListener('mouseenter', function() {
        logoLetter.style.transform = 'scale(1.1) rotate(10deg)';
    });
    
    logo.addEventListener('mouseleave', function() {
        logoLetter.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Animation au clic sur le logo
    logo.addEventListener('click', function() {
        this.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
    
    // Effet de particules au survol du logo (optionnel)
    logo.addEventListener('mouseenter', createParticles);
    
    function createParticles() {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #ff6b35;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1001;
                `;
                
                const rect = logo.getBoundingClientRect();
                particle.style.left = (rect.left + rect.width / 2) + 'px';
                particle.style.top = (rect.top + rect.height / 2) + 'px';
                
                document.body.appendChild(particle);
                
                // Animation de la particule
                const angle = (i * 120 + Math.random() * 60) * Math.PI / 180;
                const distance = 30 + Math.random() * 20;
                const duration = 800 + Math.random() * 400;
                
                particle.animate([
                    {
                        transform: 'translate(0, 0) scale(1)',
                        opacity: 1
                    },
                    {
                        transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: duration,
                    easing: 'ease-out'
                }).onfinish = () => particle.remove();
            }, i * 100);
        }
    }
    
    // Animation des éléments au chargement
    const elementsToAnimate = document.querySelectorAll('.logo-section, .main-nav, .header-actions');
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Gestion des favoris (simulation)
function initializeFavorites() {
    const favoritesLink = document.querySelector('.favorites-link');
    let favoritesCount = parseInt(localStorage.getItem('gourmeTech-favorites-count')) || 0;
    
    // Afficher le nombre de favoris s'il y en a
    if (favoritesCount > 0) {
        updateFavoritesDisplay(favoritesCount);
    }
    
    favoritesLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Animation du cœur
        const icon = this.querySelector('.favorites-icon');
        icon.style.transform = 'scale(1.3)';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 200);
        
        console.log('Navigation vers les favoris');
        // Ici, vous ajouteriez la logique pour afficher les favoris
    });
    
    function updateFavoritesDisplay(count) {
        const favoritesText = favoritesLink.querySelector('.favorites-text');
        if (count > 0) {
            favoritesText.textContent = `Favoris (${count})`;
        } else {
            favoritesText.textContent = 'Favoris';
        }
    }
}

// Utilitaires pour l'accessibilité
function initializeAccessibility() {
    // Gestion du focus au clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Escape pour fermer des éléments (futur usage)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Logique pour fermer des modales, menus, etc.
        }
    });
}

// Initialiser toutes les fonctionnalités
document.addEventListener('DOMContentLoaded', function() {
    initializeFavorites();
    initializeAccessibility();
});

// Ajout de styles pour l'accessibilité
const accessibilityStyles = `
    .keyboard-navigation *:focus {
        outline: 2px solid #ff6b35 !important;
        outline-offset: 2px;
    }
    
    .logo-letter {
        transition: all 0.3s ease;
    }
`;

// Ajouter les styles d'accessibilité
const styleSheet = document.createElement('style');
styleSheet.textContent = accessibilityStyles;
document.head.appendChild(styleSheet);