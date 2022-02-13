import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import AstronautRow from "./AstronautRow";

import astronautService from "../../../../../services/astronauts";

import { updateNewFlight } from "../../../../../store/reducers/newFlightReducer";

function Astronauts() {
  const dispatch = useDispatch();
  const rocket = useSelector((state) => state.newFlight?.rocket);
  // const crew = useSelector((state) => state.newFlight?.rocket?.numberCrew);
  const timeTakeOff = useSelector((state) => state.newFlight?.takeOffTimeDate);
  const distance = useSelector((state) => state.newFlight?.distance);
  const timeTouchDown = useSelector(
    (state) => state.newFlight?.touchDownTimeDate
  );
  const availableAstronauts = useSelector(
    (state) => state.newFlight?.availableAstronauts
  );

  useEffect(() => {
    if (!rocket || !timeTakeOff || !timeTouchDown) return;
    // axios get astronauts with those updated parameters
    // TO-DO frontend send with parameters, TO-DO backend - crunch the parameters
    astronautService
      .getAll()
      // save them to redux
      .then((allAstronauts) =>
        dispatch(updateNewFlight("availableAstronauts", allAstronauts))
      );
  }, [rocket, timeTakeOff, timeTouchDown]);

  const empty = () => (
    <StyledAstronautsHeading>
      No rocket, distance or no take off time selected
    </StyledAstronautsHeading>
  );

  const astronautsList = () => {
    return availableAstronauts.map((a, i) => {
      return (
        <AstronautRow
          key={a.surname}
          astronaut={a}
          // i={i}
          // selectedAstronauts={selectedAstronauts}
          // setSelectedAstronauts={setSelectedAstronauts}
          // crew={crew}
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
