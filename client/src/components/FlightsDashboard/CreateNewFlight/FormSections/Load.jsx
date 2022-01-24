import React, { useState, useEffect } from "react";
import DivideFlights from "../../../CommonSignedIn/DivideFlights";
import styled from "styled-components";
import LoadAstronautRow from "./LoadAstronautRow";

function Load({
  selectedRocket,
  selectedAstronauts,
  setCompletedParts,
  completedParts,
}) {
  const [notification, setNotification] = useState();

  const totalAstronautsWeight = () => {
    return selectedAstronauts.reduce((sum, current) => {
      return sum + current.weight;
    }, 0);
  };

  const totalLoad = totalAstronautsWeight() + selectedRocket?.foodLevelForStart;

  useEffect(() => {
    if (
      !selectedRocket ||
      selectedAstronauts.length !== selectedRocket.numberCrew
    ) {
      setCompletedParts({ ...completedParts, load: false });
      return setNotification("Complete previous parts first");
    }

    if (totalLoad > selectedRocket?.load) {
      setCompletedParts({ ...completedParts, load: false });
      return setNotification(
        "The rocket is overloaded. Make it lighter (eg. take food out)"
      );
    }
    setCompletedParts({ ...completedParts, load: true });
    setNotification("Load ok");
  }, [selectedRocket, totalLoad]);

  return (
    <>
      <DivideFlights>Check Load</DivideFlights>
      <StyledFormSection>
        <div className="item calc">
          <label>Food weight</label>
          <span>{selectedRocket?.foodLevelForStart} kg</span>
        </div>

        <div>Astronauts weight:</div>
        {selectedAstronauts.map((a) => {
          return <LoadAstronautRow astronaut={a} key={a.surname} />;
        })}
        <div className="item calc">
          <label>Total astronauts weight</label>
          <span>{totalAstronautsWeight()} kg</span>
        </div>

        <div className="item calc">
          <label>Total weight</label>
          <span>{totalLoad} kg</span>
        </div>

        <div className="item calc">
          <label>Rocket's load bearing capacity</label>
          <span>{selectedRocket?.load} kg</span>
        </div>

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
`;

export default Load;
