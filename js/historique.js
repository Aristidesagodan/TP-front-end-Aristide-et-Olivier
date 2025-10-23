/*
GourmeTech - Historique et Statistiques
Auteur : Daran-Olivier
Description : Analyse des données de découverte de recettes et statistiques utilisateur
*/

// =============================================================================
// VARIABLES GLOBALES ET DONNÉES
// =============================================================================

let savedRecipes = JSON.parse(localStorage.getItem('gourmeTech_discoveredRecipes')) || [];
let historyData = JSON.parse(localStorage.getItem('gourmeTech_history')) || [];

// =============================================================================
// FONCTIONS D'ANALYSE DES DONNÉES
// =============================================================================

// Calcule les statistiques générales
function calculateStats() {
    const stats = {
        totalGenerated: historyData.length,
        totalSaved: savedRecipes.length,
        countriesDiscovered: new Set(savedRecipes.map(r => r.strArea).filter(Boolean)).size,
        categoriesTried: new Set(savedRecipes.map(r => r.strCategory).filter(Boolean)).size
    };
    
    return stats;
}

// Analyse les catégories les plus populaires
function analyzeCategoriesData() {
    const categories = {};
    
    savedRecipes.forEach(recipe => {
        const category = recipe.strCategory || 'Autre';
        categories[category] = (categories[category] || 0) + 1;
    });
    
    return Object.entries(categories)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10); // Top 10
}

// Analyse les pays les plus découverts
function analyzeCountriesData() {
    const countries = {};
    
    savedRecipes.forEach(recipe => {
        const country = recipe.strArea || 'Inconnu';
        countries[country] = (countries[country] || 0) + 1;
    });
    
    return Object.entries(countries)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5); // Top 5
}

// =============================================================================
// FONCTIONS D'AFFICHAGE
// =============================================================================

// Met à jour les statistiques dans l'interface
function updateStatsDisplay() {
    const stats = calculateStats();
    
    document.getElementById('total-generated').textContent = stats.totalGenerated;
    document.getElementById('total-saved').textContent = stats.totalSaved;
    document.getElementById('countries-discovered').textContent = stats.countriesDiscovered;
    document.getElementById('categories-tried').textContent = stats.categoriesTried;
}

// Affiche le graphique des catégories (version simple)
function displayCategoriesChart() {
    const categoriesData = analyzeCategoriesData();
    const chartContainer = document.getElementById('category-chart');
    
    if (categoriesData.length === 0) {
        chartContainer.innerHTML = '<p>Aucune donnée à afficher. Sauvegardez des recettes pour voir les statistiques !</p>';
        return;
    }
    
    const total = categoriesData.reduce((sum, [, count]) => sum + count, 0);
    
    const chartHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${categoriesData.map(([category, count]) => {
                const percentage = ((count / total) * 100).toFixed(1);
                return `
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="min-width: 120px; font-weight: 500;">${category}</div>
                        <div style="flex: 1; background: #ecf0f1; border-radius: 10px; height: 20px; position: relative;">
                            <div style="
                                background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
                                height: 100%;
                                width: ${percentage}%;
                                border-radius: 10px;
                                transition: width 0.5s ease;
                            "></div>
                        </div>
                        <div style="min-width: 60px; text-align: right; font-weight: bold; color: var(--primary-color);">
                            ${count} (${percentage}%)
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    chartContainer.innerHTML = chartHTML;
}

// Affiche l'historique des recettes
function displayHistory() {
    const historyContainer = document.getElementById('history-timeline');
    
    if (savedRecipes.length === 0) {
        historyContainer.innerHTML = `
            <p style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                Aucune recette dans l'historique. 
                <a href="generer.html" style="color: var(--primary-color); text-decoration: none;">
                    Découvrez votre première recette !
                </a>
            </p>
        `;
        return;
    }
    
    // Trier par date de sauvegarde (plus récent en premier)
    const sortedRecipes = [...savedRecipes].sort((a, b) => 
        new Date(b.savedAt) - new Date(a.savedAt)
    );
    
    const historyHTML = sortedRecipes.map(recipe => {
        const date = new Date(recipe.savedAt);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `
            <div class="timeline-item">
                <div class="timeline-date">${formattedDate}</div>
                <div class="timeline-content">
                    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="timeline-image">
                    <div>
                        <h4 style="margin: 0 0 0.5rem 0; color: var(--text-color);">
                            ${recipe.strMeal}
                        </h4>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">
                            📍 ${recipe.strArea || 'Origine inconnue'} • 
                            🏷️ ${recipe.strCategory || 'Catégorie inconnue'}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    historyContainer.innerHTML = historyHTML;
}

// =============================================================================
// FONCTIONS D'EXPORT
// =============================================================================

// Export vers PDF (simulé)
function exportToPDF() {
    const stats = calculateStats();
    const categoriesData = analyzeCategoriesData();
    
    const content = `
        <html>
        <head>
            <title>GourmeTech - Rapport de Statistiques</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                h1 { color: #e74c3c; text-align: center; }
                .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 30px 0; }
                .stat-box { border: 2px solid #e74c3c; padding: 20px; text-align: center; border-radius: 10px; }
                .stat-number { font-size: 2rem; font-weight: bold; color: #e74c3c; }
                .categories { margin: 30px 0; }
                .category-item { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; }
                .recipes-list { margin: 30px 0; }
                .recipe-item { margin: 15px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
            </style>
        </head>
        <body>
            <h1>🍽️ GourmeTech - Rapport de Statistiques</h1>
            <p style="text-align: center; color: #666; margin-bottom: 40px;">
                Généré le ${new Date().toLocaleDateString('fr-FR')}
            </p>
            
            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-number">${stats.totalGenerated}</div>
                    <div>Recettes générées</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${stats.totalSaved}</div>
                    <div>Recettes sauvegardées</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${stats.countriesDiscovered}</div>
                    <div>Pays découverts</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${stats.categoriesTried}</div>
                    <div>Catégories explorées</div>
                </div>
            </div>
            
            <div class="categories">
                <h2>🏷️ Catégories les plus populaires</h2>
                ${categoriesData.map(([category, count]) => `
                    <div class="category-item">
                        <span>${category}</span>
                        <strong>${count} recettes</strong>
                    </div>
                `).join('')}
            </div>
            
            <div class="recipes-list">
                <h2>📚 Mes recettes sauvegardées</h2>
                ${savedRecipes.slice(0, 10).map(recipe => `
                    <div class="recipe-item">
                        <h3>${recipe.strMeal}</h3>
                        <p>📍 ${recipe.strArea} • 🏷️ ${recipe.strCategory}</p>
                        <p><small>Sauvegardée le ${new Date(recipe.savedAt).toLocaleDateString('fr-FR')}</small></p>
                    </div>
                `).join('')}
            </div>
            
            <footer style="margin-top: 50px; text-align: center; color: #666; font-size: 0.9rem;">
                Rapport généré par GourmeTech - Plateforme de découverte culinaire
            </footer>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
    
    showNotification('📄 Rapport PDF généré !');
}

// Export vers JSON
function exportToJSON() {
    const exportData = {
        exportDate: new Date().toISOString(),
        stats: calculateStats(),
        savedRecipes: savedRecipes,
        history: historyData,
        categories: analyzeCategoriesData(),
        countries: analyzeCountriesData()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `gourmeTech-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('💾 Données exportées en JSON !');
}

// Partage des statistiques
async function shareStats() {
    const stats = calculateStats();
    const shareText = `🍽️ Mes statistiques GourmeTech :\n\n` +
        `🎲 ${stats.totalGenerated} recettes générées\n` +
        `💾 ${stats.totalSaved} recettes sauvegardées\n` +
        `🌍 ${stats.countriesDiscovered} pays découverts\n` +
        `🏷️ ${stats.categoriesTried} catégories explorées\n\n` +
        `Découvrez GourmeTech pour explorer la cuisine du monde ! 🌟`;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Mes statistiques GourmeTech',
                text: shareText
            });
            showNotification('📱 Statistiques partagées !');
        } catch (error) {
            copyToClipboard(shareText);
        }
    } else {
        copyToClipboard(shareText);
    }
}

// Copie dans le presse-papier
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('📋 Copié dans le presse-papier !');
    } catch (error) {
        showNotification('❌ Impossible de copier', 'error');
    }
}

// Réinitialise toutes les données
function resetAllData() {
    const stats = calculateStats();
    
    if (stats.totalSaved === 0 && stats.totalGenerated === 0) {
        showNotification('ℹ️ Aucune donnée à supprimer');
        return;
    }
    
    const message = `Êtes-vous sûr de vouloir supprimer toutes vos données ?\n\n` +
        `Cela inclut :\n` +
        `• ${stats.totalSaved} recettes sauvegardées\n` +
        `• ${stats.totalGenerated} entrées d'historique\n` +
        `• Toutes vos statistiques\n\n` +
        `Cette action est irréversible !`;
    
    if (confirm(message)) {
        localStorage.removeItem('gourmeTech_discoveredRecipes');
        localStorage.removeItem('gourmeTech_history');
        
        savedRecipes = [];
        historyData = [];
        
        updateStatsDisplay();
        displayCategoriesChart();
        displayHistory();
        
        showNotification('🗑️ Toutes les données ont été supprimées');
    }
}

// =============================================================================
// FONCTIONS UTILITAIRES
// =============================================================================

// Affiche une notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `generer-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Simule l'historique pour les démonstrations
function generateSampleHistory() {
    if (savedRecipes.length === 0) {
        // Ajouter quelques recettes d'exemple pour la démo
        const sampleRecipes = [
            {
                idMeal: "demo1",
                strMeal: "Spaghetti Carbonara",
                strCategory: "Pasta",
                strArea: "Italian",
                strMealThumb: "https://via.placeholder.com/300x200/e74c3c/ffffff?text=Carbonara",
                savedAt: new Date(Date.now() - 86400000 * 2).toISOString() // Il y a 2 jours
            },
            {
                idMeal: "demo2",
                strMeal: "Beef Bourguignon",
                strCategory: "Beef",
                strArea: "French",
                strMealThumb: "https://via.placeholder.com/300x200/2ecc71/ffffff?text=Bourguignon",
                savedAt: new Date(Date.now() - 86400000 * 5).toISOString() // Il y a 5 jours
            },
            {
                idMeal: "demo3",
                strMeal: "Chicken Tikka Masala",
                strCategory: "Chicken",
                strArea: "Indian",
                strMealThumb: "https://via.placeholder.com/300x200/f39c12/ffffff?text=Tikka",
                savedAt: new Date(Date.now() - 86400000 * 7).toISOString() // Il y a 7 jours
            }
        ];
        
        // Ne pas sauvegarder automatiquement, juste pour la démo
        // localStorage.setItem('gourmeTech_discoveredRecipes', JSON.stringify(sampleRecipes));
        // savedRecipes = sampleRecipes;
    }
}

// =============================================================================
// INITIALISATION
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Page Historique et Statistiques initialisée');
    
    // Charger et afficher les données
    updateStatsDisplay();
    displayCategoriesChart();
    displayHistory();
    
    // Génerer des données d'exemple si nécessaire (pour la démo)
    if (savedRecipes.length === 0) {
        // Afficher un message d'encouragement
        showNotification('🚀 Visitez la page Découvrir pour commencer à générer des statistiques !');
    } else {
        showNotification('📊 Statistiques chargées avec succès !');
    }
    
    // Mettre à jour les données toutes les 30 secondes (au cas où l'utilisateur ouvre plusieurs onglets)
    setInterval(() => {
        const newSavedRecipes = JSON.parse(localStorage.getItem('gourmeTech_discoveredRecipes')) || [];
        const newHistoryData = JSON.parse(localStorage.getItem('gourmeTech_history')) || [];
        
        if (newSavedRecipes.length !== savedRecipes.length || newHistoryData.length !== historyData.length) {
            savedRecipes = newSavedRecipes;
            historyData = newHistoryData;
            
            updateStatsDisplay();
            displayCategoriesChart();
            displayHistory();
        }
    }, 30000);
});

// Rendre les fonctions globales
window.exportToPDF = exportToPDF;
window.exportToJSON = exportToJSON;
window.shareStats = shareStats;
window.resetAllData = resetAllData;