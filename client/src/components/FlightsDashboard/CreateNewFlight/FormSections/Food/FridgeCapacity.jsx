import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";

function FridgeCapacity() {
  const selectedRocket = useSelector((state) => state.newFlight.rocket);

  return (
    <StyledFridgeCapacity>
      <label>Fridge Capacity</label>
      <span>
        {selectedRocket?.fridgeCapacity
          ? `${selectedRocket.fridgeCapacity} kg`
          : "select a rocket first"}
      </span>
    </StyledFridgeCapacity>
  );
}

const StyledFridgeCapacity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #191e3b16;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;
`;

export default FridgeCapacity;
