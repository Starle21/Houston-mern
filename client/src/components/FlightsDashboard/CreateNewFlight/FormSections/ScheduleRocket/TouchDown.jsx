import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../../../store/reducers/notificationReducer";
import { updateNewFlight } from "../../../../../store/reducers/newFlightReducer";

function TouchDown() {
  const dispatch = useDispatch();

  const newFlight = useSelector((state) => state.newFlight);
  const touchDownTimeDate = useSelector(
    (state) => state.newFlight.touchDownTimeDate
  );

  useEffect(() => {
    if (
      !newFlight.rocket?.speed ||
      !newFlight.distance ||
      !newFlight.takeOffTimeDate
    ) {
      // dispatch(
      //   setNotification("schedule", "Fill out all the info to calc touch down")
      // );
      return;
    } else {
      // dispatch(setNotification("schedule", ""));
    }
    calcTouchDown(
      newFlight.distance,
      newFlight.rocket.speed,
      newFlight.takeOffTimeDate
    );
  }, [
    newFlight?.distance,
    newFlight?.rocket?.speed,
    newFlight?.takeOffTimeDate,
  ]);

  const calcTouchDown = (distance, speed, takeOffIso) => {
    const duration = distance / speed; // s
    const takeOffDate = new Date(takeOffIso);
    const takeOff = takeOffDate.getTime() / 1000;
    const touchDown = takeOff + duration;
    const touchDownDate = new Date(touchDown * 1000).toISOString();
    dispatch(updateNewFlight("touchDownTimeDate", touchDownDate));
    dispatch(updateNewFlight("duration", duration));
  };

  return (
    <StyledTouchDown>
      Time of touch down:{" "}
      <span>
        {touchDownTimeDate
          ? new Date(touchDownTimeDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "time"}{" "}
        {touchDownTimeDate
          ? new Date(touchDownTimeDate).toLocaleDateString()
          : "date"}
      </span>
    </StyledTouchDown>
  );
}

const StyledTouchDown = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #191e3b16;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;

  .unit {
    position: absolute;
    right: 2rem;
    font-size: 15px;
    background-color: #fff6ee;
  }
`;

export default TouchDown;
