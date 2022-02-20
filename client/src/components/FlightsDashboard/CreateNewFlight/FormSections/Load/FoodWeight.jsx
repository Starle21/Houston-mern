import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

function FoodWeight() {
  const foodWeight = useSelector((state) => state.newFlight?.totalFoodRequired);
  const completedFood = useSelector(
    (state) => state.newFlight?.completed?.food
  );

  return (
    <StyledFoodWeight>
      <label>Food weight:</label>
      <span>
        {completedFood ? `${foodWeight} kg` : "Food section not completed"}
      </span>
    </StyledFoodWeight>
  );
}

const StyledFoodWeight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #191e3b16;
  padding: 0.9rem 1.5rem;
  margin: 1px 0;
  position: relative;
`;

export default FoodWeight;
