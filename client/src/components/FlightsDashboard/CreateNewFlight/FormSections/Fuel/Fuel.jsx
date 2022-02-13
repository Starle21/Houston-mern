import React, { useState, useEffect } from "react";
import DivideFlights from "../../../../CommonSignedIn/DivideFlights";
import styled from "styled-components";

import Consumption from "./Consumption";
import Capacity from "./Capacity";
import RequiredFuel from "./RequiredFuel";
import TankLevel from "./TankLevel";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../../../store/reducers/notificationReducer";
import { setCompleted } from "../../../../../store/reducers/newFlightReducer";

function Fuel() {
  const dispatch = useDispatch();
  const newFlight = useSelector((state) => state.newFlight);
  const notification = useSelector((state) => state.notification?.fuel);

  useEffect(() => {
    if (!newFlight.allowStart?.fuel) return;

    if (!newFlight?.completed?.schedule) {
      dispatch(setNotification("fuel", "Complete the first section"));
      dispatch(setCompleted("fuel", false));
      return;
    }

    const entries = [];
    Object.entries(newFlight.allowStart.fuel).forEach(([key, value]) => {
      if (value === false) {
        entries.push(key);
        return;
      }
    });
    console.log(entries);

    if (entries.length === 0) {
      dispatch(setCompleted("fuel", true));
      dispatch(setNotification("fuel", "fuel ok"));
    } else {
      dispatch(setNotification("fuel", "complete the fuel section"));
      dispatch(setCompleted("fuel", false));
    }
  }, [newFlight.allowStart?.fuel, newFlight?.completed?.schedule]);

  return (
    <>
      <DivideFlights>check fuel</DivideFlights>
      <StyledFormSection>
        <Consumption />
        <Capacity />
        <RequiredFuel />
        <TankLevel />

        <StyledNotification bgColor={newFlight.completed?.fuel}>
          {notification}
        </StyledNotification>
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
