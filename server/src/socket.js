// socket.io connection to "/"
// ---------------
const express = require("express");
const flightService = require("./services/flightService");
const rocketService = require("./services/rocketService.js");
const { renderFlights } = require("./realtimeMock/realtime");
const _abortedFlights = require("./helper");

// get current flights from db
const flyingFlights = flightService
  .getAllFlights()
  .filter((f) => f.status === "flying");

const rockets = rocketService.getAllRockets();

const flyingFlightsRockets = flyingFlights.map((f) => {
  const rocket = rockets.filter((r) => r.id === f.rocket)[0];
  return { ...f, rocket: rocket };
});

module.exports = function (io) {
  const socketRouter = express.Router();

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    //
    socket.on("destroy", (flight) => {
      console.log("rocket has been destroyed!");
      _abortedFlights.abort(flight.name);
      io.emit("destroyed", flight);
      // update database
      //  - rocket destroyed
      //  - flight aborted
    });

    socket.on("flights:current", () => {
      // if there are flying flights
      // start the render - emit current data
      //

      if (flyingFlights.length > 0 && !_abortedFlights.connected) {
        renderFlights(io, socket, flyingFlightsRockets);
        _abortedFlights.connected = true;
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return socketRouter;
};
