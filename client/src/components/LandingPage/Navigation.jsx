import React from "react";
import styled from "styled-components";
import { Breakpoints } from "../../styles/Breakpoints";

import { Link } from "react-router-dom";

function Navigation() {
  return (
    <StyledNavigation>
      <div className="navigation">
        <ul>
          <li>
            <a href="#about">about</a>
          </li>
          <li>
            {" "}
            <a href="/">sign up</a>
          </li>
          <li>
            <Link to="/in/flights">log in</Link>
          </li>
        </ul>
      </div>
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  position: fixed;
  width: 100%;

  z-index: 100;
  color: white;

  margin-top: 2.5rem;

  font-family: "JohnSans Lite Pro";
  font-weight: bold;

  text-transform: uppercase;
  font-size: 15px;

  a {
    text-decoration: none;
    color: white;
  }

  .navigation {
    @media (${Breakpoints.deskXL}) {
      width: 2200px;
      margin: 0 auto;
    }
  }

  ul {
    display: flex;
    justify-content: flex-end;
    gap: 2rem;

    margin: 0;
    padding: 0;
    margin-right: 5rem;

    list-style: none;

    li {
      padding: 0.5rem;
    }
  }
`;

export default Navigation;
