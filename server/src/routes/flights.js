import express from "express";
import * as flightService from "../services/flightService.js";

const flightsRouter = express.Router();

// GET ALL
flightsRouter.get("/", (_req, res) => {
  res.send(flightService.getAllFlights());
});

// CREATE NEW
flightsRouter.post("/", (_req, res) => {
  try {
    const newFlight = _req.body;
    const addedFlight = flightService.addFlight(newFlight);
    res.json(addedFlight);
  } catch (e) {
    res.status(400).send(e.message);
  }
  // res.send("Creating a new flight!");
});

export default flightsRouter;
