import React from "react";

function Astronaut({ astronaut }) {
  return (
    <div>
      <p>
        Astronaut {astronaut.name} {astronaut.surname}
      </p>
    </div>
  );
}

export default Astronaut;
