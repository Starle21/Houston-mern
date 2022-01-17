import React from "react";
// import Navigation from "./Navigation";
// import Title from "../CommonSignedIn/Title";
// import Flights from "./Flights";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import CreateNewFlight from "./CreateNewFlight/CreateNewFlight";
import AllFlights from "./AllFlights";

function FlightsDashboard() {
  return (
    <StyledFlightsDashboard>
      <Routes>
        <Route path="/" element={<AllFlights />} />
        <Route path="/new" element={<CreateNewFlight />} />
      </Routes>
    </StyledFlightsDashboard>
  );
}

const StyledFlightsDashboard = styled.div``;

export default FlightsDashboard;
