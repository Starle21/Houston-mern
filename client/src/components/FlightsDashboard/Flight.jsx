import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { GiKnifeFork } from "react-icons/gi";
import { IoRocketSharp } from "react-icons/io5";
import { MdLocalGasStation } from "react-icons/md";
import Button from "../Common/Button";

function Flight({ flight, socketRef, data, state, landed }) {
  const rocket = useSelector(
    (state) => state.rockets.filter((r) => r.id === `${flight.rocket.id}`)[0]
  );
  const componentRef = useRef();
  const notifyRef = useRef();

  const borderColor = () => {
    if (landed) {
      return "#2ab573";
    }
    if (!state) {
      return "#261f70";
    } else if (state) {
      return "#be1e2d";
    }
  };

  useEffect(() => {
    componentRef.current.style.setProperty(
      "--border-color",
      `${borderColor()}`
    );
    notifyRef.current.style.setProperty("--notify-color", `${borderColor()}`);
  }, [landed, state]);

  const handleDestroy = () => {
    console.log(socketRef);
    socketRef.emit("destroy", flight);
    console.log("client destroy");
  };

  const healthStatusColor = () => {
    if (flight.status === "scheduled" || landed) {
      return "#808284";
    } else if (!state) {
      return "#2ab573";
    } else if (state) {
      return "#be1e2d";
    }
  };

  return (
    <StyledFlight ref={componentRef}>
      <div className="healthStatus">
        <svg height="20" width="20">
          <circle cx="10" cy="10" r="10" fill={healthStatusColor()} />
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
          <RenderRange
            total={flight.distance}
            data={data || state ? data?.currentPosition : 0}
            unit="GM"
          />
        </div>
        <div className="label">
          <MdLocalGasStation size={28} className="icon" />
          <div className="description">fuel</div>
        </div>
        <div className="fuelBar">
          <RenderRange
            total={rocket?.tankCapacity}
            data={
              data || state ? data?.currentTankLevel : rocket?.tankLevelForStart
            }
            unit="ML"
          />
        </div>
        <div className="foodLabel">
          <GiKnifeFork size={28} className="icon" />
          <div className="description">food</div>
        </div>
        <div className="foodBar">
          <RenderRange
            total={rocket?.fridgeCapacity}
            data={
              data || state ? data?.currentFoodLevel : rocket?.foodLevelForStart
            }
            unit="KG"
          />
        </div>
      </div>

      <div className="details">
        <div className="createdBy">
          <label className="description">created by</label>
          <div className="data">Ben</div>
        </div>
        <div className="state" ref={notifyRef}>
          {state ? "Flight aborted! Rocket destroyed!" : ""}
          {landed ? "Touch down, the flight is finished!" : ""}
        </div>
        <button color="#191e3b" onClick={handleDestroy}>
          destroy
        </button>
      </div>
    </StyledFlight>
  );
}

const RenderRange = ({ total, unit, data }) => {
  const progressBarRef = useRef();
  const currentReadOut = useRef();

  const positionReadOut = () => {
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
  }, [data]);

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

  // progressBar background already played - chrome and safari
  .progressBar::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 1rem;
    width: var(--seek-before-width);
    background-color: var(--seek-before-color);
    /* z-index:; */
  }

  .progressBar::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* height: 1rem;
    width: 0.3rem;
    background-color: var(--seek-before-color);
    z-index: 1005;
    box-sizing: border-box; */
  }
`;

const StyledFlight = styled.div`
  /* height: 150px; */
  background-color: #fff;
  margin: 10px 0;
  color: #191e3b;
  border: 3px solid var(--border-color);
  position: relative;

  .state {
    font-weight: bold;
    color: var(--notify-color);
    font-size: 18px;
  }

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
