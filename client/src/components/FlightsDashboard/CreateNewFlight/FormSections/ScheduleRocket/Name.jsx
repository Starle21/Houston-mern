import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  updateNewFlight,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";
import { setNotification } from "../../../../../store/reducers/notificationReducer";
import { getFlights } from "../../../../../store/reducers/flightReducer";

function Name() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.newFlight.name);
  const allFlights = useSelector((state) =>
    state.flights.map((f) => f.name.toLowerCase())
  );

  // update flights state on the first render
  useEffect(() => {
    dispatch(getFlights());
  }, []);

  // name change handler with validation
  const handleNameChange = (e) => {
    const value = e.target.value;
    dispatch(updateNewFlight("name", value));

    if (allFlights.some((f) => f === value)) {
      dispatch(setNotification("schedule", "Name must be unique"));
      dispatch(allowStart("schedule", "name", false));
    } else if (value.length < 4) {
      dispatch(
        setNotification("schedule", "Name must be at least 4 characters long.")
      );
      dispatch(allowStart("schedule", "name", false));
    } else {
      dispatch(setNotification("schedule", ""));
      dispatch(allowStart("schedule", "name", true));
    }
  };

  return (
    <StyledName>
      <label>Mission name:</label>
      <input
        type="text"
        value={name ? name : ""}
        placeholder="Name the new flight"
        onChange={handleNameChange}
      />
    </StyledName>
  );
}

const StyledName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f7911d54;
  padding: 0.5rem 1.5rem;
  margin: 1px 0;

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

export default Name;
