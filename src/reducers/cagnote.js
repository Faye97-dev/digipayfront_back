import {
  GET_CAGNOTES,
  DATA_LOADING,
  ERROR_CAGNOTE,
  CLEAN_SESSION,
  ADD_CAGNOTE,
  PARTICIPATE_CAGNOTE,
  ADD_DONATION,
  UPDATE_DONATION,
  CLOTURE_CAGNOTE,
  DELETE_CAGNOTE,
} from "../actions/types.js";

const initialState = {
  cagnotes: { payload: [], loading: null },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      if (
        action.payload === GET_CAGNOTES ||
        action.payload === ADD_CAGNOTE ||
        action.payload === PARTICIPATE_CAGNOTE ||
        action.payload === ADD_DONATION ||
        action.payload === UPDATE_DONATION ||
        action.payload === CLOTURE_CAGNOTE ||
        action.payload === DELETE_CAGNOTE
      ) {
        return {
          ...state,
          cagnotes: {
            ...state.cagnotes,
            loading: true,
          },
        };
      } else {
        return state;
      }
    case ERROR_CAGNOTE:
      return {
        ...state,
        cagnotes: {
          ...state.cagnotes,
          loading: false,
        },
      };
    case GET_CAGNOTES:
      return {
        ...state,
        cagnotes: {
          ...state.cagnotes,
          payload: action.payload,
          loading: false,
        },
      };
    case PARTICIPATE_CAGNOTE:
    case ADD_CAGNOTE:
      return {
        ...state,
        cagnotes: {
          ...state.cagnotes,
          payload: [action.payload, ...state.cagnotes.payload],
          loading: false,
        },
      };
    case ADD_DONATION:
    case UPDATE_DONATION:
    case CLOTURE_CAGNOTE:
    case DELETE_CAGNOTE:
      return {
        ...state,
        cagnotes: {
          ...state.cagnotes,
          payload: [
            ...updateItemInList(action.payload, state.cagnotes.payload),
          ],
          loading: false,
        },
      };
    case CLEAN_SESSION:
      return {
        ...state,
        cagnotes: {
          ...state.cagnotes,
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
    if (value.cagnote.id === item.cagnote.id) {
      return {
        ...item,
        cagnote: { ...item.cagnote },
        participation: item.participation ? { ...item.participation } : null,
      };
    } else {
      return value;
    }
  });
  return result;
};
