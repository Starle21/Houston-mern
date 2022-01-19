import React, { useEffect } from "react";
import styled from "styled-components";
import DivideFlights from "../CommonSignedIn/DivideFlights";
import Flight from "./Flight";

import { useDispatch, useSelector } from "react-redux";
import { getFlights } from "../../store/reducers/flightReducer";

function Flights() {
  const dispatch = useDispatch();
  // const flights = useSelector((state) => state.flights);
  const flyingFlights = useSelector((state) =>
    state.flights.filter((f) => f.status === "flying")
  );
  const scheduledFlights = useSelector((state) =>
    state.flights.filter((f) => f.status === "scheduled")
  );

  // console.log(flights);

  // get flights on first render
  useEffect(() => {
    dispatch(getFlights());
  }, []);

  return (
    <StyledFlights>
      <DivideFlights>just landed</DivideFlights>
      {/* {justLandedFlights.map((flight) => {
        return <Flight key={flight.id} flight={flight} />;
      })} */}
      <DivideFlights>current</DivideFlights>
      {flyingFlights.map((flight) => {
        return <Flight key={flight.id} flight={flight} />;
      })}
      <DivideFlights>scheduled</DivideFlights>
      {scheduledFlights.map((flight) => {
        return <Flight key={flight.id} flight={flight} />;
      })}
    </StyledFlights>
  );
}

const StyledFlights = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export default Flights;
