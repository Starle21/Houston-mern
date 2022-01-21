// create new flight
// settimeout - takeofff
// emit - takeoff
// start to run the current data render engine
// update distance, fuel, food
const _abortedFlights = require("../helper");

const updateCurrentDistance = (speed, takeOff) => {
  const formatTakeOff = new Date(takeOff);
  const distance = Math.round(
    (speed * (Date.now() - formatTakeOff.getTime())) / 1000
  );
  return distance;
};

const updateCurrentFuel = (consumption, distanceTravelled, fuelOnStart) => {
  return Math.round(fuelOnStart - consumption * distanceTravelled);
};

const updateCurrentFood = (flightDistance, distanceTravelled, foodOnStart) => {
  const foodRemaining =
    foodOnStart - (foodOnStart / flightDistance) * distanceTravelled;
  return Number(foodRemaining.toFixed(1));
};

const updateCurrentData = (flyingFlights, socket, io) => {
  console.log("flying", socket.id);
  return flyingFlights.map((f) => {
    const distanceTravelled = updateCurrentDistance(
      f.rocket.speed,
      f.takeOffTimeDate
    );
    console.log(distanceTravelled);
    if (f.distance <= distanceTravelled) {
      io.emit("land");
      f.status = "landed";
      console.log("landed", f);
      console.log(distanceTravelled);
    }

    const currentTankLevel = updateCurrentFuel(
      f.rocket.consumption,
      distanceTravelled,
      f.rocket.tankLevelOnStart
    );
    const currentFoodLevel = updateCurrentFood(
      f.distance,
      distanceTravelled,
      f.rocket.foodLevelOnStart
    );
    // landed, emit - landed to frontend
    // update database
    return {
      id: f.id,
      name: f.name,
      currentPosition: distanceTravelled,
      currentTankLevel,
      currentFoodLevel,
      status: f.status,
    };
  });
};

const renderFlights = (io, socket, flyingFlights) => {
  console.log(_abortedFlights.aborted);

  let filteredFlights = flyingFlights;
  if (_abortedFlights.aborted) {
    filteredFlights = flyingFlights.filter(
      (f) => f.name !== _abortedFlights.name
    );
  }
  if (filteredFlights.length === 0) return;

  const currentData = updateCurrentData(filteredFlights, socket, io);
  io.emit("currentData", currentData);
  setTimeout(() => renderFlights(io, socket, filteredFlights), 2000);

  // when the flight gets back to earth
  // if (distanceTravelled === flightDistance) {
  //   socket.emit("landed", {
  //     id,
  //     flightName,
  //     status: "landed",
  //   });
  //   return;
  // }
};

// create new flight

// start the flight on the take off time
// setTimeout(() => {
//   updateCurrentData(params);
// }, takeOff - Date.now);

// listen for destroyed events
// update global destroyed variable
// let destroyed = false;
// socket.on("destroyed", () => {
//   destroyed = true;
// });

// when the client signes in
// when socket connection gets established
// if (currentFlights) start up the mock rendering engine

module.exports = { renderFlights };
