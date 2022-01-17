import React from "react";
import styled from "styled-components";

function FoodRow({ astronaut, fastHandler }) {
  const birth = new Date(astronaut.dateOfBirth);
  const age = Math.floor(
    (Date.now() - birth.getTime()) / 1000 / 60 / 60 / 24 / 365
  );

  const makeFast = () => {
    return (
      <div>
        <input
          type="checkbox"
          id={astronaut.surname}
          name={astronaut.surname}
          onChange={fastHandler}
          value={astronaut.surname}
        />
        <label>30% fast</label>
      </div>
    );
  };

  return (
    <StyledFormSection>
      <div>{astronaut.name}</div>
      <div>{age} years old</div>
      <div>{astronaut.foodPerHour} kg/hod</div>
      {age < 40 ? makeFast() : ""}
    </StyledFormSection>
  );
}

const StyledFormSection = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  border: 1px solid #f7911d54;
  padding: 0.5rem 1.5rem;
  margin: 2px 0;
`;

export default FoodRow;
