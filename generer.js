/* ============================================================
   JS - GourmeTech / generer.js
   Objectif : Générer dynamiquement une recette aléatoire via l’API TheMealDB
   ============================================================ */

/* === Sélecteurs DOM === */
let generateBtn = document.getElementById('generateBtn');
let saveBtn = document.getElementById('saveBtn');
let shareBtn = document.getElementById('shareBtn');
let pdfBtn = document.getElementById('pdfBtn');
let recipeContainer = document.getElementById('recipeContainer');
let loader = document.getElementById('loader');
let statusEl = document.getElementById('status');
let favsListEl = document.getElementById('favsList');
let clearFavsBtn = document.getElementById('clearFavsBtn');

/* === Variables globales === */
let CURRENT_RECIPE = null;
let API_RANDOM_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

/* ============================================================
   FONCTIONS UTILITAIRES
   ============================================================ */

/* --- Affiche ou masque le loader --- */
function setLoading(isLoading) {
  if (isLoading) {
    loader.hidden = false;
    loader.setAttribute('aria-hidden', 'false');
    statusEl.textContent = 'Chargement de la recette...';
    generateBtn.disabled = true;
    saveBtn.disabled = true;
    shareBtn.disabled = true;
    pdfBtn.disabled = true;
  } else {
    loader.hidden = true;
    loader.setAttribute('aria-hidden', 'true');
    generateBtn.disabled = false;
    shareBtn.disabled = false ;
    pdfBtn.disabled = false;
  }
}

/* --- Affiche une erreur --- */
function showError(message) {
  statusEl.textContent = message;
  statusEl.style.color = '#b00020';
}

/* --- Vide le conteneur de recette --- */
function clearRecipeContainer() {
  while (recipeContainer.firstChild) {
    recipeContainer.removeChild(recipeContainer.firstChild);
  }
}

/* --- Extrait les ingrédients et mesures dynamiquement --- */
function extractIngredients(meal) {
  let list = [];
  let i;
  for (i = 1; i <= 20; i = i + 1) {
    let ingKey = 'strIngredient' + i;
    let measureKey = 'strMeasure' + i;
    if (meal[ingKey] && meal[ingKey].trim() !== '') {
      list.push({
        ingredient: meal[ingKey].trim(),
        measure: meal[measureKey] ? meal[measureKey].trim() : ''
      });
    }
  }
  return list;
}

/* ============================================================
   REQUÊTE FETCH VERS L’API THEMEALDB
   ============================================================ */
function fetchRandomRecipe() {
  setLoading(true);
  clearRecipeContainer();

  // --- Requête vers l'API ---
  fetch(API_RANDOM_URL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Erreur HTTP : ' + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      if (!data || !data.meals || data.meals.length === 0) {
        throw new Error('Aucune recette reçue');
      }
      var meal = data.meals[0];
      displayRecipe(meal);
      statusEl.textContent = 'Recette chargée avec succès !';
      statusEl.style.color = '#0a7f3a';
    })
    .catch(function (error) {
      showError('Erreur lors du chargement : ' + error.message);
    })
    .finally(function () {
      setLoading(false);
    });
}

/* ============================================================
   AFFICHAGE DE LA RECETTE DANS LE DOM
   ============================================================ */
function displayRecipe(meal) {
  CURRENT_RECIPE = meal;
  saveBtn.disabled = false;
  shareBtn.disabled = false;
  pdfBtn.disabled = false;


  // Image
  if (meal.strMealThumb) {
    let img = document.createElement('img');
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal + ' — photo du plat';
    img.className = 'recipe-image';
    recipeContainer.appendChild(img);
  }

  // Titre + catégorie + origine
  let title = document.createElement('h3');
  title.className = 'recipe-title';
  title.textContent = meal.strMeal;
  recipeContainer.appendChild(title);

  let meta = document.createElement('p');
  meta.className = 'recipe-meta';
  let textMeta = '';
  if (meal.strCategory) {
    textMeta = 'Catégorie : ' + meal.strCategory;
  }
  if (meal.strArea) {
    textMeta = textMeta + ' | Origine : ' + meal.strArea;
  }
  meta.textContent = textMeta;
  recipeContainer.appendChild(meta);

  // Ingrédients
  let ingredientsBlock = document.createElement('section');
  ingredientsBlock.className = 'ingredients';

  let ingTitle = document.createElement('h4');
  ingTitle.textContent = 'Ingrédients';
  ingredientsBlock.appendChild(ingTitle);

  let ul = document.createElement('ul');
  let ingredients = extractIngredients(meal);
  let i;
  for (i = 0; i < ingredients.length; i = i + 1) {
    let li = document.createElement('li');
    let measure = ingredients[i].measure;
    let ingredient = ingredients[i].ingredient;
    if (measure !== '') {
      li.textContent = measure + ' ' + ingredient;
    } else {
      li.textContent = ingredient;
    }
    ul.appendChild(li);
  }
  ingredientsBlock.appendChild(ul);
  recipeContainer.appendChild(ingredientsBlock);

  // Instructions
  let instructionsBlock = document.createElement('section');
  instructionsBlock.className = 'instructions';

  let instTitle = document.createElement('h4');
  instTitle.textContent = 'Préparation';
  instructionsBlock.appendChild(instTitle);

  let inst = document.createElement('p');
  inst.textContent = meal.strInstructions || 'Instructions non disponibles.';
  instructionsBlock.appendChild(inst);

  recipeContainer.appendChild(instructionsBlock);

  // Lien vers la vidéo YouTube si disponible
  if (meal.strYoutube) {
    let yt = document.createElement('a');
    yt.href = meal.strYoutube;
    yt.target = '_blank';
    yt.rel = 'noopener noreferrer';
    yt.textContent = 'Regarder la vidéo sur YouTube';
    yt.className = 'btn btn-outline';
    recipeContainer.appendChild(yt);
  }
}

/* ============================================================
   FAVORIS (LocalStorage)
   ============================================================ */
function saveFavorite(meal) {
  try {
    let existing = localStorage.getItem('gourmetech_favorites');
    let list = existing ? JSON.parse(existing) : [];

    let found = false;
    let i;
    for (i = 0; i < list.length; i = i + 1) {
      if (list[i].idMeal === meal.idMeal) {
        found = true;
        break;
      }
    }

    if (!found) {
      list.push(meal);
      localStorage.setItem('gourmetech_favorites', JSON.stringify(list));
      statusEl.textContent = 'Recette ajoutée aux favoris ✅';
      statusEl.style.color = '#0a7f3a';
      updateFavsUI();
    } else {
      statusEl.textContent = 'Cette recette est déjà dans les favoris.';
      statusEl.style.color = '#555';
    }
  } catch (err) {
    showError('Erreur de sauvegarde : ' + err.message);
  }
}

function removeFavoriteById(id) {
  let data = localStorage.getItem('gourmetech_favorites');
  if (!data) return;

  try {
    let list = JSON.parse(data);
    let newList = [];
    let i;
    for (i = 0; i < list.length; i = i + 1) {
      if (list[i].idMeal !== id) {
        newList.push(list[i]);
      }
    }
    localStorage.setItem('gourmetech_favorites', JSON.stringify(newList));
    updateFavsUI();
  } catch (err) {
    showError('Erreur de suppression : ' + err.message);
  }
}

function clearFavorites() {
  localStorage.removeItem('gourmetech_favorites');
  updateFavsUI();
  statusEl.textContent = 'Tous les favoris ont été supprimés.';
  statusEl.style.color = '#333';
}

function updateFavsUI() {
  while (favsListEl.firstChild) {
    favsListEl.removeChild(favsListEl.firstChild);
  }

  let data = localStorage.getItem('gourmetech_favorites');
  if (!data) return;

  try {
    let list = JSON.parse(data);
    let i;
    for (i = 0; i < list.length; i = i + 1) {
      let meal = list[i];
      let li = document.createElement('li');
      li.className = 'fav-item';

      let span = document.createElement('span');
      span.textContent = meal.strMeal;
      li.appendChild(span);

      let viewBtn = document.createElement('button');
      viewBtn.className = 'btn';
      viewBtn.textContent = 'Voir';
      viewBtn.addEventListener('click', function (e) {
        let name = e.target.parentNode.firstChild.textContent;
        let j;
        for (j = 0; j < list.length; j = j + 1) {
          if (list[j].strMeal === name) {
            displayRecipe(list[j]);
            break;
          }
        }
      });

      let delBtn = document.createElement('button');
      delBtn.className = 'btn btn-outline';
      delBtn.textContent = 'Suppr';
      (function (id) {
        delBtn.addEventListener('click', function () {
          removeFavoriteById(id);
        });
      })(meal.idMeal);

      li.appendChild(viewBtn);
      li.appendChild(delBtn);
      favsListEl.appendChild(li);
    }
  } catch (err) {
    showError('Erreur lecture favoris : ' + err.message);
  }
}

/* --- Partage --- */
function shareRecipe() {
  if (!CURRENT_RECIPE) return showError("Aucune recette à partager.");
  let shareData = {
    title: CURRENT_RECIPE.strMeal,
    text: "Découvrez cette recette sur GourmeTech ! 🍳",
    url: window.location.href
  };
  if (navigator.share) {
    navigator.share(shareData)
      .then(function () { statusEl.textContent = "Recette partagée 🎉"; })
      .catch(function () { statusEl.textContent = "Partage annulé."; });
  } else {
    let temp = document.createElement("input");
    temp.value = shareData.url;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    statusEl.textContent = "Lien copié dans le presse-papiers 📋";
  }
}

/* --- Export PDF --- */
function exportRecipePDF() {
  if (!CURRENT_RECIPE) return showError("Aucune recette à exporter.");
  window.print(); // ouvre le dialogue PDF natif du navigateur
}

/* ============================================================
   ÉVÉNEMENTS
   ============================================================ */

generateBtn.addEventListener('click', function () {
  statusEl.textContent = '';
  fetchRandomRecipe();
});

saveBtn.addEventListener('click', function () {
  if (CURRENT_RECIPE) {
    saveFavorite(CURRENT_RECIPE);
  } else {
    showError('Aucune recette à sauvegarder.');
  }
});

clearFavsBtn.addEventListener('click', function () {
  let confirmDel = window.confirm('Voulez-vous supprimer tous les favoris ?');
  if (confirmDel) {
    clearFavorites();
  }
});

shareBtn.addEventListener("click", function () { shareRecipe(); });
pdfBtn.addEventListener("click", function () { exportRecipePDF(); });

/* ============================================================
   INITIALISATION
   ============================================================ */
function init() {
  updateFavsUI();
}
init();
