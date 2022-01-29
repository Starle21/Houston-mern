import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DivideFlights from "../CommonSignedIn/DivideFlights";
import Flight from "./Flight";

import { useDispatch, useSelector } from "react-redux";
import {
  getFlights,
  updateFlightStatus,
} from "../../store/reducers/flightReducer";
import { getRockets } from "../../store/reducers/rocketReducer";

import io from "socket.io-client";

// import { socket } from "../../services/websockets";

function Flights() {
  const dispatch = useDispatch();
  const flyingFlights = useSelector((state) =>
    state.flights.filter((f) => f.status === "flying")
  );
  const scheduledFlights = useSelector((state) =>
    state.flights.filter((f) => f.status === "scheduled")
  );
  const [currentData, setCurrentData] = useState([]);
  const [socketRef, setSocketRef] = useState();
  const [aborted, setAborted] = useState();
  const [landed, setLanded] = useState();

  // get flights on first render from db
  useEffect(() => {
    dispatch(getFlights());
    dispatch(getRockets());
  }, []);

  // updating status of flights - scheduled, flying, landed, just landed, cancelled, destroyed
  // rendering the progress - distance traveled, current fuel, current food
  useEffect(() => {
    const socket = io("/");

    // msg to server - start to send current data
    socket.emit("flights:getCurrent");

    socket.on("flights:currentData", (data) => {
      setCurrentData(data);
      setSocketRef(socket);
    });

    socket.on("destroyed", (flight) => {
      setAborted(flight);
      setTimeout(() => {
        dispatch(updateFlightStatus(flight.name, "aborted"));
        // remove rocket from the state
        setAborted("");
      }, 10000);
      console.log("rocket destroyed!!!");
    });

    socket.on("flight:landed", (flight) => {
      setLanded(flight);
      setTimeout(() => {
        dispatch(updateFlightStatus(flight.name, "landed"));
        setLanded("");
      }, 10000);
      console.log("flight has landed!!!");
    });

    socket.on("flight:takeOff", (flight) => {
      dispatch(updateFlightStatus(flight.name, "flying"));
      console.log("flight has just took off!!!");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <StyledFlights>
      <DivideFlights>current</DivideFlights>
      {flyingFlights.map((flight) => {
        const currentDatum = currentData?.filter(
          (d) => d.name === flight.name
        )[0];
        const state = flight.name === aborted?.name ? true : false;
        const hasLanded = flight.name === landed?.name ? true : false;

        return (
          <Flight
            key={flight.name}
            flight={flight}
            socketRef={socketRef}
            data={currentDatum}
            state={state}
            landed={hasLanded}
          />
        );
      })}
      <DivideFlights>scheduled</DivideFlights>
      {scheduledFlights.map((flight) => {
        return <Flight key={flight.name} flight={flight} />;
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
