import express from "express";
import * as flightService from "../services/flightService.js";

const flightsRouter = express.Router();

// GET ALL
flightsRouter.get("/", (_req, res) => {
  res.send(flightService.getAllFlights());
});

// CREATE NEW
flightsRouter.post("/", (_req, res) => {
  res.send("Creating a new flight!");
});

export default flightsRouter;
