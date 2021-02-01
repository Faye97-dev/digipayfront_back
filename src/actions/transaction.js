import axios from "axios";
import {
  HOST,
  GET_TRANSACTIONS,
  HISTORY_TRANSACTIONS,
  DATA_LOADING,
  ADD_RETRAIT,
  UPDATE_SOLDE,
  ADD_TRANSFERT,
  ERROR_TRANS,
  AUTH_ERROR,
} from "./types";
import { updateSolde } from "./async";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const getTransactions = (all, showAlert) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: all ? GET_TRANSACTIONS : HISTORY_TRANSACTIONS,
  });

  const access = getState().auth.access;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  axios
    .get(HOST + `api/transaction/list/`, config)
    .then((res) => {
      if (all) {
        dispatch({
          type: GET_TRANSACTIONS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: HISTORY_TRANSACTIONS,
          payload: res.data,
        });
      }
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_TRANS,
      });
      showAlert(
        "danger",
        "Erreur de l'historique des transactions !",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      /*dispatch({
        type: AUTH_ERROR,
      });*/
      //console.log(err);
    });
};

export const addRetrait = (transfert, removeRetrait, showAlert) => (
  dispatch,
  getState
) => {
  dispatch({
    type: DATA_LOADING,
    payload: ADD_RETRAIT,
  });
  const agence = getState().auth.user.agence;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(HOST + `api/func/retrait/add/`, transfert, config)
    .then((res) => {
      //setTimeout(() => {
      dispatch({
        type: ADD_RETRAIT,
        payload: res.data,
      });
      console.log(res.data);
      removeRetrait(transfert.id);
      showAlert(
        "success",
        "Transaction Complete!",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );
      //}, 5000);
      updateSolde(agence.id).then((res) => {
        dispatch({
          type: UPDATE_SOLDE,
          payload: res,
        });
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_TRANS,
      });
      showAlert(
        "danger",
        "Transaction Non-Complete!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err);
    });
};

export const addTransfert = (
  transfert,
  resetForm,
  setSubmitting,
  showAlert
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: ADD_TRANSFERT,
  });

  const agence = getState().auth.user.agence;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /*if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }*/

  axios
    .post(HOST + `api/func/transfert/add/`, transfert, config)
    .then((res) => {
      //setTimeout(() => {
      dispatch({
        type: ADD_TRANSFERT,
        payload: res.data,
      });
      console.log(res.data);
      setSubmitting(false);
      resetForm();
      showAlert(
        "success",
        "Transaction Complete!",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );
      //}, 5000);

      updateSolde(agence.id).then((res) => {
        dispatch({
          type: UPDATE_SOLDE,
          payload: res,
        });
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_TRANS,
      });
      setSubmitting(false);
      showAlert(
        "danger",
        "Transaction Non-Complete!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err);
    });
};
