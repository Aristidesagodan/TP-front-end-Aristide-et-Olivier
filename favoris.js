document.addEventListener("DOMContentLoaded", function () {
  let favorisList = document.getElementById("favoris-list");
  let message = document.getElementById("message");

  // Récupération des favoris dans le localStorage
  let favoris = JSON.parse(localStorage.getItem("favoris"));

  // Si aucun favori n'existe ou si la liste est vide
  if (!favoris || favoris.length === 0) {
    message.style.display = "block";
    favorisList.style.display = "none";
    return;
  }

  // Sinon, je masque le message et j'affiche les favoris
  message.style.display = "none";
  favorisList.style.display = "grid";
  favorisList.innerHTML = "";

  // je parcours chaque nom de recette
  for (let i = 0; i < favoris.length; i++) {
    let nom = favoris[i];

    // Création de la carte du favori
    let card = document.createElement("div");
    card.classList.add("favori-card");

    //  je suppose que l'image a le même nom que la recette en minuscules
    // et se trouve dans le dossier "assets"
    let imageNom = nom.toLowerCase().replaceAll(" ", "-") + ".jpg";
    let imageSrc = "assets/" + imageNom;

    // Structure HTML de la carte
    card.innerHTML =
      '<img src="' + imageSrc + '" alt="' + nom + '">' +
      '<div class="info">' +
      "<h3>" + nom + "</h3>" +
      '<button class="btn-supprimer" data-nom="' + nom + '">🗑️ Supprimer</button>' +
      "</div>";

    favorisList.appendChild(card);
  }

  // Gestion des boutons Supprimer
  let boutons = document.getElementsByClassName("btn-supprimer");
  for (let j = 0; j < boutons.length; j++) {
    boutons[j].addEventListener("click", function (event) {
      let nom = event.target.getAttribute("data-nom");

      // Retirer l'élément du tableau
      let nouveauxFavoris = [];
      for (let k = 0; k < favoris.length; k++) {
        if (favoris[k] !== nom) {
          nouveauxFavoris.push(favoris[k]);
        }
      }

      // Mettre à jour le localStorage
      localStorage.setItem("favoris", JSON.stringify(nouveauxFavoris));

      // Supprimer la carte du DOM
      let carte = event.target.closest(".favori-card");
      carte.parentNode.removeChild(carte);

      // Si plus aucun favori, j'affiche le message
      if (nouveauxFavoris.length === 0) {
        message.style.display = "block";
        favorisList.style.display = "none";
      }
    });
  }
});
