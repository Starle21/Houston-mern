let flightsData = require("../../data/flights.js");
const rocketsData = require("../../data/rockets.js");
const { removeLandedFlights } = require("../utils/helper");

// connecting to data stored localy
// next step - connect to mongoDB

const getAllFlights = () => {
  // filter landed flights out
  const flightsWithRocket = flightsData.map((f) => {
    const rocket = rocketsData.filter((r) => r.id === f.rocket.id)[0];
    return { ...f, rocket: rocket };
  });

  const removedLandedFlights = flightsWithRocket
    .map((f) => {
      return removeLandedFlights(f.takeOffTimeDate, f.rocket.speed, f.distance)
        ? ""
        : f;
    })
    .filter((f) => f !== "");

  return removedLandedFlights;
};

const addFlight = (newFlight) => {
  flightsData.push(newFlight);
  return newFlight;
};

const updateFlightStatus = (flight) => {
  const toUpdate = flightsData.filter((f) => f.name === flight.name)[0];
  const updatedFlight = { ...toUpdate, status: flight.status };
  return (flightsData = flightsData.map((f) =>
    f.name === flight.name ? updatedFlight : f
  ));
};

const removeFlight = (flight) => {
  const afterRemovedFlight = flightsData.filter((f) => f.name !== flight.name);
  flightsData = afterRemovedFlight;
  return flight;
};

module.exports = {
  getAllFlights,
  addFlight,
  updateFlightStatus,
  removeFlight,
};
