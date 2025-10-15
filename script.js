// Script principal pour GourmeTech
document.addEventListener('DOMContentLoaded', function() {
    console.log('GourmeTech - Application chargée');
    
    // Gestion du thème
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            if (themeIcon) {
                themeIcon.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
            }
        });
    }
    
    // Fonction de recherche (placeholder)
    const searchButton = document.querySelector('.search-filter button');
    const searchInput = document.querySelector('.search-filter input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Recherche pour:', searchTerm);
                // Ici on ajoutera la logique de recherche
            }
        });
    }
    
    // Gestion des filtres
    const filterInputs = document.querySelectorAll('.filters input');
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log('Filtre changé:', this.name, this.value);
            // Ici on ajoutera la logique de filtrage
        });
    });
});