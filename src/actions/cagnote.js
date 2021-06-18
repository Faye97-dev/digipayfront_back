import axios from "axios";
import {
  HOST,
  DATA_LOADING,
  ERROR_CAGNOTE,
  GET_CAGNOTES,
  ADD_CAGNOTE,
  PARTICIPATE_CAGNOTE,
  ADD_DONATION,
  UPDATE_DONATION,
  CLOTURE_CAGNOTE,
  DELETE_CAGNOTE,
} from "./types";
import { expiredToken } from "../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const getCagnotes = (showAlert) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: GET_CAGNOTES,
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

  const body = { id: getState().auth.user.id };
  axios
    .post(HOST + `api/cagnote/list/`, body, config)
    .then((res) => {
      dispatch({
        type: GET_CAGNOTES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_CAGNOTE,
      });

      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de l'historique des cagnotes !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const addCagnote = (
  form,
  showAlert
  /*setSubmitting,
  resetForm,
  clearData = null*/
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: ADD_CAGNOTE,
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

  const body = { ...form, client: getState().auth.user.id };
  axios
    .post(HOST + `api/cagnote/create/`, body, config)
    .then((res) => {
      dispatch({
        type: ADD_CAGNOTE,
        payload: res.data,
      });
      showAlert(
        "success",
        "Ajout Cagnote Complete !",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );
      /*if (clearData) clearData(null);
      setSubmitting(false);
      resetForm();*/
    })
    .catch((err) => {
      dispatch({
        type: ERROR_CAGNOTE,
      });
      //setSubmitting(false);

      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Erreur de la creation d'une cagnotte!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const client_participate_cagnote = (
  body,
  showAlert,
  setSubmitting,
  closeInfo
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: PARTICIPATE_CAGNOTE,
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
    .post(HOST + `api/func/client_digiPay/participer-cagnote/`, body, config)
    .then((res) => {
      const keys = Object.keys({ ...res.data });
      if (!keys.includes("msg")) {
        dispatch({
          type: PARTICIPATE_CAGNOTE,
          payload: res.data,
        });

        showAlert(
          "success",
          "Donation Complete !",
          <FontAwesomeIcon icon={["fas", "check"]} />
        );
        setSubmitting(false);
        closeInfo();
      } else {
        dispatch({
          type: ERROR_CAGNOTE,
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
        type: ERROR_CAGNOTE,
      });
      setSubmitting(false);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Donation Non-Complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const client_add_donation = (
  body,
  showAlert,
  setSubmitting,
  closeModal,
  closeModal2
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: ADD_DONATION,
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
    .post(HOST + `api/func/client_digiPay/participer-cagnote/`, body, config)
    .then((res) => {
      const keys = Object.keys({ ...res.data });
      if (!keys.includes("msg")) {
        dispatch({
          type: ADD_DONATION,
          payload: res.data,
        });

        showAlert(
          "success",
          "Donation Complete !",
          <FontAwesomeIcon icon={["fas", "check"]} />
        );
        setSubmitting(false);
        closeModal();
        setTimeout(() => {
          closeModal2();
        }, 1200);
      } else {
        dispatch({
          type: ERROR_CAGNOTE,
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
        type: ERROR_CAGNOTE,
      });
      setSubmitting(false);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Donation Non-Complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const client_update_donation = (
  body,
  showAlert,
  setSubmitting,
  closeModal,
  closeModal2
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: UPDATE_DONATION,
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
    .post(HOST + `api/func/client_digiPay/update-participation/`, body, config)
    .then((res) => {
      const keys = Object.keys({ ...res.data });
      if (!keys.includes("msg")) {
        dispatch({
          type: UPDATE_DONATION,
          payload: res.data,
        });

        showAlert(
          "success",
          "Donation Complete !",
          <FontAwesomeIcon icon={["fas", "check"]} />
        );
        setSubmitting(false);
        closeModal();
        setTimeout(() => {
          closeModal2();
        }, 1200);
      } else {
        dispatch({
          type: ERROR_CAGNOTE,
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
        type: ERROR_CAGNOTE,
      });
      setSubmitting(false);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Donation Non-Complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const client_cloturer_cagnote = (
  body,
  showAlert,
  setSubmitting,
  closeModal,
  closeModal2
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: CLOTURE_CAGNOTE,
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
    .post(HOST + `api/func/client_digiPay/cloturer-cagnote/`, body, config)
    .then((res) => {
      const keys = Object.keys({ ...res.data });
      if (!keys.includes("msg")) {
        dispatch({
          type: CLOTURE_CAGNOTE,
          payload: res.data,
        });

        showAlert(
          "success",
          "Cloture de la cagnotte Complete !",
          <FontAwesomeIcon icon={["fas", "check"]} />
        );
        setSubmitting(false);
        closeModal();
        setTimeout(() => {
          closeModal2();
        }, 1200);
      } else {
        dispatch({
          type: ERROR_CAGNOTE,
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
        type: ERROR_CAGNOTE,
      });
      setSubmitting(false);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Cloture de la cagnotte Non-Complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};

export const client_delete_cagnote = (
  body,
  showAlert,
  setSubmitting,
  closeModal
) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: DELETE_CAGNOTE,
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
    .post(HOST + `api/cagnote/delete/`, body, config)
    .then((res) => {
      dispatch({
        type: DELETE_CAGNOTE,
        payload: res.data,
      });

      showAlert(
        "success",
        "Suppression de la cagnotte Complete !",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );
      setSubmitting(false);
      closeModal();
    })
    .catch((err) => {
      dispatch({
        type: ERROR_CAGNOTE,
      });
      setSubmitting(false);
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else {
        showAlert(
          "danger",
          "Suppression de la cagnotte Non-Complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
};
