import React from "react";
import { Routes, Route } from "react-router-dom";

import AllRockets from "./AllRockets";
import CreateNewRocket from "./CreateNewRocket";

function RocketsDashboard() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllRockets />} />
        <Route path="/new" element={<CreateNewRocket />} />
      </Routes>
    </>
  );
}

export default RocketsDashboard;
