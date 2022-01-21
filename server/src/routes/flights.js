const express = require("express");
const flightService = require("../services/flightService.js");

const flightsRouter = express.Router();

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

    // startFlight() calls renderFlights()

    res.json(addedFlight);
  } catch (e) {
    res.status(400).send(e.message);
  }
  // res.send("Creating a new flight!");
});

module.exports = flightsRouter;
