import React, { useEffect, useState } from "react";
import rocketService from "../../services/rockets";
import styled from "styled-components";
import Title from "../CommonSignedIn/Title";
import DivideFlights from "../CommonSignedIn/DivideFlights";

import Rocket from "./Rocket";

function AllRockets() {
  const [rockets, setRockets] = useState([]);

  console.log(rockets);
  useEffect(() => {
    rocketService.getAll().then((allRockets) => setRockets(allRockets));
  }, []);

  return (
    <>
      <Title title="Rockets" />
      <StyledRockets>
        {rockets.map((rocket) => {
          return <Rocket key={rocket.id} rocket={rocket} />;
        })}
      </StyledRockets>
    </>
  );
}

const StyledRockets = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export default AllRockets;
