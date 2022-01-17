import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <StyledFooter>
      <p>Houston 2021</p>
      <div className="mask">
        <svg
          width="100%"
          height="50px"
          viewBox="-26.52 904.801 1900 49.753"
          preserveAspectRatio="none"
        >
          {/* <clipPath id="clipFooter"> */}
          <path
            fill="white"
            d="M-26.52,904.801v36.888c0,0,81.055-33.42,341.055-32.677c325.121,0.929,597.982,46.808,1027.983,45.515
	c387.998-1.167,530.962-30.343,530.962-30.343v-19.383H-26.52z"
          />
          {/* </clipPath> */}
        </svg>
      </div>
    </StyledFooter>
  );
}

const StyledFooter = styled.div`
  max-width: 2200px;
  margin: 0 auto;
  height: 100px;
  background-color: #191e3b;
  position: relative;

  overflow: hidden;

  // clip-path: url(#clipFooter);

  p {
    text-align: center;
    color: white;
    position: relative;
    z-index: 1;
    margin-top: 60px;

    font-variant: small-caps;
    font-size: 20px;
    color: #e6e7e8;
    font-family: "JohnSans Lite Pro";
  }

  .mask {
    background-color: #191e3b;

    // clip-path: url(#clipFooter);
    // clip-path: path("M 0 200 L 0,75 A 5,5 0,0,1 150,75 L 200 200 z");
    // clip-path: path(
    //   "M-26.52 904.801v36.888s81.055-33.42 341.055-32.677c325.121.929 597.982 46.808 1027.983 45.515 387.998-1.167 530.962-30.343 530.962-30.343v-19.383h-1900z"
    // );

    position: absolute;
    top: -1px;
    height: 100%;
    width: 100%;

    svg {
      position: absolute;
      // top: 0px;
    }
  }
`;

export default Footer;
