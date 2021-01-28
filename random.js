let form = document.getElementById("userNameInput");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

form.addEventListener("submit", () => {
  let userName = document.getElementById("yourName").value;
  localStorage.setItem("storedName", userName);
  handleUserName(userName);
});

window.addEventListener("load", () => {
  let checkStorage = localStorage.getItem("storedName");
  if (checkStorage !== null) {
    form.style.display = "none";
    handleUserName();
  }
});

function randomise() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((result) => {
      console.log(result.drinks[0].strDrink);
      showRandomDrink(result);
    });
}

function showRandomDrink(result) {
  let suggestText = document.getElementById("suggestion");
  suggestText.textContent = "";
  let cocktailName = result.drinks[0].strDrink;
  suggestText.textContent = `You should drink a ${cocktailName} tonight. Cheers! 🍸`;
}

function handleUserName(userName) {
  console.log(userName);
  form.innerHTML = "";
  let question = document.getElementById("intro");
  let storedName = localStorage.getItem("storedName");
  question.textContent = `Whats on the menu tonight, ${storedName}?`;

  let changeNameText = document.createElement("p");
  changeNameText.id = "notYou";
  changeNameText.textContent = ` Not ${storedName}? Click here.`;
  question.appendChild(changeNameText);

  changeNameText.addEventListener("click", () => {
    removeStorage();
  });
}

function removeStorage() {
  localStorage.clear();
  location.reload();
}
