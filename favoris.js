
// -------------------------------
//
// Gérer la liste des recettes favorites grâce à localStorage
// -------------------------------

//  j'attends que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", function () {

  // je récupère les éléments du DOM
  let favorisList = document.getElementById("favoris-list");
  let message = document.getElementById("message");

  //  je Charge les favoris depuis localStorage
  // Si rien n'est encore stocké, je crée un tableau vide
  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  // Fonction pour afficher les favoris à l’écran
  function afficherFavoris() {
    // je vide la liste actuelle
    favorisList.innerHTML = "";

    // Si aucun favori n’est présent, on affiche le message
    if (favoris.length === 0) {
      message.style.display = "block";
      return;
    }

    // Sinon, on cache le message
    message.style.display = "none";

    // Pour chaque favori du tableau, on crée une carte
    for (let i = 0; i < favoris.length; i++) {
      let favori = favoris[i];

      // Création de la carte principale
      let card = document.createElement("div");
      card.className = "favori-card";

      // Image
      let image = document.createElement("img");
      image.src = favori.image;
      image.alt = favori.nom;

      // Informations
      let infoDiv = document.createElement("div");
      infoDiv.className = "info";

      // Titre
      let titre = document.createElement("h3");
      titre.textContent = favori.nom;

      // Catégorie
      let categorie = document.createElement("p");
      categorie.textContent = favori.categorie;

      // Bouton de suppression
      let boutonSupprimer = document.createElement("button");
      boutonSupprimer.className = "btn-supprimer";
      boutonSupprimer.textContent = "🗑️ Supprimer";

      //  j'ajoute un écouteur sur le bouton pour supprimer le favori
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

  // Fonction pour supprimer un favori
  function supprimerFavori(event) {
    // je récupère le nom du favori à partir du titre
    let card = event.target.closest(".favori-card");
    let nom = card.querySelector("h3").textContent;

    // On filtre le tableau pour retirer ce favori
    let nouveauxFavoris = [];
    for (let i = 0; i < favoris.length; i++) {
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

  //  Afficher la liste des favoris au chargement
  afficherFavoris();

});

