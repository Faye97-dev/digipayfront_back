import { GET_NOTIFS, DATA_LOADING, ERROR_NOTIF } from "../actions/types.js";

const initialState = {
  notifications: { payload: [], loading: null },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      if (action.payload === GET_NOTIFS) {
        return {
          ...state,
          notifications: {
            ...state.notifications,
            loading: true,
          },
        };
      } else {
        return state;
      }
    case ERROR_NOTIF:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          loading: false,
        },
      };
    case GET_NOTIFS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          payload: action.payload,
          loading: false,
        },
      };

    default:
      return state;
  }
}