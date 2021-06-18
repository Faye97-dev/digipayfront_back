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
  UPDATE_SOLDE_CLIENT_DIGIPAY,
  UPDATE_SOLDE_AGENT,
  UPDATE_PROFIL_FAIL,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_CLIENT_DIGIPAY_SUCCESS,
  UPDATE_EMPLOYE_SUCCESS,
  UPDATE_RESPONSABLE_SUCCESS,
  UPDATE_AGENT_SUCCESS,
  UPDATE_FACTURIER_SUCCESS,
  TOKEN_EXPIRED,
} from "../actions/types.js";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  tokenExpired: false,
  isAuthenticated: false,
  isLoading: false,
  agenceStatus_isLoading: false,
  user: null,
  role: { value: "ANONYMOUS", label: "ANONYMOUS" },
};

export default function (state = initialState, action) {
  //let access, refresh, dataUser
  switch (action.type) {
    case CHANGE_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case TOKEN_EXPIRED:
      return {
        ...state,
        tokenExpired: true,
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
        tokenExpired: false,
        role: { value: "ANONYMOUS", label: "ANONYMOUS" },
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
        tokenExpired: false,
        role: { value: "ANONYMOUS", label: "ANONYMOUS" },
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
    case UPDATE_SOLDE_CLIENT_DIGIPAY:
      return {
        ...state,
        user: {
          ...state.user,
          solde: action.payload.solde,
          on_hold: action.payload.on_hold,
        },
      };
    case UPDATE_SOLDE_AGENT:
      return {
        ...state,
        user: {
          ...state.user,
          solde: action.payload.solde,
        },
      };
    case UPDATE_CLIENT_DIGIPAY_SUCCESS:
    case UPDATE_VENDOR_SUCCESS:
    case UPDATE_EMPLOYE_SUCCESS:
    case UPDATE_RESPONSABLE_SUCCESS:
    case UPDATE_AGENT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          //first_name: action.payload.first_name,
          //last_name: action.payload.last_name,
          adresse: action.payload.adresse,
          email: action.payload.email,
        },
      };
    case UPDATE_FACTURIER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          //username: action.payload.username,
          //identifiant: action.payload.identifiant,
          first_name: action.payload.first_name,
          //compte_banquaire: action.payload.compte_banquaire,
          adresse: action.payload.adresse,
          email: action.payload.email,
        },
      };
    case UPDATE_PROFIL_FAIL:
      return state;
    default:
      return state;
  }
}
