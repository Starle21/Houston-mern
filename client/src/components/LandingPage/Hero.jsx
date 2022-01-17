import React from "react";
import styled from "styled-components";
import { Breakpoints } from "../../styles/Breakpoints";
import imgRocket from "../../assets/images/rocket.svg";
import imgWave from "../../assets/images/wave.svg";
import imgStars from "../../assets/images/stars.svg";

function Hero() {
  return (
    <StyledHero>
      <div className="borders">
        <div className="title-left">
          <h1>Houston</h1>
        </div>
        <div className="title-right">
          <h2>
            space flights <br /> control center
          </h2>
          <p>
            Plan the way into cosmos and back! Schedule new flights <br /> for
            your astronauts, keep track of the current ones and take care
            <br /> of your entire fleet and crew
          </p>
        </div>
      </div>
      <img src={imgRocket} alt="" />
      <div className="stars"></div>
      <div className="wave"></div>
      <div className="mask">
        <svg
        // x="0px"
        // y="0px"
        // width="0"
        // height="0"
        // viewBox="0 0 1900 343"
        // viewbox="0 0 500 500"
        // preserveAspectRatio="none"
        >
          <clipPath
            id="clip"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.000526316 0.002915452)"
          >
            <path
              d="M343.055,112.037C144.95,188.899,0.003,342.966,0,342.969h1900v-343c0,0-183.001,126.736-369.001,128.737
              C1197.862,132.288,935.055-117.651,343.055,112.037z"
            />
          </clipPath>
        </svg>
      </div>
    </StyledHero>
  );
}

const StyledHero = styled.header`
  height: 1260px;
  background-color: #191e3b;
  color: white;

  width: 100%;

  overflow: hidden;

  position: relative;

  .borders {
    display: flex;
    gap: 2rem;

    // margin: 0 15rem;
    max-width: 1430px;
    margin: 0 auto;

    position: relative;
    z-index: 4;

    .title-left {
      flex-basis: 50%;
      padding-top: 5rem;
      padding-left: 2rem;
      font-size: 50px;
      font-variant: small-caps;
      font-family: "JohnSans Black Pro";

      h1 {
        position: relative;
      }

      h1::after {
        content: "";
        position: absolute;
        height: 10px;
        width: 400px;
        border-radius: 5px;
        background: linear-gradient(to right, #fbb04000, #f15a29);
        bottom: 0;
        left: 110px;
      }
    }

    .title-right {
      flex-basis: 50%;
      padding-top: 36rem;

      h2 {
        text-transform: uppercase;
        font-size: 40px;
        line-height: 1.2;
        font-family: "JohnSans Black Pro";
        margin-bottom: 0.5rem;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          height: 8px;
          width: 400px;
          border-radius: 5px;
          background: linear-gradient(to left, #fbb04000, #f15a29);
          bottom: -8px;
          left: -50px;
        }
      }

      p {
        font-variant: small-caps;
        font-size: 20px;
        color: #e6e7e8;
        font-family: "JohnSans Lite Pro";
      }
    }
  }

  @media (${Breakpoints.deskXL}) {
    width: 2200px;
    margin: 0 auto;
  }

  img {
    position: absolute;
    top: 5rem;
    // left: 0;

    // right: 28rem;
    z-index: 3;
    // width: 75%;
  }

  .stars {
    position: absolute;
    background-image: url(${imgStars});
    width: 100%;
    height: 100%;
    z-index: 2;
    // top: 10rem;
    bottom: 0px;
    background-repeat: repeat-x;
  }

  .wave {
    position: absolute;
    background-image: url(${imgWave});
    width: 100%;
    height: 375px;
    z-index: 1;
    // top: 10rem;
    bottom: 0px;
    background-repeat: no-repeat;
  }

  .mask {
    position: absolute;
    bottom: -4px;
    width: 120%;
    // max-width: 2200px;
    height: 347px;
    background-color: white;
    clip-path: url(#clip);

    svg {
      // width: 100%;
    }
  }
`;

export default Hero;
