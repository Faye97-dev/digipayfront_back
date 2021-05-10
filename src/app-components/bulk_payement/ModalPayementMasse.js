import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "reactstrap";

import { connect } from "react-redux";
import FormMotifPayement from "./FormMotifPayement";

function ModalPayementMasse(props) {
  return (
    <Modal
      zIndex={2000}
      size="md"
      centered
      isOpen={props.modal}
      toggle={props.handleModal}
    >
      <div className="text-center p-4">
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
        <FormMotifPayement {...props} />
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, {})(ModalPayementMasse);
