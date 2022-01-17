import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DivideFlights from "./DivideFlights";
import Flight from "./Flight";
import flightService from "../../services/flights";

function Flights() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    flightService.getAll().then((allFlights) => setFlights(allFlights));
    // const getAllFlights = async () => {
    //   const allFlights = await flightService.getAll();
    //   setFlights(allFlights);
    // };
    // getAllFlights();
  }, []);

  return (
    <StyledFlights>
      <DivideFlights>current</DivideFlights>
      {flights.map((flight) => {
        return <Flight key={flight.id} flight={flight} />;
      })}
      <DivideFlights>scheduled</DivideFlights>
    </StyledFlights>
  );
}

const StyledFlights = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export default Flights;
