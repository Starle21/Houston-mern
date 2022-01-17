import express from "express";
import * as astronautService from "../services/astronautService.js";

const astronautsRouter = express.Router();

// GET ALL
astronautsRouter.get("/", (_req, res) => {
  res.send(astronautService.getAllAstronauts());
});

// CREATE NEW
astronautsRouter.post("/", (_req, res) => {
  res.send("Creating a new cosmonaut!");
});

export default astronautsRouter;
