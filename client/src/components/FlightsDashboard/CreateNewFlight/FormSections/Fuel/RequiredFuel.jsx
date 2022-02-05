import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  updateNewFlight,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";
import { setNotification } from "../../../../../store/reducers/notificationReducer";

function RequiredFuel() {
  const dispatch = useDispatch();
  const newFlight = useSelector((state) => state.newFlight);
  const reqFuel = useSelector((state) => state.newFlight.requiredFuel);
  const consumption = useSelector(
    (state) => state.newFlight.rocket?.consumption
  );
  const distance = useSelector((state) => state.newFlight.distance);

  const format = (value) => {
    if (!value) return "no rocket or distance";
    return new Intl.NumberFormat("en-US").format(value);
  };

  const checkFormat = (reqFuel) => {
    if (reqFuel > newFlight.rocket.tankCapacity) {
      dispatch(allowStart("fuel", "requiredFuel", false));
      dispatch(
        setNotification("fuel", "Not allowed, tank is too small for the flight")
      );
    } else {
      dispatch(allowStart("fuel", "requiredFuel", true));
      dispatch(setNotification("fuel", ""));
    }
  };

  useEffect(() => {
    if (!distance || !consumption || distance < 1000000)
      return "no distance or rocket";
    const reqFuel = Math.round(distance * consumption);
    dispatch(updateNewFlight("requiredFuel", reqFuel));
    checkFormat(reqFuel);
  }, [distance, consumption, newFlight?.rocket, newFlight.completed?.schedule]);

  return (
    <StyledRequiredFuel>
      <label>Required min. fuel for the flight:</label>
      <span>{`${format(reqFuel)} l`}</span>
    </StyledRequiredFuel>
  );
}

const StyledRequiredFuel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #191e3b16;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;
`;

export default RequiredFuel;
