import {
  GET_COMPENSATIONS,
  ADD_COMPENSATION,
  DATA_LOADING,
  ERROR_COMP,
  CLEAN_SESSION,
} from "../actions/types.js";

const initialState = {
  compensations: { payload: [], loading: null },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      if (
        action.payload === GET_COMPENSATIONS ||
        action.payload === ADD_COMPENSATION
      ) {
        return {
          ...state,
          compensations: {
            ...state.compensations,
            loading: true,
          },
        };
      } else {
        return state;
      }
    case ERROR_COMP:
      return {
        ...state,
        compensations: {
          ...state.compensations,
          loading: false,
        },
      };
    case GET_COMPENSATIONS:
      return {
        ...state,
        compensations: {
          ...state.compensations,
          payload: action.payload,
          loading: false,
        },
      };
    case ADD_COMPENSATION:
      return {
        ...state,
        compensations: {
          ...state.compensations,
          payload: [action.payload, ...state.compensations.payload],
          loading: false,
        },
      };
    case CLEAN_SESSION:
      return {
        ...state,
        compensations: {
          ...state.compensations,
          payload: [],
          loading: null,
        },
      };
    default:
      return state;
  }
}
