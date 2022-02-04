import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  updateNewFlight,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";
import { setNotification } from "../../../../../store/reducers/notificationReducer";

function Distance() {
  const dispatch = useDispatch();
  const distance = useSelector((state) => state.newFlight.distance);
  const allowed = useSelector(
    (state) => state.newFlight.allowStart?.schedule?.distance
  );

  const handleDistanceChange = (e) => {
    const value = Number(e.target.value.replace(/\D+/g, ""));
    dispatch(updateNewFlight("distance", value));
    checkFormat(value);
  };

  const checkFormat = (value) => {
    if (value < 1000000) {
      dispatch(
        setNotification("schedule", "Distance must be at least 1 000 000 km")
      );
      dispatch(allowStart("schedule", "distance", false));
    } else {
      dispatch(setNotification("schedule", ""));
      dispatch(allowStart("schedule", "distance", true));
    }
  };

  const handleFocus = (e) => {
    const value = Number(e.target.value.replace(/\D+/g, ""));
    checkFormat(value);
  };

  return (
    <StyledDistance>
      <label className="grow">Distance:</label>
      <StyledInput
        type="text"
        placeholder="Enter distance"
        value={distance ? new Intl.NumberFormat("en-US").format(distance) : ""}
        onChange={handleDistanceChange}
        onFocus={handleFocus}
        allowed={allowed}
      />
      <div className="unit">KM</div>
    </StyledDistance>
  );
}

const StyledInput = styled.input`
  padding: 10px;
  border: ${(props) =>
    props.allowed ? "1px solid #fff6ee" : "1px solid #be1e2d"};
  background-color: #fdf9f5;
  font-family: "JohnSans Lite Pro";
  font-size: 15px;
  border-radius: 5px;
  width: 300px;

  &:focus {
    outline: ${(props) =>
      props.allowed ? "2px solid #fccda5" : "1px solid #be1e2d"};
  }
`;

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

  /* input[type="text"] {
    padding: 10px;
    border: 0;
    background-color: #fff6ee;
    font-family: "JohnSans Lite Pro";
    font-size: 15px;

    border-radius: 5px;
    width: 300px;
  } */
`;

export default Distance;
