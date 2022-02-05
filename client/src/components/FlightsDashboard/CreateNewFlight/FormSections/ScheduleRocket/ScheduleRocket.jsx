import React from "react";
import DivideFlights from "../../../../CommonSignedIn/DivideFlights";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../../../store/reducers/notificationReducer";
import { setCompleted } from "../../../../../store/reducers/newFlightReducer";

import Name from "./Name";
import Distance from "./Distance";
import Rocket from "./Rocket";
import TakeOffTimeDate from "./TakeOffTime";
import TouchDown from "./TouchDown";
import Duration from "./Duration";

function ScheduleRocket() {
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notification.schedule);
  const newFlight = useSelector((state) => state.newFlight);

  useEffect(() => {
    dispatch(setNotification("schedule", "fill out all the info"));
  }, []);

  useEffect(() => {
    if (!newFlight.allowStart?.schedule) return;

    const entries = [];
    Object.entries(newFlight.allowStart.schedule).forEach(([key, value]) => {
      if (value === false) {
        entries.push(key);
        return;
      }
    });

    if (entries.length === 0) {
      dispatch(setCompleted("schedule", true));
      dispatch(setNotification("schedule", "schedule&rocket ok"));
    } else if (notify === "" && entries.length !== 0) {
      dispatch(setCompleted("schedule", false));
      dispatch(setNotification("schedule", "fill out all the info"));
    } else {
      dispatch(setCompleted("schedule", false));
    }
  }, [newFlight.allowStart?.schedule]);

  return (
    <>
      <DivideFlights>schedule&rocket</DivideFlights>
      <StyledFormSection>
        <Name />
        <TakeOffTimeDate />
        <Distance />
        <Rocket />
        <TouchDown />
        <Duration />

        <StyledNotification bgColor={newFlight.completed?.schedule}>
          {notify}
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

  .time {
    width: 95px;
  }

  .date {
    width: 125px;
  }

  .grow {
    flex-grow: 1;
  }
`;

export default ScheduleRocket;
