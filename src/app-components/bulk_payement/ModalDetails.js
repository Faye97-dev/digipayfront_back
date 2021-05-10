import React, { useState } from "react";

import { Row, Col, CardBody, Card, Button, Modal, Badge } from "reactstrap";
import ListBeneficiaires from "./ListBeneficiaires";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalPayementMasse from "./ModalPayementMasse";
export default function ModalDetails(props) {
  const { item, user } = props;

  const [modalPay, setModalPay] = useState(false);
  const handleModalPay = () => setModalPay(!modalPay);
  const [loadingPay, setLoadingPay] = useState(false);

  return (
    <>
      {item && (
        <div className="d-flex align-items-center justify-content-center flex-wrap">
          <Modal
            zIndex={2000}
            centered
            size="lg"
            isOpen={props.modal}
            toggle={() => props.handleModal(null)}
            contentClassName="border-0 bg-gray"
          >
            <Row>
              <Col xl="12">
                <div className="px-4 pt-5 pb-4">
                  <h1 className="display-4 font-weight-normal font-size-xl text-uppercase text-primary ">
                    Informations
                  </h1>
                </div>
              </Col>
            </Row>
            <Row className="no-gutters">
              <Col md="12" xl="6">
                <div className=" rounded  ">
                  <div className="px-4 py-0">
                    <Card className="card-box mb-4">
                      <div className="card-header">
                        <span className="font-size-lg mb-0 py-2">
                          Groupe de paiement
                        </span>
                      </div>
                      <CardBody>
                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Nom</div>
                          <div className=" font-size-md text-primary">
                            {item.nom}
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Date</div>
                          <div className=" font-size-md text-primary">
                            {item.date}
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Responsable</div>
                          <div className=" font-size-md text-primary">
                            {`${item.responsable.first_name} ${item.responsable.last_name}`}
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Montant total</div>
                          <div className="font-size-lg text-primary">
                            {item.total_montant}
                            <small className="pl-2 text-black">MRU</small>
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">
                            Nombre de beneficiaires
                          </div>
                          <div className=" font-size-lg text-primary">
                            {item.nbre_beneficiaires}
                          </div>
                        </div>
                        <div className="divider my-2"></div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </Col>
              <Col md="12" xl="6">
                <div className=" rounded  ">
                  <div className="px-4 py-0">
                    <Card className="card-box mb-4">
                      <div className="card-header">
                        <span className="font-size-lg mb-0 py-2">
                          Liste des beneficiaires
                        </span>
                      </div>

                      <ListBeneficiaires
                        grp_payement={item.id}
                        access={props.access}
                        loadingPay={loadingPay}
                      />
                    </Card>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl="12">
                <div className="d-flex justify-content-between flex-wrap px-4 py-2">
                  <div>
                    <Button
                      onClick={() => props.handleModal(null)}
                      className="btn btn-block mb-4 px-2 px-sm-4 "
                      color="danger"
                      size="md"
                    >
                      Fermer
                    </Button>
                  </div>
                  {item.nbre_beneficiaires !== 0 && item.total_montant !== 0 && (
                    <div>
                      <Button
                        className="btn btn-block mb-4 px-2 px-sm-4 "
                        color="primary"
                        size="md"
                        onClick={handleModalPay}
                      >
                        Payer
                      </Button>
                      <ModalPayementMasse
                        modal={modalPay}
                        handleModal={handleModalPay}
                        handleModalDetail={props.handleModal}
                        item={item}
                        setLoading={setLoadingPay}
                        loading={loadingPay}
                      />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Modal>
        </div>
      )}
    </>
  );
}
