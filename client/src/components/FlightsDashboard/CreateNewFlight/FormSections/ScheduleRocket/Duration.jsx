import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../../../store/reducers/notificationReducer";

function Duration() {
  const duration = useSelector((state) => state.newFlight.duration);

  const formatHours = () => {
    if (!duration) return "?";
    return Math.round(duration / 60 / 60);
  };

  const formatMinutes = () => {
    if (!duration) return "?";
    return Math.round((duration / 60) % 60);
  };

  const formatDays = () => {
    if (!duration) return "?";
    return (duration / 60 / 60 / 24).toFixed(1);
  };

  return (
    <StyledDuration>
      Flight's duration:{" "}
      <span>
        {formatHours()}hrs {formatMinutes()}min {formatDays()}days
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
`;

export default Duration;
