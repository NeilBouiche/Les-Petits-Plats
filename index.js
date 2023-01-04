import { recipes } from "/data/recipes.js";
import { createCards } from "./templates/cards.js";
import { validTagCreationAndSearch } from "./templates/validTag.js";
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
const cardsContainer = document.querySelector(".cards-container");
const mainSearchBar = document.querySelector(".search_bar_input");
const ingredientSearchBar = document.querySelector(".search_ingredient_input");
const appareilSearchBar = document.querySelector(".search_appareil_input");
const ustensilSearchBar = document.querySelector(".search_ustensil_input");
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
export function tagPopulation(list, location) {
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
validTagCreationAndSearch(recipes);
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
mainSearchBar.addEventListener("keyup", (event) => {
  customOptionIngredient.innerHTML = "";
  customOptionAppareils.innerHTML = "";
  customOptionUstensils.innerHTML = "";
  newIngredientsList = [];
  newAppareilsList = [];
  newUstensilsList = [];
  const mainSearchContent = event.target.value;
  if (mainSearchContent.length >= 3) {
    // Recherche par titre
    const foundName = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(mainSearchContent)
    );
    // Recherche par ingredient
    let foundIngredient = [];
    for (const recipe of recipes) {
      for (const ingredient of recipe.ingredients) {
        if (ingredient.ingredient.toLowerCase().includes(mainSearchContent)) {
          foundIngredient.push(recipe);
        }
      }
    }
    // Recherche par description
    const foundDescription = recipes.filter((recipe) =>
      recipe.description.toLowerCase().includes(mainSearchContent)
    );
    // Actualisation de la liste des tags
    foundFinal = [...foundName, ...foundIngredient, ...foundDescription];
    foundFinal = foundFinal.filter((x, i) => foundFinal.indexOf(x) === i);
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
    validTagCreationAndSearch(foundFinal);
    // Actualisation des recettes affichees
    cardsContainer.innerHTML = "";
    createCards(foundFinal);
  } else {
    customOptionIngredient.innerHTML = "";
    customOptionAppareils.innerHTML = "";
    customOptionUstensils.innerHTML = "";
    tagPopulation(ingredientsList, customOptionIngredient);
    tagPopulation(appareilsList, customOptionAppareils);
    tagPopulation(ustensilsList, customOptionUstensils);
    validTagCreationAndSearch(recipes);
    cardsContainer.innerHTML = "";
    createCards(recipes);
  }
});
