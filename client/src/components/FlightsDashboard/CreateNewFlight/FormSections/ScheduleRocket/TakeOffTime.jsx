import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  updateNewFlight,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";
import { setNotification } from "../../../../../store/reducers/notificationReducer";

const TakeOffTimeDate = (props, ref) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  // useImperativeHandle(ref, () => {
  //   return {
  //     key: "takeOffTimeDate",
  //     checkFormat,
  //   };
  // });

  // handle change to redux
  useEffect(() => {
    if (!time || !date) return;
    const value = new Date(`${date}T${time}:00`).toISOString();
    dispatch(updateNewFlight("takeOffTimeDate", value));
  }, [date, time]);

  const checkFormat = (value) => {
    if (!time || !date || (date && !time) || (!date && time)) {
      dispatch(setNotification("schedule", "Fill out date and time"));
      dispatch(allowStart("schedule", "takeOffTimeDate", false));
    } else {
      dispatch(setNotification("schedule", ""));
      dispatch(allowStart("schedule", "takeOffTimeDate", true));
    }
  };

  // not allow selecting today and past days
  const disablePast = () => {
    const now = new Date(Date.now());
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate() + 1;
    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  };

  const handleFocus = (e) => {
    checkFormat();
  };

  return (
    <StyledTakeOff>
      <label>Time of take off:</label>
      <div className="timeDateContainer">
        <StyledInput
          className="time"
          type="time"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
          allowed={time !== "" ? true : false}
          onFocus={handleFocus}
        />
        <StyledInput
          className="date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          // min={disablePast()}
          allowed={date !== "" ? true : false}
          onFocus={handleFocus}
        />
      </div>
    </StyledTakeOff>
  );
};

const StyledInput = styled.input`
  padding: 8px;
  border: ${(props) =>
    props.allowed ? "1px solid #fff6ee" : "1px solid #be1e2d"};
  background-color: #fdf9f5;
  font-family: "JohnSans Lite Pro";
  font-size: 15px;
  border-radius: 5px;
  flex-basis: 50%;

  &:focus {
    outline: ${(props) =>
      props.allowed ? "2px solid #fccda5" : "1px solid #be1e2d"};
  }
`;

const StyledTakeOff = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f7911d54;
  padding: 0.5rem 1.5rem;
  margin: 1px 0;
  position: relative;

  .timeDateContainer {
    width: 322px;
    display: flex;
    gap: 0.1rem;
  }

  /* input[type="time"],
  input[type="date"] {
    padding: 10px;
    border: 0;
    background-color: #fff6ee;
    font-family: "JohnSans Lite Pro";
    font-size: 15px;

    border-radius: 5px;
    flex-basis: 50%;
  } */
`;

export default TakeOffTimeDate;
