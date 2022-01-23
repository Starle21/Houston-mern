// socket.io connection to "/"
// ---------------
const express = require("express");
const Flights = require("./helper");

// get current flights from db

module.exports = function (io) {
  const socketRouter = express.Router();

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("flights:current", () => {
      Flights.getCurrentFlightsFromDb();
      Flights.getCurrentFlightsData(io, socket);
    });

    socket.on("destroy", (flight) => {
      console.log("rocket has been destroyed!");
      Flights.abort(flight);
      io.emit("destroyed", flight);
      // update database
      //  - rocket destroyed
      //  - flight aborted
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return socketRouter;
};
