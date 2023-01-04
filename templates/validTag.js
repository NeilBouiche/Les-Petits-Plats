import { createCards } from "/templates/cards.js";
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
let recipeWithTags = [];
const customOptionIngredient = document.querySelector(
  ".custom-option-ingredients"
);
const customOptionAppareils = document.querySelector(
  ".custom-option-appareils"
);
const customOptionUstensils = document.querySelector(
  ".custom-option-ustensils"
);
// Recheche dans les champs de tag
const searchIngredient = document.querySelector(".search_ingredient_input");
const searchAppliance = document.querySelector(".search_appareil_input");
const searchUstensil = document.querySelector(".search_ustensil_input");
// Recherche dans le conteneur de tag ingredient (On ne peut pas faire de fonction sans perdre le context car la liste de tag est seulement display:block lors de son ouverture)
searchIngredient.addEventListener("input", function (e) {
  const [...customIngredients] = document.querySelectorAll(
    ".custom-option-ingredient"
  );
  const inputValue = e.target.value;
  customIngredients.forEach((customIngredient) => {
    if (
      customIngredient.innerHTML
        .toLowerCase()
        .startsWith(inputValue.toLowerCase())
    ) {
      customIngredient.style.display = "";
    } else {
      customIngredient.style.display = "none";
    }
  });
});
// Recherche dans le conteneur de tag appareil
searchAppliance.addEventListener("input", function (e) {
  const [...customAppareils] = document.querySelectorAll(
    ".custom-option-appareil"
  );
  const inputValue = e.target.value;
  customAppareils.forEach((customAppareil) => {
    if (
      customAppareil.innerHTML
        .toLowerCase()
        .startsWith(inputValue.toLowerCase())
    ) {
      customAppareil.style.display = "";
    } else {
      customAppareil.style.display = "none";
    }
  });
});
// Recherche dans le conteneur de tag ustensil
searchUstensil.addEventListener("input", function (e) {
  const [...customUstensils] = document.querySelectorAll(
    ".custom-option-ustensil"
  );
  const inputValue = e.target.value;
  customUstensils.forEach((customUstensil) => {
    if (
      customUstensil.innerHTML
        .toLowerCase()
        .startsWith(inputValue.toLowerCase())
    ) {
      customUstensil.style.display = "";
    } else {
      customUstensil.style.display = "none";
    }
  });
});
// ------------ Recherche au click du tag ---------------
export function validTagCreationAndSearch(recipeSource) {
  for (const option of document.querySelectorAll(".custom-option")) {
    let isIngredient = [...option.parentElement.classList].includes(
      "custom-option-ingredients"
    );
    let isAppliance = [...option.parentElement.classList].includes(
      "custom-option-appareils"
    );
    let isUstensil = [...option.parentElement.classList].includes(
      "custom-option-ustensils"
    );
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
      // Recherche par mot cle
      // Recherche Ingredient
      if (isIngredient) {
        validTag.style.border = "2px solid rgb(96, 96, 255)";
        validTagList.listIngredients.push(option.innerHTML);
        // Filtre des recettes pour chaque ingredient
        let filteredRecipes = recipeSource;
        validTagList.listIngredients.forEach((tagIngredient) => {
          filteredRecipes = filteredRecipes.filter((recipe) =>
            recipe.ingredients.find(
              (ingredient) => ingredient.ingredient == tagIngredient
            )
          );
        });
        // Recettes affichees update
        recipeWithIngredient = filteredRecipes;
        cardsContainer.innerHTML = "";
        createCards(recipeWithIngredient);
      }
      // Recherche appliance
      if (isAppliance) {
        validTag.style.border = "2px solid rgb(107, 179, 0)";
        validTagList.listAppliances.push(option.innerHTML);
        // Filtre des recettes pour chaque appliance
        let filteredRecipes = recipeSource;
        validTagList.listAppliances.forEach((tagAppliance) => {
          filteredRecipes = filteredRecipes.filter(
            (recipe) => recipe.appliance == tagAppliance
          );
        });
        // Recettes affichees update
        recipeWithAppliance = filteredRecipes;
        cardsContainer.innerHTML = "";
        createCards(recipeWithAppliance);
      }
      // Recherche Ustensil
      if (isUstensil) {
        validTag.style.border = "2px solid rgb(255, 101, 101)";
        validTagList.listUstensils.push(option.innerHTML);
        // Filtre des recettes pour chaque ustensil
        let filteredRecipes = recipeSource;
        validTagList.listUstensils.forEach((tagUstensil) => {
          filteredRecipes = filteredRecipes.filter((recipe) =>
            recipe.ustensils.includes(tagUstensil)
          );
        });
        // Recettes affichees update
        recipeWithUstensil = filteredRecipes;
        cardsContainer.innerHTML = "";
        createCards(recipeWithUstensil);
      }
      // Suppression du validTag au click de la croix
      tagClose.addEventListener("click", () => {
        option.classList.remove("disabled");
        validTagsContainer.removeChild(validTag);
        // Remove the tag from the validTagList
        const tagText = validTag.textContent.trim();
        if (validTagList.listIngredients.includes(tagText)) {
          validTagList.listIngredients = validTagList.listIngredients.filter(
            (ingredient) => ingredient != tagText
          );
        } else if (validTagList.listAppliances.includes(tagText)) {
          validTagList.listAppliances = validTagList.listAppliances.filter(
            (appliance) => appliance != tagText
          );
        } else if (validTagList.listUstensils.includes(tagText)) {
          validTagList.listUstensils = validTagList.listUstensils.filter(
            (ustensil) => ustensil != tagText
          );
        }
        // Filtre des recettes pour chaque tags restant
        let filteredRecipes = recipeSource;
        validTagList.listIngredients.forEach((tagIngredient) => {
          filteredRecipes = filteredRecipes.filter((recipe) =>
            recipe.ingredients.find(
              (ingredient) => ingredient.ingredient == tagIngredient
            )
          );
        });
        validTagList.listAppliances.forEach((tagAppliance) => {
          filteredRecipes = filteredRecipes.filter(
            (recipe) => recipe.appliance == tagAppliance
          );
        });
        validTagList.listUstensils.forEach((tagUstensil) => {
          filteredRecipes = filteredRecipes.filter((recipe) =>
            recipe.ustensils.includes(tagUstensil)
          );
        });
        // Recettes affichees update
        recipeWithTags = filteredRecipes;
        cardsContainer.innerHTML = "";
        createCards(recipeWithTags);
      });
    });
  }
}
