import React from "react";
import styled from "styled-components";

function CreateNewAstronaut() {
  return (
    <StyledNewAstronaut>
      <p>New Astronaut</p>
      <p>Not implemented yet</p>
    </StyledNewAstronaut>
  );
}

const StyledNewAstronaut = styled.div`
  font-family: "JohnSans Lite Pro";
  font-size: 25px;

  padding-top: 180px;

  max-width: 1400px;
  margin: 0 auto;

  text-align: center;
`;

export default CreateNewAstronaut;
