import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "reactstrap";
import { SyncLoader } from "react-spinners";
import { client_cloturer_cagnote } from "../../actions/cagnote";
import { connect } from "react-redux";
import { showAlert } from "../../utils/alerts";

function ModalCloture(props) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    const payload = {};
    payload["cagnote"] = props.item.cagnote.id;
    payload["client"] = props.user.id;
    props.client_cloturer_cagnote(
      payload,
      showAlert,
      setLoading,
      props.handleModal,
      props.handleModalDetail
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
          <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-info text-info m-0 d-130">
            <FontAwesomeIcon
              icon={["far", "lightbulb"]}
              className="d-flex align-self-center display-4"
            />
          </div>
        </div>
        <h5 className="font-weight-normal mt-4">
          Vous confirmez la clôture de cette cagnotte ?
        </h5>
        {/*<p className="mb-0 font-size-lg text-muted">{props.content}</p>*/}
        <div className="pt-4 d-flex justify-content-between">
          <Button
            onClick={props.handleModal}
            color="danger"
            className="btn-pill mr-auto"
            disabled={loading}
          >
            <span className="btn-wrapper--label">Annuler</span>
          </Button>
          {loading ? (
            <>
              <SyncLoader color={"var(--info)"} loading={true} />
            </>
          ) : (
            <Button
              onClick={handleSubmit}
              color="info"
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
  client_cloturer_cagnote,
})(ModalCloture);
