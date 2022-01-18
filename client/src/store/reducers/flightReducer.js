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

// reducer
const branchesReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_FLIGHTS": {
      return action.data;
    }

    case "UPDATE_BRANCH": {
      return;
    }

    default:
      return state;
  }
};

export default branchesReducer;
