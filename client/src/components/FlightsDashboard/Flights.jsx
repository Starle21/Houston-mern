import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DivideFlights from "../CommonSignedIn/DivideFlights";
import Flight from "./Flight";

import { useDispatch, useSelector } from "react-redux";
import { getFlights } from "../../store/reducers/flightReducer";

import io from "socket.io-client";

// import { socket } from "../../services/websockets";

function Flights() {
  const dispatch = useDispatch();
  // const flights = useSelector((state) => state.flights);
  const flyingFlights = useSelector((state) =>
    state.flights.filter((f) => f.status === "flying")
  );
  const scheduledFlights = useSelector((state) =>
    state.flights.filter((f) => f.status === "scheduled")
  );
  const [currentData, setCurrentData] = useState();
  const [socketRef, setSocketRef] = useState();

  // console.log(flights);

  // get flights on first render
  useEffect(() => {
    dispatch(getFlights());
  }, []);

  // connecting to ws server
  // receiving emitted data from the server
  // updating state with the received data
  // updating status of flights - scheduled, flying, landed, just landed, cancelled, destroyed
  // rendering the progress - distance traveled, current fuel, current food
  useEffect(() => {
    const socket = io("/");
    console.log(socket);

    // receive - get from server - listen for an event
    socket.on("currentData", (data) => {
      // dispatch to redux
      setCurrentData(data);
      setSocketRef(socket);
    });

    socket.on("destroyed", () => {
      console.log("rocket destroyed!!!");
    });

    socket.emit("flights:current");

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log(currentData);

  return (
    <StyledFlights>
      <DivideFlights>just landed</DivideFlights>
      {/* {justLandedFlights.map((flight) => {
        return <Flight key={flight.id} flight={flight} />;
      })} */}
      <DivideFlights>current</DivideFlights>
      {flyingFlights.map((flight) => {
        return <Flight key={flight.id} flight={flight} socketRef={socketRef} />;
      })}
      <DivideFlights>scheduled</DivideFlights>
      {scheduledFlights.map((flight) => {
        return <Flight key={flight.id} flight={flight} />;
      })}
      <div className="last"></div>
    </StyledFlights>
  );
}

const StyledFlights = styled.div`
  max-width: 1400px;
  margin: 0 auto;

  .last {
    margin-bottom: 10rem;
  }
`;

export default Flights;
