import React from "react";
import styled from "styled-components";

function DivideFlights(props) {
  return (
    <StyledDivideFlights>
      <hr />
      <h3>{props.children}</h3>
    </StyledDivideFlights>
  );
}

const StyledDivideFlights = styled.div`
  font-family: "JohnSans Lite Pro";
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;

  hr {
    width: 100%;
    border-top: 0.02rem dashed #191e3b;
    grid-column: 1/2;
    grid-row: 1/2;
  }

  h3 {
    grid-column: 1/2;
    grid-row: 1/2;
    background-color: white;
    padding: 0.5rem 0.8rem;
  }
`;

export default DivideFlights;
