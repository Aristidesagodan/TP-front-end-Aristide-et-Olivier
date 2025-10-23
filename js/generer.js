/*
GourmeTech - Découvrir des recettes aléatoires
Auteur : Daran-Olivier
Description : Interface complète pour générer, sauvegarder et partager des recettes depuis TheMealDB
Version : 2.0 - Fonctionnalités avancées
*/

// =============================================================================
// VARIABLES GLOBALES
// =============================================================================

const elements = {
    generateRandomBtn: document.getElementById('generateRandomBtn'),
    chefSurpriseBtn: document.getElementById('chefSurpriseBtn'),
    categorySelect: document.getElementById('categorySelect'),
    loadingState: document.getElementById('loadingState'),
    recipeDisplay: document.getElementById('recipeDisplay'),
    recipeActions: document.getElementById('recipeActions'),
    generatedCount: document.getElementById('generatedCount'),
    savedCount: document.getElementById('savedCount')
};

let currentCategory = '';
let savedRecipes = JSON.parse(localStorage.getItem('gourmeTech_discoveredRecipes')) || [];
let historyData = JSON.parse(localStorage.getItem('gourmeTech_history')) || [];
let currentRecipe = null;

// =============================================================================
// FONCTIONS PRINCIPALES POUR LES BOUTONS
// =============================================================================

// Fonction principale pour générer une recette aléatoire
function generateRandomRecipe() {
    console.log('Génération d\'une recette aléatoire...');
    setLoading(true);
    
    let apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    
    // Si une catégorie est sélectionnée, utiliser l'endpoint de filtrage
    if (currentCategory) {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentCategory}`;
    }
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.meals) {
                let selectedMeal;
                if (currentCategory) {
                    // Si c'est un filtre par catégorie, sélectionner un repas au hasard
                    const randomIndex = Math.floor(Math.random() * data.meals.length);
                    const mealId = data.meals[randomIndex].idMeal;
                    // Récupérer les détails complets du repas
                    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                } else {
                    selectedMeal = data.meals[0];
                    displayRecipe(selectedMeal);
                    addToHistory(selectedMeal);
                    updateQuickStats();
                    setLoading(false);
                }
            } else {
                throw new Error('Aucune recette trouvée');
            }
        })
        .then(response => {
            if (response) {
                return response.json();
            }
        })
        .then(data => {
            if (data && data.meals) {
                displayRecipe(data.meals[0]);
                addToHistory(data.meals[0]);
                updateQuickStats();
            }
            setLoading(false);
        })
        .catch(error => {
            console.error('Erreur:', error);
            showNotification('❌ Erreur lors du chargement de la recette', 'error');
            setLoading(false);
        });
}

// Mode Chef Surprise - génération complètement aléatoire
function chefSurprise() {
    console.log('Mode Chef Surprise activé...');
    currentCategory = ''; // Reset de la catégorie
    elements.categorySelect.value = '';
    generateRandomRecipe();
}

// Met à jour le filtre de catégorie
function updateCategoryFilter() {
    currentCategory = elements.categorySelect.value;
    console.log('Catégorie sélectionnée:', currentCategory);
}

// =============================================================================
// UTILITAIRES
// =============================================================================

// Génère un ID unique pour les recettes
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

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

// Gère l'état de chargement
function setLoading(isLoading) {
    if (elements.loadingState) {
        elements.loadingState.style.display = isLoading ? 'block' : 'none';
    }
    
    if (elements.generateRandomBtn) {
        elements.generateRandomBtn.disabled = isLoading;
        elements.generateRandomBtn.innerHTML = isLoading ? '⏳ Recherche...' : '🎲 Recette Surprise';
    }
    
    if (elements.chefSurpriseBtn) {
        elements.chefSurpriseBtn.disabled = isLoading;
    }
}

// Extrait les ingrédients et mesures
function extractIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push({
                name: ingredient.trim(),
                measure: measure ? measure.trim() : ''
            });
        }
    }
    return ingredients;
}

// Ajoute une recette à l'historique
function addToHistory(meal) {
    historyData.push({
        id: generateId(),
        timestamp: new Date().toISOString(),
        meal: meal
    });
    localStorage.setItem('gourmeTech_history', JSON.stringify(historyData));
}

// Met à jour les statistiques rapides
function updateQuickStats() {
    if (elements.generatedCount) {
        elements.generatedCount.textContent = historyData.length;
    }
    if (elements.savedCount) {
        elements.savedCount.textContent = savedRecipes.length;
    }
}

// =============================================================================
// FONCTIONS D'AFFICHAGE
// =============================================================================

// Affiche une recette complète
function displayRecipe(meal) {
    currentRecipe = meal;
    const ingredients = extractIngredients(meal);
    const isSaved = savedRecipes.some(r => r.idMeal === meal.idMeal);
    
    const recipeHTML = `
        <div class="recipe-card">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-image">
            <div class="recipe-content">
                <h2 class="recipe-title">${meal.strMeal}</h2>
                <div class="recipe-meta">
                    <span>📍 ${meal.strArea || 'Origine inconnue'}</span>
                    <span>🏷️ ${meal.strCategory || 'Catégorie inconnue'}</span>
                    ${meal.strTags ? `<span>🏷️ ${meal.strTags}</span>` : ''}
                </div>
                
                <div class="recipe-ingredients">
                    <h3>🥘 Ingrédients</h3>
                    <ul class="ingredients-list">
                        ${ingredients.map(ing => 
                            `<li>${ing.measure} ${ing.name}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="recipe-instructions">
                    <h3>👨‍🍳 Instructions</h3>
                    <p>${meal.strInstructions}</p>
                </div>
                
                ${meal.strYoutube ? `
                    <div class="recipe-video">
                        <h3>🎥 Vidéo</h3>
                        <a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                            📺 Voir la vidéo
                        </a>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    elements.recipeDisplay.innerHTML = recipeHTML;
    
    // Afficher les actions
    if (elements.recipeActions) {
        elements.recipeActions.style.display = 'flex';
    }
    
    showNotification('🎉 Nouvelle recette découverte !');
}

// Sauvegarde la recette actuelle
function saveCurrentRecipe() {
    if (!currentRecipe) {
        showNotification('❌ Aucune recette à sauvegarder', 'error');
        return;
    }
    
    const isAlreadySaved = savedRecipes.some(r => r.idMeal === currentRecipe.idMeal);
    if (isAlreadySaved) {
        showNotification('ℹ️ Cette recette est déjà sauvegardée');
        return;
    }
    
    const recipeToSave = {
        ...currentRecipe,
        savedAt: new Date().toISOString()
    };
    
    savedRecipes.push(recipeToSave);
    localStorage.setItem('gourmeTech_discoveredRecipes', JSON.stringify(savedRecipes));
    
    updateQuickStats();
    updateFavoritesCount();
    showNotification('💾 Recette sauvegardée !');
}

// Partage la recette actuelle
async function shareCurrentRecipe() {
    if (!currentRecipe) {
        showNotification('❌ Aucune recette à partager', 'error');
        return;
    }
    
    const shareText = `🍽️ Découvrez cette délicieuse recette : ${currentRecipe.strMeal}\n\n` +
        `📍 Origine : ${currentRecipe.strArea}\n` +
        `🏷️ Catégorie : ${currentRecipe.strCategory}\n\n` +
        `Découvert sur GourmeTech !`;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: `Recette : ${currentRecipe.strMeal}`,
                text: shareText
            });
            showNotification('📤 Recette partagée !');
        } catch (error) {
            copyToClipboard(shareText);
        }
    } else {
        copyToClipboard(shareText);
    }
}

// Imprime la recette actuelle
function printCurrentRecipe() {
    if (!currentRecipe) {
        showNotification('❌ Aucune recette à imprimer', 'error');
        return;
    }
    
    const ingredients = extractIngredients(currentRecipe);
    const printContent = `
        <html>
        <head>
            <title>Recette : ${currentRecipe.strMeal}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                h1 { color: #e74c3c; text-align: center; }
                .meta { text-align: center; margin: 20px 0; color: #666; }
                .ingredients { margin: 30px 0; }
                .ingredients ul { list-style-type: disc; margin-left: 20px; }
                .instructions { margin: 30px 0; line-height: 1.6; }
                img { max-width: 300px; display: block; margin: 20px auto; }
            </style>
        </head>
        <body>
            <h1>${currentRecipe.strMeal}</h1>
            <img src="${currentRecipe.strMealThumb}" alt="${currentRecipe.strMeal}">
            <div class="meta">
                <p><strong>Origine :</strong> ${currentRecipe.strArea}</p>
                <p><strong>Catégorie :</strong> ${currentRecipe.strCategory}</p>
            </div>
            <div class="ingredients">
                <h2>Ingrédients :</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing.measure} ${ing.name}</li>`).join('')}
                </ul>
            </div>
            <div class="instructions">
                <h2>Instructions :</h2>
                <p>${currentRecipe.strInstructions}</p>
            </div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    
    showNotification('🖨️ Recette envoyée à l\'impression !');
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

// Met à jour le compteur de favoris dans la navigation
function updateFavoritesCount() {
    const favoritesCount = document.getElementById('favoritesCount');
    if (favoritesCount) {
        favoritesCount.textContent = savedRecipes.length;
    }
}
                </div>
            </div>
            
            <div class="recette-content">
                <div class="recette-actions">
                    <button class="btn btn-secondary" onclick="saveRecipe()">
                        ${isSaved ? '✅ Déjà sauvegardée' : '💾 Sauvegarder'}
                    </button>
                    <button class="btn btn-outline" onclick="shareRecipe()">
                        📤 Partager
                    </button>
                    <button class="btn btn-outline" onclick="printRecipe()">
                        🖨️ Imprimer
                    </button>
                    ${meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank" class="btn btn-outline">📺 Vidéo</a>` : ''}
                </div>
                
                <div class="ingredients-grid">
                    <div class="ingredients-section">
                        <h3>🛒 Ingrédients (${ingredients.length})</h3>
                        <ul class="ingredients-list">
                            ${ingredients.map(ing => `
                                <li>
                                    <span>${ing.name}</span>
                                    <strong>${ing.measure}</strong>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="instructions-section">
                    <h3>👨‍🍳 Instructions de préparation</h3>
                    <div class="instructions">${formatInstructions(meal.strInstructions)}</div>
                </div>
                
                ${meal.strSource ? `
                    <div style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 8px;">
                        <strong>🔗 Source :</strong> <a href="${meal.strSource}" target="_blank">Voir la recette originale</a>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    elements.recetteContainer.innerHTML = recetteHTML;
    elements.recetteContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Formate les instructions pour un meilleur affichage
function formatInstructions(instructions) {
    if (!instructions) return 'Aucune instruction disponible.';
    
    return instructions
        .replace(/\r?\n/g, '<br>')
        .replace(/(\d+\.)/g, '<strong>$1</strong>')
        .replace(/(STEP \d+)/gi, '<strong>$1</strong>');
}

// Affiche une erreur
function displayError(message) {
    elements.errorContainer.innerHTML = `
        <div class="error-state">
            <div style="font-size: 4rem;">😔</div>
            <h3>Oups ! Une erreur est survenue</h3>
            <p>${message}</p>
            <button class="btn btn-primary" onclick="genererRecette()">
                🔄 Réessayer
            </button>
        </div>
    `;
}

// =============================================================================
// FONCTIONS API
// =============================================================================

// Génère une recette aléatoire
async function genererRecette() {
    setLoading(true);
    elements.recetteContainer.innerHTML = '';
    elements.errorContainer.innerHTML = '';
    
    try {
        let url = 'https://www.themealdb.com/api/json/v1/1/random.php';
        
        // Si une catégorie est sélectionnée, on récupère par catégorie puis on prend au hasard
        if (currentCategory) {
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentCategory}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        
        const data = await response.json();
        
        if (!data.meals || data.meals.length === 0) {
            throw new Error('Aucune recette trouvée pour cette catégorie');
        }
        
        let selectedMeal = data.meals[0];
        
        // Si on a filtré par catégorie, prendre une recette au hasard et récupérer les détails
        if (currentCategory) {
            const randomIndex = Math.floor(Math.random() * data.meals.length);
            const selectedId = data.meals[randomIndex].idMeal;
            
            const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedId}`);
            const detailData = await detailResponse.json();
            selectedMeal = detailData.meals[0];
        }
        
        displayRecette(selectedMeal);
        showNotification('🎉 Nouvelle recette découverte !');
        
    } catch (error) {
        console.error('Erreur lors de la génération:', error);
        displayError(error.message || 'Impossible de récupérer la recette');
        showNotification('❌ Erreur lors du chargement', 'error');
    } finally {
        setLoading(false);
    }
}

// Génère 3 recettes d'un coup (surprise du chef)
async function surpriseDuChef() {
    setLoading(true);
    elements.recetteContainer.innerHTML = '<h3>🎊 Surprise du chef - 3 recettes arrivent !</h3>';
    elements.errorContainer.innerHTML = '';
    
    try {
        const promises = Array(3).fill().map(() => 
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                .then(r => r.json())
        );
        
        const results = await Promise.all(promises);
        const meals = results.map(r => r.meals[0]).filter(Boolean);
        
        if (meals.length === 0) {
            throw new Error('Aucune recette trouvée');
        }
        
        // Afficher les 3 recettes sous forme de cartes
        const surpriseHTML = `
            <div class="surprise-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
                ${meals.map(meal => `
                    <div class="surprise-card" style="border: 2px solid #e74c3c; border-radius: 12px; padding: 1rem; cursor: pointer;" onclick="displayRecette(${JSON.stringify(meal).replace(/"/g, '&quot;')})">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
                        <h4 style="margin: 0.5rem 0;">${meal.strMeal}</h4>
                        <p style="color: #666; font-size: 0.9rem;">📍 ${meal.strArea} • 🏷️ ${meal.strCategory}</p>
                        <p style="color: #e74c3c; font-weight: bold;">👆 Cliquer pour voir la recette</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        elements.recetteContainer.innerHTML = surpriseHTML;
        showNotification(`🎊 ${meals.length} recettes surprises générées !`);
        
    } catch (error) {
        console.error('Erreur surprise du chef:', error);
        displayError('Impossible de générer les recettes surprises');
        showNotification('❌ Erreur lors de la surprise', 'error');
    } finally {
        setLoading(false);
    }
}

// =============================================================================
// FONCTIONS DE SAUVEGARDE ET PARTAGE
// =============================================================================

// Sauvegarde une recette
function saveRecipe() {
    if (!currentRecipe) return;
    
    const exists = savedRecipes.find(r => r.idMeal === currentRecipe.idMeal);
    if (exists) {
        showNotification('ℹ️ Cette recette est déjà sauvegardée');
        return;
    }
    
    const recipeToSave = {
        ...currentRecipe,
        savedAt: new Date().toISOString(),
        id: generateId()
    };
    
    savedRecipes.push(recipeToSave);
    localStorage.setItem('gourmeTech_discoveredRecipes', JSON.stringify(savedRecipes));
    
    updateSavedDisplay();
    showNotification('💾 Recette sauvegardée !');
    
    // Mettre à jour le bouton
    const saveBtn = document.querySelector('[onclick="saveRecipe()"]');
    if (saveBtn) {
        saveBtn.innerHTML = '✅ Sauvegardée';
        saveBtn.disabled = true;
    }
}

// Partage une recette
async function shareRecipe() {
    if (!currentRecipe) return;
    
    const shareText = `🍽️ Découvrez cette délicieuse recette : ${currentRecipe.strMeal}\n\n📍 Origine : ${currentRecipe.strArea}\n🏷️ Catégorie : ${currentRecipe.strCategory}\n\nVia GourmeTech 🌟`;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: `Recette : ${currentRecipe.strMeal}`,
                text: shareText,
                url: window.location.href
            });
            showNotification('📤 Recette partagée !');
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

// Impression de la recette
function printRecipe() {
    if (!currentRecipe) return;
    
    const ingredients = extractIngredients(currentRecipe);
    const printContent = `
        <html>
        <head>
            <title>Recette : ${currentRecipe.strMeal}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #e74c3c; }
                .meta { color: #666; margin-bottom: 20px; }
                .ingredients { background: #f8f9fa; padding: 15px; border-radius: 8px; }
                .instructions { margin-top: 20px; line-height: 1.6; }
                img { max-width: 300px; float: right; margin-left: 20px; border-radius: 8px; }
            </style>
        </head>
        <body>
            <img src="${currentRecipe.strMealThumb}" alt="${currentRecipe.strMeal}">
            <h1>${currentRecipe.strMeal}</h1>
            <div class="meta">
                <strong>Origine :</strong> ${currentRecipe.strArea}<br>
                <strong>Catégorie :</strong> ${currentRecipe.strCategory}
            </div>
            
            <div class="ingredients">
                <h3>Ingrédients :</h3>
                <ul>
                    ${ingredients.map(ing => `<li>${ing.name} - ${ing.measure}</li>`).join('')}
                </ul>
            </div>
            
            <div class="instructions">
                <h3>Instructions :</h3>
                <p>${currentRecipe.strInstructions.replace(/\r?\n/g, '<br>')}</p>
            </div>
            
            <footer style="margin-top: 30px; color: #666; font-size: 0.9rem;">
                Imprimé depuis GourmeTech - ${new Date().toLocaleDateString()}
            </footer>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    
    showNotification('🖨️ Recette envoyée à l\'impression !');
}

// =============================================================================
// GESTION DES RECETTES SAUVEGARDÉES
// =============================================================================

// Met à jour l'affichage des recettes sauvegardées
function updateSavedDisplay() {
    elements.savedCount.textContent = savedRecipes.length;
    
    if (savedRecipes.length === 0) {
        elements.savedSection.style.display = 'none';
        return;
    }
    
    elements.savedSection.style.display = 'block';
    
    elements.savedGrid.innerHTML = savedRecipes.map(recipe => `
        <div class="saved-recipe">
            <button class="remove-saved" onclick="removeSavedRecipe('${recipe.id}')" title="Supprimer">❌</button>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" onclick="displayRecette(${JSON.stringify(recipe).replace(/"/g, '&quot;')})">
            <h4>${recipe.strMeal}</h4>
            <p>${recipe.strArea} • ${recipe.strCategory}</p>
            <small>Sauvegardée le ${new Date(recipe.savedAt).toLocaleDateString()}</small>
        </div>
    `).join('');
}

// Supprime une recette sauvegardée
function removeSavedRecipe(id) {
    savedRecipes = savedRecipes.filter(r => r.id !== id);
    localStorage.setItem('gourmeTech_discoveredRecipes', JSON.stringify(savedRecipes));
    updateSavedDisplay();
    showNotification('🗑️ Recette supprimée');
}

// Efface toutes les recettes sauvegardées
function clearAllSaved() {
    if (savedRecipes.length === 0) {
        showNotification('ℹ️ Aucune recette à effacer');
        return;
    }
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer les ${savedRecipes.length} recettes sauvegardées ?`)) {
        savedRecipes = [];
        localStorage.removeItem('gourmeTech_discoveredRecipes');
        updateSavedDisplay();
        elements.recetteContainer.innerHTML = '';
        showNotification('🗑️ Toutes les recettes ont été effacées');
    }
}

// =============================================================================
// GESTION DES FILTRES
// =============================================================================

// Active un filtre de catégorie
function setCategory(category) {
    currentCategory = category;
    
    // Mettre à jour l'apparence des boutons
    elements.categoryFilters.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    const categoryName = category || 'toutes les catégories';
    showNotification(`🏷️ Filtre : ${categoryName}`);
}

// =============================================================================
// INITIALISATION
// =============================================================================

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 GourmeTech Découverte initialisé');
    
    // Boutons principaux
    elements.genererBtn?.addEventListener('click', genererRecette);
    elements.surpriseBtn?.addEventListener('click', surpriseDuChef);
    elements.clearAllBtn?.addEventListener('click', clearAllSaved);
    
    // Filtres de catégorie
    elements.categoryFilters.forEach(btn => {
        btn.addEventListener('click', () => setCategory(btn.dataset.category));
    });
    
    // Raccourcis clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            genererRecette();
        }
        if (e.key === 's' && e.ctrlKey) {
            e.preventDefault();
            if (currentRecipe) saveRecipe();
        }
    });
    
    // Charger les recettes sauvegardées
    updateSavedDisplay();
    
    // Charger les catégories pour le nouveau sélecteur
    loadCategories();
    
    // Générer une première recette automatiquement
    setTimeout(() => {
        genererRecette();
    }, 1000);
    
    showNotification('🎉 Bienvenue dans la section Découverte !');
});

// Charge les catégories disponibles pour le nouveau sélecteur
async function loadCategories() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        
        if (data.categories && elements.categorySelect) {
            data.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.strCategory;
                option.textContent = category.strCategory;
                elements.categorySelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
    }
}

// Rendre les fonctions globales pour les onclick
window.saveRecipe = saveRecipe;
window.shareRecipe = shareRecipe;
window.printRecipe = printRecipe;
window.displayRecette = displayRecette;
window.removeSavedRecipe = removeSavedRecipe;

// Nouvelles fonctions globales pour la nouvelle interface
window.generateRandomRecipe = generateRandomRecipe;
window.chefSurprise = chefSurprise;
window.updateCategoryFilter = updateCategoryFilter;
window.saveCurrentRecipe = saveCurrentRecipe;
window.shareCurrentRecipe = shareCurrentRecipe;
window.printCurrentRecipe = printCurrentRecipe;