// SCRIPT : a-propos.js

/* ==========================
   VALIDATION DU FORMULAIRE
   ========================== */

// Récupération du formulaire grâce à son ID
let form = document.getElementById('form-contact');

// Récupération du paragraphe qui affichera la confirmation
let confirmation = document.getElementById('confirmation');

// j' ajoute un "écouteur" d'événement sur le formulaire pour détecter l'envoi
form.addEventListener('submit', function(event) {
    // Empêche le formulaire de recharger la page automatiquement
    event.preventDefault();

    // Récupération des valeurs des champs du formulaire
    // .trim() supprime les espaces inutiles au début et à la fin
    let nom = document.getElementById('nom').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();

    // -----------------------
    // Vérifications étape par étape
    // -----------------------

    // je Vérifie que le champ "Nom" n'est pas vide
    if (nom === '') {
        alert('Le champ Nom est obligatoire.');
        return; // Arrête le reste du code si le champ est vide
    }

    // je Vérifie que le champ "Email" n'est pas vide
    if (email === '') {
        alert('Le champ Email est obligatoire.');
        return;
    }

    // je Vérifie que l'email est bien écris :
    // L'email doit contenir au moins un "@" et un "."
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        alert('L\'email doit contenir au moins un "@" et un ".".');
        return;
    }

    // je Vérifier que le champ "Message" n'est pas vide
    if (message === '') {
        alert('Le champ Message est obligatoire.');
        return;
    }

    // apres toutes les vérifications j' affiche la confirmation
    confirmation.style.display = 'block';

    // je Réinitialise le formulaire pour effacer les champs
    form.reset();
});


/* ==========================
   ANIMATION FAQ (ACCORDÉON)
   ========================== */

// Récupération de tous les éléments <details> de la FAQ
let detailsElements = document.getElementsByTagName('details');

// je prends en compte tous les éléments <details>
for (let i = 0; i < detailsElements.length; i++) {

    // Ajout d'un écouteur de clic sur chaque détail
    detailsElements[i].addEventListener('click', function() {

        // Parcours de tous les détails pour fermer ceux qui ne sont pas cliqués
        for (let j = 0; j < detailsElements.length; j++) {

            // Si l'élément n'est pas celui cliqué, on le ferme
            if (detailsElements[j] !== this) {
                detailsElements[j].removeAttribute('open'); // Ferme le détail
            }
        }

        // L'élément cliqué s'ouvre automatiquement grâce à <details>
    });
}
