import React, { useState, useEffect } from "react";
import DivideFlights from "../../../CommonSignedIn/DivideFlights";
import styled from "styled-components";

function Fuel({
  selectedRocket,
  setSelectedRocket,
  fuelForFlight,
  setCompletedParts,
  completedParts,
}) {
  const [notification, setNotification] = useState();

  //   set notifications
  useEffect(() => {
    if (!selectedRocket) return setNotification("No rocket selected");
    if (selectedRocket.tankLevelForStart < fuelForFlight) {
      setCompletedParts({ ...completedParts, fuel: false });
      setNotification("not enough fuel");
    }
    if (fuelForFlight > selectedRocket.tankCapacity) {
      setCompletedParts({ ...completedParts, fuel: false });
      setNotification("too small a tank");
    }
    if (
      fuelForFlight <= selectedRocket.tankLevelForStart &&
      fuelForFlight < selectedRocket.tankCapacity
    ) {
      setCompletedParts({ ...completedParts, fuel: true });
      setNotification("Fuel part ok");
    }
    if (
      selectedRocket.tankLevelForStart >
      fuelForFlight + fuelForFlight * 0.1
    ) {
      setCompletedParts({ ...completedParts, fuel: false });
      setNotification("Take fuel out");
    }
  }, [selectedRocket, fuelForFlight, notification]);

  // clicking on add fuel button to crank up the current fuel level
  const addFuel = (e) => {
    e.preventDefault();
    const volume = fuelForFlight + fuelForFlight * 0.1;
    if (fuelForFlight > selectedRocket.tankCapacity) {
      setCompletedParts({ ...completedParts, fuel: false });
      setNotification("Not allowed, tank is too small for the flight");
      return;
    }
    if (volume > selectedRocket.tankCapacity) {
      setCompletedParts({ ...completedParts, fuel: true });
      setSelectedRocket({
        ...selectedRocket,
        tankLevelForStart: fuelForFlight,
      });
    } else {
      setCompletedParts({ ...completedParts, fuel: true });
      setSelectedRocket({ ...selectedRocket, tankLevelForStart: volume });
    }

    // add local fuel
    // when submitting the form, update remote database
    // ----
    // ?? how to update current fuel when it's flying? - updates only locally
    // date.now vs takeoff date, touch down - updates every 2 sec - reqAnimationFrame ?
  };

  const removeFuel = (e) => {
    e.preventDefault();
    setSelectedRocket({
      ...selectedRocket,
      tankLevelForStart: fuelForFlight + fuelForFlight * 0.1,
    });
  };

  return (
    <>
      <DivideFlights>check fuel</DivideFlights>
      <StyledFormSection>
        <div className="item calc">
          <label>Fuel consumption</label>
          <span>
            {selectedRocket
              ? `${selectedRocket.consumption} l/km`
              : "select rocket first"}
          </span>
        </div>
        <div className="item calc">
          <label className="grow">Fuel tank capacity</label>
          <span>
            {selectedRocket
              ? `${selectedRocket.tankCapacity} l`
              : "select rocket first"}
          </span>
        </div>
        <div className="item calc">
          <label className="grow">Required fuel for the flight:</label>
          <span>{fuelForFlight} l</span>
        </div>
        <div className="item">
          <label>Current tank level</label>
          <div className="addFuel">
            {" "}
            {selectedRocket
              ? `${selectedRocket.tankLevelForStart} l`
              : "select rocket first"}
            <button onClick={addFuel}> add fuel</button>
            <button onClick={removeFuel}> remove fuel</button>
          </div>
        </div>

        <div className="notification">{notification}</div>
      </StyledFormSection>
    </>
  );
}

const StyledFormSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  margin: 0 auto;

  .item {
    display: flex;
    justify-content: space-between;
    border: 1px solid #f7911d54;
    padding: 0.5rem 1.5rem;
    margin: 2px 0;
  }

  .calc {
    border: 1px solid #191e3b16;
  }

  .grow {
    flex-grow: 1;
  }

  .notification {
    margin-top: 1rem;
    align-self: center;
  }

  .addFuel {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }
`;

export default Fuel;
