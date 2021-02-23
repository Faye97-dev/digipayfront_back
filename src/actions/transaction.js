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
  UPDATE_SOLDE_CLIENT_DIGIPAY,
  SUCCESS_TRANS,
  CLEAN_SESSION,
} from "./types";
import { updateSolde, updateSolde_clientDigipay } from "./async";

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
      //setTimeout(() => {
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
      //}, 35000);
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
      if (err.response && err.response.status === 401) {
        dispatch({
          type: AUTH_ERROR,
        });
        dispatch({
          type: CLEAN_SESSION,
        });
      }
      //console.log(getState(), err.response.status);
      //console.log();
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
  transfert.agence_destination = agence.id;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(HOST + `api/func/retrait/add/`, transfert, config)
    .then((res) => {
      const keys = Object.keys({ ...res.data });
      if (!keys.includes("msg")) {
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
          if (res) {
            dispatch({
              type: UPDATE_SOLDE,
              payload: res,
            });
          }
        });
      } else {
        dispatch({
          type: ERROR_TRANS,
        });
        showAlert(
          "warning",
          res.data.msg,
          <FontAwesomeIcon icon={["far", "question-circle"]} />
        );
      }
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
        if (res) {
          dispatch({
            type: UPDATE_SOLDE,
            payload: res,
          });
        }
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

/* client digipay */
export const addTransfert_clientDigipay = (
  transfert,
  //resetForm,
  //setSubmitting,
  showAlert
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: ADD_TRANSFERT,
  });

  const user = getState().auth.user;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /*if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }*/

  axios
    .post(HOST + `api/func/client_digiPay/envoie/`, transfert, config)
    .then((res) => {
      const keys = Object.keys({ ...res.data });
      if (!keys.includes("msg") && !keys.includes("par_sms")) {
        //setTimeout(() => {
        dispatch({
          type: ADD_TRANSFERT,
          payload: res.data,
        });
        console.log(res.data);
        //setSubmitting(false);
        //resetForm();
        showAlert(
          "success",
          "Transaction Complete!",
          <FontAwesomeIcon icon={["fas", "check"]} />
        );
        updateSolde_clientDigipay(user.id, getState().auth.access).then(
          (res) => {
            if (res) {
              dispatch({
                type: UPDATE_SOLDE_CLIENT_DIGIPAY,
                payload: res,
              });
            }
          }
        );
        //}, 10000);
      } else if (keys.includes("par_sms")) {
        dispatch({
          type: SUCCESS_TRANS,
        });
        showAlert(
          "success",
          "Transaction Complete!",
          <FontAwesomeIcon icon={["fas", "check"]} />
        );
        setTimeout(() => {
          showAlert(
            "info",
            "Veuillez consulter votre notifications pour le code de retrait !",
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
        }, 2500);
        console.log(" par sms succes !");
      } else if (keys.includes("msg")) {
        dispatch({
          type: ERROR_TRANS,
        });
        showAlert(
          "warning",
          "Votre solde est insuffisant pour effectuer cette opération !",
          <FontAwesomeIcon icon={["far", "question-circle"]} />
        );
      }
    })
    .catch((err) => {
      //setTimeout(() => {
      dispatch({
        type: ERROR_TRANS,
      });
      //setSubmitting(false);
      showAlert(
        "danger",
        "Transaction Non-Complete!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //}, 10000);
      //console.log(err.response);
    });
};

export const addRetraitBySms = (
  obj,
  removeRetrait,
  showAlert,
  setSubmitting,
  closeModal
) => (dispatch, getState) => {
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
  const body = {
    pre_transaction: obj.id,
    agence_destination: agence.id,
    nom_destinataire: obj.nom_destinataire,
  };
  axios
    .post(HOST + `api/func/client/retrait_par_sms/`, body, config)
    .then((res) => {
      //setTimeout(() => {
      const keys = Object.keys({ ...res.data });
      if (!keys.includes("msg")) {
        dispatch({
          type: ADD_RETRAIT,
          payload: res.data,
        });
        console.log(res.data);
        removeRetrait(obj.id);
        showAlert(
          "success",
          "Transaction Complete!",
          <FontAwesomeIcon icon={["fas", "check"]} />
        );
        updateSolde(agence.id).then((res) => {
          if (res) {
            dispatch({
              type: UPDATE_SOLDE,
              payload: res,
            });
          }
        });
      } else {
        dispatch({
          type: ERROR_TRANS,
        });
        showAlert(
          "warning",
          res.data.msg,
          <FontAwesomeIcon icon={["far", "question-circle"]} />
        );
      }
      setSubmitting(false);
      closeModal();
      //}, 5000);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_TRANS,
      });
      setSubmitting(false);
      closeModal();
      showAlert(
        "danger",
        "Transaction Non-Complete!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err);
    });
};
