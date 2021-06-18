import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "reactstrap";
import { SyncLoader } from "react-spinners";
import { client_delete_cagnote } from "../../actions/cagnote";
import { connect } from "react-redux";
import { showAlert } from "../../utils/alerts";

function ModalDelete(props) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    const payload = {};
    payload["cagnote"] = props.item.cagnote.id;

    props.client_delete_cagnote(
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
      toggle={props.handleModal}
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
          Vous confirmez la suppression de cette cagnotte ?
        </h5>
        {/*<p className="mb-0 font-size-lg text-muted">{props.content}</p>*/}
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
              <SyncLoader color={"var(--primary)"} loading={true} />
            </>
          ) : (
            <Button
              onClick={handleSubmit}
              color="primary"
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
});

export default connect(mapStateToProps, {
  client_delete_cagnote,
})(ModalDelete);
