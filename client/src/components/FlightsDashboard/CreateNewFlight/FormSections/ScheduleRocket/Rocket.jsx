import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { getRockets } from "../../../../../store/reducers/rocketReducer";
import { updateNewFlight } from "../../../../../store/reducers/newFlightReducer";

function Rocket() {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets);

  useEffect(() => {
    dispatch(getRockets());
  }, []);

  const handleRocketSelection = (e) => {
    const value = rockets.filter((r) => {
      return r.name === e.target.value;
    })[0];
    dispatch(updateNewFlight("rocket", value));
  };

  return (
    <StyledRocket>
      <label>Choose a rocket:</label>
      <select onChange={handleRocketSelection}>
        <option disabled selected id="first">
          Select a rocket
        </option>
        {rockets.map((r) => {
          return (
            <option value={r.name} key={r.id}>
              {r.name}
            </option>
          );
        })}
      </select>
    </StyledRocket>
  );
}

const StyledRocket = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f7911d54;
  padding: 0.5rem 1.5rem;
  margin: 1px 0;
  position: relative;

  select {
    padding: 10px;
    border: 0;
    background-color: #fff6ee;
    font-family: "JohnSans Lite Pro";
    font-size: 15px;

    border-radius: 5px;
    width: 320px;
  }

  option:not(:first-of-type) {
    color: black;
  }
`;

export default Rocket;
