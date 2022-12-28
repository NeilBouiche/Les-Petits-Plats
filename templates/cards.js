const cardsContainer = document.querySelector(".cards-container");
export function createCards(data) {
  for (let i = 0; i < data.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardImg = document.createElement("div");
    cardImg.classList.add("card-img");
    const cardHead = document.createElement("div");
    cardHead.classList.add("card-head");
    const cardTitle = document.createElement("p");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = data[i].name;
    const cardTimeBox = document.createElement("div");
    cardTimeBox.classList.add("card-time-box");
    const cardClock = document.createElement("i");
    cardClock.classList.add("fa-regular");
    cardClock.classList.add("fa-clock");
    const cardTimer = document.createElement("p");
    cardTimer.classList.add("card-timer");
    cardTimer.innerHTML = data[i].time + "min";
    const cardInstructions = document.createElement("div");
    cardInstructions.classList.add("card-instructions");
    const cardIngredients = document.createElement("div");
    cardIngredients.classList.add("card-ingredients");
    data[i].ingredients.map((ingredient) => {
      if (ingredient.quantity) {
        const ingredientItem = document.createElement("p");
        ingredientItem.classList.add("ingredient-item");
        ingredientItem.innerHTML = ingredient.unit
          ? ingredient.ingredient + ": " + ingredient.quantity + ingredient.unit
          : ingredient.ingredient + ": " + ingredient.quantity;
        cardIngredients.appendChild(ingredientItem);
      } else {
        const ingredientItem = document.createElement("p");
        ingredientItem.classList.add("ingredient-item");
        ingredientItem.innerHTML = ingredient.ingredient;
        ingredientItem.innerHTML.slice(0, 100) + "...";
        cardIngredients.appendChild(ingredientItem);
      }
    });
    const cardSteps = document.createElement("p");
    cardSteps.classList.add("card-steps");
    cardSteps.innerHTML = data[i].description.slice(0, 100) + "...";
    card.append(cardImg, cardHead, cardInstructions);
    cardHead.append(cardTitle, cardTimeBox);
    cardTimeBox.append(cardClock, cardTimer);
    cardInstructions.append(cardIngredients, cardSteps);
    cardsContainer.appendChild(card);
  }
}
