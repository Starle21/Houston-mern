import React, { useState } from "react";
import styled from "styled-components";
// import DivideFlights from "../DivideFlights";
import ScheduleRocket from "./FormSections/ScheduleRocket";
import Fuel from "./FormSections/Fuel";
import SelectAstronauts from "./FormSections/SelectAstronauts";

function CreateNewFlight() {
  const [selectedRocket, setSelectedRocket] = useState();
  const [fuelForFlight, setFuelForFlight] = useState([]);
  return (
    <StyledNewFlight>
      <div className="borders">
        <div className="heading">
          <h1>Create New Flight</h1>
        </div>
        <div className="divider"></div>
        <div className="statusBar">
          <div className="status">
            <span>start {">> "} </span>
            <button>schedule&rocket</button>
            <button>check fuel</button>
            <button>select astronauts</button>
            <button>check food</button>
            <button>check load</button>
            <span> {" >>"} new flight created</span>
          </div>
          <div className="status">
            <button className="main">schedule flight</button>
          </div>
          <form action="">
            <ScheduleRocket
              selectedRocket={selectedRocket}
              setSelectedRocket={setSelectedRocket}
              setFuelForFlight={setFuelForFlight}
            />
            <Fuel
              selectedRocket={selectedRocket}
              setSelectedRocket={setSelectedRocket}
              fuelForFlight={fuelForFlight}
            />
            <SelectAstronauts selectedRocket={selectedRocket} />
          </form>
        </div>
        <div className="last"></div>
      </div>
    </StyledNewFlight>
  );
}

const StyledNewFlight = styled.div`
  font-family: "JohnSans Lite Pro";
  font-size: 25px;

  padding-top: 180px;

  .borders {
    max-width: 1400px;
    margin: 0 auto;
    // background-color: brown;
  }

  .heading {
    display: flex;
    align-items: baseline;
  }

  h1 {
    margin: 0 auto;
    text-align: center;
    font-weight: bold;

    text-transform: uppercase;
  }

  .divider {
    background-color: #191e3b;
    height: 0.05rem;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 1.5rem;
  }

  .status {
    display: flex;
    justify-content: center;
  }

  form {
    font-size: 20px;
    text-transform: uppercase;
  }

  .main {
    text-transform: uppercase;
    font-family: "JohnSans Black Pro";
    font-weight: bold;
    border: none;
    cursor: pointer;
    background-color: #38b449;
    padding: 0.4rem 5rem;
    color: white;
    border-radius: 0.5rem;
    font-size: 20px;
    margin: 15px 0;
  }

  .last {
    margin-bottom: 10rem;
  }
`;

export default CreateNewFlight;
