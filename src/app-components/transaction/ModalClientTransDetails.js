import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, CardBody, Card, NavItem, Button, Modal } from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";
import {
  mapColorStatus,
  mapTypeNames,
  mapColorTypes,
  NOT_WITHDRAWED,
  TO_VALIDATE,
} from "../../utils/choices";

export default function ModalClientTransDetails(props) {
  const { item } = props;
  const keys = Object.keys({ ...item.transaction });
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
            //console.log(item);
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
                  Informations de la transaction
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
                      <span className="font-size-lg mb-0 py-2">Origine</span>
                    </div>
                    <CardBody>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Nom</div>
                        <div className=" font-size-lg text-primary">
                          {/* digipay user case */}
                          {!keys.includes("agence_origine") &&
                            `${item.transaction.expediteur.first_name} ${item.transaction.expediteur.last_name}`}

                          {/* anonymous customer case */}
                          {keys.includes("agence_origine") &&
                            item.transaction.expediteur &&
                            item.transaction.expediteur.nom}

                          {/* agence case */}
                          {keys.includes("agence_origine") &&
                            !item.transaction.expediteur &&
                            item.transaction.agence_origine.nom}
                        </div>
                      </div>
                      <div className="divider my-2"></div>

                      {/* digipay user case */}
                      {!keys.includes("agence_origine") && (
                        <>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Telephone</div>
                            <div className=" font-size-lg text-primary">
                              {item.transaction.expediteur.tel}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Email</div>
                            <div className=" font-size-lg text-primary">
                              {item.transaction.expediteur.email}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Adresse</div>
                            <div className=" font-size-lg text-primary">
                              {item.transaction.expediteur.adresse}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                        </>
                      )}

                      {/* anonymous customer case */}
                      {keys.includes("agence_origine") &&
                        item.transaction.expediteur && (
                          <>
                            <div className="d-flex align-items-center justify-content-between px-3 py-1">
                              <div className=" font-size-md">Telephone</div>
                              <div className=" font-size-lg text-primary">
                                {item.transaction.expediteur.tel}
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                          </>
                        )}

                      {/* agence case */}
                      {keys.includes("agence_origine") &&
                        !item.transaction.expediteur &&
                        item.transaction.agence_origine.nom && (
                          <>
                            <div className="d-flex align-items-center justify-content-between px-3 py-1">
                              <div className=" font-size-md">Code Agence</div>
                              <div className=" font-size-lg text-primary">
                                {item.transaction.agence_origine.code_agence}
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="d-flex align-items-center justify-content-between px-3 py-1">
                              <div className=" font-size-md">Commune</div>
                              <div className=" font-size-lg text-primary">
                                {
                                  item.transaction.agence_origine.commune
                                    .commune
                                }
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="d-flex align-items-center justify-content-between px-3 py-1">
                              <div className=" font-size-md">Adresse</div>
                              <div className=" font-size-lg text-primary">
                                {item.transaction.agence_origine.adresse}
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="d-flex align-items-center justify-content-between px-3 py-1">
                              <div className=" font-size-md">Telephone</div>
                              <div className=" font-size-lg text-primary">
                                {item.transaction.agence_origine.tel}
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                          </>
                        )}
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
                        Beneficiaire
                      </span>
                    </div>
                    <CardBody>
                      {/* anonymous customer and digipay user cases */}
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Nom</div>
                        <div className=" font-size-lg text-primary">
                          {keys.includes("agence_origine")
                            ? item.transaction.destinataire.nom
                            : `${item.transaction.destinataire.first_name} ${item.transaction.destinataire.last_name}`}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Telephone</div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.destinataire.tel}
                        </div>
                      </div>

                      {/* digipay user case */}
                      {!keys.includes("agence_origine") && (
                        <>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Email</div>
                            <div className=" font-size-lg text-primary">
                              {item.transaction.destinataire.email}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Adresse</div>
                            <div className=" font-size-lg text-primary">
                              {item.transaction.destinataire.adresse}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </div>
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
                        Transaction
                      </span>
                    </div>
                    <CardBody>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Code</div>
                        <div className=" font-size-lg text-primary">
                          {item.code_transaction}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Date</div>
                        <div className=" font-size-lg text-primary">
                          {item.date}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Type</div>
                        <div
                          className={
                            "font-size-lg" +
                            "badge px-4" +
                            " badge-" +
                            mapColorTypes[item.type_transaction]
                          }
                        >
                          {mapTypeNames[item.type_transaction]}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Status</div>
                        <div
                          className={
                            " font-size-lg" +
                            "badge px-4" +
                            " badge-" +
                            mapColorStatus[item.transaction.status]
                          }
                        >
                          {item.transaction.status}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Montant</div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.montant}
                        </div>
                      </div>
                      <div className="divider my-2"></div>

                      {item.transaction.code_secret !== "" &&
                        (item.transaction.status === TO_VALIDATE ||
                          item.transaction.status === NOT_WITHDRAWED) && (
                          <>
                            <div className="d-flex align-items-center justify-content-between px-3 py-1">
                              <div className=" font-size-md">
                                Code de confirmation
                              </div>
                              <div className=" font-size-lg text-primary">
                                {item.transaction.code_secret}
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                          </>
                        )}

                      {/* digipay user case */}
                      {!keys.includes("agence_origine") && (
                        <>
                          {item.transaction.libele &&
                            item.transaction.libele !== "" && (
                              <>
                                <div className="d-flex align-items-center justify-content-between px-3 py-1">
                                  <div className=" font-size-md">Libele</div>
                                  <div className=" font-size-lg text-primary">
                                    {item.transaction.libele}
                                  </div>
                                </div>
                                <div className="divider my-2"></div>
                              </>
                            )}

                          {item.transaction.delai_livraison &&
                            item.transaction.status === TO_VALIDATE && (
                              <>
                                <div className="d-flex align-items-center justify-content-between px-3 py-1">
                                  <div className=" font-size-md">
                                    Delai de livraison
                                  </div>
                                  <div className=" font-size-lg text-primary">
                                    {item.transaction.delai_livraison}
                                  </div>
                                </div>
                                <div className="divider my-2"></div>
                              </>
                            )}
                        </>
                      )}

                      {/*<div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Frais d'origine</div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.frais_origine}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">
                          Frais de destination
                        </div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.frais_destination}
                        </div>
                      </div>
                        <div className="divider my-2"></div>*/}
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Col>
            {/*<Col md="12" xl="6">
              <div className=" rounded  ">
                <div className="px-4 py-0">
                  <Card className="card-box mb-4">
                    <div className="card-header">
                      <span className="font-size-lg mb-0 py-2">
                        Autre informations
                      </span>
                    </div>
                    <CardBody>
                    </CardBody>
                  </Card>
                </div>
              </div>
              </Col>*/}
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
