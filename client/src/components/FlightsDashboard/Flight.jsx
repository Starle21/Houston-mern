import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { GiKnifeFork } from "react-icons/gi";
import { IoRocketSharp } from "react-icons/io5";
import { MdLocalGasStation } from "react-icons/md";
import Button from "../Common/Button";

function Flight({ flight, socketRef }) {
  // const rocket = useSelector((state) =>
  //   state.rockets.filter((r) => r.id === `${flight.rocket}`)
  // );

  const handleDestroy = () => {
    socketRef.emit("destroy", flight);
    console.log("client destroy");
  };

  return (
    <StyledFlight>
      <div className="healthStatus">
        <svg height="20" width="20">
          <circle cx="10" cy="10" r="10" fill="#be1e2d" />
        </svg>
      </div>
      <div className="textBar">
        <div className="dataContainer">
          <div className="flightName">{flight.name}</div>
          <label className="description">name</label>
        </div>
        <div className="dataContainer">
          <div className="data">{flight.takeOffTimeDate}</div>
          <label className="description">take off</label>
        </div>
        <div className="dataContainer">
          <div className="data">{flight.takeOffTimeDate}</div>
          <label className="description">touch down</label>
        </div>
        <div className="dataContainer">
          <div className="data">apollo 2022</div>
          <label className="description">rocket</label>
        </div>
      </div>

      {/* RENDERING PROGRESS BARS IN GRID */}
      <div className="renderGrid">
        <div className="label">
          <IoRocketSharp size={30} className="icon" />
          <div className="description">distance</div>
        </div>
        <div className="distanceBar">
          <RenderRange total={flight.distance} />
        </div>
        <div className="label">
          <MdLocalGasStation size={28} className="icon" />
          <div className="description">fuel</div>
        </div>
        <div className="fuelBar">
          <RenderRange total={flight.distance} />
        </div>
        <div className="foodLabel">
          <GiKnifeFork size={28} className="icon" />
          <div className="description">food</div>
        </div>
        <div className="foodBar">
          <RenderRange total={flight.distance} />
        </div>
      </div>

      <div className="details">
        <div className="createdBy">
          <label className="description">created by</label>
          <div className="data">Ben</div>
        </div>
        <button color="#191e3b" onClick={handleDestroy}>
          destroy
        </button>
      </div>
    </StyledFlight>
  );
}

const RenderRange = ({ total }) => {
  return (
    <StyledRange>
      <input type="range" className="progressBar" />
      <div className="distanceReading">
        <div>0</div>
        <div>{total / 1000000}M KM</div>
      </div>
    </StyledRange>
  );
};

const StyledRange = styled.div`
  width: 100%;

  .distanceReading {
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

  // progressBar background already played - chrome and safari
  .progressBar::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 1rem;
    width: var(--seek-before-width);
    background-color: var(--seek-before-color);
    z-index: 1002;
  }

  .progressBar::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1rem;
    width: 0.3rem;
    background-color: var(--seek-before-color);
    z-index: 1005;
    box-sizing: border-box;
  }
`;

const StyledFlight = styled.div`
  /* height: 150px; */
  background-color: #fff;
  margin: 10px 0;
  color: #191e3b;
  border: 3px solid #191e3b;
  position: relative;

  .renderGrid {
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    width: 95%;

    display: grid;
    grid-template-columns: 100px 1fr 120px 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: baseline;
    row-gap: 0.5rem;
  }

  .label {
    grid-column: 1 / 2;
    display: flex;
    align-items: baseline;
  }
  .foodLabel {
    display: flex;
    align-items: baseline;
    margin-left: 3rem;
  }

  .distanceBar {
    grid-column: 2 / 5;
  }
  .fuelBar {
    grid-column: 2 / 3;
  }
  .foodBar {
    grid-column: 4 / 5;
  }
  .icon {
    width: 2rem;
  }

  .healthStatus {
    position: absolute;
    right: 0.7rem;
    top: 0.7rem;
  }

  .textBar {
    margin-left: 2.1rem;
    margin-top: 2.1rem;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .createdBy {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  .details {
    margin: 0 auto;
    margin-bottom: 1.5rem;
    width: 95%;
    display: flex;
    justify-content: space-between;
  }

  .description {
    text-transform: uppercase;
    font-family: "JohnSansCond Lite Pro";
    font-size: 14px;
  }

  .dataContainer {
    text-align: right;
  }

  .flightName {
    font-family: "JohnSans Lite Pro";
    font-weight: bold;
    text-transform: uppercase;
    font-size: 35px;
  }

  .data {
    font-family: "JohnSans Black Pro";
    text-transform: uppercase;
    font-size: 21px;
  }
`;

export default Flight;
