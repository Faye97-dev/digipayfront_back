import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Row, Col, CardBody, Card, Button, Modal, Badge } from "reactstrap";

export default function ModalDetails(props) {
  const { item, user } = props;

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
                {/*<div className="px-4 pt-5 pb-4">
                  <h1 className="display-4 font-weight-normal font-size-xl text-uppercase text-primary ">
                    Profil du client
                  </h1>
                  </div>*/}
                <Card className="card m-4">
                  <div className="d-flex align-items-center p-3">
                    <div
                      className="avatar-icon-wrapper rounded-circle mr-3"
                      title="Online"
                    >
                      <div className="rounded-circle overflow-hidden d-100 bg-neutral-primary font-size-lg text-center font-weight-bold text-primary d-flex justify-content-center flex-column">
                        <span>
                          {item.nom[0].toUpperCase() +
                            item.nom[1].toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="w-100">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="font-weight-bold font-size-lg"
                        title="..."
                      >
                        {item.nom}
                      </a>
                      <span className="text-black-50 d-block">{item.tel}</span>
                      <div className="d-flex align-items-center pt-1">
                        <Badge
                          className={
                            "px-4 py-1 h-auto text-white" +
                            " border-1 border-" +
                            props.mapStatusClientsColors[item.status]
                          }
                          color={props.mapStatusClientsColors[item.status]}
                        >
                          {props.mapStatusClientsNames[item.status]}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row className="no-gutters">
              <Col md="12" xl="12">
                <div className=" rounded  ">
                  <div className="px-4 py-0">
                    <Card className="card-box mb-4">
                      <div className="card-header">
                        <span className="font-size-lg mb-0 py-2">Profil</span>
                      </div>
                      <CardBody>
                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Identifiant</div>
                          <div className=" font-size-md text-primary">
                            {item.identifiant}
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex flex-wrap align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Telephone</div>
                          <div className=" font-size-md text-primary">
                            {item.tel}
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Email</div>
                          <div className=" font-size-md text-primary">
                            {item.email}
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Adresse</div>
                          <div className=" font-size-md text-primary">
                            {`${item.adresse}`}
                          </div>
                        </div>
                        <div className="divider my-2"></div>

                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Solde</div>
                          <div className=" font-size-lg text-primary">
                            {item.solde}
                            <small className="pl-2 text-black">MRU</small>
                          </div>
                        </div>
                        <div className="divider my-2"></div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </Col>
              <Col md="12" xl="12">
                <div className=" rounded  ">
                  <div className="px-4 py-0">
                    <Card className="card-box mb-4 p-3">
                      <Chart />
                    </Card>
                  </div>
                </div>
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

const data = {
  labels: [
    "Paiements",
    "Recharges",
    "Envois",
    "Retraits",
    "Donations",
    "Recoltes",
  ],
  datasets: [
    {
      data: [35000, 70000, 50000, 15000, 10250, 20000],
      backgroundColor: [
        "#f4772e",
        "#11c5db",
        "#1bc943",
        "#ff6666",
        "#ff99cc",
        "#3c44b1",
      ],
      hoverBackgroundColor: [
        "#f4772e",
        "#11c5db",
        "#1bc943",
        "#ff6666",
        "#ff99cc",
        "#3c44b1",
      ],
    },
  ],
};

const legend = {
  display: true,
  position: "bottom",
  labels: {
    fontColor: "#323130",
    fontSize: 16,
  },
};

/*const options = {
  title: {
    display: true,
    text: "Chart Title",
  },
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    ]
  }
};*/

function Chart() {
  return (
    <>
      <Doughnut data={data} legend={legend} />
    </>
  );
}
