fetch("https://opendata.arcgis.com/datasets/9321fc4d3030468db59cc6fd4338d281_0.geojson")
  .then((response) => response.json())
  .then((data) => {
    filterData(data);
  });

window.addEventListener("load", () => {
  let chart = document.getElementById("chart");
  chart.style.display = "none";
});

let click = document.getElementById("chartClick");
click.addEventListener("click", () => {
  chart.style.display = "block";
  chart.scrollIntoView();
});

function filterData(data) {
  let se = data.features[1].properties;
  let no = data.features[328].properties;
  let dk = data.features[405].properties;
  let fi = data.features[438].properties;
  let is = data.features[54].properties;

  let countryObjectArray = [se, no, dk, fi, is];
  console.log(countryObjectArray);

  let values = [];
  for (i = 0; i < countryObjectArray.length; i++) {
    values.push(countryObjectArray[i].value_2018);
  }

  let labels = [];
  for (i = 0; i < countryObjectArray.length; i++) {
    labels.push(countryObjectArray[i].geoAreaName);
  }

  console.log(values);
  console.log(labels);

  createChart(labels, values, "Yearly Consumption of Pure Alcohol in the Nordics 2018");
}

function createChart(labels, values, chartTitle) {
  var data = {
    labels: labels,
    datasets: [
      {
        label: chartTitle,
        data: values,
        backgroundColor: [
          "rgba(210, 95, 156, 0.6)",
          "rgba(159, 108, 190, 0.6)",
          "rgba(79, 121, 201, 0.6)",
          "rgba(0, 127, 186, 0.6)",
          "rgba(0, 125, 150, 0.6)",
        ],
        borderColor: [
          "rgb(210, 95, 156)",
          "rgb(159, 108, 190)",
          "rgb(79, 121, 201)",
          "rgb(0, 127, 186)",
          "rgb(0, 125, 150)",
        ],
        borderWidth: 3,
      },
    ],
  };

  var ctx = document.getElementById("alcoholConsumption").getContext("2d");
  var alcChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chartTitle,
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 50,
          bottom: 50,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Country",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: 17,
              min: 0,
            },
            scaleLabel: {
              display: true,
              labelString: "Litres of pure alcohol per capita",
            },
          },
        ],
      },
    },
  });
  return alcChart;
}
