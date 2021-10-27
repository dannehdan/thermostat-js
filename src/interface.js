const therm = new Thermostat();
const updateTemp = () => {
  document.querySelector("#current-temp").innerText = therm.temp;
  document.querySelector("#temperature").className = therm.energyUsage();
  // updateEnergyUsage();
};
const updatePSM = () => {
  if (therm.powerSavingMode) {
    document.querySelector("#psm-status").innerText = "On";
  } else {
    document.querySelector("#psm-status").innerText = "Off";
  }
};

// const updateEnergyUsage = () => document.querySelector('#energy-usage').innerText = therm.energyUsage();

const fetchData = (baseUrl, city) => {
  fetch(baseUrl + city)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#location").innerHTML = data.location.name;
      document.querySelector("#city-temp").innerHTML = data.current.temp_c;
      document.querySelector("#city-temp-text").innerHTML =
        data.current.condition.text;
    });
};

const select = document.querySelector("#select-city");
let city = select.value;
const baseUrl =
  "http://api.weatherapi.com/v1/current.json?key=c3e118ae308648b9b5b144500212710&q=";

fetchData(baseUrl, city);

select.addEventListener("change", () => {
  city = select.value;
  fetchData(baseUrl, city);
});

updateTemp();
updatePSM();

document.querySelector("#up").addEventListener("click", () => {
  therm.up();
  updateTemp();
});

document.querySelector("#down").addEventListener("click", () => {
  therm.down();
  updateTemp();
});

document.querySelector("#reset").addEventListener("click", () => {
  therm.reset();
  updateTemp();
});

document.querySelector("#psm-on").addEventListener("click", () => {
  therm.turnOnPSM();
  updatePSM();
});

document.querySelector("#psm-off").addEventListener("click", () => {
  therm.turnOffPSM();
  updatePSM();
});
