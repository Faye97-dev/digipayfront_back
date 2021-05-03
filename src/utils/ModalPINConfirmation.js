import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RiseLoader } from "react-spinners";
import { Button, Modal, Col, Row } from "reactstrap";
import ReactInputVerificationCode from "react-input-verification-code";
import "./react-input-verification-code.css";
import { valid_code_PIN } from "../actions/async";
import { showAlert } from "./alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalPINConfirmation = (props) => {
  //const [modalPin, setModalPin] = useState(false);
  //const handleModal = () => setModalPin(!modalPin);
  //const [value, setValue] = useState("");

  const handleChange = (val) => {
    props.setValuePIN(val);
    if (val.length === 4) {
      valid_code_PIN(
        { id: props.user.id, PIN: val },
        showAlert,
        props.access
      ).then((res) => {
        if (res) {
          if (res.PIN) {
            props.handlePINModal();
            // submit action
            props.setValidCodePIN(true);
            props.handleSubmit();
          } else {
            props.setValuePIN("");
            showAlert(
              "warning",
              "Code PIN incorrect , veuillez ressayer Svp !",
              <FontAwesomeIcon icon={["far", "question-circle"]} />
            );
          }
        } else {
          props.setValuePIN("");
        }
      });
    }
  };

  return (
    <>
      <Modal
        zIndex={2000}
        centered
        size="md"
        isOpen={props.codePINModal}
        toggle={props.handlePINModal}
        contentClassName="border-0"
      >
        <Row className="no-gutters">
          <Col xl="12">
            <div className="bg-white rounded br-xl-left-0">
              <div className="py-4 px-3">
                <p className="font-size-lg text-primary font-weight-bold text-center">
                  Veuillez de saisir votre code PIN
                </p>
                <div className="custom-styles m-4  d-flex justify-content-center">
                  <ReactInputVerificationCode
                    placeholder=""
                    onChange={(e) => handleChange(e)}
                    length={4}
                    value={props.valuePIN}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps)(ModalPINConfirmation);
