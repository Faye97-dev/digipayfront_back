import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  CardBody,
  Card,
  NavItem,
  Button,
  Modal,
  Badge,
} from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";
import {
  mapColorStatus,
  mapTypeNames,
  mapColorTypes,
  NOT_WITHDRAWED,
  TO_VALIDATE,
} from "../../utils/choices";

export default function ModalDetails(props) {
  const { item, user } = props;
  //const keys = Object.keys({ ...item.transaction });
  const [modal4, setModal4] = useState(false);
  const toggle4 = () => setModal4(!modal4);

  return (
    <>
      <NavItem>
        <NavLinkStrap
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            toggle4();
          }}
        >
          <FontAwesomeIcon
            icon={["fas", "eye"]}
            className="font-size-md mr-3"
          />
          <span>Details</span>
        </NavLinkStrap>
      </NavItem>

      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Modal
          zIndex={2000}
          centered
          size="lg"
          isOpen={modal4}
          toggle={toggle4}
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
          {item.cagnote.actif && !item.cagnote.verse_au_solde && (
            <Row>
              <Col xl="12">
                <div className="d-flex px-4 py-2">
                  {!item.participation &&
                    item.cagnote.responsable.id === user.id && (
                      <div className="mr-auto">
                        <Button
                          className="btn btn-block mb-4 px-2 px-sm-4 font-weight-bold"
                          color="primary"
                          onClick={() => console.log("in build")}
                        >
                          Faire une donation
                        </Button>
                      </div>
                    )}

                  {item.participation && (
                    <div className="mr-auto">
                      <Button
                        className="btn  btn-block mb-4 px-2 px-sm-4 font-weight-bold"
                        onClick={() => console.log("in build")}
                        color="warning"
                      >
                        Mettre a jour votre donation
                      </Button>
                    </div>
                  )}

                  {item.cagnote.responsable.id === user.id && (
                    <div className="ml-auto">
                      <Button
                        className="btn  btn-block mb-4 px-2 px-sm-4 font-weight-bold"
                        onClick={() => console.log("in build")}
                        color="danger"
                      >
                        Cloturer la cagnotte
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

                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Responsable</div>
                        <div className=" font-size-md text-primary">
                          {`${item.cagnote.responsable.first_name} ${item.cagnote.responsable.last_name}`}
                        </div>
                      </div>
                      <div className="divider my-2"></div>

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
                        {item.cagnote.solde > item.cagnote.objectif ? (
                          <div className="font-size-lg text-success">
                            {item.cagnote.solde}
                            <small className="pl-2 text-black">MRU</small>
                          </div>
                        ) : (
                          <div className="font-size-lg text-danger">
                            {item.cagnote.solde}
                            <small className="pl-2 text-black">MRU</small>
                          </div>
                        )}
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
                            {item.cagnote.actif ? (
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
                                  "px-4 py-1 h-auto text-danger border-1 border-danger"
                                }
                                color={"neutral-danger"}
                              >
                                Cloturé
                              </Badge>
                            )}
                          </div>
                          <div className="p-1">
                            {item.cagnote.verse_au_solde && (
                              <Badge
                                className={
                                  "px-4 py-1 h-auto text-success border-1 border-success"
                                }
                                color="neutral-success"
                              >
                                Versé au solde
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
                      <CardBody></CardBody>
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
                  <Button onClick={toggle4} block color="danger">
                    Fermer
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Modal>
      </div>
    </>
  );
}
