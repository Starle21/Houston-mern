// flights
import flightService from "../../services/flights";

// initial properties
const initialProps = [{}];

// action creators
export const getFlights = () => {
  return async (dispatch) => {
    const flights = await flightService.getAll();
    dispatch({
      type: "GET_FLIGHTS",
      data: flights,
    });
  };
};

export const updateFlightStatus = (id, status) => {
  return async (dispatch) => {
    // const flights = await flightService.getAll();
    dispatch({
      type: "UPDATE_FLIGHT_STATUS",
      data: { status, id },
    });
  };
};

// reducer
const flightsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_FLIGHTS": {
      return action.data;
    }

    case "UPDATE_FLIGHT_STATUS": {
      const update = state.filter((el) => {
        return el.name === action.data.id;
      })[0];
      const updated = { ...update, status: action.data.status };

      return state.map((el) => (el.name === action.data.id ? updated : el));
    }

    default:
      return state;
  }
};

export default flightsReducer;
