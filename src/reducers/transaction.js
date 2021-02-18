import {
  GET_TRANSACTIONS,
  HISTORY_TRANSACTIONS,
  DATA_LOADING,
  ADD_TRANSFERT,
  ADD_RETRAIT,
  ERROR_TRANS,
  SUCCESS_TRANS,
} from "../actions/types.js";

const initialState = {
  transactions: { payload: [], loading: null },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      if (
        action.payload === GET_TRANSACTIONS ||
        action.payload === HISTORY_TRANSACTIONS ||
        action.payload === ADD_TRANSFERT ||
        action.payload === ADD_RETRAIT
      ) {
        return {
          ...state,
          transactions: {
            ...state.transactions,
            loading: true,
          },
        };
      } else {
        return state;
      }
    case ERROR_TRANS:
    case SUCCESS_TRANS:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          loading: false,
        },
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          payload: [...action.payload],
          loading: false,
        },
      };
    case HISTORY_TRANSACTIONS:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          payload: [...action.payload].slice(0, 5),
          loading: false,
        },
      };
    case ADD_TRANSFERT:
    case ADD_RETRAIT:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          payload: [action.payload, ...state.transactions.payload],
          loading: false,
        },
      };
    default:
      return state;
  }
}
