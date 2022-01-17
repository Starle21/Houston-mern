import React, { useState, useEffect } from "react";
import DivideFlights from "../../DivideFlights";
import styled from "styled-components";
import FoodRow from "./FoodRow";

function CheckFood({
  selectedRocket,
  selectedAstronauts,
  durationSeconds,
  setSelectedRocket,
}) {
  const [notification, setNotification] = useState();
  const [faster, setFaster] = useState([]);

  useEffect(() => {
    if (
      selectedAstronauts.length < selectedRocket?.numberCrew ||
      !selectedRocket
    ) {
      return setNotification("Complete previous parts first");
    }
    if (totalFood() > selectedRocket.fridgeCapacity) {
      return setNotification("Too small a fridge!");
    }
    if (totalFood() < selectedRocket.foodCurrentLevel) {
      return setNotification("Take food out");
    }
    if (totalFood() > selectedRocket.foodCurrentLevel) {
      return setNotification("Not enough food");
    }

    setNotification("Food OK");
    // notification
  }, [faster, selectedAstronauts, selectedRocket]);

  const placeRequiredFood = (e) => {
    e.preventDefault();
    setSelectedRocket({ ...selectedRocket, foodCurrentLevel: totalFood() });
  };

  const totalFoodPerHour = () => {
    return selectedAstronauts.reduce((sum, current) => {
      return sum + current.foodPerHour;
    }, 0);
  };

  const fastHandler = (e) => {
    if (faster.some((f) => f.surname === e.target.value)) {
      setFaster(faster.filter((f) => f.surname !== e.target.value));
    } else {
      setFaster([
        ...faster,
        selectedAstronauts.filter((f) => f.surname === e.target.value)[0],
      ]);
    }
  };

  const totalFood = () => {
    const durationHour = durationSeconds / 60 / 60;
    const foodNoFast = Math.round(totalFoodPerHour() * durationHour);
    const thirtyPercent = durationHour * 0.3;
    const fasterPerHour = faster.reduce((sum, current) => {
      return sum + current.foodPerHour;
    }, 0);
    const totalFood = Math.round(foodNoFast - thirtyPercent * fasterPerHour);

    return totalFood;
  };

  return (
    <>
      <DivideFlights>Check Food</DivideFlights>
      <StyledFormSection>
        <div className="item calc">
          <label>Fridge Capacity</label>
          <span>{selectedRocket?.fridgeCapacity} kg</span>
        </div>

        <div>Required food for the flight:</div>
        {selectedAstronauts.map((a) => {
          return (
            <FoodRow astronaut={a} key={a.surname} fastHandler={fastHandler} />
          );
        })}

        <div className="item calc">
          <label>Total food amount required</label>
          <span>
            {/* {totalFoodPerHour().toFixed(1)} kg/hod x{" "}
            {Math.round(durationSeconds / 60 / 60)} hod =  */}
            {totalFood()} kg
          </span>
        </div>

        <div className="item">
          <label>Current food level</label>
          <div className="addFood">
            {selectedRocket
              ? `${selectedRocket.foodCurrentLevel} kg`
              : "select rocket first"}
            <button onClick={placeRequiredFood}>set required food</button>
          </div>
        </div>

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
