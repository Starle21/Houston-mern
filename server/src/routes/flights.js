const express = require("express");
const flightService = require("../services/flightService.js");

const flightsRouter = express.Router();
const Flights = require("../helper");

// GET ALL
flightsRouter.get("/", (_req, res) => {
  res.send(flightService.getAllFlights());
});

// CREATE NEW
flightsRouter.post("/", (_req, res) => {
  try {
    const newFlight = _req.body;

    // add flight to database
    const addedFlight = flightService.addFlight(newFlight);

    // scheduling a take off in the future
    const takeOff = new Date(newFlight.takeOffTimeDate);
    const io = _req.app.get("io");
    setTimeout(() => {
      Flights.startFlight({ ...newFlight, status: "flying" }, io);
      flightService.updateFlightStatus({ ...newFlight, status: "flying" });
    }, takeOff.getTime() - Date.now());

    // sending response
    res.json(addedFlight);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = flightsRouter;
