import React from "react";
import styled from "styled-components";
import { Breakpoints } from "../../styles/Breakpoints";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <StyledNavigation className="navigation">
      <ul>
        <li>
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" fill="white" />
          </svg>
          <Link to="/in/flights">flights</Link>
        </li>
        <li>
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" fill="white" />
          </svg>
          <Link to="/in/astronauts">astronauts</Link>
        </li>
        <li>
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" fill="white" />
          </svg>
          <Link to="/in/rockets">rockets</Link>
        </li>
      </ul>
      <div className="avatar">
        <svg height="50" width="50">
          <circle cx="25" cy="25" r="25" fill="white" />
        </svg>
      </div>
      <div>
        <svg role="presentation">
          <clipPath
            id="clip"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.000526316 0.0046)"
          >
            <path
              d="M1900,69.091c0,0-149.336,45.467-423.325,47.045c-364.057,2.096-855.025-42.1-1136,1.597
                C145.997,148.009,0,175.025,0,175.025V0h1900V69.091z"
            />
          </clipPath>
        </svg>
      </div>
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  position: fixed;
  width: 100%;

  z-index: 100;
  color: white;
  background-color: #191e3b;

  padding-top: 2.5rem;

  font-family: "JohnSans Lite Pro";
  font-weight: bold;

  text-transform: uppercase;
  font-size: 15px;

  clip-path: url(#clip);

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
    justify-content: center;
    gap: 3.5rem;

    margin: 0;
    padding: 0;

    list-style: none;

    margin-top: 10px;

    li {
      padding: 0.5rem;
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }

  .avatar {
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 25px;
    margin-top: 30px;
  }
`;

export default Navigation;
