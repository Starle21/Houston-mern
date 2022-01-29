export const setNotification = (part, value) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: { part, value },
    });
  };
};

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return { ...state, [action.data.part]: action.data.value };
    }
    default:
      return state;
  }
};

export default notificationReducer;
