import React, { useEffect, useState } from "react";
import astronautService from "../../services/astronauts";
import styled from "styled-components";
import Title from "../CommonSignedIn/Title";
import DivideFlights from "../CommonSignedIn/DivideFlights";

import Astronaut from "./Astronaut";

import io from "socket.io-client";

function AllAstronauts() {
  const [astronauts, setAstronauts] = useState([]);
  const [currentData, setCurrentData] = useState();

  console.log(currentData);
  useEffect(() => {
    astronautService
      .getAll()
      .then((allAstronauts) => setAstronauts(allAstronauts));
  }, []);

  useEffect(() => {
    const socket = io("/");

    socket.on("astronaut", (data) => {
      // dispatch to redux
      setCurrentData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Title title="Astronauts" />
      <StyledRockets>
        {astronauts.map((astronaut) => {
          return <Astronaut key={astronaut.surname} astronaut={astronaut} />;
        })}
      </StyledRockets>
    </>
  );
}

const StyledRockets = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export default AllAstronauts;
