import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  updateTankLevelForStart,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";

function TankLevel() {
  const dispatch = useDispatch();
  const newFlight = useSelector((state) => state.newFlight);
  const requiredFuel = useSelector((state) => state.newFlight?.requiredFuel);
  const allowRequiredFuel = useSelector(
    (state) => state.newFlight?.allowStart?.fuel?.requiredFuel
  );
  const currentLevel = useSelector(
    (state) => state.newFlight.rocket?.tankLevelForStart
  );
  const tankLevelForStart = useSelector(
    (state) => state.newFlight.tankLevelForStart
  );

  const [notify, setNotify] = useState("");

  // if rocket or distance changes, reset tank level for start to the current tank level of the rocket
  useEffect(() => {
    dispatch(updateTankLevelForStart(currentLevel));
  }, [newFlight?.rocket, newFlight?.distance]);

  // check if the tank level is in the right format
  useEffect(() => {
    if (!requiredFuel) return; // checking only if required is true
    if (!tankLevelForStart) return;
    checkFormat();
  }, [allowRequiredFuel, requiredFuel, tankLevelForStart, newFlight?.distance]);

  // button handler onClick, setting up fuel
  const addFuel = (e) => {
    e.preventDefault();

    if (!allowRequiredFuel) {
      dispatch(allowStart("fuel", "tankLevelForStart", false));
      return;
    }
    dispatch(updateTankLevelForStart(requiredFuel));
    dispatch(allowStart("fuel", "tankLevelForStart", true));
    checkFormat();
  };

  // checking format, displaying notification
  const checkFormat = () => {
    if (tankLevelForStart === requiredFuel) {
      dispatch(allowStart("fuel", "tankLevelForStart", true));
      setNotify((curState) => changeNotify(curState, ""));
    } else if (!allowRequiredFuel) {
      setNotify((curState) => changeNotify(curState, "no rocket or distance"));
      dispatch(allowStart("fuel", "tankLevelForStart", false));
    } else {
      dispatch(allowStart("fuel", "tankLevelForStart", false));
      setNotify((curState) =>
        changeNotify(curState, "Fill the tank up or take fuel out")
      );
    }
  };

  const changeNotify = (state, newNotification) => {
    return newNotification;
  };

  const format = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <StyledTankLevel>
      <div className="readout">
        <label>Fuel level before start:</label>
        <div className="input">
          <span>
            {tankLevelForStart
              ? `${format(tankLevelForStart)} l`
              : "NO ROCKET OR DISTANCE"}
          </span>
          <div className="notify">{notify}</div>
        </div>
      </div>
      <div className="changeFuel">
        <button onClick={addFuel}> set fuel for the flight </button>
      </div>
    </StyledTankLevel>
  );
}

const StyledTankLevel = styled.div`
  border: 1px solid #f7911d54;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;

  .readout {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    text-align: right;
  }

  .input {
    flex-basis: 50%;
    margin-bottom: 0.5rem;
  }

  .notify {
    font-family: "JohnSans Lite Pro";
    font-size: 15px;
    color: #be1e2d;
    font-weight: bold;
    height: 15px;
  }

  .changeFuel {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

export default TankLevel;
