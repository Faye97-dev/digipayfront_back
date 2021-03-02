import axios from "axios";
import { HOST } from "./types";
import { NOT_WITHDRAWED } from "../utils/choices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export async function getNotWhitrated(tel, agence) {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  /*.get(HOST + `api/transfert/list/`, {
      params: {
        tel: tel,
        status: NOT_WITHDRAWED,
        agence_destination: agence,
      },
      config,
    })*/
  if (tel !== "") {
    const body = { agence_destination: agence, tel };
    await axios
      .post(HOST + `api/func/transaction/retrait_list/`, body, config)
      .then((res) => {
        //setTimeout(() => {
        //console.log(" Not Whithrated ... ", res.data);
        //data = res.data.slice(0, 3);
        data = res.data;
        //data = [];
        //}, 15000);
      })
      .catch((err) => {
        //console.log(err);
        data = [];
      });
    return data;
  } else {
    return [];
  }
}

export async function checkSecretKey(transaction, key, showAlert) {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    id: transaction.id,
    model_transaction: transaction.model_transaction,
    secret_key: key,
  };
  await axios
    .post(HOST + `api/func/transaction/secret_key_check/`, body, config)
    .then((res) => {
      data = res.data;
      //console.log(res.data);
    })
    .catch((err) => {
      //console.log(err);
      data = null;
      showAlert(
        "danger",
        "Erreur de confirmation du code de la transaction!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
    });

  return data;
}

export const updateSolde = async (id) => {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .get(HOST + `api/agence/get/${id}/`, config)
    .then((res) => {
      data = res.data;
      //console.log(res.data);
    })
    .catch((err) => {
      //console.log(err);
      data = null;
    });

  return data;
};

export const updateSolde_clientDigipay = async (id, access) => {
  /* same update function for vendor and client */
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["Authorization"] = `JWT ${access}`;
  const tokenParts = JSON.parse(atob(access.split(".")[1]));
  const url = `api/user/current_user/get/${tokenParts.userId}/`;
  await axios
    .get(HOST + url, config)
    .then((res) => {
      data = res.data;
      //console.log(res.data);
    })
    .catch((err) => {
      //console.log(err);
      data = null;
    });

  return data;
};

export const checkClientDigipay = async (form, showAlert) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /*if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }*/
  let data;
  await axios
    .post(HOST + `api/func/client_digiPay/check/`, form, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = {};
      showAlert(
        "danger",
        "Envoie Non-Complete!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err.response.data);
    });
  return data;
};

export const check_byRole_ClientVendor = async (form, showAlert) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /*if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }*/
  let data;
  await axios
    .post(HOST + `api/func/client_digiPay_vendor/check/`, form, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = {};
      showAlert(
        "danger",
        "Recharge Non-Complete!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err.response.data);
    });
  return data;
};

export const randomCodeRetrait = async (form, showAlert) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let data;
  await axios
    .post(HOST + `api/func/client_digiPay/retrait/`, form, config)
    .then((res) => {
      data = res.data;
      const keys = Object.keys({ ...data });
      if (keys.includes("msg")) {
        showAlert(
          "warning",
          data.msg,
          <FontAwesomeIcon icon={["far", "question-circle"]} />
        );
      } else {
        showAlert(
          "info",
          "Veuillez consulter vos notifications pour le code de retrait !",
          <FontAwesomeIcon icon={["far", "question-circle"]} />
        );
      }
    })
    .catch((err) => {
      data = {};
      showAlert(
        "danger",
        "Retrait Non-Complete!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err.response.data);
    });
  return data;
};

export const randomCodePayement = async (form, showAlert) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let data;
  await axios
    .post(HOST + `api/func/vendor/gen_codePayement/`, form, config)
    .then((res) => {
      data = res.data;
      showAlert(
        "info",
        "Veuillez consulter vos notifications pour le code de payement !",
        <FontAwesomeIcon icon={["far", "question-circle"]} />
      );
    })
    .catch((err) => {
      data = {};
      showAlert(
        "danger",
        "Généreration d'un code de paiement non-complete!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err.response.data);
    });
  return data;
};

export const checkCodePayement = async (form, showAlert) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let data;
  await axios
    .post(HOST + `api/func/client_digiPay/check_codePayement/`, form, config)
    .then((res) => {
      data = res.data;
      //console.log(data);
    })
    .catch((err) => {
      data = {};
      showAlert(
        "danger",
        "Validation du code non-complete!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err.response.data);
    });
  return data;
};

export const checkCodePayement_Vendor = async (form, showAlert) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let data;
  await axios
    .post(HOST + `api/func/vendor/check_codePayement/`, form, config)
    .then((res) => {
      data = res.data;
      //console.log(data);
    })
    .catch((err) => {
      data = {};
      showAlert(
        "danger",
        "Validation du code non-complete!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err.response.data);
    });
  return data;
};
