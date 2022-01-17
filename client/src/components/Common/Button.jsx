import React from "react";
import styled from "styled-components";

function Button(props) {
  return <StyledButton>{props.children}</StyledButton>;
}

const StyledButton = styled.button`
  text-transform: uppercase;
  font-family: "JohnSans Lite Pro";
  font-weight: bold;
  border: none;
  cursor: pointer;
  background-color: #f7931d;
  padding: 0.4rem 0.7rem;
  color: white;
  border-radius: 0.5rem;
  font-size: 17px;
`;

export default Button;
