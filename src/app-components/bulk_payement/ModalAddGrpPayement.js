import React, { useState } from "react";

import clsx from "clsx";
import { Row, Col, Modal, Button } from "reactstrap";

import { connect } from "react-redux";
import FormAdd from "./FormAdd";

function ModalAddGrpPayement(props) {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);
  return (
    <>
      <Row>
        <Col xs="12" sm="7" md="4">
          <Button
            className="mb-4 py-2 font-weight-bold"
            onClick={handleModal}
            color="primary"
            size="sm"
          >
            Nouveau groupe de paiement
          </Button>
        </Col>
      </Row>
      <Modal
        zIndex={2000}
        centered
        size="md"
        isOpen={modal}
        toggle={handleModal}
        contentClassName="border-0 bg-gray"
      >
        <div className=" my-4">
          <FormAdd handleModal={handleModal} />
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(ModalAddGrpPayement);
