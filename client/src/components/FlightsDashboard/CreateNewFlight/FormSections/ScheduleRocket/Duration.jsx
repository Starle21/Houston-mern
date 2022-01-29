import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../../../store/reducers/notificationReducer";

function Duration() {
  const duration = useSelector((state) => state.newFlight.duration);

  return (
    <StyledDuration>
      Flight's duration:{" "}
      <span>
        {Math.round(duration / 60 / 60)}hrs {Math.round((duration / 60) % 60)}
        min {(duration / 60 / 60 / 24).toFixed(1)}days
      </span>{" "}
    </StyledDuration>
  );
}

// const durationMinutes = (durationSeconds / 60) % 60;
// const durationHours = durationSeconds / 60 / 60;
// const durationDays = durationHours / 24;

// setDurationHours(Math.round(durationHours));
// setDurationMinutes(Math.round(durationMinutes));
// setDurationDays(durationDays.toFixed(1));

const StyledDuration = styled.div`
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

export default Duration;