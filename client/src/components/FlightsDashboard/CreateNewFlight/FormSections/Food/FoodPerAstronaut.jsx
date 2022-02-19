import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../../../store/reducers/notificationReducer";

import FoodRow from "./FoodRow";

function FoodPerAstronaut({ fasters, setFasters }) {
  const selectedAstronauts = useSelector(
    (state) => state.newFlight.selectedAstronauts
  );
  const rocket = useSelector((state) => state.newFlight.rocket);

  useEffect(() => {
    setFasters([]);
  }, [selectedAstronauts, rocket]);

  const fastHandler = (e) => {
    if (fasters.some((f) => f.surname === e.target.value)) {
      setFasters(fasters.filter((f) => f.surname !== e.target.value));
    } else {
      setFasters([
        ...fasters,
        selectedAstronauts.filter((f) => f.surname === e.target.value)[0],
      ]);
    }
  };

  const empty = () => (
    <StyledHeading>Select all the astronauts first</StyledHeading>
  );

  const astronautsList = () => {
    if (!selectedAstronauts) return;
    return selectedAstronauts.map((a) => {
      return (
        <FoodRow astronaut={a} key={a.surname} fastHandler={fastHandler} />
      );
    });
  };

  return (
    <>
      <StyledHeading>Required food for the flight:</StyledHeading>
      {!selectedAstronauts ||
      !rocket ||
      rocket.numberCrew !== selectedAstronauts.length
        ? empty()
        : astronautsList()}
    </>
  );
}

const StyledHeading = styled.div`
  text-align: center;
  margin: 1rem 0;
`;

export default FoodPerAstronaut;
