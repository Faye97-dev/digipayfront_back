import axios from "axios";
import {
  HOST,
  DATA_LOADING,
  ERROR_GRP_PAYEMENT,
  GET_GRP_PAYEMENTS,
  ADD_GRP_PAYEMENT,
  DELETE_GRP_PAYEMENT,
  PARTICIPATE_GRP_PAYEMENT,
  UPDATE_USER_GRP_PAYEMENT,
  DELETE_USER_GRP_PAYEMENT,
} from "./types";

import { expiredToken } from "../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const getGrpPayements = (showAlert) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: GET_GRP_PAYEMENTS,
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
    .get(HOST + `api/grp-payement/list/`, config)
    .then((res) => {
      dispatch({
        type: GET_GRP_PAYEMENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_GRP_PAYEMENT,
      });

      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de l'historique des groupes de payements !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const addGrpPayement = (
  form,
  showAlert,
  setSubmitting,
  resetForm,
  closeModal
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: ADD_GRP_PAYEMENT,
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

  const body = { ...form, responsable: getState().auth.user.id };
  axios
    .post(HOST + `api/grp-payement/create/`, body, config)
    .then((res) => {
      dispatch({
        type: ADD_GRP_PAYEMENT,
        payload: res.data,
      });
      showAlert(
        "success",
        "Ajout groupe de payement Complete !",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );
      setSubmitting(false);
      resetForm();
      closeModal();
    })
    .catch((err) => {
      dispatch({
        type: ERROR_GRP_PAYEMENT,
      });
      setSubmitting(false);

      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de la creation d'un groupe de payement !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const editBeneficiaireGrpPayement = (
  form,
  showAlert,
  setSubmitting,
  closeModal,
  syncActionToState
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: UPDATE_USER_GRP_PAYEMENT,
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

  const body = { ...form };
  axios
    .put(
      HOST + `api/beneficiaire-grp_payement/update/${body.id}/`,
      body,
      config
    )
    .then((res) => {
      dispatch({
        type: UPDATE_USER_GRP_PAYEMENT,
        payload: res.data[1],
      });

      setSubmitting(false);
      syncActionToState(res.data[0]);
      closeModal(null);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_GRP_PAYEMENT,
      });
      setSubmitting(false);

      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de modification du beneficiaire !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const deleteBeneficiaireGrpPayement = (
  form,
  showAlert,
  setSubmitting,
  closeModal,
  syncActionToState
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: DELETE_USER_GRP_PAYEMENT,
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

  const body = { ...form };
  axios
    .delete(HOST + `api/beneficiaire-grp_payement/delete/${body.id}/`, config)
    .then((res) => {
      dispatch({
        type: DELETE_USER_GRP_PAYEMENT,
        payload: res.data[1],
      });

      setSubmitting(false);
      syncActionToState(res.data[0]);
      closeModal(null);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_GRP_PAYEMENT,
      });
      setSubmitting(false);

      console.log(err);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de la suppression du beneficiaire !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const addBeneficiaireGrpPayement = (
  form,
  showAlert,
  setSubmitting,
  closeModal,
  syncActionToState
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: PARTICIPATE_GRP_PAYEMENT,
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

  const body = { ...form };
  axios
    .post(HOST + `api/beneficiaire-grp_payement/create/`, body, config)
    .then((res) => {
      const keys = Object.keys({ ...res.data });
      if (!keys.includes("msg")) {
        dispatch({
          type: PARTICIPATE_GRP_PAYEMENT,
          payload: res.data[1],
        });

        setSubmitting(false);
        syncActionToState(res.data[0]);
        closeModal(null);
      } else {
        dispatch({
          type: ERROR_GRP_PAYEMENT,
        });
        showAlert(
          "warning",
          res.data.msg,
          <FontAwesomeIcon icon={["far", "question-circle"]} />
        );
        setSubmitting(false);
      }
    })
    .catch((err) => {
      dispatch({
        type: ERROR_GRP_PAYEMENT,
      });
      setSubmitting(false);

      console.log(err);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur d'ajout d'un beneficiaire",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const client_deleteGrpPayement = (
  form,
  showAlert,
  setSubmitting,
  closeInfo
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: DELETE_GRP_PAYEMENT,
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
    .delete(HOST + `api/grp-payement/delete/${form.id}/`, config)
    .then((res) => {
      dispatch({
        type: DELETE_GRP_PAYEMENT,
        payload: form.id,
      });

      showAlert(
        "success",
        "Suppression Complete !",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );
      setSubmitting(false);
      closeInfo(null);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_GRP_PAYEMENT,
      });
      setSubmitting(false);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Suppression du groupe de paiement non-complete !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};
