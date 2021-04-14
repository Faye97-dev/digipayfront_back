import axios from "axios";
import {
  HOST,
  UPDATE_PROFIL_FAIL,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_CLIENT_DIGIPAY_SUCCESS,
  UPDATE_EMPLOYE_SUCCESS,
  UPDATE_RESPONSABLE_SUCCESS,
  UPDATE_AGENT_SUCCESS,
} from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { expiredToken } from "../utils/alerts";

export const updateVendorProfil = (id, body, setSubmitting, showAlert) => (
  dispatch,
  getState
) => {
  /*dispatch({
    type: AUTH_LOADING,
  });*/

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const access = getState().auth.access;
  //console.log(" reducer :", getState().auth.user);
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  axios
    .put(HOST + `api/user/vendor/update/${id}/`, body, config)
    .then((res) => {
      dispatch({
        type: UPDATE_VENDOR_SUCCESS,
        payload: res.data,
      });
      showAlert(
        "success",
        "Modification du profil avec success!",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );
      setSubmitting(false);
      //console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_PROFIL_FAIL,
      });
      setSubmitting(false);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de modifcation du profil !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const updateClientProfil = (id, body, setSubmitting, showAlert) => (
  dispatch,
  getState
) => {
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
    .put(HOST + `api/user/client_digiPay/update/${id}/`, body, config)
    .then((res) => {
      dispatch({
        type: UPDATE_CLIENT_DIGIPAY_SUCCESS,
        payload: res.data,
      });
      showAlert(
        "success",
        "Modification du profil avec success!",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );
      setSubmitting(false);
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_PROFIL_FAIL,
      });

      setSubmitting(false);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de modifcation du profil !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const updateEmployeProfil = (id, body, setSubmitting, showAlert) => (
  dispatch,
  getState
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const access = getState().auth.access;
  //console.log(" reducer :", getState().auth.user);
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  axios
    .put(HOST + `api/user/employe/update/${id}/`, body, config)
    .then((res) => {
      dispatch({
        type: UPDATE_EMPLOYE_SUCCESS,
        payload: res.data,
      });
      showAlert(
        "success",
        "Modification du profil avec success!",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );
      setSubmitting(false);
      //console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_PROFIL_FAIL,
      });

      setSubmitting(false);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de modifcation du profil !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const updateResponsableProfil = (id, body, setSubmitting, showAlert) => (
  dispatch,
  getState
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const access = getState().auth.access;
  //console.log(" reducer :", getState().auth.user);
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  axios
    .put(HOST + `api/user/responsable/update/${id}/`, body, config)
    .then((res) => {
      dispatch({
        type: UPDATE_RESPONSABLE_SUCCESS,
        payload: res.data,
      });
      showAlert(
        "success",
        "Modification du profil avec success!",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );
      setSubmitting(false);
      //console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_PROFIL_FAIL,
      });

      setSubmitting(false);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de modifcation du profil !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const updateAgentProfil = (id, body, setSubmitting, showAlert) => (
  dispatch,
  getState
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const access = getState().auth.access;
  //console.log(" reducer :", getState().auth.user);
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  axios
    .put(HOST + `api/user/agent/update/${id}/`, body, config)
    .then((res) => {
      dispatch({
        type: UPDATE_AGENT_SUCCESS,
        payload: res.data,
      });
      showAlert(
        "success",
        "Modification du profil avec success!",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );
      setSubmitting(false);
      //console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_PROFIL_FAIL,
      });

      setSubmitting(false);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de modifcation du profil !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};
