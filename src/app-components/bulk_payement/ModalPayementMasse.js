import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "reactstrap";
import { SyncLoader } from "react-spinners";
import { clientPayementMasse } from "../../actions/async";
import { connect } from "react-redux";
import { showAlert } from "../../utils/alerts";

function ModalPayementMasse(props) {
  //const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    props.setLoading(true);
    const payload = {};
    payload["grp_payement"] = props.item.id;
    payload["total"] = props.item.total_montant;
    payload["expediteur"] = props.user.id;

    /*clientPayementMasse(
      payload,
      showAlert,
      props.setLoading,
      props.handleModal,
      props.handleModalDetail
    );*/

    clientPayementMasse(payload, showAlert, props.access).then((res) => {
      if (res) {
        const keys = Object.keys({ ...res });
        if (keys.includes("msg")) {
          showAlert(
            "warning",
            res.msg,
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
        } else {
          showAlert(
            "success",
            res.transaction,
            <FontAwesomeIcon icon={["fas", "check"]} />
          );
          props.handleModal();
          setTimeout(() => {
            props.handleModalDetail();
          }, 1200);
        }
      }
      props.setLoading(false);
    });
  };
  return (
    <Modal
      zIndex={2000}
      size="md"
      centered
      isOpen={props.modal}
      toggle={props.handleModal}
    >
      <div className="text-center p-5">
        <div className="avatar-icon-wrapper rounded-circle m-0">
          <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-info text-info m-0 d-130">
            <FontAwesomeIcon
              icon={["far", "lightbulb"]}
              className="d-flex align-self-center display-4"
            />
          </div>
        </div>
        <h5 className="font-weight-normal mt-4">
          {`Vous confirmez le paiement de la somme de ${props.item.total_montant} MRU a liste des beneficiares de ce groupe ?`}
        </h5>
        <div className="pt-4 d-flex justify-content-between">
          <Button
            onClick={() => props.handleModal(null)}
            color="danger"
            className="btn-pill mr-auto"
            disabled={props.loading}
          >
            <span className="btn-wrapper--label">Annuler</span>
          </Button>
          {props.loading ? (
            <>
              <SyncLoader color={"var(--info)"} loading={true} />
            </>
          ) : (
            <Button
              onClick={handleSubmit}
              color="info"
              className="btn-pill ml-auto"
              disabled={props.loading}
            >
              <span className="btn-wrapper--label">Confirmer</span>
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, {})(ModalPayementMasse);
