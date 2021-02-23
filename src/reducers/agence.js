import {
  GET_AGENCES,
  DATA_LOADING,
  ERROR_AGENCE,
  CLEAN_SESSION,
} from "../actions/types.js";

const initialState = {
  agences: { payload: [], loading: null },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      if (action.payload === GET_AGENCES) {
        return {
          ...state,
          agences: {
            ...state.agences,
            loading: true,
          },
        };
      } else {
        return state;
      }
    case ERROR_AGENCE:
      return {
        ...state,
        agences: {
          ...state.agences,
          loading: false,
        },
      };
    case GET_AGENCES:
      return {
        ...state,
        agences: {
          ...state.agences,
          payload: action.payload,
          loading: false,
        },
      };
    case CLEAN_SESSION:
      return {
        ...state,
        agences: {
          ...state.agences,
          payload: [],
          loading: null,
        },
      };
    default:
      return state;
  }
}
