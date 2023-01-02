import { createCards } from "/templates/cards.js";
import { recipes } from "/data/recipes.js";
const validTagsContainer = document.querySelector(".valid-tags-container");
const cardsContainer = document.querySelector(".cards-container");
const validTagList = {
  listIngredients: [],
  listAppliances: [],
  listUstensils: [],
};
let recipeWithIngredient = [];
let recipeWithAppliance = [];
let recipeWithUstensil = [];
export function validTagCreationAndSearch() {
  for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener("click", function (e) {
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
      // Recherche par mot cle
      let isIngredient = [...option.parentElement.classList].includes(
        "custom-option-ingredients"
      );
      let isAppliance = [...option.parentElement.classList].includes(
        "custom-option-appareils"
      );
      let isUstensil = [...option.parentElement.classList].includes(
        "custom-option-ustensils"
      );
      // Check ingredient
      if (isIngredient) {
        validTagList.listIngredients.push(option.innerHTML);
        console.log(validTagList);
        // Filter the recipes for each selected ingredient
        let filteredRecipes = recipes;
        validTagList.listIngredients.forEach((tagIngredient) => {
          filteredRecipes = filteredRecipes.filter((recipe) =>
            recipe.ingredients.find(
              (ingredient) => ingredient.ingredient == tagIngredient
            )
          );
        });
        // Update the displayed recipes
        recipeWithIngredient = filteredRecipes;
        console.log(recipeWithIngredient);
        cardsContainer.innerHTML = "";
        createCards(recipeWithIngredient);
      }
      // Check appliance
      if (isAppliance) {
        validTagList.listAppliances.push(option.innerHTML);
        console.log(validTagList);
        // Filter the recipes for each selected appliance
        let filteredRecipes = recipes;
        validTagList.listAppliances.forEach((tagAppliance) => {
          filteredRecipes = filteredRecipes.filter(
            (recipe) => recipe.appliance == tagAppliance
          );
        });
        // Update the displayed recipes
        recipeWithAppliance = filteredRecipes;
        console.log(recipeWithAppliance);
        cardsContainer.innerHTML = "";
        createCards(recipeWithAppliance);
      }
      // Check Ustensil
      if (isUstensil) {
        validTagList.listUstensils.push(option.innerHTML);
        console.log(validTagList);
        // Filter the recipes for each selected ustensil
        let filteredRecipes = recipes;
        validTagList.listUstensils.forEach((tagUstensil) => {
          filteredRecipes = filteredRecipes.filter((recipe) =>
            recipe.ustensils.includes(tagUstensil)
          );
        });
        // Update the displayed recipes
        recipeWithUstensil = filteredRecipes;
        console.log(recipeWithUstensil);
        cardsContainer.innerHTML = "";
        createCards(recipeWithUstensil);
      }
      //!!!!!!!!!!!!!!!!!!!!!!!!!! Suppression du validTag au click de la croix !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      tagClose.addEventListener("click", () => {
        option.classList.remove("disabled");
        validTagsContainer.removeChild(validTag);
      });
    });
  }
}
