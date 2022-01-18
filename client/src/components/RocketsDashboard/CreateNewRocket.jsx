import React from "react";
import styled from "styled-components";

function CreateNewRocket() {
  return (
    <StyledNewRocket>
      <p>New rocket</p>
      <p>Not implemented yet</p>
    </StyledNewRocket>
  );
}

const StyledNewRocket = styled.div`
  font-family: "JohnSans Lite Pro";
  font-size: 25px;

  padding-top: 180px;

  max-width: 1400px;
  margin: 0 auto;

  text-align: center;
`;

export default CreateNewRocket;
