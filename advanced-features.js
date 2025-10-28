// Fonctionnalités avancées pour GourmeTech
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fonctionnalités avancées GourmeTech chargées');
    
    // Initialiser les fonctionnalités avancées
    initializeAdvancedFeatures();
    initializeUserPreferences();
});

// Fonctionnalités avancées
function initializeAdvancedFeatures() {
    // Recherche vocale (si supportée)
    initializeVoiceSearch();
    
    // Mode impression optimisé
    initializePrintMode();
    
    // Minuteur intégré
    initializeTimer();
}

// Recherche vocale
function initializeVoiceSearch() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'fr-FR';
        recognition.continuous = false;
        recognition.interimResults = false;

        // Ajouter un bouton de recherche vocale
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            const voiceButton = document.createElement('button');
            voiceButton.className = 'voice-search-btn';
            voiceButton.innerHTML = '🎤';
            voiceButton.setAttribute('aria-label', 'Recherche vocale');
            voiceButton.title = 'Recherche vocale';
            
            voiceButton.addEventListener('click', function() {
                recognition.start();
                this.style.background = '#ff6b35';
                this.style.color = 'white';
            });

            recognition.addEventListener('result', function(event) {
                const transcript = event.results[0][0].transcript;
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.value = transcript;
                    searchRecipes(transcript);
                }
                voiceButton.style.background = '';
                voiceButton.style.color = '';
            });

            recognition.addEventListener('error', function() {
                voiceButton.style.background = '';
                voiceButton.style.color = '';
                showNotification('Erreur de reconnaissance vocale', 'info');
            });

            searchContainer.appendChild(voiceButton);
        }
    }
}

// Mode impression optimisé
function initializePrintMode() {
    // Ajouter un bouton d'impression uniquement sur les pages de recettes individuelles
    // Vérifier qu'on n'est pas sur la page d'accueil
    const isIndexPage = window.location.pathname.includes('index.html') || 
                       window.location.pathname === '/' || 
                       window.location.pathname.endsWith('/');
    
    if (isIndexPage) {
        return; // Ne pas ajouter de bouton d'impression sur la page d'accueil
    }
    
    // Chercher le conteneur principal de recette (pas les cartes)
    const recipeContent = document.querySelector('.recipe-container, .recipe-main, .recipe-details');
    if (recipeContent) {
        const printButton = document.createElement('button');
        printButton.className = 'print-recipe-btn';
        printButton.innerHTML = '🖨️ Imprimer la recette';
        printButton.style.cssText = `
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            margin: 20px 0;
            font-size: 1rem;
        `;
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        recipeContent.appendChild(printButton);
    }
}

// Minuteur intégré
function initializeTimer() {
    let timerInterval;
    let timeRemaining = 0;
    
    // Ajouter des boutons de minuteur à côté des temps de cuisson
    const timeElements = document.querySelectorAll('time');
    timeElements.forEach(timeElement => {
        const timeText = timeElement.textContent;
        const minutes = timeText.match(/(\d+)\s*min/);
        
        if (minutes) {
            const timerButton = document.createElement('button');
            timerButton.className = 'timer-btn';
            timerButton.innerHTML = '⏰';
            timerButton.title = `Démarrer un minuteur de ${minutes[1]} minutes`;
            timerButton.style.cssText = `
                background: #ff6b35;
                color: white;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                cursor: pointer;
                margin-left: 8px;
                font-size: 0.8rem;
            `;
            
            timerButton.addEventListener('click', function() {
                startTimer(parseInt(minutes[1]));
            });
            
            timeElement.parentNode.appendChild(timerButton);
        }
    });
    
    function startTimer(minutes) {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        timeRemaining = minutes * 60; // Convertir en secondes
        
        // Créer l'interface du minuteur
        const timerDisplay = document.createElement('div');
        timerDisplay.id = 'timer-display';
        timerDisplay.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: #ff6b35;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            font-weight: bold;
            font-size: 1.2rem;
        `;
        
        document.body.appendChild(timerDisplay);
        
        timerInterval = setInterval(function() {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            
            timerDisplay.innerHTML = `
                ⏰ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
                <button onclick="stopTimer()" style="background: none; border: none; color: white; cursor: pointer; margin-left: 10px;">✖</button>
            `;
            
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                timerDisplay.innerHTML = '🔔 Temps écoulé !';
                timerDisplay.style.background = '#e74c3c';
                
                // Notification sonore (si possible)
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('GourmeTech - Minuteur', {
                        body: 'Le temps de cuisson est écoulé !',
                        icon: '/favicon.ico'
                    });
                }
                
                setTimeout(() => {
                    document.body.removeChild(timerDisplay);
                }, 5000);
                
                return;
            }
            
            timeRemaining--;
        }, 1000);
    }
    
    window.stopTimer = function() {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        const timerDisplay = document.getElementById('timer-display');
        if (timerDisplay) {
            document.body.removeChild(timerDisplay);
        }
    };
}

// Préférences utilisateur
function initializeUserPreferences() {
    // Sauvegarder les préférences de l'utilisateur
    const preferences = JSON.parse(localStorage.getItem('gourmetech-preferences') || '{}');
    
    // Appliquer les préférences sauvegardées
    if (preferences.fontSize) {
        document.body.style.fontSize = preferences.fontSize;
    }
    
    // Demander la permission pour les notifications
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Fonction utilitaire pour afficher les notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'info' ? '#3498db' : '#e74c3c'};
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
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export des fonctions pour utilisation externe
window.GourmeTechAdvanced = {
    showNotification,
    stopTimer
};