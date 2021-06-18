import axios from "axios";
import { HOST } from "./types";
//import { NOT_WITHDRAWED } from "../utils/choices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormData from "form-data";
import { expiredTokenWarning } from "../utils/alerts";

// helper function: generate a new file from base64 String
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1; // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime });
};

export const valid_code_PIN = async (form, showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/user/func/valid-PIN/`, form, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Validation du code PIN non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export async function getNotWhitrated(tel, agence, showAlert, access = null) {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  if (tel !== "") {
    const body = { agence_destination: agence, tel };
    //console.log(body);
    await axios
      .post(HOST + `api/func/transaction/retrait-list/`, body, config)
      .then((res) => {
        //setTimeout(() => {
        //console.log(" Not Whithrated ... ", res.data);
        //data = res.data.slice(0, 3);
        data = res.data;
        //data = [];
        //}, 15000);
      })
      .catch((err) => {
        data = null;

        if (err.response && err.response.status === 401) {
          expiredTokenWarning();
        } else {
          showAlert(
            "danger",
            "Récupération des retraits non-terminées !",
            <FontAwesomeIcon icon={["fas", "times"]} />
          );
        }
      });
    return data;
  } else {
    return [];
  }
}

export async function getParticipantsCagnote(
  cagnote,
  showAlert,
  access = null
) {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  await axios
    .post(
      HOST + `api/func/client_digiPay/participants-cagnote/`,
      { cagnote },
      config
    )
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Récupération des participants non-terminées !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
}

export async function getBeneficiairesGrpPayement(
  grp_payement,
  showAlert,
  access = null
) {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  await axios
    .post(
      HOST + `api/beneficiaire-grp_payement/list/`,
      { grp_payement },
      config
    )
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Récupération des beneficiaires non-terminées !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
}

export async function getBeneficiairesByNumeroGrpPayement(
  body,
  showAlert,
  access = null
) {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  await axios
    .post(
      HOST + `api/func/transaction/beneficiaires-payement_masse/`,
      body,
      config
    )
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Récupération des beneficiaires non-terminées !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
}

export const checkExistTel_Client = async (form, showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  let data;
  await axios
    .post(HOST + `api/func/client/valid-client-tel/`, form, config)
    .then((res) => {
      data = res.data;
      //console.log(data);
    })
    .catch((err) => {
      data = null;

      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Validation du numéro de téléphone non-complète !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export async function checkSecretKey(
  transaction,
  key,
  showAlert,
  access = null
) {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  const body = {
    id: transaction.id,
    model_transaction: transaction.model_transaction,
    secret_key: key,
  };
  await axios
    .post(HOST + `api/func/transaction/valid-secret-key/`, body, config)
    .then((res) => {
      data = res.data;
      //console.log(res.data);
    })
    .catch((err) => {
      //console.log(err);
      data = null;

      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Erreur de confirmation du code de la transaction!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });

  return data;
}

export const updateSolde = async (id, access = null) => {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  await axios
    .get(HOST + `api/agence/get/${id}/`, config)
    .then((res) => {
      data = res.data;
      //console.log(res.data);
    })
    .catch((err) => {
      //console.log(err);
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      }
    });

  return data;
};

export const updateSolde_clientDigipay = async (id, access = null) => {
  /* same update solde function for vendor and client and agent */
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  } else {
    expiredTokenWarning();
    return null;
  }
  const tokenParts = JSON.parse(atob(access.split(".")[1]));
  const url = `api/user/auth-user/get/${tokenParts.userId}/`;
  await axios
    .get(HOST + url, config)
    .then((res) => {
      data = res.data;
      //console.log(res.data);
    })
    .catch((err) => {
      //console.log(err);
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      }
    });

  return data;
};

export const checkClientDigipay = async (form, showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  let data;
  await axios
    .post(HOST + `api/func/client_digiPay/check/`, form, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;

      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Verification du numéro de téléphone non-complète !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const check_byRole_ClientVendor = async (
  form,
  showAlert,
  access = null
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  let data;
  await axios
    .post(HOST + `api/func/clientdigiPay-and-vendor/check/`, form, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;

      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Verification du compte associé a ce numéro de téléphone non-complète!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const randomCodeRetrait = async (form, showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
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
      data = null;

      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Code retrait Non-Complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const updateNotification = async (
  id,
  body,
  fileData,
  showAlert,
  access = null
) => {
  let formData = new FormData();
  formData.append(
    "qrcode",
    dataURLtoFile(fileData.content, fileData.name),
    fileData.name
  );
  formData.append("message", body.message);
  formData.append("status", body.status);
  formData.append("date", body.date);
  formData.append("user", body.user);
  formData.append("transaction", body.transaction);

  const config = {
    headers: {
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data`,
      //"Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  let data;
  await axios
    .put(HOST + `api/notification/update/${id}/`, formData, config)
    .then((res) => {
      data = res.data;
      showAlert(
        "info",
        "Veuillez consulter vos notifications pour le code de payement ou QR-Code !",
        <FontAwesomeIcon icon={["far", "question-circle"]} />
      );
    })
    .catch((err) => {
      data = null;

      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Historisation du QrCode dans les notifications non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
      //console.log(err.response.data);
    });
  return data;
};

export const randomCodePayement = async (form, showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/func/vendor/gen-code-payement/`, form, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;

      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Généreration d'un code de paiement non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const checkCodePayement = async (form, showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/func/client_digiPay/valid-code-payement/`, form, config)
    .then((res) => {
      data = res.data;
      //console.log(data);
    })
    .catch((err) => {
      //data = { msg: "Validation du code non-complete" };
      data = null;

      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Validation du code non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const checkCodePayement_Vendor = async (
  form,
  showAlert,
  access = null
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/func/vendor/valid-code-payement/`, form, config)
    .then((res) => {
      data = res.data;
      //console.log(data);
    })
    .catch((err) => {
      data = null;

      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Validation du code non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const checkCode_transaction = async (form, showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/func/vendor/valid-code-transaction/`, form, config)
    .then((res) => {
      data = res.data;
      //console.log(data);
    })
    .catch((err) => {
      data = null;

      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Validation du code de transaction non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const validCompensation = async (body, showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  let data = null;
  await axios
    .post(HOST + `api/func/transaction/valid-compensation/`, body, config)
    .then((res) => {
      const keys = Object.keys({ ...res.data });
      //console.log(res.data);
      if (keys.includes("result")) {
        showAlert(
          "success",
          res.data.result,
          <FontAwesomeIcon icon={["fas", "check"]} />
        );
        data = true;
      } else if (keys.includes("msg")) {
        showAlert(
          "warning",
          res.data.msg,
          <FontAwesomeIcon icon={["far", "question-circle"]} />
        );
        data = false;
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Validation de la compensation non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
      data = false;
    });
  return data;
};

export const check_clienAnonyme = async (form, showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/func/client/check/`, form, config)
    .then((res) => {
      data = res.data;
      //console.log(data);
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Validation du numero de telephone non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const client_check_VendorId = async (form, showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/func/client_digiPay/valid-vendor-id/`, form, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Validation du numéro commerçant non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const vendor_check_VendorId = async (form, showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/func/vendor/valid-vendor-id/`, form, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Validation du numéro commerçant non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const client_check_cagnoteId = async (
  form,
  showAlert,
  access = null
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/func/client_digiPay/valid-cagnote-code/`, form, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Validation du numero cagnote non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const checkClientDigipay_grpPayement = async (
  form,
  showAlert,
  access = null
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/grp-payement/check-client_digipay/`, form, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Validation du numero telephone non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const checkClientDigipay_newCagnote = async (
  form,
  showAlert,
  access = null
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/cagnote/check-client_digipay/`, form, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Validation du numero telephone non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const clientPayementMasse = async (form, showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/func/client_digiPay/payement-masse/`, form, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Paiement de masse non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const getFacturiersList = async (showAlert, access = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .get(HOST + `api/user/facturier/list/`, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Recuperation des facturiers non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

// somelec api

export const getFactureSomelecByReference = async (
  reference,
  showAlert,
  access = null
) => {
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
    .get(
      `https://digisolution.herokuapp.com/api/chercherFacture/${reference}`,
      config
    )
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        //expiredTokenWarning();
      } else {
        showAlert(
          "danger",
          "Recuperation de la facture Somelec non-complete!",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
    });
  return data;
};

export const updateFactureSomelec = async (body, showAlert, access = null) => {
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
    .post(
      `https://digisolution.herokuapp.com/api/effectuerPaiement`,
      body,
      config
    )
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        //expiredTokenWarning();
      } else {
        setTimeout(() => {
          showAlert(
            "danger",
            "Mise a jour de la facture Somelec non-complete!",
            <FontAwesomeIcon icon={["fas", "times"]} />
          );
        }, 2000);
      }
    });
  return data;
};

export const reclamationFactureSomelec = async (
  body,
  showAlert,
  access = null
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  let data;
  await axios
    .post(HOST + `api/func/client_digiPay/reclamation-somelec/`, body, config)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      } else {
        setTimeout(() => {
          showAlert(
            "danger",
            "Reclamation du paiement de la facture non-complete!",
            <FontAwesomeIcon icon={["fas", "times"]} />
          );
        }, 4500);
      }
    });
  return data;
};
