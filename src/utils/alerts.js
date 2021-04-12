import { toast } from "react-toastify";
import { AUTH_ERROR, CLEAN_SESSION } from "../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const showAlert = (type, text, icon) => {
  const msg = (title) => (
    <div className={`d-flex align-items-center align-content-start`}>
      <span
        className={`font-size-xl d-block d-40 btn-icon mr-3 text-center bg-white text-${type} rounded-sm`}
      >
        {icon}
      </span>
      <span className="text-justify">
        <strong className={`d-block`}>{title + " !"}</strong>
        {text}
      </span>
    </div>
  );

  //switch (type) {
  if (type === "info") {
    //console.log(text);
    toast.info(msg("Info"), {
      containerId: "B",
    });
  } else if (type === "warning") {
    toast.warning(msg("Attention"), {
      containerId: "B",
    });
  } else if (type === "danger") {
    toast.error(msg("Erreur"), {
      containerId: "B",
    });
  } else if (type === "success") {
    toast.success(msg("Success"), {
      containerId: "B",
    });
  }
  //}
};

export const expiredToken = (dispatch) => {
  setTimeout(() => {
    showAlert(
      "warning",
      "le délai de votre session a expiré , vous allez être déconnecté dans quelque secondes ...",
      <FontAwesomeIcon icon={["far", "question-circle"]} />
    );
    setTimeout(() => {
      dispatch({
        type: AUTH_ERROR,
      });
      dispatch({
        type: CLEAN_SESSION,
      });
    }, 2500);
  }, 2000);
};

export const expiredTokenWarning = () => {
  setTimeout(() => {
    showAlert(
      "warning",
      "le délai de votre session a expiré , veuillez vous reconnecté svp ... !",
      <FontAwesomeIcon icon={["far", "question-circle"]} />
    );
  }, 2000);
};
