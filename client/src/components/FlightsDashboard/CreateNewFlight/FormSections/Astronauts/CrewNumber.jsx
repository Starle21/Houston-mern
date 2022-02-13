import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

function CrewNumber() {
  const crewNumber = useSelector(
    (state) => state.newFlight?.rocket?.numberCrew
  );
  return (
    <StyledCrewNumber>
      <label>Crew number</label>
      <span>
        {crewNumber ? `${crewNumber} people` : "select a rocket first"}
      </span>
    </StyledCrewNumber>
  );
}

const StyledCrewNumber = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #191e3b16;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;
`;

export default CrewNumber;
