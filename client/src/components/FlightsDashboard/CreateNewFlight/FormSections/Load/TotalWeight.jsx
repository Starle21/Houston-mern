import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import {
  allowStart,
  updateNewFlight,
} from "../../../../../store/reducers/newFlightReducer";

function TotalWeight() {
  const dispatch = useDispatch();
  const foodWeight = useSelector((state) => state.newFlight?.totalFoodRequired);
  const completedFood = useSelector(
    (state) => state.newFlight?.completed?.food
  );
  const completedAstronauts = useSelector(
    (state) => state.newFlight?.completed?.astronauts
  );
  const totalAstronautsWeight = useSelector(
    (state) => state.newFlight.totalAstronautsWeight
  );
  const totalLoad = useSelector((state) => state.newFlight.totalLoad);
  const rocketLoad = useSelector((state) => state.newFlight?.rocket?.load);

  useEffect(() => {
    if (!completedAstronauts || !completedFood) {
      dispatch(updateNewFlight("totalLoad", 0));
      return;
    }
    const totalLoad = totalAstronautsWeight + foodWeight;
    dispatch(updateNewFlight("totalLoad", totalLoad));
    checkFormat(totalLoad);
  }, [
    completedFood,
    completedAstronauts,
    totalAstronautsWeight,
    foodWeight,
    rocketLoad,
  ]);

  const checkFormat = (load) => {
    if (load <= rocketLoad) {
      dispatch(allowStart("load", "totalLoad", true));
    } else {
      dispatch(allowStart("load", "totalLoad", false));
    }
  };

  return (
    <StyledTotalWeight>
      <label>Total weight</label>
      {completedFood && completedAstronauts
        ? `${totalLoad} kg`
        : "Astronauts or Food sections not completed"}
    </StyledTotalWeight>
  );
}

const StyledTotalWeight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #191e3b16;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;
`;

export default TotalWeight;
