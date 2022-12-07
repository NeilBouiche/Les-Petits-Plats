import { recipes } from "/data/recipes.js";

let ingredientsList = [];
let appareilsList = [];
let ustensilsList = [];
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

//  Tag Population --------------------------
// Boucle pour assigner tout les ingredients au array et supprimer les doublon qui ont le meme index
for (let i = 0; i < recipes.length; i++) {
  ingredientsList.push(recipes[i].ingredients[0].ingredient);
  ingredientsList = ingredientsList.filter(
    (x, i) => ingredientsList.indexOf(x) === i
  );
  appareilsList.push(recipes[i].appliance);
  appareilsList = appareilsList.filter(
    (x, i) => appareilsList.indexOf(x) === i
  );
  ustensilsList.push(recipes[i].ustensils[0]);
  ustensilsList = ustensilsList.filter(
    (x, i) => ustensilsList.indexOf(x) === i
  );
}

// Creer les nodes des options d'ingredients et les inserer dans le menu
ingredientsList.forEach((ingredient) => {
  const customIngredient = document.createElement("span");
  customIngredient.classList.add("custom-option");
  customIngredient.setAttribute("data-value", ingredient);
  customIngredient.innerHTML = ingredient;
  customOptionIngredient.appendChild(customIngredient);
});

// Creer les nodes des options d'ingredients et les inserer dans le menu
appareilsList.forEach((appareil) => {
  const customAppareil = document.createElement("span");
  customAppareil.classList.add("custom-option");
  customAppareil.setAttribute("data-value", appareil);
  customAppareil.innerHTML = appareil;
  customOptionAppareils.appendChild(customAppareil);
});

// Creer les nodes des options d'ustensils et les inserer dans le menu
ustensilsList.forEach((ustensil) => {
  const customUstensil = document.createElement("span");
  customUstensil.classList.add("custom-option");
  customUstensil.setAttribute("data-value", ustensil);
  customUstensil.innerHTML = ustensil;
  customOptionUstensils.appendChild(customUstensil);
});

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
    } else {
      this.querySelector(".select").classList.remove("open");
      this.querySelector(".tag-list-name").classList.remove("span-hidden");
      this.querySelector(".search-tag-list-form").classList.add("form-hidden");
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
    //Suppression du validTaf au click de la croix
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
