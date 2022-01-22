const flightService = require("./services/flightService");
const rocketService = require("./services/rocketService.js");
const { renderFlights } = require("./realtimeMock/realtime");

// const getCurrentFlightsFromDb = () => {
//   const flyingFlights = flightService
//     .getAllFlights()
//     .filter((f) => f.status === "flying");

//   const rockets = rocketService.getAllRockets();

//   return flyingFlights.map((f) => {
//     const rocket = rockets.filter((r) => r.id === f.rocket)[0];
//     return { ...f, rocket: rocket };
//   });
// };

const Flights = (module.exports = {
  run: false,
  aborted: false,
  abort: function (flight) {
    this.aborted = true;
    this.abortedFlights.push(flight);
  },
  abortedFlights: [],
  currentFlights: [],
  getCurrentFlightsFromDb: () => {
    const flyingFlights = flightService
      .getAllFlights()
      .filter((f) => f.status === "flying");

    const rockets = rocketService.getAllRockets();

    this.currentFlights = flyingFlights.map((f) => {
      const rocket = rockets.filter((r) => r.id === f.rocket)[0];
      return { ...f, rocket: rocket };
    });
  },
  setRun: (status) => {
    this.run = status;
  },
  getCurrentFlightsData: (io, socket) => {
    if (this.currentFlights.length > 0 && !this.run) {
      renderFlights(io, socket, this.currentFlights);
      this.run = true;
    }
  },
  stopRenderFlights: () => {
    this.run = false;
  },
  startFlight: (flight, io) => {
    // const rockets = rocketService.getAllRockets();
    // const rocket = rockets.filter((r) => r.id === flight.rocket)[0];
    // const flightWithRocket = { ...flight, rocket: rocket };
    // this.currentFlights.push(flightWithRocket);
    this.currentFlights.push(flight);
    io.emit("flying", flight);
  },
  removeAbortedFlights: () => {
    const flightsUpdated = this.currentFlights.filter(
      this.abortedFlights.filter((a) => a.name !== f.name)
    );
    console.log(flightsUpdated);
    this.abortedFlights = [];
    this.aborted = false;
    this.currentFlights = flightsUpdated;
  },
});
