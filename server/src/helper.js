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
  i: 0,
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
  getCurrentFlightsData(io, socket) {
    if (this.currentFlights.length > 0 && !this.run) {
      this.run = true;
      this.renderFlights(io);
    }
  },
  stopRenderFlights() {
    this.run = false;
  },
  startFlight(flight, io) {
    if (this.run) {
      this.currentFlights.push(flight); //server
    } else {
      this.currentFlights.push(flight);
      this.renderFlights(io); //client
      this.run = true;
    }
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
  removeLandedFlight(flight) {
    const flightsUpdated = this.currentFlights.filter((f) => {
      return f.name !== flight.name;
    });
    this.currentFlights = flightsUpdated;
  },
  renderFlights(io) {
    if (this.aborted) {
      this.removeAbortedFlights();
    }
    if (this.currentFlights.length === 0) {
      this.stopRenderFlights();
      return;
    }
    if (!this.run) return;

    const currentData = updateCurrentData(this.currentFlights);

    this.i++;
    // console.log("rendering...");

    io.emit("currentData", { currentData, i: this.i });

    if (currentData.some((f) => f.status === "landed")) {
      const landedFlight = currentData.filter((f) => f.status === "landed")[0];
      this.removeLandedFlight(landedFlight); //server
      io.emit("landed", landedFlight); //client
      flightService.removeFlight(landedFlight); //db
    }

    setTimeout(() => this.renderFlights(io), 2000);
  },
});
