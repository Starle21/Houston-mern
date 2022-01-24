// flights
import rocketService from "../../services/rockets";

// initial properties
const initialProps = [{}];

// action creators
export const getRockets = () => {
  return async (dispatch) => {
    const rockets = await rocketService.getAll();
    dispatch({
      type: "GET_ROCKETS",
      data: rockets,
    });
  };
};

// reducer
const rocketReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ROCKETS": {
      return action.data;
    }

    case "UPDATE_BRANCH": {
      return;
    }

    default:
      return state;
  }
};

export default rocketReducer;
