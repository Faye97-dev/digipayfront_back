import { GET_CLIENTS, DATA_LOADING, ERROR_CLIENT } from "../actions/types.js";

const initialState = {
  clients: { payload: [], loading: null },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      if (action.payload === GET_CLIENTS) {
        return {
          ...state,
          clients: {
            ...state.clients,
            loading: true,
          },
        };
      } else {
        return state;
      }
    case GET_CLIENTS:
      return {
        ...state,
        clients: {
          ...state.clients,
          payload: action.payload,
          loading: false,
        },
      };
    case ERROR_CLIENT:
      return {
        ...state,
        clients: {
          ...state.clients,
          loading: false,
        },
      };
    default:
      return state;
  }
}
