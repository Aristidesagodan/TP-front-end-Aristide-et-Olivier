// Composant de navigation standardisé pour GourmeTech
class NavigationComponent {
    constructor() {
        this.navigationHTML = `
            <header class="header">
                <div class="header-container">
                    <!-- Logo et nom du site -->
                    <div class="logo-section">
                        <div class="logo">
                            <span class="logo-letter">G</span>
                        </div>
                        <h1 class="site-name">GourmeTech</h1>
                    </div>

                    <!-- Navigation principale -->
                    <nav class="main-nav">
                        <ul class="nav-list">
                            <li><a href="#accueil" class="nav-link" style="--i:1">Accueil</a></li>
                            <li><a href="#recettes" class="nav-link" style="--i:2">Recettes</a></li>
                            <li><a href="#favoris" class="nav-link" style="--i:3" aria-label="Mes favoris">Favoris</a></li>
                            <li><a href="#contact" class="nav-link" style="--i:4">Contact</a></li>
                        </ul>
                    </nav>

                    <!-- Boutons d'action -->
                    <div class="header-actions">
                        <!-- Bouton changement de thème -->
                        <button class="theme-toggle" id="themeToggle" aria-label="Changer le thème">
                            <span class="theme-icon">🌙</span>
                        </button>
                    </div>
                </div>
            </header>
        `;
    }

    // Méthode pour injecter la navigation dans un élément
    render(targetElement) {
        if (typeof targetElement === 'string') {
            targetElement = document.querySelector(targetElement);
        }
        
        if (targetElement) {
            targetElement.innerHTML = this.navigationHTML;
            this.initializeThemeToggle();
        }
    }

    // Méthode pour initialiser le toggle de thème
    initializeThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme);
        }
    }

    // Méthode pour changer le thème
    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        }
    }

    // Méthode pour marquer le lien actif
    setActiveLink(activePage) {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activePage}`) {
                link.classList.add('active');
            }
        });
    }
}

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationComponent;
}

// Utilisation automatique si le DOM est prêt
document.addEventListener('DOMContentLoaded', function() {
    // Recherche automatiquement un élément avec la classe 'navigation-container'
    const navContainer = document.querySelector('.navigation-container');
    if (navContainer) {
        const nav = new NavigationComponent();
        nav.render(navContainer);
    }
});