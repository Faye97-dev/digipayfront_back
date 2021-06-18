import React, { useState } from "react";

import { Row, Col, CardBody, Card, Button, Modal, Badge } from "reactstrap";
import ListParticipants from "./ListParticipants";
import ModalAddDon from "./ModalAddDon";
import ModalUpdateDon from "./ModalUpdateDon";
import ModalCloture from "./ModalCloture";

export default function ModalDetails(props) {
  const { item, user } = props;
  //const keys = Object.keys({ ...item.transaction });
  const [modalAddDon, setModalAddDon] = useState(false);
  const handleModalAddDon = () => setModalAddDon(!modalAddDon);

  const [modalUpdateDon, setModalUpdateDon] = useState(false);
  const handleModalUpdateDon = () => setModalUpdateDon(!modalUpdateDon);

  const [modalCloture, setModalCloture] = useState(false);
  const handleModalCloture = () => setModalCloture(!modalCloture);

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
            {item.cagnote.actif &&
              !item.cagnote.verse_au_solde &&
              !item.cagnote.archive && (
                <Row>
                  <Col xl="12">
                    <div className="d-flex justify-content-between flex-wrap px-4 py-2">
                      {!item.participation &&
                        item.cagnote.responsable.id === user.id && (
                          <>
                            <div>
                              <Button
                                className="btn btn-block mb-4 px-2 px-sm-4 font-weight-bold"
                                color="primary"
                                size="sm"
                                onClick={handleModalAddDon}
                              >
                                Faire une donation
                              </Button>
                            </div>
                            <ModalAddDon
                              modal={modalAddDon}
                              handleModal={handleModalAddDon}
                              handleModalDetail={props.handleModal}
                              item={item}
                            />
                          </>
                        )}

                      {item.participation && (
                        <div>
                          <Button
                            className="btn  btn-block mb-4 px-2 px-sm-4 font-weight-bold"
                            onClick={handleModalUpdateDon}
                            color="warning"
                            size="sm"
                          >
                            Mettre a jour votre donation
                          </Button>
                          <ModalUpdateDon
                            modal={modalUpdateDon}
                            handleModal={handleModalUpdateDon}
                            handleModalDetail={props.handleModal}
                            item={item}
                          />
                        </div>
                      )}

                      {item.cagnote.responsable.id === user.id &&
                        item.cagnote.solde !== 0 &&
                        item.cagnote.nbre_participants !== 0 && (
                          <div>
                            <Button
                              className="btn  btn-block mb-4 px-2 px-sm-4 font-weight-bold"
                              onClick={handleModalCloture}
                              color="success"
                              size="sm"
                            >
                              Cloturer la cagnotte
                              <ModalCloture
                                modal={modalCloture}
                                handleModal={handleModalCloture}
                                handleModalDetail={props.handleModal}
                                item={item}
                              />
                            </Button>
                          </div>
                        )}
                    </div>
                  </Col>
                </Row>
              )}

            <Row className="no-gutters">
              <Col md="12" xl="6">
                <div className=" rounded  ">
                  <div className="px-4 py-0">
                    <Card className="card-box mb-4">
                      <div className="card-header">
                        <span className="font-size-lg mb-0 py-2">Cagnotte</span>
                      </div>
                      <CardBody>
                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Nom</div>
                          <div className=" font-size-md text-primary">
                            {item.cagnote.nom}
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">
                            Identifiant cagnotte
                          </div>
                          <div className=" font-size-md text-primary">
                            {item.cagnote.numero_cagnote}
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex flex-wrap align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Description</div>
                          <div className=" font-size-md text-primary">
                            {item.cagnote.motif}
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Date</div>
                          <div className=" font-size-md text-primary">
                            {item.cagnote.date}
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        {/*item.cagnote.responsable.id !==
                        item.cagnote.beneficiaire.id ? (*/}
                        <>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Responsable</div>
                            <div className=" font-size-md text-primary">
                              {`${item.cagnote.responsable.first_name} ${item.cagnote.responsable.last_name}`}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Beneficiaire</div>
                            <div className=" font-size-md text-primary">
                              {`${item.cagnote.beneficiaire.first_name} ${item.cagnote.beneficiaire.last_name}`}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                        </>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Montant souhaité</div>
                          <div className=" font-size-lg text-primary">
                            {item.cagnote.objectif}
                            <small className="pl-2 text-black">MRU</small>
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Solde courant</div>
                          <div className="font-size-lg text-primary">
                            {item.cagnote.solde}
                            <small className="pl-2 text-black">MRU</small>
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">
                            Nombre de participants
                          </div>
                          <div className=" font-size-lg text-primary">
                            {item.cagnote.nbre_participants}
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Status</div>
                          <div className="d-flex flex-wrap align-items-center justify-content-end ">
                            <div className="p-1">
                              {item.cagnote.archive ? (
                                <Badge
                                  className={
                                    "px-4 py-1 h-auto text-danger border-1 border-danger"
                                  }
                                  color="neutral-danger"
                                >
                                  Archivé
                                </Badge>
                              ) : item.cagnote.actif ? (
                                <Badge
                                  className={
                                    "px-4 py-1 h-auto text-success border-1 border-success"
                                  }
                                  color="neutral-success"
                                >
                                  Actif
                                </Badge>
                              ) : (
                                <Badge
                                  className={
                                    "px-4 py-1 h-auto text-warning border-1 border-warning"
                                  }
                                  color={"neutral-warning"}
                                >
                                  Cloturé
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </Col>
              <Col md="12" xl="6">
                {item.participation && (
                  <div className=" rounded  ">
                    <div className="px-4 py-0">
                      <Card className="card-box mb-4">
                        <div className="card-header">
                          <span className="font-size-lg mb-0 py-2">
                            Participation
                          </span>
                        </div>
                        <CardBody>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Montant</div>
                            <div className=" font-size-lg text-primary">
                              {item.participation.montant}
                              <small className="pl-2 text-black">MRU</small>
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Date</div>
                            <div className=" font-size-md text-primary">
                              {item.participation.date}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                )}
                {item.cagnote.responsable.id === user.id && (
                  <div className=" rounded  ">
                    <div className="px-4 py-0">
                      <Card className="card-box mb-4">
                        <div className="card-header">
                          <span className="font-size-lg mb-0 py-2">
                            Liste des participants
                          </span>
                        </div>
                        <ListParticipants
                          cagnote={item.cagnote.id}
                          access={props.access}
                        />
                      </Card>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col xl="12">
                <div className="d-flex px-4 pb-4">
                  <div className="mr-auto">
                    <Button
                      onClick={() => props.handleModal(null)}
                      block
                      color="danger"
                    >
                      Fermer
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Modal>
        </div>
      )}
    </>
  );
}
