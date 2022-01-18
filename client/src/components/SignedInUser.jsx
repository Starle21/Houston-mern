import React from "react";

import { Outlet } from "react-router-dom";

import Navigation from "./CommonSignedIn/Navigation";

function SignedInUser() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default SignedInUser;
