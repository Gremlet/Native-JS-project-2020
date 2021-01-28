let button = document.getElementById("viewButton");
button.addEventListener("click", () => {
  viewCities();
});

let menu = document.querySelector("select");

let reset = document.getElementById("resetButton");
reset.addEventListener("click", () => {
  document.getElementById("cityForm").reset();
  document.getElementById("city-name").disabled = false;
  document.getElementById("population").disabled = false;
});

let form = document.getElementById("cityForm");
form.addEventListener("submit", (event) => event.preventDefault());

form.addEventListener("submit", () => {
  switch (menu.value) {
    case "add-city":
      addCity();
      break;

    case "edit-city":
      editCity();
      break;

    case "delete":
      deleteCity();
      break;
  }
});

menu.addEventListener("change", () => {
  let cityId = document.getElementById("city-id");
  let cityName = document.getElementById("city-name");
  let cityPop = document.getElementById("population");
  switch (menu.value) {
    case "add-city":
      cityId.disabled = false;
      cityName.disabled = false;
      cityPop.disabled = false;
      break;

    case "edit-city":
      cityId.disabled = false;
      cityName.disabled = false;
      cityPop.disabled = false;
      break;

    case "delete":
      cityId.disabled = false;
      cityName.disabled = true;
      cityPop.disabled = true;
      break;
  }
});

function viewCities() {
  fetch("https://avancera.app/cities/")
    .then((response) => response.json())
    .then((result) => {
      let resultsDiv = document.getElementById("display-results");
      resultsDiv.textContent = "";

      let table = document.createElement("table");
      resultsDiv.appendChild(table);

      let topRow = document.createElement("tr");
      table.appendChild(topRow);

      let tableHeaderId = document.createElement("th");
      let tableHeaderName = document.createElement("th");
      let tableHeaderPop = document.createElement("th");

      tableHeaderId.textContent = "ID";
      tableHeaderName.textContent = "City Name";
      tableHeaderPop.textContent = "Population";

      topRow.appendChild(tableHeaderId);
      topRow.appendChild(tableHeaderName);
      topRow.appendChild(tableHeaderPop);

      for (i = 0; i < result.length; i++) {
        let row = document.createElement("tr");
        let tdid = document.createElement("td");
        tdid.textContent = result[i].id;
        row.appendChild(tdid);

        let tdName = document.createElement("td");
        tdName.textContent = result[i].name;
        row.appendChild(tdName);

        let tdPop = document.createElement("td");
        tdPop.textContent = result[i].population;
        row.appendChild(tdPop);

        table.appendChild(row);
      }
      resultsDiv.scrollIntoView();
    });
}

function addCity() {
  let name = document.getElementById("city-name").value;
  let population = document.getElementById("population").value;
  let id = document.getElementById("city-id").value;

  fetch("https://avancera.app/cities/", {
    body: JSON.stringify({ id: id, name: name, population: population }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

function editCity() {
  let editId = document.getElementById("city-id").value;
  let editName = document.getElementById("city-name").value;
  let editPop = document.getElementById("population").value;

  fetch("https://avancera.app/cities/" + editId, {
    body: JSON.stringify({ id: editId, name: editName, population: editPop }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    });
}

function deleteCity() {
  let deleteId = document.getElementById("city-id").value;

  fetch("https://avancera.app/cities/" + deleteId, {
    method: "DELETE",
  }).then((response) => {
    console.log(response);
  });
}
