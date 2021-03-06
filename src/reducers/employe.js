import {
  GET_EMPLOYES,
  DATA_LOADING,
  ERROR_EMPLOYE,
  CLEAN_SESSION,
} from "../actions/types.js";

const initialState = {
  employes: { payload: [], loading: null },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      if (action.payload === GET_EMPLOYES) {
        return {
          ...state,
          employes: {
            ...state.employes,
            loading: true,
          },
        };
      } else {
        return state;
      }
    case GET_EMPLOYES:
      return {
        ...state,
        employes: {
          ...state.employes,
          payload: action.payload,
          loading: false,
        },
      };
    case ERROR_EMPLOYE:
      return {
        ...state,
        employes: {
          ...state.employes,
          loading: false,
        },
      };
    case CLEAN_SESSION:
      return {
        ...state,
        employes: {
          ...state.employes,
          payload: [],
          loading: null,
        },
      };
    default:
      return state;
  }
}
