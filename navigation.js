// Navigation JavaScript pour GourmeTech
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation JavaScript chargé');
    
    // Navigation fluide entre les sections
    initializeSmoothNavigation();
    
    // Gestion de la navigation mobile
    initializeMobileNavigation();
    
    // Mise en surbrillance de la section active
    initializeActiveNavigation();
    
    // Gestion spécifique pour la page À propos
    initializeAboutPage();
});

// Gestion de la page À propos
function initializeAboutPage() {
    const aboutButton = document.querySelector('a[href="à-propos.html"]');
    
    if (aboutButton) {
        aboutButton.addEventListener('click', (e) => {
            // Pour l'instant, empêcher la navigation vers la page inexistante
            e.preventDefault();
            
            // Afficher un message informatif
            showAboutNotification();
        });
    }
}

function showAboutNotification() {
    // Créer la notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color, #ff6b35);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: 500;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    notification.textContent = 'Page À propos en cours de développement';
    
    // Ajouter les animations CSS si elles n'existent pas
    if (!document.querySelector('#about-animations')) {
        const style = document.createElement('style');
        style.id = 'about-animations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Supprimer la notification après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Navigation fluide entre les sections
function initializeSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
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
                    
                    // Mise à jour de l'URL sans rechargement
                    history.pushState(null, null, href);
                    
                    // Mise à jour de la navigation active
                    updateActiveNavigation(this);
                } else {
                    console.log(`Section ${targetId} non trouvée`);
                }
            }
        });
    });
}

// Gestion de la navigation mobile
function initializeMobileNavigation() {
    // Créer le bouton hamburger s'il n'existe pas
    const header = document.querySelector('.header-container');
    const nav = document.querySelector('.main-nav');
    
    if (header && nav && !document.querySelector('.nav-toggle')) {
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = '☰';
        navToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
        
        // Insérer le bouton avant la navigation
        header.insertBefore(navToggle, nav);
        
        // Gestionnaire d'événement pour le bouton
        navToggle.addEventListener('click', function() {
            const isOpen = nav.classList.contains('nav-open');
            
            if (isOpen) {
                nav.classList.remove('nav-open');
                this.innerHTML = '☰';
                this.setAttribute('aria-label', 'Ouvrir le menu de navigation');
            } else {
                nav.classList.add('nav-open');
                this.innerHTML = '✕';
                this.setAttribute('aria-label', 'Fermer le menu de navigation');
            }
        });
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('nav-open');
                navToggle.innerHTML = '☰';
                navToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
            });
        });
        
        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove('nav-open');
                navToggle.innerHTML = '☰';
                navToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
            }
        });
    }
}

// Mise en surbrillance de la section active
function initializeActiveNavigation() {
    // Observer les sections pour la navigation active
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    updateActiveNavigation(null, id);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Mettre à jour la navigation active
function updateActiveNavigation(clickedLink = null, sectionId = null) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Retirer la classe active de tous les liens
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    if (clickedLink) {
        // Si un lien a été cliqué, le marquer comme actif
        clickedLink.classList.add('active');
    } else if (sectionId) {
        // Si une section est visible, marquer le lien correspondant comme actif
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Fonction pour naviguer programmatiquement
function navigateToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Mise à jour de l'URL
        history.pushState(null, null, `#${sectionId}`);
        
        // Mise à jour de la navigation active
        updateActiveNavigation(null, sectionId);
    }
}

// Gestion du retour en arrière (bouton back du navigateur)
window.addEventListener('popstate', function() {
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1);
        navigateToSection(sectionId);
    }
});

// Vérifier si on arrive sur une section spécifique via l'URL
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const sectionId = hash.substring(1);
            navigateToSection(sectionId);
        }, 100);
    }
});