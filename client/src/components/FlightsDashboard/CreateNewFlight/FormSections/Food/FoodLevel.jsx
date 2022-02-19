import React from "react";

function FoodLevel() {
  const placeRequiredFood = (e) => {
    e.preventDefault();
    setSelectedRocket({ ...selectedRocket, foodLevelForStart: totalFood() });
  };

  return (
    <div className="item">
      <label>Food level before start:</label>
      <div className="addFood">
        {selectedRocket
          ? `${selectedRocket.foodLevelForStart} kg`
          : "select rocket first"}
        <button onClick={placeRequiredFood}>set required food</button>
      </div>
    </div>
  );
}

export default FoodLevel;
