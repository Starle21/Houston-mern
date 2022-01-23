// socket.io connection to "/"
// ---------------
const express = require("express");
const Flights = require("./helper");
const flightService = require("./services/flightService.js");

// get current flights from db

module.exports = function (io) {
  const socketRouter = express.Router();

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("flights:current", () => {
      Flights.getCurrentFlightsFromDb(); //server
      Flights.getCurrentFlightsData(io, socket); //client
    });

    socket.on("destroy", (flight) => {
      console.log("rocket has been destroyed!");
      Flights.abort(flight);
      io.emit("destroyed", flight);
      flightService.removeFlight(flight);
      // update database - rocket destroyed
    });

    socket.on("disconnect", () => {
      Flights.stopRenderFlights();
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return socketRouter;
};
