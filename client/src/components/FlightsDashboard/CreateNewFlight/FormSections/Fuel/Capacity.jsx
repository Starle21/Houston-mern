import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";

function Capacity() {
  const selectedRocket = useSelector((state) => state.newFlight.rocket);

  const format = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <StyledCapacity>
      <label>Fuel tank capacity</label>
      <span>
        {selectedRocket?.tankCapacity
          ? `${format(selectedRocket.tankCapacity)} l`
          : "select a rocket first"}
      </span>
    </StyledCapacity>
  );
}

const StyledCapacity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #191e3b16;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;
`;

export default Capacity;
