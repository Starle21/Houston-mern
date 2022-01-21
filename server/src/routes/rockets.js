const express = require("express");
const rocketService = require("../services/rocketService.js");

const rocketsRouter = express.Router();

// GET ALL
rocketsRouter.get("/", (_req, res) => {
  res.send(rocketService.getAllRockets());
});

// CREATE NEW
rocketsRouter.post("/", (_req, res) => {
  res.send("Creating a new rocket!");
});

module.exports = rocketsRouter;
