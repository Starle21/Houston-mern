import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import {
  updateNewFlight,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";

import LoadAstronautRow from "./LoadAstronautRow";

function AstronautsWeight() {
  const dispatch = useDispatch();
  const selectedAstronauts = useSelector(
    (state) => state.newFlight?.selectedAstronauts
  );
  const rocket = useSelector((state) => state.newFlight.rocket);
  const completedAstronauts = useSelector(
    (state) => state.newFlight.completed?.astronauts
  );
  const totalAstronautsWeight = useSelector(
    (state) => state.newFlight.totalAstronautsWeight
  );

  useEffect(() => {
    if (!completedAstronauts) return;
    calcTotalAstronautsWeight();
  }, [completedAstronauts]);

  const calcTotalAstronautsWeight = () => {
    const weight = selectedAstronauts.reduce((sum, current) => {
      return sum + current.weight;
    }, 0);
    dispatch(updateNewFlight("totalAstronautsWeight", weight));
  };

  const empty = () => (
    <StyledHeading>Select all the astronauts first</StyledHeading>
  );

  const astronautsList = () => {
    if (!selectedAstronauts) return;

    return selectedAstronauts.map((a) => {
      return <LoadAstronautRow astronaut={a} key={a.surname} />;
    });
  };

  return (
    <>
      <StyledLabel>Astronaut's weight:</StyledLabel>
      {!selectedAstronauts ||
      !rocket ||
      rocket.numberCrew !== selectedAstronauts.length
        ? empty()
        : astronautsList()}

      <StyledFormSection>
        <label>Total astronauts weight</label>
        <span>{completedAstronauts ? `${totalAstronautsWeight} kg` : "?"}</span>
      </StyledFormSection>
    </>
  );
}

const StyledHeading = styled.div`
  text-align: center;
  /* margin: 1rem 0; */
  /* margin-top: 2rem; */
  margin-bottom: 1rem;
`;

const StyledLabel = styled.div`
  text-align: center;
  margin: 1rem 0;
  margin-top: 2rem;
`;

const StyledFormSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border: 1px solid #191e3b16;
  padding: 0.9rem 1.5rem;
  /* margin: 1px 0; */
  margin-bottom: 3rem;
`;

export default AstronautsWeight;
