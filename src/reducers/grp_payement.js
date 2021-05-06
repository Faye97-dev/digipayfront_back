import {
  GET_GRP_PAYEMENTS,
  DATA_LOADING,
  ERROR_GRP_PAYEMENT,
  CLEAN_SESSION,
  ADD_GRP_PAYEMENT,
  PARTICIPATE_GRP_PAYEMENT,
  UPDATE_USER_GRP_PAYEMENT,
} from "../actions/types.js";

const initialState = {
  grp_payements: { payload: [], loading: null },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      if (
        action.payload === GET_GRP_PAYEMENTS ||
        action.payload === ADD_GRP_PAYEMENT ||
        action.payload === PARTICIPATE_GRP_PAYEMENT ||
        action.payload === UPDATE_USER_GRP_PAYEMENT
      ) {
        return {
          ...state,
          grp_payements: {
            ...state.grp_payements,
            loading: true,
          },
        };
      } else {
        return state;
      }
    case ERROR_GRP_PAYEMENT:
      return {
        ...state,
        grp_payements: {
          ...state.grp_payements,
          loading: false,
        },
      };
    case GET_GRP_PAYEMENTS:
      return {
        ...state,
        grp_payements: {
          ...state.grp_payements,
          payload: action.payload,
          loading: false,
        },
      };
    case ADD_GRP_PAYEMENT:
      return {
        ...state,
        grp_payements: {
          ...state.grp_payements,
          payload: [action.payload, ...state.grp_payements.payload],
          loading: false,
        },
      };

    //case ADD_DONATION:
    //case UPDATE_DONATION:
    case UPDATE_USER_GRP_PAYEMENT:
      return {
        ...state,
        grp_payements: {
          ...state.grp_payements,
          payload: [
            ...updateItemInList(action.payload, state.grp_payements.payload),
          ],
          loading: false,
        },
      };
    case CLEAN_SESSION:
      return {
        ...state,
        grp_payements: {
          ...state.grp_payements,
          payload: [],
          loading: null,
        },
      };
    default:
      return state;
  }
}

const updateItemInList = (item, listItems) => {
  //console.log(item, listItems);
  const result = [...listItems].map((value) => {
    if (value.id === item.id) {
      return { ...item };
    } else {
      return value;
    }
  });
  return result;
};
