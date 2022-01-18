import React from "react";
import { Routes, Route } from "react-router-dom";

import AllAstronauts from "./AllAstronauts";
import CreateNewAstronaut from "./CreateNewAstronaut";

function AstronautsDashboard() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllAstronauts />} />
        <Route path="/new" element={<CreateNewAstronaut />} />
      </Routes>
    </>
  );
}

export default AstronautsDashboard;
