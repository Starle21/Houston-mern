import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import AstronautRow from "./AstronautRow";

import astronautService from "../../../../../services/astronauts";

import {
  updateNewFlight,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";

function Astronauts() {
  const dispatch = useDispatch();
  const rocket = useSelector((state) => state.newFlight?.rocket);
  const crew = useSelector((state) => state.newFlight?.rocket?.numberCrew);
  const timeTakeOff = useSelector((state) => state.newFlight?.takeOffTimeDate);
  const distance = useSelector((state) => state.newFlight?.distance);
  const timeTouchDown = useSelector(
    (state) => state.newFlight?.touchDownTimeDate
  );
  const availableAstronauts = useSelector(
    (state) => state.newFlight?.availableAstronauts
  );
  const selectedAstronauts = useSelector(
    (state) => state.newFlight?.selectedAstronauts
  );

  useEffect(() => {
    if (!rocket || !timeTakeOff || !timeTouchDown) return;
    // axios get astronauts with those updated parameters
    // TO-DO frontend send with parameters, TO-DO backend - crunch the parameters

    const getAllAstronauts = async () => {
      const allAstronauts = await astronautService.getAll();
      dispatch(updateNewFlight("availableAstronauts", allAstronauts));
    };
    getAllAstronauts();

    dispatch(updateNewFlight("selectedAstronauts", []));
  }, [rocket, timeTakeOff, timeTouchDown]);

  useEffect(() => {
    if (!selectedAstronauts) return;
    if (selectedAstronauts.length === crew) {
      dispatch(allowStart("astronauts", "allSelected", true));
    } else {
      dispatch(allowStart("astronauts", "allSelected", false));
    }
  }, [selectedAstronauts]);

  const empty = () => (
    <StyledAstronautsHeading>
      No rocket, distance or no take off time selected
    </StyledAstronautsHeading>
  );

  const astronautsList = () => {
    if (!availableAstronauts) return;
    return availableAstronauts.map((a, i) => {
      return (
        <AstronautRow
          key={a.surname}
          astronaut={a}
          selectedAstronauts={selectedAstronauts}
          crew={crew}
        />
      );
    });
  };

  return (
    <>
      <StyledAstronautsHeading>
        Select Available Astronauts:
      </StyledAstronautsHeading>
      {!timeTakeOff || !rocket || !distance ? empty() : astronautsList()}
    </>
  );
}

const StyledAstronautsHeading = styled.div`
  text-align: center;
  margin: 1rem 0;
`;

export default Astronauts;
