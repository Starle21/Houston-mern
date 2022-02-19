// flights
import flightService from "../../services/flights";

// initial properties
const initialProps = {
  name: "",
  distance: "",
  rocket: {},
  takeOffTimeDate: "",
  allowStart: {
    schedule: {
      name: false,
      takeOffTimeDate: false,
      distance: false,
      rocket: false,
    },
    fuel: { requiredFuel: false },
    food: {},
    astronauts: {},
    load: {},
  },
  completed: {
    schedule: false,
    fuel: false,
    astronauts: false,
    food: false,
    load: false,
  },
  tankLevelForStart: 0,
  selectedAstronauts: [],
};
// action creators
export const initNewFlight = () => {
  return async (dispatch) => {
    dispatch({
      type: "INIT_NEW_FLIGHT",
      data: initialProps,
    });
  };
};

export const getNewFlight = () => {
  return async (dispatch) => {
    dispatch({
      type: "GET_NEW_FLIGHT",
    });
  };
};

export const updateNewFlight = (key, state) => {
  return async (dispatch) => {
    // const flights = await flightService.getAll();
    dispatch({
      type: "UPDATE_FLIGHT_STATUS",
      data: { key, state },
    });
  };
};

export const allowStart = (part, key, state) => {
  return async (dispatch) => {
    dispatch({
      type: "ALLOW_START",
      data: { part, key, state },
    });
  };
};

export const setCompleted = (part, state) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_COMPLETED",
      data: { part, state },
    });
  };
};

export const updateTankLevelForStart = (value) => {
  return async (dispatch) => {
    dispatch({
      type: "UPDATE_TANK",
      data: { value },
    });
  };
};

// reducer
const newFlightReducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT_NEW_FLIGHT": {
      return { ...action.data };
    }
    case "GET_NEW_FLIGHT": {
      return state;
    }
    case "UPDATE_FLIGHT_STATUS": {
      const updated = { ...state, [action.data.key]: action.data.state };
      return updated;
    }
    case "ALLOW_START": {
      const updated = {
        ...state,
        allowStart: {
          ...state.allowStart,
          [action.data.part]: {
            ...state.allowStart[action.data.part],
            [action.data.key]: action.data.state,
          },
        },
      };
      return updated;
    }
    case "SET_COMPLETED": {
      const updated = {
        ...state,
        completed: {
          ...state.completed,
          [action.data.part]: action.data.state,
        },
      };
      return updated;
    }

    case "UPDATE_TANK": {
      const updated = { ...state, tankLevelForStart: action.data.value };
      return updated;
    }

    default:
      return state;
  }
};

export default newFlightReducer;
