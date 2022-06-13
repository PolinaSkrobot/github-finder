import { SET_ALERT, REMOVE_ALERT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { alert: action.data };
    case REMOVE_ALERT:
      return { alert: null };

    default:
      return state;
  }
};
