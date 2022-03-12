import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import DivideFlights from "../DivideFlights";
import ScheduleRocket from "./FormSections/ScheduleRocket/ScheduleRocket";
import Fuel from "./FormSections/Fuel/Fuel";
import SelectAstronauts from "./FormSections/Astronauts/SelectAstronauts";
import CheckFood from "./FormSections/Food/CheckFood";
import Load from "./FormSections/Load/Load";
import { useNavigate } from "react-router-dom";
import flightService from "../../../services/flights";

// astronauts status was patchy - state updated in the following components from the old state object.. - redux should fix that
// filter unchecked fasters out - they stay in the state
// redirect on submit new flight

import { useDispatch, useSelector } from "react-redux";
import { initNewFlight } from "../../../store/reducers/newFlightReducer";

function CreateNewFlight() {
  const dispatch = useDispatch();
  const newFlight = useSelector((state) => state.newFlight);
  const isPartScheduleComplete = useSelector(
    (state) => state.newFlight.completed?.schedule
  );
  const isPartFuelComplete = useSelector(
    (state) => state.newFlight.completed?.fuel
  );
  const isPartAstronautsComplete = useSelector(
    (state) => state.newFlight.completed?.astronauts
  );
  const isPartFoodComplete = useSelector(
    (state) => state.newFlight.completed?.food
  );
  const isPartLoadComplete = useSelector(
    (state) => state.newFlight.completed?.load
  );
  const [disabledStart, setDisabledStart] = useState(true);

  useEffect(() => {
    dispatch(initNewFlight());
  }, []);

  // console.log(newFlight);

  const navigate = useNavigate();

  // if all completed parts true, enable SCHEDULE FLIGHT button
  useEffect(() => {
    if (
      isPartScheduleComplete &&
      isPartFuelComplete &&
      isPartAstronautsComplete &&
      isPartFoodComplete &&
      isPartLoadComplete
    ) {
      setDisabledStart(false);
    } else {
      setDisabledStart(true);
    }
  }, [
    isPartScheduleComplete,
    isPartFuelComplete,
    isPartAstronautsComplete,
    isPartFoodComplete,
    isPartLoadComplete,
  ]);

  // schedule new flight button handler
  const createNewFlight = (e) => {
    e.preventDefault();
    // console.log(newFlight);

    const newFlightToSchedule = {
      name: newFlight.name,
      takeOffTimeDate: newFlight.takeOffTimeDate,
      touchDownTimeDate: newFlight.touchDownTimeDate,
      rocket: newFlight.rocket,
      distance: newFlight.distance,
      fuelForStart: newFlight.tankLevelForStart,
      foodForStart: newFlight.foodLevelForStart,
      createdBy: "Ben",

      astronauts: newFlight.selectedAstronauts,
      status: "scheduled",
    };

    flightService.create(newFlightToSchedule).then((res) => {
      navigate("/in/flights");
      console.log(res);
    });

    // const newFlight = {
    //   name: name,
    //   distance: distance,
    //   rocket: selectedRocket,
    //   takeOffTimeDate: takeOff,
    //   //rocket current tank level
    //   //rocket current food level
    //   status: "scheduled",
    //   astronauts: selectedAstronauts,
    //   fasters: fasters,
    //   createdBy: "Ben",
    // };
    // flightService.create(newFlight).then((res) => {
    //   navigate("/in/flights");
    //   console.log(res);
    // });
    // console.log(newFlight);
  };

  return (
    <StyledNewFlight>
      <div className="borders">
        <div className="heading">
          <h1>Create New Flight</h1>
        </div>
        <div className="divider"></div>
        <div>
          {/* status bar showing the progress */}
          <div className="statusBar">
            <span> {">> "} </span>
            <StatusButton className="statusBtn" filled={isPartScheduleComplete}>
              schedule&rocket
            </StatusButton>

            <StatusButton className="statusBtn" filled={isPartFuelComplete}>
              check fuel
            </StatusButton>

            <StatusButton
              className="statusBtn"
              filled={isPartAstronautsComplete}
            >
              select astronauts
            </StatusButton>
            <StatusButton className="statusBtn" filled={isPartFoodComplete}>
              check food
            </StatusButton>
            <StatusButton className="statusBtn" filled={isPartLoadComplete}>
              check load
            </StatusButton>
            <span> {" >> "}</span>
            <MainButton
              className="main"
              disabled={disabledStart}
              form="newFlight"
              type="submit"
            >
              schedule flight
            </MainButton>
          </div>

          {/* new flight form divided into sections */}
          <form onSubmit={createNewFlight} id="newFlight">
            <ScheduleRocket />
            <Fuel />
            <SelectAstronauts />
            <CheckFood />
            <Load />
          </form>
        </div>
        <div className="last"></div>
      </div>
    </StyledNewFlight>
  );
}

const MainButton = styled.button`
  text-transform: uppercase;
  font-family: "JohnSans Black Pro";
  font-weight: bold;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background-color: ${(props) => (props.disabled ? "#a0b3a2" : "#38b449")};
  padding: 0.4rem 5rem;
  color: white;
  border-radius: 0.5rem;
  font-size: 20px;
  margin: 15px 0;
`;

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

  .statusBar {
    display: flex;
    justify-content: center;
    gap: 0.2rem;
    align-items: baseline;

    position: sticky;
    z-index: 50;

    padding-top: 25px;
    padding-bottom: 20px;
    top: 100px;
    background-color: #fff;
  }

  form {
    font-size: 20px;
    text-transform: uppercase;
  }

  .last {
    margin-bottom: 10rem;
  }

  .statusBtn {
    text-transform: uppercase;
    font-family: "JohnSans Black Pro";
    font-size: 13px;
    border: 1px solid #191e3b;
    /* border-radius: 0.3rem; */
    /* background-color: #fff; */
    /* color: #191e3b; */
    padding: 0.4rem 1rem;
    /* cursor: pointer; */
  }
`;

const StatusButton = styled.button`
  background-color: ${(props) => (props.filled ? "#191e3b" : "#fff")};
  color: ${(props) => (props.filled ? "#fff" : "#191e3b")};
`;

export default CreateNewFlight;
