'use strict';

describe ("Thermostat", function() {
  var thermostat;
  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it("should start at 20 degrees", function() {
    expect(thermostat.temp).toEqual(20);
  });

  describe ("#up", function() {
    it("should increase the temperature by the default value", function() {
      let currentTemp = thermostat.temp;
      thermostat.up();
      expect(thermostat.temp).toEqual(currentTemp + 1);
    });

    it("should increase the temperature a number of times", function() {
      let currentTemp = thermostat.temp;
      [...Array(3)].forEach((_, i) => {
        thermostat.up();
      });
      expect(thermostat.temp).toEqual(currentTemp + 3);
    });

    it("should have a max of 25 degrees with PSM on", function() {
      [...Array(5)].forEach((_, i) => {
        thermostat.up();
      });

      expect(function() { thermostat.up() }).toThrow("Can't go above 25 degrees");
    });

    it("should have a max of 32 degrees with PSM off", function() {
      thermostat.turnOffPSM();
      [...Array(12)].forEach((_, i) => {
        thermostat.up();
      });

      expect(function() { thermostat.up() }).toThrow("Can't go above 32 degrees");
    });
  });

  describe ("#down", function() {
    it("should decrease the temperature by the default value", function() {
      let currentTemp = thermostat.temp;
      thermostat.down();
      expect(thermostat.temp).toEqual(currentTemp - 1);
    });

    it("should decrease the temperature a number of times", function() {
      let currentTemp = thermostat.temp;
      [...Array(3)].forEach((_, i) => {
        thermostat.down();
      });
      expect(thermostat.temp).toEqual(currentTemp - 3);
    });

    it("should raise an error if temperature goes below 10 degrees", function() {
      let minThermostat = new Thermostat(10);

      expect(function() { minThermostat.down() }).toThrow("Can't go below 10 degrees");
    });
  });

  describe("Power Saving Mode", function() {
    it("should default to on", function() {
      expect(thermostat.powerSavingMode).toBe(true);
    });

    describe("#turnOffPSM", function() {
      it("should be able to be switched off", function() {
        thermostat.turnOffPSM();
        expect(thermostat.powerSavingMode).toBe(false);
      });
    });

    describe("#turnOnPSM", function() {
      it("should be able to be switched on", function() {
        thermostat.turnOffPSM();
        thermostat.turnOnPSM();
        expect(thermostat.powerSavingMode).toBe(true);
      });
    });
  });

  describe("#reset", function() {
    it("should reset the temperature to 20 degrees", function() {
      thermostat.up();
      thermostat.reset();
      expect(thermostat.temp).toEqual(20);
    });
  });

  describe("#energyUsage", function() {
    it("should show low usage when under 18 degrees", function() {
      let lowThermostat = new Thermostat(17);

      expect(lowThermostat.energyUsage()).toEqual("low-usage");
    });

    it("should show medium usage when less than or equal to 25 degrees", function() {
      let medThermostat = new Thermostat(17);
      [...Array(8)].forEach((_, i) => {
        medThermostat.up();
        expect(medThermostat.energyUsage()).toEqual("medium-usage");
      });
    });

    it("should show medium usage when greater than 25 degrees", function() {
      let highThermostat = new Thermostat(26);
      expect(highThermostat.energyUsage()).toEqual("high-usage");
    });
  });
});
