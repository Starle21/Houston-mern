import React from "react";
import styled from "styled-components";
import Button from "../Common/Button";
import { Link } from "react-router-dom";

function Title({ title }) {
  const link = title.toLowerCase();

  return (
    <StyledTitle>
      <div className="borders">
        <div className="heading">
          <Link to={`/in/${link}/new`}>
            <Button>+ new</Button>
          </Link>
          <h1>{title}</h1>
        </div>
        <div className="divider"></div>
      </div>
    </StyledTitle>
  );
}

const StyledTitle = styled.div`
  font-family: "JohnSans Lite Pro";
  font-weight: bold;
  font-size: 25px;
  text-transform: uppercase;

  padding-top: 180px;

  .borders {
    max-width: 1400px;
    margin: 0 auto;
    // background-color: brown;
  }

  .heading {
    display: flex;
    align-items: baseline;
  }

  h1 {
    margin: 0 auto;
    text-align: center;
  }

  .divider {
    background-color: #191e3b;
    height: 0.05rem;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 1.5rem;
  }
`;

export default Title;
