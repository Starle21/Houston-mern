import React from "react";

import { Outlet } from "react-router-dom";

import Navigation from "./FlightsDashboard/Navigation";

function SignedInUser() {
  return (
    <>
      <Navigation />

      <Outlet />
    </>
  );
}

export default SignedInUser;
