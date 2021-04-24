import {
  GET_TRANSACTIONS,
  HISTORY_TRANSACTIONS,
  DATA_LOADING,
  ADD_TRANSFERT,
  ADD_RETRAIT,
  ERROR_TRANS,
  SUCCESS_TRANS,
  CLEAN_SESSION,
  ADD_RECHARGE,
  ADD_PAIEMENT,
  ADD_PAYBACK,
  UPDATE_TRANSACTION,
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
        action.payload === ADD_RETRAIT ||
        action.payload === ADD_RECHARGE ||
        action.payload === ADD_PAIEMENT ||
        action.payload === ADD_PAYBACK ||
        action.payload === UPDATE_TRANSACTION
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
    case ADD_PAIEMENT:
    case ADD_RECHARGE:
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
    case UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          payload: [
            ...updateItemInList(action.payload, state.transactions.payload),
          ],
          loading: false,
        },
      };

    case ADD_PAYBACK:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          payload: [
            action.payload,
            ...updateItemInList(
              action.reducerStuff,
              state.transactions.payload
            ),
          ],
          loading: false,
        },
      };
    case CLEAN_SESSION:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          payload: [],
          loading: null,
        },
      };
    default:
      return state;
  }
}

const updateItemInList = (item, listItems) => {
  const result = [...listItems].map((value) => {
    if (value.id === item.id) {
      return { ...item };
    } else {
      return value;
    }
  });
  return result;
};
