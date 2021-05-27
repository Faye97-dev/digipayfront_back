import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card } from "reactstrap";

import { Doughnut } from "react-chartjs-2";

export default function Dashboard() {
  return (
    <>
      <Chart />
    </>
  );
}

function Chart() {
  return (
    <>
      <Row>
        <Col xl="4" md="6">
          <Card className="card-box p-3 mb-5">
            <div className="d-flex align-items-center justify-content-center">
              <div className="font-weight-normal pt-2 text-black-30 ">
                Cartes Actives
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Doughnut data={dataActives} legend={legend} />
            </div>
          </Card>
        </Col>
        <Col xl="4" md="6">
          <Card className="card-box p-3 mb-5">
            <div className="d-flex align-items-center justify-content-center">
              <div className="font-weight-normal pt-2 text-black-30 ">
                Montant des cartes
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Doughnut data={dataMontant} legend={legend} />
            </div>
          </Card>
        </Col>
        <Col xl="4" md="6">
          <Card className="card-box p-3 mb-5">
            <div className="d-flex align-items-center justify-content-center">
              <div className="font-weight-normal pt-2 text-black-30 ">
                Nombre de cartes
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Doughnut data={dataNombre} legend={legend} />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

const dataActives = {
  labels: ["Mauritel", "Mattel", "Chinguitel"],
  datasets: [
    {
      data: [65, 50, 35],
      backgroundColor: ["#f4772e", "#11c5db", "#3c44b1"],
      hoverBackgroundColor: ["#f4772e", "#11c5db", "#3c44b1"],
    },
  ],
};

const dataMontant = {
  labels: ["Mauritel", "Mattel", "Chinguitel"],
  datasets: [
    {
      data: [75025, 40250, 80250],
      backgroundColor: ["#f4772e", "#11c5db", "#3c44b1"],
      hoverBackgroundColor: ["#f4772e", "#11c5db", "#3c44b1"],
    },
  ],
};

const dataNombre = {
  labels: ["Mauritel", "Mattel", "Chinguitel"],
  datasets: [
    {
      data: [75, 105, 167],
      backgroundColor: ["#f4772e", "#11c5db", "#3c44b1"],
      hoverBackgroundColor: ["#f4772e", "#11c5db", "#3c44b1"],
    },
  ],
};

const legend = {
  display: false,
  position: "bottom",
  labels: {
    fontColor: "#323130",
    fontSize: 16,
  },
};
