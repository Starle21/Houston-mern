import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import DivideFlights from "../DivideFlights";
import ScheduleRocket from "./FormSections/ScheduleRocket/ScheduleRocket";
import Fuel from "./FormSections/Fuel/Fuel";
import SelectAstronauts from "./FormSections/SelectAstronauts";
import CheckFood from "./FormSections/CheckFood";
import Load from "./FormSections/Load";
import flightService from "../../../services/flights";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    dispatch(initNewFlight());
  }, []);

  console.log(newFlight);

  const [selectedRocket, setSelectedRocket] = useState();
  const [fuelForFlight, setFuelForFlight] = useState([]);
  const [selectedAstronauts, setSelectedAstronauts] = useState([]);
  const [durationSeconds, setDurationSeconds] = useState();
  const [partAstronauts, setPartAstronauts] = useState(false);
  const [partSchedule, setPartSchedule] = useState(false);
  const [completedParts, setCompletedParts] = useState({
    fuel: false,
    food: false,
    load: false,
  });
  const [disabledStart, setDisabledStart] = useState(true);
  const [fasters, setFasters] = useState([]);
  const [distance, setDistance] = useState(3000000);
  const [name, setName] = useState("Over the moon");
  const [takeOff, setTakeOff] = useState("");
  const navigate = useNavigate();

  // if all completed parts true, enable SCHEDULE FLIGHT button
  useEffect(() => {
    if (
      partSchedule &&
      completedParts.fuel &&
      partAstronauts &&
      completedParts.food &&
      completedParts.load
    ) {
      setDisabledStart(false);
    } else {
      setDisabledStart(true);
    }
  }, [completedParts, partAstronauts, partSchedule]);

  // schedule new flight handler
  const createNewFlight = (e) => {
    e.preventDefault();
    const newFlight = {
      name: name,
      distance: distance,
      rocket: selectedRocket,
      takeOffTimeDate: takeOff,
      //rocket current tank level
      //rocket current food level
      status: "scheduled",
      astronauts: selectedAstronauts,
      fasters: fasters,
      createdBy: "Ben",
    };
    flightService.create(newFlight).then((res) => {
      navigate("/in/flights");
      console.log(res);
    });
    console.log(newFlight);
  };

  return (
    <StyledNewFlight>
      <div className="borders">
        <div className="heading">
          <h1>Create New Flight</h1>
        </div>
        <div className="divider"></div>
        <div>
          <div className="statusBar">
            <span> {">> "} </span>

            <StatusButton className="statusBtn" filled={isPartScheduleComplete}>
              schedule&rocket
            </StatusButton>

            <StatusButton className="statusBtn" filled={isPartFuelComplete}>
              check fuel
            </StatusButton>

            <StatusButton className="statusBtn" filled={partAstronauts}>
              select astronauts
            </StatusButton>
            <StatusButton className="statusBtn" filled={completedParts.food}>
              check food
            </StatusButton>
            <StatusButton className="statusBtn" filled={completedParts.load}>
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
          <form onSubmit={createNewFlight} id="newFlight">
            <ScheduleRocket
              selectedRocket={selectedRocket}
              setSelectedRocket={setSelectedRocket}
              setFuelForFlight={setFuelForFlight}
              durationSeconds={durationSeconds}
              setDurationSeconds={setDurationSeconds}
              setCompletedParts={setPartSchedule}
              completedParts={partSchedule}
              distance={distance}
              setDistance={setDistance}
              name={name}
              setName={setName}
              setTakeOff={setTakeOff}
            />

            <Fuel
              selectedRocket={selectedRocket}
              setSelectedRocket={setSelectedRocket}
              fuelForFlight={fuelForFlight}
              setCompletedParts={setCompletedParts}
              completedParts={completedParts}
            />
            <SelectAstronauts
              selectedRocket={selectedRocket}
              selectedAstronauts={selectedAstronauts}
              setSelectedAstronauts={setSelectedAstronauts}
              setCompletedParts={setPartAstronauts}
              completedParts={partAstronauts}
            />
            <CheckFood
              selectedRocket={selectedRocket}
              selectedAstronauts={selectedAstronauts}
              durationSeconds={durationSeconds}
              setSelectedRocket={setSelectedRocket}
              setCompletedParts={setCompletedParts}
              completedParts={completedParts}
              fasters={fasters}
              setFasters={setFasters}
            />
            <Load
              selectedRocket={selectedRocket}
              selectedAstronauts={selectedAstronauts}
              setCompletedParts={setCompletedParts}
              completedParts={completedParts}
            />
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
