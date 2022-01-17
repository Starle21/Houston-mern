import React from "react";

import Title from "../CommonSignedIn/Title";
import Flights from "./Flights";

function AllFlights() {
  return (
    <>
      <Title title="Flights" />
      <Flights />
    </>
  );
}

export default AllFlights;
