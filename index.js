import { recipes } from "/data/recipes.js";
import { createCards } from "./templates/cards.js";
// liste des variables a utiliser dans le projet
let ingredientsList = [];
let newIngredientsList = [];
let appareilsList = [];
let newAppareilsList = [];
let ustensilsList = [];
let newUstensilsList = [];
const customOptionIngredient = document.querySelector(
  ".custom-option-ingredients"
);
const customOptionAppareils = document.querySelector(
  ".custom-option-appareils"
);
const customOptionUstensils = document.querySelector(
  ".custom-option-ustensils"
);
const validTagsContainer = document.querySelector(".valid-tags-container");
const cardsContainer = document.querySelector(".cards-container");
const mainSearchBar = document.querySelector(".search_bar_input");
let foundFinal = [];

//  Tag Population --------------------------
// Boucle pour assigner tout les ingredients au array et supprimer les doublon qui ont le meme index
recipes.map((element) => {
  ingredientsList.push(
    element.ingredients.map((ingredient) => ingredient.ingredient)
  );
  ingredientsList = ingredientsList.flat();
  ingredientsList = ingredientsList.filter(
    (x, i) => ingredientsList.indexOf(x) === i
  );
  appareilsList.push(element.appliance);
  appareilsList = appareilsList.filter(
    (x, i) => appareilsList.indexOf(x) === i
  );
  ustensilsList.push(element.ustensils.map((ustensil) => ustensil));
  ustensilsList = ustensilsList.flat();
  ustensilsList = ustensilsList.filter(
    (x, i) => ustensilsList.indexOf(x) === i
  );
});
function tagPopulation(list, location) {
  list.forEach((item) => {
    const customItem = document.createElement("span");
    customItem.classList.add("custom-option");
    customItem.setAttribute("data-value", item);
    customItem.innerHTML = item;
    location.appendChild(customItem);
  });
}
tagPopulation(ingredientsList, customOptionIngredient);
tagPopulation(appareilsList, customOptionAppareils);
tagPopulation(ustensilsList, customOptionUstensils);
// Tags Logic -------------------
// Ouvrir la tag container et inserer l'input de recherche
for (const selectWrapper of document.querySelectorAll(".select-wrapper")) {
  selectWrapper.addEventListener("click", function (e) {
    if (e.target !== this) {
      this.querySelector(".select").classList.add("open");
      this.querySelector(".tag-list-name").classList.add("span-hidden");
      this.querySelector(".search-tag-list-form").classList.remove(
        "form-hidden"
      );
    }
  });
}
// Creation du validTag au dessus du champs de recherche au click de l'element
for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener("click", function () {
    const validTag = document.createElement("div");
    validTag.classList.add("valid-tag");
    const tagClose = document.createElement("i");
    tagClose.classList.add("tag-close", "fa-solid", "fa-x");
    const tagName = document.createElement("span");
    tagName.classList.add("tag-name");
    tagName.innerHTML = option.innerHTML;
    validTag.append(tagName, tagClose);
    validTagsContainer.appendChild(validTag);
    option.classList.add("disabled");
    //Suppression du validTag au click de la croix
    tagClose.addEventListener("click", () => {
      option.classList.remove("disabled");
      validTagsContainer.removeChild(validTag);
    });
  });
}
// Ferme la tagList et la boite de recherche si on clique autre part
window.addEventListener("click", function (e) {
  for (const select of document.querySelectorAll(".select")) {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  }
});
// Creation des cards des recettes et leur contenu
createCards(recipes);
// Recherche de la barre principale
mainSearchBar.addEventListener("change", (event) => {
  const mainSearchContent = event.target.value;
  if (mainSearchContent.length >= 3) {
    // Recherche par titre
    const foundName = recipes.filter((recipe) =>
      recipe.name.includes(mainSearchContent)
    );
    // Recherche par ingredient
    let foundIngredient = [];
    for (const recipe of recipes) {
      for (const ingredient of recipe.ingredients) {
        if (ingredient.ingredient.includes(mainSearchContent)) {
          foundIngredient.push(recipe);
        }
      }
    }
    // Recherche par description
    const foundDescription = recipes.filter((recipe) =>
      recipe.description.includes(mainSearchContent)
    );
    // Actualisation de la liste des tags
    customOptionIngredient.innerHTML = "";
    customOptionAppareils.innerHTML = "";
    customOptionUstensils.innerHTML = "";
    foundFinal = [...foundName, ...foundIngredient, ...foundDescription];
    foundFinal.map((element) => {
      newIngredientsList.push(
        element.ingredients.map((ingredient) => ingredient.ingredient)
      );
      newIngredientsList = newIngredientsList.flat();
      newIngredientsList = newIngredientsList.filter(
        (x, i) => newIngredientsList.indexOf(x) === i
      );
      newAppareilsList.push(element.appliance);
      newAppareilsList = newAppareilsList.filter(
        (x, i) => newAppareilsList.indexOf(x) === i
      );
      foundFinal.map((element) => {
        newUstensilsList.push(element.ustensils.map((ustensil) => ustensil));
        newUstensilsList = newUstensilsList.flat();
        newUstensilsList = newUstensilsList.filter(
          (x, i) => newUstensilsList.indexOf(x) === i
        );
      });
    });
    // Essayer de remplacer les elements de la liste par cette nouvelle liste
    tagPopulation(newIngredientsList, customOptionIngredient);
    tagPopulation(newAppareilsList, customOptionAppareils);
    tagPopulation(newUstensilsList, customOptionUstensils);
    // Actualisation des recettes affichees
    cardsContainer.innerHTML = "";
    createCards(foundFinal);
  } else {
    createCards(recipes);
    tagPopulation(ingredientsList);
  }
});
