import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { GiKnifeFork } from "react-icons/gi";
import { IoRocketSharp } from "react-icons/io5";
import { MdLocalGasStation } from "react-icons/md";
import Button from "../Common/Button";
import Range from "./Range";

function Flight({ flight, socketRef, data, state, landed }) {
  const rocket = useSelector(
    (state) => state.rockets.filter((r) => r.id === `${flight.rocket.id}`)[0]
  );
  const componentRef = useRef();
  const notifyRef = useRef();
  const [touchDown, setTouchDown] = useState();

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

  useEffect(() => {
    if (rocket && flight) {
      calcTouchDown(flight.distance, rocket.speed, flight.takeOffTimeDate);
    }
  }, [rocket, flight]);

  const calcTouchDown = (distance, rocket, takeOff) => {
    const durationSeconds = distance / rocket;
    const takeOffTime = new Date(takeOff);
    const takeOffTimeSeconds = takeOffTime.getTime() / 1000;
    const touchDown = takeOffTimeSeconds + durationSeconds;
    const touchDownTime = new Date(touchDown * 1000);
    setTouchDown(touchDownTime);
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
          <div className="data">
            {new Date(flight.takeOffTimeDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            {new Date(flight.takeOffTimeDate).toLocaleDateString()}
          </div>
          <label className="description">take off</label>
        </div>
        <div className="dataContainer">
          <div className="data">
            {touchDown?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            {touchDown?.toLocaleDateString()}
          </div>
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
          <Range
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
          <Range
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
          <Range
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
