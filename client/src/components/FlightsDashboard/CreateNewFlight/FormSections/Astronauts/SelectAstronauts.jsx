import React, { useState, useEffect } from "react";
import DivideFlights from "../../../../CommonSignedIn/DivideFlights";
import styled from "styled-components";
import astronautService from "../../../../../services/astronauts";
import AstronautRow from "./AstronautRow";

import CrewNumber from "./CrewNumber";
import Astronauts from "./Astronauts";

function SelectAstronauts({
  selectedRocket,
  setSelectedAstronauts,
  selectedAstronauts,
  setCompletedParts,
  completedParts,
}) {
  const [notification, setNotification] = useState();
  const [astronauts, setAstronauts] = useState([]);

  // get all available astronauts
  useEffect(() => {
    const getAllAstronauts = async () => {
      const allAstronauts = await astronautService.getAll();
      setAstronauts(allAstronauts);
    };
    getAllAstronauts();
  }, []);

  // notifications
  useEffect(() => {
    if (!selectedRocket) {
      return setNotification("Complete previous parts first");
    }
    if (!selectedAstronauts) {
      // setCompletedParts({ ...completedParts, astronauts: false });
      setCompletedParts(false);
      return setNotification("Select Astronauts");
    }
    if (selectedAstronauts.length === selectedRocket.numberCrew) {
      // setCompletedParts({
      //   ...completedParts,
      //   astronauts: true,
      // });
      setCompletedParts(true);
      setNotification("Astronauts OK");
    } else {
      // setCompletedParts({
      //   ...completedParts,
      //   astronauts: false,
      // });
      setCompletedParts(false);
      return setNotification("Select the whole crew");
    }
  }, [selectedRocket, selectedAstronauts]);

  return (
    <>
      <DivideFlights>Select Astronauts</DivideFlights>
      <StyledFormSection>
        <CrewNumber />
        <Astronauts />

        {/* <div>Select Available Astronauts:</div>
        {astronauts?.map((a, i) => {
          return (
            <AstronautRow
              key={a.surname}
              astronaut={a}
              i={i}
              selectedAstronauts={selectedAstronauts}
              setSelectedAstronauts={setSelectedAstronauts}
              crew={selectedRocket?.numberCrew}
            />
          );
        })} */}
        <div className="notification">{notification}</div>
      </StyledFormSection>
    </>
  );
}

const StyledFormSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  margin: 0 auto;

  .item {
    display: flex;
    justify-content: space-between;
    border: 1px solid #f7911d54;
    padding: 0.5rem 1.5rem;
    margin: 2px 0;
  }

  .calc {
    border: 1px solid #191e3b16;
  }

  .grow {
    flex-grow: 1;
  }

  .notification {
    margin-top: 1rem;
    align-self: center;
  }

  .button {
    align-self: stretch;
  }

  .astronaut {
    width: 100%;
  }
`;

export default SelectAstronauts;
