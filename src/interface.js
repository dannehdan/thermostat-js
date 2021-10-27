const therm = new Thermostat();
const updateTemp = () => {
  document.querySelector('#current-temp').innerText = therm.temp;
  document.querySelector('#current-temp').className = therm.energyUsage();
  // updateEnergyUsage();
}
const updatePSM = () => document.querySelector('#psm-status').innerText = therm.powerSavingMode;
// const updateEnergyUsage = () => document.querySelector('#energy-usage').innerText = therm.energyUsage();

updateTemp();
updatePSM();

document.querySelector('#up').addEventListener('click', () => {
  therm.up();
  updateTemp();
});

document.querySelector('#down').addEventListener('click', () => {
  therm.down();
  updateTemp();
});

document.querySelector('#reset').addEventListener('click', () => {
  therm.reset();
  updateTemp();
});

document.querySelector('#psm-on').addEventListener('click', () => {
  therm.turnOnPSM();
  updatePSM();
});

document.querySelector('#psm-off').addEventListener('click', () => {
  therm.turnOffPSM();
  updatePSM();
});