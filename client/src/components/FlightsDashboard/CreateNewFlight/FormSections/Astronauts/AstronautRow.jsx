import React from "react";
import styled from "styled-components";

function AstronautRow({
  astronaut,
  // i,
  // selectedAstronauts,
  // setSelectedAstronauts,
  // crew,
}) {
  // const isChecked = selectedAstronauts.some(
  //   (a) => a.surname === astronaut.surname
  // );

  // const handleCheck = () => {
  //   if (isChecked) {
  //     // uncheck
  //     setSelectedAstronauts(
  //       selectedAstronauts.filter((a) => a.surname !== astronaut.surname)
  //     );
  //   } else {
  //     // check
  //     setSelectedAstronauts([...selectedAstronauts, astronaut]);
  //   }
  // };

  // const determineDisable = () => {
  //   if (!crew) return;
  //   if (selectedAstronauts.length === crew && !isChecked) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  console.log(astronaut);

  return (
    <StyledFormSection>
      {/* <input
        type="checkbox"
        id={astronaut.surname}
        name={astronaut.surname}
        // checked={isChecked[i]}
        onChange={handleCheck}
        disabled={determineDisable()}
      /> */}
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
