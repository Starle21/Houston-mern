import React, { useState, useEffect } from "react";
import DivideFlights from "../../../../CommonSignedIn/DivideFlights";
import styled from "styled-components";
import astronautService from "../../../../../services/astronauts";
import AstronautRow from "./AstronautRow";

import CrewNumber from "./CrewNumber";
import Astronauts from "./Astronauts";

import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "../../../../../store/reducers/notificationReducer";
import { setCompleted } from "../../../../../store/reducers/newFlightReducer";

function SelectAstronauts() {
  // const [notification, setNotification] = useState();

  const newFlight = useSelector((state) => state.newFlight);
  const notification = useSelector((state) => state.notification?.astronauts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!newFlight.allowStart?.astronauts) return;

    if (!newFlight?.completed?.schedule) {
      dispatch(setNotification("astronauts", "Complete the first section"));
      dispatch(setCompleted("astronauts", false));
      return;
    }

    const entries = [];
    Object.entries(newFlight.allowStart.astronauts).forEach(([key, value]) => {
      if (value === false) {
        entries.push(key);
        return;
      }
    });

    if (entries.length === 0) {
      dispatch(setCompleted("astronauts", true));
      dispatch(setNotification("astronauts", "astronauts ok"));
    } else {
      dispatch(
        setNotification("astronauts", "complete the astronauts section")
      );
      dispatch(setCompleted("astronauts", false));
    }
  }, [newFlight.allowStart?.astronauts, newFlight?.completed?.schedule]);

  return (
    <>
      <DivideFlights>Select Astronauts</DivideFlights>
      <StyledFormSection>
        <CrewNumber />
        <Astronauts />

        <StyledNotification bgColor={newFlight.completed?.astronauts}>
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

  .button {
    align-self: stretch;
  }

  .astronaut {
    width: 100%;
  }
`;

export default SelectAstronauts;
