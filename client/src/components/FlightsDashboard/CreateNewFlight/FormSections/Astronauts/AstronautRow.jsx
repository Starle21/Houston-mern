import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { updateNewFlight } from "../../../../../store/reducers/newFlightReducer";

function AstronautRow({
  astronaut,
  // i,
  selectedAstronauts,
  // setSelectedAstronauts,
  crew,
}) {
  const dispatch = useDispatch();
  const isChecked = selectedAstronauts?.some(
    (a) => a.surname === astronaut.surname
  );

  const handleCheck = () => {
    if (isChecked) {
      // uncheck
      dispatch(
        updateNewFlight(
          "selectedAstronauts",
          selectedAstronauts.filter((a) => a.surname !== astronaut.surname)
        )
      );
    } else {
      // check

      dispatch(
        updateNewFlight("selectedAstronauts", [
          ...selectedAstronauts,
          astronaut,
        ])
      );
    }
  };

  const determineDisable = () => {
    if (!crew) return;
    if (selectedAstronauts?.length === crew && !isChecked) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <StyledFormSection>
      <input
        type="checkbox"
        id={astronaut.surname}
        name={astronaut.surname}
        checked={isChecked}
        onChange={handleCheck}
        disabled={determineDisable()}
      />
      <div>
        {astronaut.name} {astronaut.surname}
      </div>
    </StyledFormSection>
  );
  //   }
}

const StyledFormSection = styled.div`
  display: flex;
  justify-content: flex-start;
  border: 1px solid #f7911d54;
  padding: 0.5rem 1.5rem;
  margin: 2px 0;
`;

export default AstronautRow;
