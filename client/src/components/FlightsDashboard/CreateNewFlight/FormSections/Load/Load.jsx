import React, { useState, useEffect } from "react";
import DivideFlights from "../../../../CommonSignedIn/DivideFlights";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "../../../../../store/reducers/notificationReducer";
import { setCompleted } from "../../../../../store/reducers/newFlightReducer";

import LoadAstronautRow from "./LoadAstronautRow";

import FoodWeight from "./FoodWeight";
import AstronautsWeight from "./AstronautsWeight";
import TotalWeight from "./TotalWeight";
import RocketLoadCapacity from "./RocketLoadCapacity";

function Load() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification?.load);
  const newFlight = useSelector((state) => state.newFlight);

  useEffect(() => {
    if (!newFlight.allowStart?.load) return;
    if (
      !newFlight?.completed?.schedule ||
      !newFlight?.completed?.astronauts ||
      !newFlight?.completed?.food
    ) {
      dispatch(setNotification("load", "Complete the previous sections"));
      dispatch(setCompleted("load", false));
      return;
    }

    const entries = [];
    Object.entries(newFlight.allowStart.load).forEach(([key, value]) => {
      if (value === false) {
        entries.push(key);
        return;
      }
    });
    console.log(entries);

    if (entries.length === 0) {
      dispatch(setCompleted("load", true));
      dispatch(setNotification("load", "load ok"));
      // setNotification("load ok");
    } else {
      dispatch(
        setNotification(
          "load",
          "The rocket is overloaded. Make it lighter (eg. take food out)"
        )
      );
      dispatch(setCompleted("load", false));
    }
  }, [
    newFlight?.completed?.schedule,
    newFlight?.completed?.astronauts,
    newFlight?.completed?.food,
    newFlight.allowStart?.load,
  ]);

  return (
    <>
      <DivideFlights>Check Load</DivideFlights>
      <StyledFormSection>
        <FoodWeight />
        <AstronautsWeight />
        <TotalWeight />
        <RocketLoadCapacity />
        <StyledNotification bgColor={newFlight.completed?.load}>
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
`;

export default Load;
