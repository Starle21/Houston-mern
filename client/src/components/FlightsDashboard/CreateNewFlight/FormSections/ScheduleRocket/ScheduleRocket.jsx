import React from "react";
import DivideFlights from "../../../../CommonSignedIn/DivideFlights";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import rocketService from "../../../../../services/rockets";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../../../store/reducers/notificationReducer";
import { setCompleted } from "../../../../../store/reducers/newFlightReducer";

import Name from "./Name";
import Distance from "./Distance";
import Rocket from "./Rocket";
import TakeOffTimeDate from "./TakeOffTime";
import TouchDown from "./TouchDown";
import Duration from "./Duration";

function ScheduleRocket({
  selectedRocket,
  setFuelForFlight,
  setCompletedParts,
  completedParts,
  distance,
  name,
}) {
  const validateRef = useRef([]);
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notification.schedule);
  const newFlight = useSelector((state) => state.newFlight);

  useEffect(() => {
    if (
      !newFlight.name ||
      !newFlight.takeOffTimeDate ||
      !newFlight.distance ||
      !newFlight.rocket
    ) {
      // setCompletedParts({ ...completedParts, schedule: false });
      // setCompletedParts(false);
      // dispatch(setNotification("schedule", "Fill out all the info"));
      return;
    } else {
      // setCompletedParts({ ...completedParts, schedule: true });
      // setCompletedParts(true);
      // dispatch(setNotification("schedule", "Schedule&Rocket OK"));
    }
  }, [newFlight]);

  useEffect(() => {
    dispatch(setNotification("schedule", "fill out all the info"));
  }, []);

  // if allowed find false true
  // run check function from that component

  // if allowed find false false
  // set completed true
  useEffect(() => {
    if (!newFlight.allowStart?.schedule) return;
    if (!validateRef.current) return;

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

      // const index = validateRef.current
      //   .map((el, index) => {
      //     if (el.key === entries[0]) return index;
      //     else return null;
      //   })
      //   .filter((el) => el !== null)[0];
      // validateRef.current[index].checkFormat(newFlight[entries[0]]);
    } else {
      dispatch(setCompleted("schedule", false));
    }
  }, [newFlight.allowStart?.schedule]);

  // useEffect(() => {
  //   if (!name || !time || !date || !distance || !selectedRocket) {
  //     // setCompletedParts({ ...completedParts, schedule: false });
  //     setCompletedParts(false);
  //     return setNotification("Fill out all the info");
  //   } else {
  //     // setCompletedParts({ ...completedParts, schedule: true });
  //     setCompletedParts(true);
  //     setNotification("Schedule&Rocket OK");
  //   }
  // }, [name, time, date, distance, selectedRocket, notification]);

  useEffect(() => {
    if (!selectedRocket) return;
    setFuelForFlight(distance * selectedRocket.consumption);
  }, [selectedRocket, distance]);

  return (
    <>
      <DivideFlights>schedule&rocket</DivideFlights>
      <StyledFormSection>
        <Name
          ref={(element) => {
            validateRef.current[0] = element;
          }}
        />
        <TakeOffTimeDate
          ref={(element) => {
            validateRef.current[1] = element;
          }}
        />
        <Distance
          ref={(element) => {
            validateRef.current[2] = element;
          }}
        />
        <Rocket
          ref={(element) => {
            validateRef.current[3] = element;
          }}
        />
        <TouchDown />
        <Duration />
        {/* <div className="notification">{notification}</div> */}
        <div className="notification">{notify}</div>
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

  .time {
    width: 95px;
  }

  .date {
    width: 125px;
  }

  .grow {
    flex-grow: 1;
  }

  .notification {
    margin-top: 1rem;
    align-self: center;
    height: 7rem;
  }
`;

export default ScheduleRocket;
