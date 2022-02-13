import React from "react";
import styled from "styled-components";
import Select from "react-select";

//   const createAstronautRow = () => {
//     if (!selectedRocket) return;
//     let astronautsTable = [];
//     for (let i = 0; i < selectedRocket.numberCrew; i++) {
//       astronautsTable.push(
//         <AstronautRow
//           i={i}
//           astronauts={filteredAstronauts}
//           setSelectedAstronauts={setSelectedAstronauts}
//         />
//       );
//     }
//     return astronautsTable;
//   };

//   const selectAstronautRow = (e) => {
//     e.preventDefault();
//     return (
//       <div className="item calc">
//         <label>Select Astronaut</label>
//       </div>
//     );
//   };

//   const filteredAstronauts = astronauts.filter((a) => {
//     if (selectedAstronauts.some((s) => s.surname === a.surname)) {
//       return "";
//     } else return a;
//   });

// console.log("filtered", filteredAstronauts);
// console.log("selected", selectedAstronauts);

// const createAstronautRow = () => {
//   if (!selectedRocket) return;
//   if (items.length < selectedRocket.numberCrew) {
//     return (
//       <div className="item button">
//         <button
//           className="astronaut"
//           onClick={(e) => {
//             e.preventDefault();
//             setItems(items.concat({}));
//             filterAstronauts();
//           }}
//         >
//           Select Astronaut
//         </button>
//       </div>
//     );
//   } else return "";
// };

// const filterAstronauts = () => {
//   setFilteredAstronauts(
//     astronauts.filter((a) => {
//       if (selectedAstronauts.some((s) => s.surname === a.surname)) {
//         return "";
//       } else return a;
//     })
//   );
// }

function AstronautRow({
  i,
  astronauts,
  setSelectedAstronauts,
  selectedAstronauts,
}) {
  const select = (e) => {
    const astronautToSelect = astronauts.filter(
      (a) => a.surname === e.target.value
    )[0];
    setSelectedAstronauts([...selectedAstronauts, astronautToSelect]);
  };

  //   if (selectedAstronauts.length === 0) {
  //     console.log("selected");
  //     return (
  //       <StyledFormSection className="item" key={i}>
  //         Astronaut {i + 1}
  //         <select onChange={select}>
  //           <option value="">--Set astronaut--</option>
  //           {selectedAstronauts.map((r, index) => {
  //             return (
  //               <option value={r.surname} key={index}>
  //                 {r.name} {r.surname}
  //               </option>
  //             );
  //           })}
  //         </select>
  //       </StyledFormSection>
  //     );
  //   } else {
  return (
    <StyledFormSection className="item" key={i}>
      Astronaut {i + 1}
      <select onChange={select}>
        <option value="">--Set astronaut--</option>
        {selectedAstronauts.map((r, index) => {
          return (
            <option value={r.surname} key={index}>
              {r.name} {r.surname}
            </option>
          );
        })}
      </select>
    </StyledFormSection>
  );
  //   }
}

const StyledFormSection = styled.div`
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
`;

export default AstronautRow;
