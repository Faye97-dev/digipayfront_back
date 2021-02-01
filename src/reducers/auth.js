import {
  CHANGE_ROLE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  AUTH_LOADING,
  AGENCE_ONLINE,
  AGENCE_STATUS_LOADING,
  AGENCE_STATUS_ERROR,
  UPDATE_SOLDE,
  USER_LOADED,
} from "../actions/types.js";

// add refresh token method , and check forbidden 301 error , secure api , success and error alert ,profil info , profil page , 404 page , routes changement warning

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  isLoading: false,
  agenceStatus_isLoading: false,
  user: null,
  role: { value: "EMPLOYE_AGENCE", label: "EMPLOYE_AGENCE" },
};

export default function (state = initialState, action) {
  //let access, refresh, dataUser
  switch (action.type) {
    case CHANGE_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: { ...action.payload },
        role: { value: action.payload.role, label: action.payload.role },
      };
    case LOGIN_SUCCESS:
      const { access, refresh, ...dataUser } = action.payload;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      return {
        ...state,
        access,
        refresh,
        user: { ...dataUser },
        isLoading: false,
        isAuthenticated: true,
        role: { value: action.payload.role, label: action.payload.role },
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        refresh: null,
        access: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
        agenceStatus_isLoading: false,
        //role: {value:'EMPLOYE_AGENCE',label:'EMPLOYE_AGENCE'},
      };
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        refresh: null,
        access: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
        agenceStatus_isLoading: false,
        //role: {value:'EMPLOYE_AGENCE',label:'EMPLOYE_AGENCE'},
      };
    case AGENCE_STATUS_LOADING:
      return {
        ...state,
        agenceStatus_isLoading: true,
      };
    case AGENCE_STATUS_ERROR:
      return {
        ...state,
        agenceStatus_isLoading: false,
      };
    case AGENCE_ONLINE:
      return {
        ...state,
        user: {
          ...state.user,
          agence: { ...state.user.agence, online: action.payload.online },
        },
        agenceStatus_isLoading: false,
      };
    case UPDATE_SOLDE:
      const { solde, dette, retrait, frais } = { ...action.payload };
      return {
        ...state,
        user: {
          ...state.user,
          agence: { ...state.user.agence, solde, dette, retrait, frais },
        },
      };

    /*case DATA_LOADING:
      if (action.payload === CHANGE_ROLE) {
        return {
          ...state,
          loading: "hello from auth js",
        };
      }*/

    default:
      return state;
  }
}
