import React, { useEffect } from "react";
import styled from "styled-components";
import DivideFlights from "../CommonSignedIn/DivideFlights";
import Flight from "./Flight";

import { useDispatch, useSelector } from "react-redux";
import { getFlights } from "../../store/reducers/flightReducer";

function Flights() {
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights);

  console.log(flights);

  // get flights on first render
  useEffect(() => {
    dispatch(getFlights());
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
