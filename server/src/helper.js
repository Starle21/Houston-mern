const flightService = require("./services/flightService");
const rocketService = require("./services/rocketService.js");
const { updateCurrentData } = require("./realtimeMock/realtime");

const Flights = (module.exports = {
  run: false,
  aborted: false,
  abort(flight) {
    this.aborted = true;
    this.abortedFlights.push(flight);
  },
  abortedFlights: [],
  currentFlights: [],
  getCurrentFlightsFromDb() {
    const flyingFlights = flightService
      .getAllFlights()
      .filter((f) => f.status === "flying");

    const rockets = rocketService.getAllRockets();

    this.currentFlights = flyingFlights.map((f) => {
      const rocket = rockets.filter((r) => r.id === f.rocket)[0];
      return { ...f, rocket: rocket };
    });
  },
  setRun(status) {
    this.run = status;
  },
  getCurrentFlightsData(io, socket) {
    if (this.currentFlights.length > 0 && !this.run) {
      this.renderFlights(io, socket);
      this.run = true;
    }
  },
  stopRenderFlights() {
    this.run = false;
  },
  startFlight(flight, io) {
    // const rockets = rocketService.getAllRockets();
    // const rocket = rockets.filter((r) => r.id === flight.rocket)[0];
    // const flightWithRocket = { ...flight, rocket: rocket };
    // this.currentFlights.push(flightWithRocket);
    this.currentFlights.push(flight);
    io.emit("flying", flight);
  },
  removeAbortedFlights() {
    const flightsUpdated = this.currentFlights.filter((f) => {
      const afterAbort = this.abortedFlights.map((a) => {
        return a.name !== f.name;
      });
      return afterAbort[0];
    });
    this.abortedFlights = [];
    this.aborted = false;
    this.currentFlights = flightsUpdated;
  },
  renderFlights(io, socket) {
    if (this.aborted) {
      this.removeAbortedFlights();
    }
    if (this.currentFlights.length === 0) {
      this.stopRenderFlights();
      return;
    }
    const currentData = updateCurrentData(this.currentFlights, socket, io);
    io.emit("currentData", currentData);
    setTimeout(() => this.renderFlights(io, socket), 2000);
  },
});

//   const currentData = updateCurrentData(filteredFlights, socket, io);
//   io.emit("currentData", currentData);
//   setTimeout(() => renderFlights(io, socket, filteredFlights), 2000);

//   // when the flight gets back to earth
//   // if (distanceTravelled === flightDistance) {
//   //   socket.emit("landed", {
//   //     id,
//   //     flightName,
//   //     status: "landed",
//   //   });
//   //   return;
//   // }
// };
