import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../../../store/reducers/notificationReducer";

import {
  updateNewFlight,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";

function TotalFoodRequired({ fasters }) {
  const [notify, setNotify] = useState("");
  const dispatch = useDispatch();
  const selectedAstronauts = useSelector(
    (state) => state.newFlight?.selectedAstronauts
  );
  const totalFoodRequired = useSelector(
    (state) => state.newFlight?.totalFoodRequired
  );
  const numberCrew = useSelector(
    (state) => state.newFlight?.rocket?.numberCrew
  );
  const duration = useSelector((state) => state.newFlight?.duration);
  const fridgeCapacity = useSelector(
    (state) => state.newFlight?.rocket?.fridgeCapacity
  );

  useEffect(() => {
    dispatch(updateNewFlight("totalFoodRequired", 0));
    totalFood();
  }, [duration, numberCrew, selectedAstronauts, fasters]);

  const totalFoodPerHour = () => {
    if (!selectedAstronauts) return;
    return selectedAstronauts.reduce((sum, current) => {
      return sum + current.foodPerHour;
    }, 0);
  };

  const totalFood = () => {
    if (!duration) return;
    const durationHour = duration / 60 / 60;
    const foodNoFast = Math.round(totalFoodPerHour() * durationHour);
    const thirtyPercent = durationHour * 0.3;
    const fastersPerHour = fasters.reduce((sum, current) => {
      return sum + current.foodPerHour;
    }, 0);
    // console.log(fastersPerHour);
    const totalFood = Math.round(foodNoFast - thirtyPercent * fastersPerHour);

    checkTotalFood(totalFood);

    dispatch(updateNewFlight("totalFoodRequired", totalFood));
  };

  const checkTotalFood = (totalFood) => {
    if (totalFood > fridgeCapacity) {
      dispatch(allowStart("food", "totalFoodRequired", false));
      setNotify("Too small a fridge!");
    } else {
      dispatch(allowStart("food", "totalFoodRequired", true));
      setNotify("");
    }
  };

  return (
    <StyledTotalFoodRequired>
      <label>Total food amount required</label>
      <div>
        <div>
          {!duration || numberCrew !== selectedAstronauts.length
            ? "?"
            : `${totalFoodRequired} kg`}
        </div>
        <div className="notify">{notify}</div>
      </div>
    </StyledTotalFoodRequired>
  );
}

const StyledTotalFoodRequired = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border: 1px solid #191e3b16;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;
  text-align: right;

  .notify {
    font-family: "JohnSans Lite Pro";
    font-size: 15px;
    color: #be1e2d;
    font-weight: bold;
    height: 15px;
  }
`;

export default TotalFoodRequired;
