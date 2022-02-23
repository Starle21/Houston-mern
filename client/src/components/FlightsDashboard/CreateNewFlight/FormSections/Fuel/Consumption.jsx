import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";

function Consumption() {
  const selectedRocket = useSelector((state) => state.newFlight.rocket);

  return (
    <StyledConsumption>
      <label>Fuel consumption</label>
      <span>
        {selectedRocket?.consumption
          ? `${selectedRocket.consumption} l/km`
          : "select a rocket first"}
      </span>
    </StyledConsumption>
  );
}

const StyledConsumption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #191e3b16;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;
`;

export default Consumption;
