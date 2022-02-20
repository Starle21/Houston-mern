import React, { useState, useEffect } from "react";
import DivideFlights from "../../../../CommonSignedIn/DivideFlights";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../../../store/reducers/notificationReducer";
import { setCompleted } from "../../../../../store/reducers/newFlightReducer";

function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.fuel);
  const newFlight = useSelector((state) => state.newFlight);

  useEffect(() => {
    if (!newFlight.completed) return;
    if (!newFlight.completed.schedule) {
      dispatch(setNotification("fuel", "Complete the previous section first"));
    }
  }, [newFlight?.completed?.schedule]);

  // useEffect(() => {
  //   console.log(notification);
  //   if (!newFlight.completed?.schedule) {
  //     dispatch(setNotification("fuel", "Complete the previous section first"));
  //   }
  // }, [newFlight.completed?.schedule, notification]);

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

  //   if (entries.length === 0) {
  //     //   dispatch(setCompleted("fuel", true));
  //     dispatch(setNotification("fuel", "fuel ok"));
  //   } else if (notification === "" && entries.length !== 0) {
  //     //   dispatch(setCompleted("fuel", false));
  //     //   dispatch(setNotification("schedule", "fill out all the info"));
  //   } else {
  //     dispatch(setCompleted("fuel", false));
  //   }
  // }, [newFlight.allowStart?.fuel]);

  return (
    <StyledNotification bgColor={newFlight.completed?.fuel}>
      {notification}
    </StyledNotification>
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

export default Notification;
