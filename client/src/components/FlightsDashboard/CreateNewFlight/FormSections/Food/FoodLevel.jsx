import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../../../store/reducers/notificationReducer";

import {
  updateNewFlight,
  allowStart,
} from "../../../../../store/reducers/newFlightReducer";

function FoodLevel() {
  const [notify, setNotify] = useState("");
  const dispatch = useDispatch();
  const newFlight = useSelector((state) => state.newFlight);
  const rocket = useSelector((state) => state.newFlight?.rocket);
  const currentFoodLevel = useSelector(
    (state) => state.newFlight?.rocket?.foodLevelForStart
  );
  const allowTotalFoodRequired = useSelector(
    (state) => state.newFlight?.allowStart?.food?.totalFoodRequired
  );
  const totalFoodRequired = useSelector(
    (state) => state.newFlight?.totalFoodRequired
  );
  const foodLevelForStart = useSelector(
    (state) => state.newFlight.foodLevelForStart
  );
  const completedAstronauts = useSelector(
    (state) => state.newFlight.completed?.astronauts
  );
  const completedSchedule = useSelector(
    (state) => state.newFlight.completed?.schedule
  );

  // on first render create new property "food level for start"
  // place the current food level of the rocket there
  useEffect(() => {
    dispatch(updateNewFlight("foodLevelForStart", currentFoodLevel));
  }, [rocket, newFlight?.distance, newFlight?.astronauts]);

  useEffect(() => {
    if (!allowTotalFoodRequired) return;
    checkFormat();
  }, [
    totalFoodRequired,
    allowTotalFoodRequired,
    foodLevelForStart,
    completedSchedule,
    completedAstronauts,
  ]);

  const checkFormat = () => {
    if (totalFoodRequired === foodLevelForStart) {
      setNotify((curState) => changeNotify(curState, ""));
      dispatch(allowStart("food", "foodLevelForStart", true));
    } else {
      setNotify((curState) =>
        changeNotify(curState, "Fill the fridge up or take food out")
      );
      dispatch(allowStart("food", "foodLevelForStart", false));
    }
  };

  const changeNotify = (state, newNotification) => {
    return newNotification;
  };

  const placeRequiredFood = (e) => {
    e.preventDefault();

    if (!allowTotalFoodRequired) {
      dispatch(allowStart("food", "foodLevelForStart", false));
      setNotify((curState) =>
        changeNotify(curState, "Mind the fridge capacity")
      );
      return;
    }

    if (!completedAstronauts || !completedSchedule) {
      dispatch(allowStart("food", "foodLevelForStart", false));
      setNotify((curState) =>
        changeNotify(curState, "Finish Schedule or Astronauts parts")
      );
      return;
    }
    dispatch(updateNewFlight("foodLevelForStart", totalFoodRequired));
    dispatch(allowStart("food", "foodLevelForStart", true));
    checkFormat();
  };

  return (
    <StyledFoodLevel>
      <div className="readout">
        <label>Food level before start:</label>
        <div className="input">
          <span>
            {foodLevelForStart
              ? `${foodLevelForStart} kg`
              : "select a rocket first"}
          </span>
          <div className="notify">{notify}</div>
        </div>
      </div>
      <div className="changeFood">
        <button onClick={placeRequiredFood}>set required food</button>
      </div>
    </StyledFoodLevel>
  );
}

const StyledFoodLevel = styled.div`
  border: 1px solid #f7911d54;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;

  .readout {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    text-align: right;
  }

  .input {
    flex-basis: 50%;
    margin-bottom: 0.5rem;
  }

  .notify {
    font-family: "JohnSans Lite Pro";
    font-size: 15px;
    color: #be1e2d;
    font-weight: bold;
    height: 15px;
  }

  .changeFood {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

export default FoodLevel;
