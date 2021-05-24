import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card } from "reactstrap";

import CountUp from "react-countup";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

export default function Dashboard() {
  return (
    <>
      <Row>
        <Col xl="3" md="6">
          <Card className="card-box border-0 shadow-first-sm p-4 mb-5">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle bg-first text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={["fas", "money-bill"]} />
              </div>
              <div className="text-black-50">Versements</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={["fas", "arrow-down"]}
                className="font-size-sm text-danger mr-2"
              />
              <div className="font-size-lg">
                25.269.200<small className="pl-2">MRU</small>
              </div>
            </div>
            {/*<div className="text-black-50 text-center pt-3">
                <b>+36%</b> from last month
                </div>*/}
          </Card>
        </Col>
        <Col xl="3" md="6">
          <Card className="card-box border-0 shadow-success-sm p-4 mb-5">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle bg-success text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={["fas", "money-bill"]} />
              </div>
              <div className="text-black-50">Retraits</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={["far", "dot-circle"]}
                className="font-size-sm text-warning mr-2"
              />
              <div className="font-size-lg">
                21.500.296<small className="pl-2">MRU</small>
              </div>
            </div>
            {/*<div className="text-black-50 text-center pt-1">
              <b>+15%</b> Cette semaine
            </div>*/}
          </Card>
        </Col>
        <Col xl="3" md="6">
          <Card className="card-box border-0 shadow-danger-sm p-4 mb-5">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle bg-danger text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={["far", "user"]} />
              </div>
              <div className="text-black-50">Frais</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={["fas", "arrow-up"]}
                className="font-size-sm text-success mr-2"
              />
              <div className="font-size-lg">
                4.256.150<small className="pl-2">MRU</small>
              </div>
            </div>
          </Card>
        </Col>
        <Col xl="3" md="6">
          <Card className="card-box border-0 shadow-primary-sm p-4 mb-5">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle bg-primary text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={["far", "user"]} />
              </div>
              <div className="text-black-50">Balance</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={["fas", "arrow-down"]}
                className="font-size-sm text-first mr-2"
              />
              <div className="font-size-lg">
                3.958.023<small className="pl-2">MRU</small>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <StatTransaction />
    </>
  );
}

function StatTransaction() {
  return (
    <>
      <Row>
        <Col xl="3" md="6">
          <Card className="card-box p-3 mb-5">
            <div className="d-flex align-items-center">
              <CircularProgressbarWithChildren
                value={81}
                strokeWidth={6}
                className="circular-progress-success"
              >
                <div className="d-40 rounded-circle bg-neutral-success btn-icon">
                  <FontAwesomeIcon
                    icon={["fa", "check"]}
                    className="font-size-lg text-success"
                  />
                </div>
              </CircularProgressbarWithChildren>
              <div className="pl-3">
                <div className="text-black-50 font-weight-normal">
                  Compensations Versements
                </div>
                <div className="display-4 font-weight-bold pt-2 text-black">
                  <CountUp start={0} end={683} duration={6} delay={2} />
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xl="3" md="6">
          <Card className="card-box p-3 mb-5">
            <div className="d-flex align-items-center">
              <CircularProgressbarWithChildren
                value={74}
                strokeWidth={6}
                className="circular-progress-info"
              >
                <div className="d-40 rounded bg-neutral-info btn-icon">
                  <FontAwesomeIcon
                    icon={["fa", "pause"]}
                    className="font-size-lg text-info"
                  />
                </div>
              </CircularProgressbarWithChildren>
              <div className="pl-3">
                <div className="text-black-50 font-weight-normal">
                  Compensations en Attente
                </div>
                <div className="display-4 font-weight-bold pt-2 text-black">
                  <CountUp start={0} end={147} duration={6} delay={2} />
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xl="3" md="6">
          <Card className="card-box p-3 mb-5">
            <div className="d-flex align-items-center">
              <CircularProgressbarWithChildren
                value={54}
                strokeWidth={6}
                className="circular-progress-warning"
              >
                <div className="d-40 rounded-circle bg-neutral-warning btn-icon">
                  <FontAwesomeIcon
                    icon={["fas", "ban"]}
                    className="font-size-lg text-warning"
                  />
                </div>
              </CircularProgressbarWithChildren>
              <div className="pl-3">
                <div className="text-black-50 font-weight-normal">
                  Compensations Retraits
                </div>
                <div className="display-4 font-weight-bold pt-2 text-black">
                  <CountUp start={0} end={240} duration={6} delay={2} />
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xl="3" md="6">
          <Card className="card-box p-3 mb-5">
            <div className="d-flex align-items-center">
              <CircularProgressbarWithChildren
                value={34}
                strokeWidth={6}
                className="circular-progress-danger"
              >
                <div className="d-40 rounded bg-neutral-danger btn-icon">
                  <FontAwesomeIcon
                    icon={["fa", "times"]}
                    className="font-size-lg text-danger"
                  />
                </div>
              </CircularProgressbarWithChildren>
              <div className="pl-3">
                <div className="text-black-50 font-weight-normal">
                  Compensations Annulées
                </div>
                <div className="display-4 font-weight-bold pt-2 text-black">
                  <CountUp start={0} end={54} duration={6} delay={2} />
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
