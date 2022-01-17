import express from "express";
import cors from "cors";
import flightsRouter from "./routes/flights.js";
import astronautsRouter from "./routes/astronauts.js";
import rocketsRouter from "./routes/rockets.js";
import middleware from "./utils/middleware.js";

// creating server
const app = express();

// pre middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("Backend Houston pong");
});

// routes
app.use("/api/flights", flightsRouter);
app.use("/api/astronauts", astronautsRouter);
app.use("/api/rockets", rocketsRouter);

// post middleware
app.use(middleware.unknownEndpoint);

// turning server on
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
