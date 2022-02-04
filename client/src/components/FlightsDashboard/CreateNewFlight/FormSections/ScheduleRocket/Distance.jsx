import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { updateNewFlight } from "../../../../../store/reducers/newFlightReducer";
import { setNotification } from "../../../../../store/reducers/notificationReducer";

function Distance() {
  const dispatch = useDispatch();
  const distance = useSelector((state) => state.newFlight.distance);

  const handleDistanceChange = (e) => {
    const value = Number(e.target.value.replace(/\D+/g, ""));
    dispatch(updateNewFlight("distance", value));

    if (value < 1000000) {
      dispatch(
        setNotification("schedule", "Distance must be at least 1 000 000 km")
      );
    } else {
      dispatch(setNotification("schedule", ""));
    }
  };

  return (
    <StyledDistance>
      <label className="grow">Distance:</label>
      <input
        type="text"
        placeholder="Enter distance"
        value={distance ? new Intl.NumberFormat("en-US").format(distance) : ""}
        onChange={handleDistanceChange}
      />
      <div className="unit">KM</div>
    </StyledDistance>
  );
}

const StyledDistance = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f7911d54;
  padding: 0.5rem 1.5rem;
  margin: 1px 0;
  position: relative;

  .unit {
    position: absolute;
    right: 2rem;
    font-size: 15px;
    background-color: #fff6ee;
  }

  input[type="text"] {
    padding: 10px;
    border: 0;
    background-color: #fff6ee;
    font-family: "JohnSans Lite Pro";
    font-size: 15px;

    border-radius: 5px;
    width: 300px;
  }
`;

export default Distance;
