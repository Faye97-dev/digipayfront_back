export const TRANSFERT = "01";
export const RETRAIT = "02";
export const COMP_VERSEMENT = "03";
export const COMP_RETRAIT = "04";

export const NONE = "NONE";
export const INF_3000 = "INF_3000";
export const SUP_3000 = "SUP_3000";

export const EMPLOYE_AGENCE = "EMPLOYE_AGENCE";
export const RESPONSABLE_AGENCE = "RESPONSABLE_AGENCE";
export const AGENT_COMPENSATION = "AGENT_COMPENSATION";

export const NOT_WITHDRAWED = "NOT_WITHDRAWED";
export const TO_VALIDATE = "TO_VALIDATE";
export const WITHDRAWED = "WITHDRAWED";
export const CANCELED = "CANCELED";

export const mapColorStatus = {
  NOT_WITHDRAWED: "warning",
  WITHDRAWED: "success",
  CANCELED: "danger",
  TO_VALIDATE: "info",
};

export const mapColorAgence = {
  AGENCE_INTERN: "info",
  PARTNER_SILVER: "warning",
  PARTNER_GOLD: "success",
};

export const mapColorTypes = {
  "01": "success",
  "02": "warning",
  "03": "success",
  "04": "warning",
};

export const mapTypeNames = {
  "01": "TRANSFERT",
  "02": "RETRAIT",
  "03": "COMP_VERSEMENT",
  "04": "COMP_RETRAIT",
};
