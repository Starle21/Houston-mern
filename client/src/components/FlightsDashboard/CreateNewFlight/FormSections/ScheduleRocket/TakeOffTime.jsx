import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  updateNewFlight,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";
import { setNotification } from "../../../../../store/reducers/notificationReducer";

function TakeOffTimeDate() {
  const dispatch = useDispatch();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  // check format
  useEffect(() => {
    if (!time || !date) {
      dispatch(setNotification("schedule", "Fill out date and time"));
      dispatch(allowStart("schedule", "takeOffTimeDate", false));
    } else {
      dispatch(setNotification("schedule", ""));
      dispatch(allowStart("schedule", "takeOffTimeDate", true));
    }
  }, [date, time]);

  // handle change to redux
  useEffect(() => {
    if (!time || !date) return;
    const value = new Date(`${date}T${time}:00`).toISOString();
    dispatch(updateNewFlight("takeOffTimeDate", value));
  }, [date, time]);

  // not allow selecting today and past days
  const disablePast = () => {
    const now = new Date(Date.now());
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate() + 1;
    return `${year}-${month < 10 ? `0${month}` : month}-${day}`;
  };

  return (
    <StyledTakeOff>
      <label>Time of take off:</label>
      <div className="timeDateContainer">
        <input
          className="time"
          type="time"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <input
          className="date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          min={disablePast()}
        />
      </div>
    </StyledTakeOff>
  );
}

const StyledTakeOff = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f7911d54;
  padding: 0.5rem 1.5rem;
  margin: 1px 0;
  position: relative;

  .timeDateContainer {
    width: 320px;
    display: flex;
    gap: 0.1rem;
  }

  input[type="time"],
  input[type="date"] {
    padding: 10px;
    border: 0;
    background-color: #fff6ee;
    font-family: "JohnSans Lite Pro";
    font-size: 15px;

    border-radius: 5px;
    flex-basis: 50%;
  }
`;

export default TakeOffTimeDate;
