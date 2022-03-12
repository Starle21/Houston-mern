import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const Range = ({ total, unit, data }) => {
  const progressBarRef = useRef();
  const currentReadOut = useRef();

  const positionReadOut = () => {
    // console.log("data", data, total);
    const position = (data / total) * 100;
    if (position < 10) {
      return 5;
    } else {
      return position;
    }
  };

  const colorReadOut = () => {
    const position = (data / total) * 100;

    if (position < 6) {
      return "#f7931d";
    } else {
      return "white";
    }
  };

  useEffect(() => {
    progressBarRef.current.max = total;
  }, [total]);

  useEffect(() => {
    // console.log("data", data, total, positionReadOut());
    // console.log(data);
    progressBarRef.current.value = data;
    progressBarRef.current.style.setProperty(
      "--seek-before-width",
      `${(data / total) * 100}%`
    );
    currentReadOut.current.style.setProperty(
      "--seek-before-width",
      `${100 - positionReadOut()}%`
    );
    currentReadOut.current.style.setProperty(
      "--currentData-color",
      `${colorReadOut()}`
    );
    // console.log("unit", unit);
  }, [data, total]);

  return (
    <StyledRange>
      <input
        type="range"
        className="progressBar"
        ref={progressBarRef}
        defaultValue="0"
      />
      <div className="values">
        <div>0</div>
        <div>
          {unit === "KG" ? `${total}` : `${total / 1000000}`} {unit}
        </div>
      </div>
      <div className="currentData" ref={currentReadOut} color="#261f70">
        {data}
      </div>
    </StyledRange>
  );
};

const StyledRange = styled.div`
  width: 100%;
  position: relative;

  .currentData {
    position: absolute;
    top: 0;
    right: var(--seek-before-width);
    z-index: 10;
    color: var(--currentData-color);
    font-weight: bold;
  }

  .values {
    display: flex;
    justify-content: space-between;
  }

  .progressBar {
    --input-bg: #f2f3f4;
    --input-bg-hovered: #fff;
    --seek-before-color: #261f70;
    --seek-before-color-hovered: #4238b9;
    --seek-before-width: 200px;
    --selectedPlayhead: #4238b9;

    appearance: none;
    width: 100%;
    height: 1rem;
    background-color: var(--input-bg);
    outline: none;
    position: relative;
    border: 1px solid var(--seek-before-color);
  }

  // progressBar background chrome and safari
  .progressBar::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 1rem;
    width: var(--seek-before-width);
    background-color: var(--seek-before-color);
  }

  .progressBar::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
`;

export default Range;
