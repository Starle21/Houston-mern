import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  updateNewFlight,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";

function RequiredFuel() {
  const dispatch = useDispatch();
  const reqFuel = useSelector((state) => state.newFlight.requiredFuel);
  const consumption = useSelector(
    (state) => state.newFlight.rocket?.consumption
  );
  const tankCapacity = useSelector(
    (state) => state.newFlight.rocket?.tankCapacity
  );
  const distance = useSelector((state) => state.newFlight.distance);

  const [notify, setNotify] = useState("");

  const format = (value) => {
    if (!value) return "no rocket or distance";
    return new Intl.NumberFormat("en-US").format(value);
  };

  const changeNotify = (state, newNotification) => {
    return newNotification;
  };

  const checkFormat = (reqFuel) => {
    if (reqFuel > tankCapacity) {
      dispatch(allowStart("fuel", "requiredFuel", false));
      setNotify((curState) =>
        changeNotify(curState, "Tank is too small for the flight")
      );
    } else {
      dispatch(allowStart("fuel", "requiredFuel", true));
      setNotify((curState) => changeNotify(curState, ""));
    }
  };

  const calcReqFuel = () => {
    return Math.round(distance * consumption);
  };

  useEffect(() => {
    if (!distance || !consumption || distance < 1000000) {
      dispatch(updateNewFlight("requiredFuel", 0));
      return "no distance or rocket";
    }
    const reqFuel = calcReqFuel();
    dispatch(updateNewFlight("requiredFuel", reqFuel));
    checkFormat(reqFuel);
  }, [distance, consumption]);

  return (
    <StyledRequiredFuel>
      <label>Required min. fuel for the flight:</label>
      <div>
        <div>{`${format(reqFuel)} l`}</div>
        <div className="notify">{notify}</div>
      </div>
    </StyledRequiredFuel>
  );
}

const StyledRequiredFuel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border: 1px solid #191e3b16;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;
  text-align: right;

  .notify {
    font-family: "JohnSans Lite Pro";
    font-size: 15px;
    color: #be1e2d;
    font-weight: bold;
    height: 15px;
  }
`;

export default RequiredFuel;
