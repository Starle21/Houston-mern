import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

function RocketLoadCapacity() {
  const rocketLoad = useSelector((state) => state.newFlight?.rocket?.load);
  return (
    <StyledRocketLoadCapacity>
      <label>Rocket's load bearing capacity</label>
      <span>{rocketLoad ? `${rocketLoad} kg` : "no rocket"}</span>
    </StyledRocketLoadCapacity>
  );
}

const StyledRocketLoadCapacity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #191e3b16;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;
`;

export default RocketLoadCapacity;
