let menu = document.querySelector("select");
let form = document.getElementById("search-form");

menu.addEventListener("change", () => {
  changePlaceholder();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

form.addEventListener("submit", () => {
  switch (menu.value) {
    case "search-by-name":
      getDrinkByName();
      break;

    case "search-by-first-letter":
      getDrinkByFirstLetter();
      break;
  }
});

function changePlaceholder() {
  switch (menu.value) {
    case "search-by-name":
      document.getElementById("search-input-text").placeholder = "E.g. Margarita, Cosmopolitan...";
      break;

    case "search-by-first-letter":
      document.getElementById("search-input-text").placeholder = "Enter only one letter";
      break;
  }
}

function getDrinkByName() {
  let searchText = document.getElementById("search-input-text").value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then((response) => response.json())
    .then((result) => {
      displayCocktailName(result);
    });
}

function getDrinkByFirstLetter() {
  let searchText = document.getElementById("search-input-text").value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      displayCocktailName(result);
    });
}

function displayCocktailName(result) {
  document.getElementById("display-drinks").remove();

  let drinkDiv = document.createElement("div");
  drinkDiv.id = "display-drinks";

  let resultText = document.createElement("h1");
  resultText.textContent = `We found ${result.drinks.length} cocktail(s)`;
  drinkDiv.appendChild(resultText);

  // loop through result
  result.drinks.forEach((drinks) => {
    let cocktailContainerDiv = document.createElement("div");
    cocktailContainerDiv.id = "cocktail-list";

    let cocktailImage = document.createElement("img");
    cocktailImage.src = drinks.strDrinkThumb + "/preview";

    //make all images 150 x 150
    cocktailImage.style.width = "150px";
    cocktailImage.style.height = "150px";

    let cocktailName = document.createElement("h1");
    cocktailName.textContent = drinks.strDrink;

    cocktailContainerDiv.appendChild(cocktailName);
    cocktailContainerDiv.appendChild(cocktailImage);

    // measures
    let cocktailMeasures = document.createElement("ul");
    cocktailMeasures.id = "measure-list";
    cocktailContainerDiv.appendChild(cocktailMeasures);

    let getMeasures = Object.keys(drinks)
      .filter(function (measure) {
        return measure.indexOf("strMeasure") == 0;
      })
      .reduce(function (measures, measure) {
        if (drinks[measure] != null) {
          measures[measure] = drinks[measure];
        }
        return measures;
      }, {});

    for (let key in getMeasures) {
      let value = getMeasures[key];
      measureListItem = document.createElement("li");
      measureListItem.innerHTML = value;
      cocktailMeasures.appendChild(measureListItem);
    }

    // ingredients
    let cocktailIngredients = document.createElement("ul");
    cocktailIngredients.id = "ingredient-list";
    cocktailContainerDiv.appendChild(cocktailIngredients);

    let getIngredients = Object.keys(drinks)
      .filter(function (ingredient) {
        return ingredient.indexOf("strIngredient") == 0;
      })
      .reduce(function (ingredients, ingredient) {
        if (drinks[ingredient] != null) {
          ingredients[ingredient] = drinks[ingredient];
        }
        return ingredients;
      }, {});

    for (let key in getIngredients) {
      let value = getIngredients[key];
      ingredientListItem = document.createElement("li");
      ingredientListItem.innerHTML = value;
      cocktailIngredients.appendChild(ingredientListItem);
    }

    // instructions
    let instructions = document.createElement("p");
    instructions.id = "instructions";
    cocktailContainerDiv.appendChild(instructions);
    instructions.textContent = drinks.strInstructions;

    drinkDiv.appendChild(cocktailContainerDiv);
  });

  document.body.appendChild(drinkDiv);
  drinkDiv.scrollIntoView();
}
