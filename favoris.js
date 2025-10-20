
// -------------------------------
// 🧠 Objectif du script :
// Gérer la liste des recettes favorites grâce à localStorage
// -------------------------------

// Étape 1️⃣ : Attendre que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", function () {

  // Étape 2️⃣ : Récupérer les éléments du DOM
  var favorisList = document.getElementById("favoris-list");
  var message = document.getElementById("message");

  // Étape 3️⃣ : Charger les favoris depuis localStorage
  // Si rien n'est encore stocké, on crée un tableau vide
  var favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  // Étape 4️⃣ : Fonction pour afficher les favoris à l’écran
  function afficherFavoris() {
    // On vide la liste actuelle
    favorisList.innerHTML = "";

    // Si aucun favori n’est présent, on affiche le message
    if (favoris.length === 0) {
      message.style.display = "block";
      return;
    }

    // Sinon, on cache le message
    message.style.display = "none";

    // Pour chaque favori du tableau, on crée une carte
    for (var i = 0; i < favoris.length; i++) {
      var favori = favoris[i];

      // Création de la carte principale
      var card = document.createElement("div");
      card.className = "favori-card";

      // Image
      var image = document.createElement("img");
      image.src = favori.image;
      image.alt = favori.nom;

      // Informations
      var infoDiv = document.createElement("div");
      infoDiv.className = "info";

      // Titre
      var titre = document.createElement("h3");
      titre.textContent = favori.nom;

      // Catégorie
      var categorie = document.createElement("p");
      categorie.textContent = favori.categorie;

      // Bouton de suppression
      var boutonSupprimer = document.createElement("button");
      boutonSupprimer.className = "btn-supprimer";
      boutonSupprimer.textContent = "🗑️ Supprimer";

      // On ajoute un écouteur sur le bouton pour supprimer le favori
      boutonSupprimer.addEventListener("click", function (event) {
        supprimerFavori(event);
      });

      // Assemblage de la carte
      infoDiv.appendChild(titre);
      infoDiv.appendChild(categorie);
      infoDiv.appendChild(boutonSupprimer);
      card.appendChild(image);
      card.appendChild(infoDiv);

      // Ajout de la carte dans la liste
      favorisList.appendChild(card);
    }
  }

  // Étape 5️⃣ : Fonction pour supprimer un favori
  function supprimerFavori(event) {
    // On récupère le nom du favori à partir du titre
    var card = event.target.closest(".favori-card");
    var nom = card.querySelector("h3").textContent;

    // On filtre le tableau pour retirer ce favori
    var nouveauxFavoris = [];
    for (var i = 0; i < favoris.length; i++) {
      if (favoris[i].nom !== nom) {
        nouveauxFavoris.push(favoris[i]);
      }
    }

    // On remplace l'ancien tableau par le nouveau
    favoris = nouveauxFavoris;

    // On met à jour le localStorage
    localStorage.setItem("favoris", JSON.stringify(favoris));

    // On réaffiche la liste mise à jour
    afficherFavoris();
  }

  // Étape 6️⃣ : Afficher la liste des favoris au chargement
  afficherFavoris();

});

