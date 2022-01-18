import React, { useEffect, useState } from "react";
import astronautService from "../../services/astronauts";
import styled from "styled-components";
import Title from "../CommonSignedIn/Title";
import DivideFlights from "../CommonSignedIn/DivideFlights";

import Astronaut from "./Astronaut";

function AllAstronauts() {
  const [astronauts, setAstronauts] = useState([]);

  console.log(astronauts);
  useEffect(() => {
    astronautService
      .getAll()
      .then((allAstronauts) => setAstronauts(allAstronauts));
  }, []);

  return (
    <>
      <Title title="Astronauts" />
      <StyledRockets>
        {astronauts.map((astronaut) => {
          return <Astronaut key={astronaut.id} astronaut={astronaut} />;
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
