let flightsData = require("../../data/flights.js");

// connecting to data stored localy
// next step - connect to mongoDB

const getAllFlights = () => {
  return flightsData;
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
