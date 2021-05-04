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
  UPDATE_PROFIL_FAIL,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_CLIENT_DIGIPAY_SUCCESS,
  UPDATE_EMPLOYE_SUCCESS,
  UPDATE_RESPONSABLE_SUCCESS,
  UPDATE_AGENT_SUCCESS,
  TOKEN_EXPIRED,
} from "../actions/types.js";

// add refresh token method , and check forbidden 301 error , secure api ,profil info , profil page , 404 page , routes changement warning
// datatable niveau 3 , connect filter data with db ,
// diconnect agence when logout , mouse cursor on ordering datatable , logout message de confirmation , check du solde avant retrait
// refont code client envoie  , agence retrait add confirmation code ....
// FormClientsend and other Form : reset form
// asyn file handle forbidden issue , agence transfert check destinataire !== expediteur , sync notifications with actions
// sync status of transaction after payback vendor
// atomic transaction backend , remove clotures , restric serializer models , hash code payement , remove duplicates fetch ...
// bugs qr code notif , retrait agence spinner , envoie cash client to vendor ? , move check_clientdigipay in service.py , sync  solde after recharge agence
// statistiques actions  move it to redux ?? , check refresh token before logout , register username = tel and can't update , devtools redux remove to prod
// validate password format backend and frontend
// clean models file , refactor pre-transction action in models , remove serializer , remove clotures
// post request body sercure id of user
// profile statistique move get a to post request
// reset all form, handle item , show info value to null ,change submiting to the second step
// check a account if is active before traitement for all actions
const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  tokenExpired: false,
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
        role: { value: "EMPLOYE_AGENCE", label: "EMPLOYE_AGENCE" },
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
        role: { value: "EMPLOYE_AGENCE", label: "EMPLOYE_AGENCE" },
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
    case UPDATE_CLIENT_DIGIPAY_SUCCESS:
    case UPDATE_VENDOR_SUCCESS:
    case UPDATE_EMPLOYE_SUCCESS:
    case UPDATE_RESPONSABLE_SUCCESS:
    case UPDATE_AGENT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
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
