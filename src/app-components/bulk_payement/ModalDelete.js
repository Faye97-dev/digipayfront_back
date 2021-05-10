import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "reactstrap";
import { SyncLoader } from "react-spinners";
import { connect } from "react-redux";
import { client_deleteGrpPayement } from "../../actions/grp_payement";
import { showAlert } from "../../utils/alerts";
function ModalDelete(props) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    const payload = {};
    payload["id"] = props.item.id;
    props.client_deleteGrpPayement(
      payload,
      showAlert,
      setLoading,
      props.handleModal
    );
  };
  return (
    <Modal
      zIndex={2000}
      size="md"
      centered
      isOpen={props.modal}
      toggle={() => props.handleModal(null)}
    >
      <div className="text-center p-5">
        <div className="avatar-icon-wrapper rounded-circle m-0">
          <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
            <FontAwesomeIcon
              icon={["fa", "times"]}
              className="d-flex align-self-center display-3"
            />
          </div>
        </div>
        <h5 className="font-weight-normal mt-4">
          {`Vous confirmez la suppression de ce groupe`}
        </h5>
        <div className="pt-4 d-flex justify-content-between">
          <Button
            onClick={() => props.handleModal(null)}
            color="danger"
            className="btn-pill mr-auto"
            disabled={loading}
          >
            <span className="btn-wrapper--label">Annuler</span>
          </Button>
          {loading ? (
            <>
              <SyncLoader color={"var(--success)"} loading={true} />
            </>
          ) : (
            <Button
              onClick={handleSubmit}
              color="success"
              className="btn-pill ml-auto"
              disabled={loading}
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

export default connect(mapStateToProps, { client_deleteGrpPayement })(
  ModalDelete
);
