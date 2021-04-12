import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "reactstrap";
export function AlertModal(props) {
  //const [alertModal, setModal] = useState(false);

  //const toggle = () => props.setAlertModal(!props.alertModal);

  return (
    <Modal
      zIndex={2000}
      centered
      isOpen={props.alertModal}
      toggle={props.toggleAlertModal}
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
        <h4 className="font-weight-bold mt-4">{props.title}</h4>
        <p className="mb-0 font-size-lg text-muted">{props.content}</p>
        <div className="pt-4 d-flex justify-content-between">
          <Button
            onClick={() => {
              props.toggleAlertModal();
            }}
            color="danger"
            className="btn-pill mr-auto"
          >
            <span className="btn-wrapper--label">{props.cancel}</span>
          </Button>
          <Button
            onClick={() => {
              if (props.confirmOrCancel === true) {
                props.actionConfirm(props.item);
              }
              if (props.confirmOrCancel === false) {
                props.actionCancel(props.item);
              }
            }}
            color="info"
            className="btn-pill ml-auto"
          >
            <span className="btn-wrapper--label">{props.confirm}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
