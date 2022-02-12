import React, { useState, useEffect } from "react";
import DivideFlights from "../../../../CommonSignedIn/DivideFlights";
import styled from "styled-components";

import Consumption from "./Consumption";
import Capacity from "./Capacity";
import RequiredFuel from "./RequiredFuel";
import TankLevel from "./TankLevel";
import Notification from "./Notification";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../../../store/reducers/notificationReducer";
import { setCompleted } from "../../../../../store/reducers/newFlightReducer";

function Fuel({
  selectedRocket,
  setSelectedRocket,
  fuelForFlight,
  setCompletedParts,
  completedParts,
}) {
  const dispatch = useDispatch();
  const newFlight = useSelector((state) => state.newFlight);
  const notification = useSelector((state) => state.notification?.fuel);
  // const [notification, setNotification] = useState();

  // useEffect(() => {
  //   if (!newFlight.completed?.schedule) {
  //     dispatch(setNotification("fuel", "Complete the previous section first"));
  //   }
  // }, [newFlight.completed?.schedule]);

  // console.log("fuel allow", newFlight.allowStart?.fuel);

  // useEffect(() => {
  //   if (!newFlight.allowStart?.fuel) return;

  //   const entries = [];
  //   Object.entries(newFlight.allowStart.fuel).forEach(([key, value]) => {
  //     if (value === false) {
  //       entries.push(key);
  //       return;
  //     }
  //   });

  //   console.log(entries);

  //   if (entries.length === 0 && newFlight.completed?.schedule) {
  //     // dispatch(setCompleted("fuel", true));
  //     dispatch(setNotification("fuel", "fuel ok"));
  //   } else if (notify !== "" && entries.length !== 0) {
  //     // dispatch(setCompleted("schedule", false));
  //     // dispatch(setNotification("schedule", "fill out all the info"));
  //   } else {
  //     // dispatch(setCompleted("schedule", false));
  //   }
  // }, [newFlight.allowStart?.fuel, newFlight.completed?.schedule]);

  //   set notifications
  // useEffect(() => {
  //   if (!selectedRocket) return setNotification("No rocket selected");
  //   if (selectedRocket.tankLevelForStart < fuelForFlight) {
  //     setCompletedParts({ ...completedParts, fuel: false });
  //     setNotification("not enough fuel");
  //   }
  //   if (fuelForFlight > selectedRocket.tankCapacity) {
  //     setCompletedParts({ ...completedParts, fuel: false });
  //     setNotification("too small a tank");
  //   }
  //   if (
  //     fuelForFlight <= selectedRocket.tankLevelForStart &&
  //     fuelForFlight < selectedRocket.tankCapacity
  //   ) {
  //     setCompletedParts({ ...completedParts, fuel: true });
  //     setNotification("Fuel part ok");
  //   }
  //   if (
  //     selectedRocket.tankLevelForStart >
  //     fuelForFlight + fuelForFlight * 0.1
  //   ) {
  //     setCompletedParts({ ...completedParts, fuel: false });
  //     setNotification("Take fuel out");
  //   }
  // }, [selectedRocket, fuelForFlight, notification]);

  // clicking on add fuel button to crank up the current fuel level
  // const addFuel = (e) => {
  //   e.preventDefault();
  //   const volume = fuelForFlight + fuelForFlight * 0.1;
  //   if (fuelForFlight > selectedRocket.tankCapacity) {
  //     setCompletedParts({ ...completedParts, fuel: false });
  //     setNotification("Not allowed, tank is too small for the flight");
  //     return;
  //   }
  //   if (volume > selectedRocket.tankCapacity) {
  //     setCompletedParts({ ...completedParts, fuel: true });
  //     setSelectedRocket({
  //       ...selectedRocket,
  //       tankLevelForStart: fuelForFlight,
  //     });
  //   } else {
  //     setCompletedParts({ ...completedParts, fuel: true });
  //     setSelectedRocket({ ...selectedRocket, tankLevelForStart: volume });
  //   }

  //   // add local fuel
  //   // when submitting the form, update remote database
  //   // ----
  //   // ?? how to update current fuel when it's flying? - updates only locally
  //   // date.now vs takeoff date, touch down - updates every 2 sec - reqAnimationFrame ?
  // };

  // const removeFuel = (e) => {
  //   e.preventDefault();
  //   setSelectedRocket({
  //     ...selectedRocket,
  //     tankLevelForStart: fuelForFlight + fuelForFlight * 0.1,
  //   });
  // };

  // TO DO -----------------
  // fuel completed - no false in allow
  useEffect(() => {
    if (!newFlight.allowStart?.fuel) return;

    const entries = [];
    Object.entries(newFlight.allowStart.fuel).forEach(([key, value]) => {
      if (value === false) {
        entries.push(key);
        return;
      }
    });
    console.log("entries", entries);
    if (entries.length === 0) {
      console.log("fuel compl");
      dispatch(setCompleted("fuel", true));
      dispatch(setNotification("fuel", "fuel ok"));
    } else if (notification === "") {
      dispatch(setNotification("fuel", "0"));
    }
  }, [newFlight.allowStart?.fuel]);

  return (
    <>
      <DivideFlights>check fuel</DivideFlights>
      <StyledFormSection>
        <Consumption />
        <Capacity />
        <RequiredFuel />
        <TankLevel />
        <Notification />

        {/* <div className="item">
          <label>Current tank level</label>
          <div className="addFuel">
            {" "}
            {selectedRocket
              ? `${selectedRocket.tankLevelForStart} l`
              : "select rocket first"}
            <button onClick={addFuel}> add fuel</button>
            <button onClick={removeFuel}> remove fuel</button>
          </div>
        </div> */}
        {/* <StyledNotification bgColor={newFlight.completed?.schedule}> */}
        {/* <StyledNotification>{notify}</StyledNotification> */}

        {/* <div className="notification">{notification}</div> */}
      </StyledFormSection>
    </>
  );
}

const StyledNotification = styled.div`
  margin-top: 1rem;
  margin-bottom: 6rem;
  padding: 1rem 0;
  align-self: center;
  color: white;
  font-weight: bold;
  width: 100%;
  text-align: center;
  background-color: ${(props) => (props.bgColor ? "#61b66c" : "#be1e2d")};
`;

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
