import axios from "axios";
import {
  HOST,
  GET_CLIENTS,
  DATA_LOADING,
  ERROR_CLIENT,
  ADD_CLIENT,
} from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const getClients = (showAlert) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: GET_CLIENTS,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .get(HOST + `api/client/`, config)
    .then((res) => {
      dispatch({
        type: GET_CLIENTS,
        payload: res.data,
      });
      //console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_CLIENT,
      });
      showAlert(
        "danger",
        "Erreur de chargement des clients !",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err);
    });
};

export const addClient = (
  body,
  showAlert,
  //setSubmitting,
  closeModal
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: ADD_CLIENT,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(HOST + `api/client/`, body, config)
    .then((res) => {
      //setTimeout(() => {
      dispatch({
        type: ADD_CLIENT,
        payload: res.data,
      });
      //console.log(res.data);

      showAlert(
        "success",
        "Enregistrement Complete!",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );

      //setSubmitting(false);
      closeModal();
      //}, 5000);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_CLIENT,
      });
      //setSubmitting(false);
      closeModal();
      showAlert(
        "danger",
        "Enregistrement Echec!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err);
    });
};
