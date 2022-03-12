const removeLandedFlights = (takeOffTimeDate, speed, distance) => {
  const now = Date.now();

  const duration = distance / speed; // s
  const formatTakeOff = new Date(takeOffTimeDate);
  const takeOff = formatTakeOff.getTime() / 1000;
  const touchDown = (takeOff + duration) * 1000;

  if (touchDown <= now) {
    return true;
  } else {
    return false;
  }
};

module.exports = { removeLandedFlights };
