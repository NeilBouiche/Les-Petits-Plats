import { recipes } from "/data/recipes.js";
const validTagsContainer = document.querySelector(".valid-tags-container");
const validTagList = [];
let recipeWithIngredient = [];
export function validTagCreationAndSearch() {
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
      validTagList.push(option.innerHTML);
      console.log(validTagList);
      // Chercher grâce au tag ingredient cliqué
      validTagList.forEach((element) => {
        for (const recipe of recipes) {
          for (const ingredient of recipe.ingredients) {
            if (ingredient.ingredient.toLowerCase().includes(element)) {
              recipeWithIngredient.push(recipe);
              console.log(recipeWithIngredient);
              console.log(ingredient);
            }
          }
        }
      });
      //Suppression du validTag au click de la croix
      tagClose.addEventListener("click", () => {
        option.classList.remove("disabled");
        validTagsContainer.removeChild(validTag);
      });
    });
  }
}
