import React from "react";
import styled from "styled-components";

function LoadAstronautRow({ astronaut }) {
  return (
    <StyledFormSection>
      <div>{astronaut.name}</div>
      <div>{astronaut.weight} kg</div>
    </StyledFormSection>
  );
}

const StyledFormSection = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  border: 1px solid #f7911d54;
  padding: 0.5rem 1.5rem;
  margin: 2px 0;
`;

export default LoadAstronautRow;
