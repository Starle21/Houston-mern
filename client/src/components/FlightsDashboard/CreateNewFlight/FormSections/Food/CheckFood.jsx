import React, { useState, useEffect } from "react";
import DivideFlights from "../../../../CommonSignedIn/DivideFlights";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setCompleted } from "../../../../../store/reducers/newFlightReducer";

import FridgeCapacity from "./FridgeCapacity";
import FoodPerAstronaut from "./FoodPerAstronaut";
import TotalFoodRequired from "./TotalFoodRequired";
import FoodLevel from "./FoodLevel";

function CheckFood({
  selectedRocket,
  selectedAstronauts,
  durationSeconds,
  setSelectedRocket,
  setCompletedParts,
  completedParts,
}) {
  const dispatch = useDispatch();
  const newFlight = useSelector((state) => state.newFlight);

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

  useEffect(() => {
    if (!newFlight.allowStart?.food) return;

    if (!newFlight?.completed?.schedule || !newFlight?.completed?.astronauts) {
      // dispatch(setNotification("fuel", "Complete the first section"));
      setNotification("Complete the previous sections");
      dispatch(setCompleted("food", false));
      return;
    }

    const entries = [];
    Object.entries(newFlight.allowStart.food).forEach(([key, value]) => {
      if (value === false) {
        entries.push(key);
        return;
      }
    });

    if (entries.length === 0) {
      dispatch(setCompleted("food", true));
      // dispatch(setNotification("food", "food ok"));
      setNotification("food ok");
    } else {
      // dispatch(setNotification("food", "complete the food section"));
      setNotification("complete the food section");
      dispatch(setCompleted("food", false));
    }
  }, [
    newFlight.allowStart?.food,
    newFlight?.completed?.schedule,
    newFlight?.completed?.astronauts,
  ]);

  return (
    <>
      <DivideFlights>Check Food</DivideFlights>
      <StyledFormSection>
        <FridgeCapacity />

        <FoodPerAstronaut fasters={fasters} setFasters={setFasters} />

        <TotalFoodRequired fasters={fasters} />

        <FoodLevel />

        {/* <div className="item">
          <label>Current food level</label>
          <div className="addFood">
            {selectedRocket
              ? `${selectedRocket.foodLevelForStart} kg`
              : "select rocket first"}
            <button>set required food</button>
          </div>
        </div> */}
        <StyledNotification bgColor={newFlight.completed?.food}>
          {notification}
        </StyledNotification>
      </StyledFormSection>
    </>
  );
}

const StyledNotification = styled.div`
  margin-top: 1rem;
  margin-bottom: 6rem;
  padding: 1rem 0;
  align-self: center;
  color: white;
  font-weight: bold;
  width: 100%;
  text-align: center;
  background-color: ${(props) => (props.bgColor ? "#61b66c" : "#be1e2d")};
`;

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
