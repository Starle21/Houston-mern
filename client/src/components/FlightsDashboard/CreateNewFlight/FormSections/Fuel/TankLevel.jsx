import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  updateTankLevelForStart,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";
import { setNotification } from "../../../../../store/reducers/notificationReducer";

function TankLevel() {
  const dispatch = useDispatch();
  const newFlight = useSelector((state) => state.newFlight);
  const requiredFuel = useSelector((state) => state.newFlight?.requiredFuel);
  const allowRequiredFuel = useSelector(
    (state) => state.newFlight?.allowStart?.fuel?.requiredFuel
  );
  const currentLevel = useSelector(
    (state) => state.newFlight.rocket?.tankLevelForStart
  );
  const tankLevelForStart = useSelector(
    (state) => state.newFlight.tankLevelForStart
  );

  useEffect(() => {
    dispatch(updateTankLevelForStart(currentLevel));
  }, [newFlight?.rocket]);

  // TO DO ------------------------------------------
  // if rocket changes - fill up the tank check!
  useEffect(() => {
    if (!allowRequiredFuel) return;
    if (!newFlight.completed?.schedule) return;
    // if (allowRequiredFuel) {
    //   dispatch(setNotification("fuel", "true"));
    // } else {
    //   dispatch(setNotification("fuel", "false"));
    // }
    if (tankLevelForStart < requiredFuel) {
      dispatch(setNotification("fuel", "Fill up the tank"));
    } else {
      dispatch(setNotification("fuel", "level ok"));
    }
  }, [
    allowRequiredFuel,
    newFlight.completed?.schedule,
    newFlight.rocket?.name,
  ]);

  // useEffect(() => {
  //   if (
  //     newFlight.allowStart?.fuel.requiredFuel &&
  //     tankLevelForStart < requiredFuel
  //   ) {
  //     dispatch(allowStart("fuel", "tankLevelForStart", false));
  //     dispatch(setNotification("fuel", "Fill up the fuel"));
  //   } else if (
  //     newFlight.allowStart?.fuel.requiredFuel &&
  //     tankLevelForStart >= requiredFuel
  //   ) {
  //     dispatch(allowStart("fuel", "tankLevelForStart", true));
  //     dispatch(setNotification("fuel", ""));
  //   }
  // }, [
  //   newFlight.allowStart?.fuel.requiredFuel,
  //   newFlight.completed?.schedule,
  //   newFlight?.rocket,
  //   newFlight?.requiredFuel,
  // ]);

  const addFuel = (e) => {
    e.preventDefault();

    if (!newFlight.completed?.schedule || !allowRequiredFuel) return;

    dispatch(allowStart("fuel", "tankLevelForStart", true));
    dispatch(updateTankLevelForStart(requiredFuel));
    dispatch(setNotification("fuel", "add level ok"));

    // const volume = Math.round(requiredFuel * 1.1);

    // if (
    //   newFlight.allowStart.fuel.requiredFuel &&
    //   volume > newFlight.rocket.tankCapacity
    // ) {
    //   dispatch(allowStart("fuel", "tankLevelForStart", false));
    //   dispatch(updateTankLevelForStart(requiredFuel));
    // } else {
    //   dispatch(allowStart("fuel", "tankLevelForStart", true));
    //   dispatch(updateTankLevelForStart(volume));
    // }
  };

  const format = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <StyledTankLevel>
      <label>Fuel level before start</label>
      <div>
        {tankLevelForStart
          ? `${format(tankLevelForStart)} l`
          : "complete the first section"}
      </div>
      <div className="addFuel">
        <button onClick={addFuel}> set fuel for the flight </button>
      </div>
    </StyledTankLevel>
  );
}

const StyledTankLevel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f7911d54;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;

  .addFuel {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }
`;

export default TankLevel;
