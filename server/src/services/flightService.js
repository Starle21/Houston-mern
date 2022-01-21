const flightsData = require("../../data/flights.js");

// connecting to data stored localy
// next step - connect to mongoDB

const getAllFlights = () => {
  return flightsData;
};

const addFlight = (newFlight) => {
  flightsData.push(newFlight);
  return newFlight;
};
module.exports = {
  getAllFlights,
  addFlight,
};
