export const EMPLOYE_AGENCE = "EMPLOYE_AGENCE";
export const RESPONSABLE_AGENCE = "RESPONSABLE_AGENCE";
export const AGENT_COMPENSATION = "AGENT_COMPENSATION";
export const CLIENT = "CLIENT";
export const VENDOR = "VENDOR";
export const SYSADMIN = "SYSADMIN";

// notification status
export const DEMANDE_PAIEMENT = "DEMANDE_PAIEMENT";
export const DEMANDE_RETRAIT = "DEMANDE_RETRAIT";
export const DEMANDE_COMPENSATION = "DEMANDE_COMPENSATION";
export const COMPENSATION = "COMPENSATION";
//export const RETRAIT = "RETRAIT";
export const PAIEMENT = "PAIEMENT";
export const ENVOI = "ENVOI";
export const RECHARGE = "RECHARGE";

// agences types status
export const mapColorAgence = {
  AGENCE_INTERN: "info",
  PARTNER_SILVER: "warning",
  PARTNER_GOLD: "success",
};

// transactions types status
export const TRANSFERT = "01";
export const RETRAIT = "02";
export const COMP_VERSEMENT = "03";
export const COMP_RETRAIT = "04";
export const DONATION = "09";
export const RECOLTE = "10";

export const NONE = "NONE";
export const INF_3000 = "INF_3000";
export const SUP_3000 = "SUP_3000";

export const mapColorTypes = {
  "01": "primary",
  "02": "danger",
  "03": "success",
  "04": "danger",
  "05": "success",
  "06": "warning",
  "07": "info",
  "08": "success",
  "09": "warning",
  10: "success",
};

export const mapTypeNames = {
  "01": "TRANSFERT",
  "02": "RETRAIT",
  "03": "COMPENSATION VERSEMENT",
  "04": "COMPENSATION RETRAIT",
  "05": "RECHARGE",
  "06": "PAIEMENT",
  "07": "ENVOI",
  "08": "REMBOURSEMENT",
  "09": "DONATION",
  10: "RECOLTE",
};

// transactions status
export const NOT_WITHDRAWED = "NOT_WITHDRAWED";
export const TO_VALIDATE = "TO_VALIDATE";
export const WITHDRAWED = "WITHDRAWED";
export const CANCELED = "CANCELED";
export const COMFIRMED = "COMFIRMED";

export const mapStatusNames = {
  NOT_WITHDRAWED: "NON RETIRÉ",
  TO_VALIDATE: "EN ATTENTE",
  WITHDRAWED: "RETIRÉ",
  CANCELED: "ANNULÉ",
  COMFIRMED: "CONFIRMÉ",
};

export const mapColorStatus = {
  NOT_WITHDRAWED: "warning",
  WITHDRAWED: "success",
  CANCELED: "danger",
  TO_VALIDATE: "info",
  COMFIRMED: "success",
};
