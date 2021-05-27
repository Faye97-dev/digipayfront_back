import React, { useState } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  CardBody,
  Card,
  CardHeader,
  CardFooter,
  FormGroup,
  Input,
  Badge,
  UncontrolledTooltip,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Button,
  Modal,
  Progress,
} from "reactstrap";

import {
  mapColorStatus,
  mapStatusNames,
  mapTypeNames,
  mapColorTypes,
} from "../../utils/choices";
export default function ModalTransDetails(props) {
  const { item } = props;
  const [modal4, setModal4] = useState(false);

  const toggle4 = () => setModal4(!modal4);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button
          color="primary"
          onClick={toggle4}
          className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center"
        >
          <FontAwesomeIcon icon={["fas", "eye"]} className="font-size-sm" />
        </Button>
        {/*<Button onClick={toggle4} color="primary" className="m-2">
          Open example IV
        </Button>*/}
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
                      <span className="font-size-lg mb-0 py-2">
                        Agence d'origine
                      </span>
                    </div>
                    <CardBody>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Nom</div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.agence_origine.nom}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
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
                          {item.transaction.agence_origine.commune.commune}
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
                        Agence de destination
                      </span>
                    </div>
                    <CardBody>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Nom</div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.agence_destination.nom}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Code Agence</div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.agence_destination.code_agence}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Commune</div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.agence_destination.commune.commune}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Adresse</div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.agence_destination.adresse}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Telephone</div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.agence_destination.tel}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
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
                          {mapStatusNames[item.transaction.status]}
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
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
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
                        Destinataire
                      </span>
                    </div>
                    <CardBody>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Nom</div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.destinataire.nom}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Telephone</div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.destinataire.tel}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="d-flex align-items-center justify-content-between px-3 py-1">
                        <div className=" font-size-md">Nni</div>
                        <div className=" font-size-lg text-primary">
                          {item.transaction.destinataire.nni}
                        </div>
                      </div>
                      <div className="divider my-2"></div>
                    </CardBody>
                  </Card>
                </div>
              </div>
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
