import React from "react";
import styled from "styled-components";

function Flight({ flight }) {
  return <StyledFlight>{flight.distance}</StyledFlight>;
}

const StyledFlight = styled.div`
  height: 100px;
  background-color: #191e3b;
  margin: 10px 0;
  color: white;
`;

export default Flight;
