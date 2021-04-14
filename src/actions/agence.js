import axios from "axios";
import {
  HOST,
  GET_AGENCES,
  DATA_LOADING,
  AGENCE_ONLINE,
  AGENCE_STATUS_LOADING,
  AGENCE_STATUS_ERROR,
  ERROR_AGENCE,
  CLEAN_SESSION,
  AUTH_ERROR,
} from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { expiredToken } from "../utils/alerts";
export const getAgences = (showAlert) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: GET_AGENCES,
  });

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
    .get(HOST + `api/agence/list/`, config)
    .then((res) => {
      //setTimeout(() => {
      dispatch({
        type: GET_AGENCES,
        payload: res.data,
      });
      //console.log(res.data);
      //}, 35000);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_AGENCE,
      });
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de chargement des agences !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const updateStatusAgence = (status, showAlert) => (
  dispatch,
  getState
) => {
  // reducer in auth js  ...
  dispatch({ type: AGENCE_STATUS_LOADING });
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
  agence.online = status;
  axios
    .put(HOST + `api/agence/update/${agence.id}/`, agence, config)
    .then((res) => {
      //setTimeout(() => {
      dispatch({
        type: AGENCE_ONLINE,
        payload: res.data,
      });
      //console.log(res.data);
      //}, 5000);
    })
    .catch((err) => {
      dispatch({
        type: AGENCE_STATUS_ERROR,
      });

      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de changement du status de l'agence !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};
