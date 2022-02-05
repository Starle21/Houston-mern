import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { getRockets } from "../../../../../store/reducers/rocketReducer";
import {
  updateNewFlight,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";
import { setNotification } from "../../../../../store/reducers/notificationReducer";

function Rocket() {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets);
  const allowed = useSelector(
    (state) => state.newFlight.allowStart?.schedule?.rocket
  );

  useEffect(() => {
    dispatch(getRockets());
  }, []);

  const handleRocketSelection = (e) => {
    const value = rockets.filter((r) => {
      return r.name === e.target.value;
    })[0];
    dispatch(updateNewFlight("rocket", value));
    checkFormat(value);
  };

  const checkFormat = (value) => {
    if (value === "Select a rocket") {
      dispatch(setNotification("schedule", "Select a rocket!"));
      dispatch(allowStart("schedule", "rocket", false));
    } else {
      dispatch(setNotification("schedule", ""));
      dispatch(allowStart("schedule", "rocket", true));
    }
  };

  const handleFocus = (e) => {
    const value = e.target.value;
    checkFormat(value);
  };

  return (
    <StyledRocket>
      <label>Choose a rocket:</label>
      <StyledSelect
        onChange={handleRocketSelection}
        onFocus={handleFocus}
        allowed={allowed}
        defaultValue="Select a rocket"
      >
        <option value="Select a rocket" disabled>
          Select a rocket
        </option>
        {rockets.map((r) => {
          return (
            <option value={r.name} key={r.id}>
              {r.name}
            </option>
          );
        })}
      </StyledSelect>
    </StyledRocket>
  );
}

const StyledSelect = styled.select`
  padding: 10px;
  border: ${(props) =>
    props.allowed ? "1px solid #fff6ee" : "1px solid #be1e2d"};
  background-color: #fdf9f5;
  font-family: "JohnSans Lite Pro";
  font-size: 15px;
  border-radius: 5px;
  width: 320px;

  &:focus {
    outline: ${(props) =>
      props.allowed ? "2px solid #fccda5" : "1px solid #be1e2d"};
  }
`;

const StyledRocket = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f7911d54;
  padding: 0.5rem 1.5rem;
  margin: 1px 0;
  position: relative;

  /* select {
    padding: 10px;
    border: 0;
    background-color: #fff6ee;
    font-family: "JohnSans Lite Pro";
    font-size: 15px;

    border-radius: 5px;
    width: 320px;
  } */

  option:not(:first-of-type) {
    color: black;
  }
`;

export default Rocket;
