import axios from "axios";
import {
  HOST,
  GET_EMPLOYES,
  DATA_LOADING,
  ERROR_EMPLOYE,
  AUTH_ERROR,
  CLEAN_SESSION,
} from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { expiredToken } from "../utils/alerts";
export const getEmployes = (showAlert) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: GET_EMPLOYES,
  });
  const agence = { ...getState().auth.user.agence };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const access = getState().auth.access;
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  axios
    .get(HOST + `api/user/employe/list/`, {
      params: {
        agence: agence.id,
      },
      headers: config.headers,
    })
    .then((res) => {
      //setTimeout(() => {
      dispatch({
        type: GET_EMPLOYES,
        payload: res.data,
      });
      //}, 25000);

      //console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_EMPLOYE,
      });
      showAlert(
        "danger",
        "Erreur de chargement des employes !",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch);
      }
    });
};
