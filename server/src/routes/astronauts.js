const express = require("express");
const astronautService = require("../services/astronautService.js");

const astronautsRouter = express.Router();

// GET ALL
astronautsRouter.get("/", (_req, res) => {
  // const io = _req.app.get("io");

  // io.on("connection", (socket) => {
  //   console.log(`sss Client connected: ${socket.id}`);

  //   console.log("astronaut");
  //   io.emit("astronaut", "hey there astronaut");
  //   socket.emit("hello", {
  //     text: "there are flying flights",
  //   });

  //   socket.on("disconnect", () => {
  //     console.log(`Client disconnected: ${socket.id}`);
  //   });
  // });

  res.send(astronautService.getAllAstronauts());
});

// CREATE NEW
astronautsRouter.post("/", (_req, res) => {
  res.send("Creating a new cosmonaut!");
});

module.exports = astronautsRouter;
