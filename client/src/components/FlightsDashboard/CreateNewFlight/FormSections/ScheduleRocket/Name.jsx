import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  updateNewFlight,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";
import { setNotification } from "../../../../../store/reducers/notificationReducer";
import { getFlights } from "../../../../../store/reducers/flightReducer";

const Name = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.newFlight.name);
  const allFlights = useSelector((state) =>
    state.flights.map((f) => f.name.toLowerCase())
  );
  const allowed = useSelector(
    (state) => state.newFlight.allowStart?.schedule?.name
  );

  // update flights state on the first render
  useEffect(() => {
    dispatch(getFlights());
  }, []);

  useImperativeHandle(ref, () => {
    return {
      key: "name",
      checkFormat,
    };
  });

  // validate the data
  const checkFormat = (value) => {
    // name must be unique
    if (allFlights.some((f) => f === value)) {
      dispatch(setNotification("schedule", "Name must be unique"));
      dispatch(allowStart("schedule", "name", false));

      // name must be at least 4 characters long
    } else if (value.length < 4) {
      dispatch(
        setNotification("schedule", "Name must be at least 4 characters long.")
      );
      dispatch(allowStart("schedule", "name", false));

      // when it's true
    } else {
      dispatch(setNotification("schedule", ""));
      dispatch(allowStart("schedule", "name", true));
    }
  };

  // name change handler
  const handleNameChange = (e) => {
    const value = e.target.value;
    dispatch(updateNewFlight("name", value));
    checkFormat(value);
  };

  // when clicking on the input validate
  const handleFocus = (e) => {
    const value = e.target.value;
    checkFormat(value);
  };

  return (
    <StyledName>
      <label>Mission name:</label>
      <StyledInput
        type="text"
        value={name ? name : ""}
        placeholder="Name the new flight"
        onChange={handleNameChange}
        allowed={allowed}
        onFocus={handleFocus}
      />
    </StyledName>
  );
});

const StyledInput = styled.input`
  padding: 10px;
  border: ${(props) =>
    props.allowed ? "1px solid #fff6ee" : "1px solid #be1e2d"};
  background-color: #fdf9f5;
  font-family: "JohnSans Lite Pro";
  font-size: 15px;
  border-radius: 5px;
  width: 300px;

  &:focus {
    outline: ${(props) =>
      props.allowed ? "2px solid #fccda5" : "1px solid #be1e2d"};
  }
`;

const StyledName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f7911d54;
  padding: 0.5rem 1.5rem;
  margin: 1px 0;

  /* input[type="text"] {
    padding: 10px;
    border: 0;
    background-color: #fff6ee;
    font-family: "JohnSans Lite Pro";
    font-size: 15px;

    border-radius: 5px;
    width: 300px;
  } */
`;

export default Name;
