import React, { useState, useEffect } from "react";
import DivideFlights from "../../../../CommonSignedIn/DivideFlights";
import styled from "styled-components";
import FoodRow from "./FoodRow";

import FridgeCapacity from "./FridgeCapacity";
import FoodPerAstronaut from "./FoodPerAstronaut";
import TotalFoodRequired from "./TotalFoodRequired";

function CheckFood({
  selectedRocket,
  selectedAstronauts,
  durationSeconds,
  setSelectedRocket,
  setCompletedParts,
  completedParts,
}) {
  const [fasters, setFasters] = useState([]);

  // ---------
  const [notification, setNotification] = useState();

  // useEffect(() => {
  //   if (
  //     selectedAstronauts.length < selectedRocket?.numberCrew ||
  //     !selectedRocket
  //   ) {
  //     setCompletedParts({ ...completedParts, food: false });
  //     return setNotification("Complete previous parts first");
  //   }
  //   if (totalFood() > selectedRocket.fridgeCapacity) {
  //     const part = { ...completedParts, food: false };
  //     setCompletedParts(part);
  //     return setNotification("Too small a fridge!");
  //   }
  //   if (totalFood() < selectedRocket.foodLevelForStart) {
  //     setCompletedParts({ ...completedParts, food: false });
  //     return setNotification("Take food out");
  //   }
  //   if (totalFood() > selectedRocket.foodLevelForStart) {
  //     setCompletedParts({ ...completedParts, food: false });
  //     return setNotification("Not enough food");
  //   }
  //   setCompletedParts({ ...completedParts, food: true });
  //   setNotification("Food OK");
  // }, [fasters, selectedAstronauts, selectedRocket, notification]);

  return (
    <>
      <DivideFlights>Check Food</DivideFlights>
      <StyledFormSection>
        <FridgeCapacity />

        <FoodPerAstronaut fasters={fasters} setFasters={setFasters} />

        <TotalFoodRequired fasters={fasters} />

        {/* <div className="item calc">
          <label>Total food amount required</label>
          <span>
            {totalFood()} kg
          </span>
        </div> */}

        {/* <div className="item">
          <label>Current food level</label>
          <div className="addFood">
            {selectedRocket
              ? `${selectedRocket.foodLevelForStart} kg`
              : "select rocket first"}
            <button onClick={placeRequiredFood}>set required food</button>
          </div>
        </div> */}

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

  .addFood {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }
`;

export default CheckFood;
