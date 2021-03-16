import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card } from "reactstrap";

import CountUp from "react-countup";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
export default function Progress() {
  return (
    <>
      <Row>
        <Col xl="6">
          <Card className="card-box p-3 mb-5">
            <div className="d-flex align-items-center">
              <CircularProgressbarWithChildren
                value={81}
                strokeWidth={6}
                className="circular-progress-success"
              >
                <div className="d-40 rounded-circle bg-neutral-success btn-icon">
                  <FontAwesomeIcon
                    icon={["far", "user"]}
                    className="font-size-lg text-success"
                  />
                </div>
              </CircularProgressbarWithChildren>
              <div className="pl-3">
                <div className="text-black-50 font-weight-bold">
                  Transferts Complets
                </div>
                <div className="display-4 font-weight-bold pt-2 text-black">
                  <CountUp
                    start={0}
                    end={683.57}
                    duration={6}
                    delay={2}
                    separator=""
                    decimals={2}
                    decimal=","
                  />
                  <small className="pl-2">MRU</small>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="card-box p-3 mb-5">
            <div className="d-flex align-items-center">
              <CircularProgressbarWithChildren
                value={54}
                strokeWidth={6}
                className="circular-progress-info"
              >
                <div className="d-40 rounded-circle bg-neutral-info btn-icon">
                  <FontAwesomeIcon
                    icon={["far", "chart-bar"]}
                    className="font-size-lg text-info"
                  />
                </div>
              </CircularProgressbarWithChildren>
              <div className="pl-3">
                <div className="text-black-50 font-weight-bold">
                  Transferts Non-retirés
                </div>
                <div className="display-4 font-weight-bold pt-2 text-black">
                  <CountUp
                    start={0}
                    end={8.741}
                    duration={6}
                    delay={2}
                    separator=""
                    decimals={3}
                    decimal=","
                  />
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="card-box bg-danger p-3 mb-5">
            <div className="d-flex align-items-center">
              <CircularProgressbarWithChildren
                styles={buildStyles({
                  textColor: "var(--white)",
                  pathColor: "rgba(255,255,255,.95)",
                  trailColor: "rgba(255,255,255,.1)",
                })}
                value={34}
                strokeWidth={6}
                className="circular-progress-success"
              >
                <div className="d-40 rounded bg-white-10 btn-icon">
                  <FontAwesomeIcon
                    icon={["far", "question-circle"]}
                    className="font-size-lg text-white"
                  />
                </div>
              </CircularProgressbarWithChildren>
              <div className="pl-3">
                <div className="text-white-50 font-weight-bold">
                  Transferts Annulés
                </div>
                <div className="display-4 font-weight-bold pt-2 text-white">
                  <CountUp
                    start={0}
                    end={54}
                    duration={6}
                    delay={2}
                    separator=""
                    decimals={0}
                    decimal=","
                  />
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="card-box bg-plum-plate p-3 mb-5">
            <div className="d-flex align-items-center">
              <CircularProgressbarWithChildren
                styles={buildStyles({
                  textColor: "var(--white)",
                  pathColor: "rgba(255,255,255,.95)",
                  trailColor: "rgba(255,255,255,.1)",
                })}
                value={74}
                strokeWidth={6}
                className="circular-progress-success"
              >
                <div className="d-40 rounded bg-white-10 btn-icon">
                  <FontAwesomeIcon
                    icon={["far", "user-circle"]}
                    className="font-size-lg text-white"
                  />
                </div>
              </CircularProgressbarWithChildren>
              <div className="pl-3">
                <div className="text-white-50 font-weight-bold">
                  Transferts en attente
                </div>
                <div className="display-4 font-weight-bold pt-2 text-white">
                  <CountUp
                    start={0}
                    end={8.357}
                    duration={6}
                    delay={2}
                    separator=""
                    decimals={3}
                    decimal=","
                  />
                  <small className="pl-2">MRU</small>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export function HeaderProgress() {
  return (
    <>
      <Row>
        <Col xl="3" md="6">
          <Card className="card-box border-0 shadow-first-sm p-4 mb-5">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle bg-first text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={["fas", "money-bill"]} />
              </div>
              <div className="text-black-50">Transferts</div>
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
                1.500.296<small className="pl-2">MRU</small>
              </div>
            </div>
            {/*<div className="text-black-50 text-center pt-3">
              <b>+65%</b> from last month
            </div>*/}
          </Card>
        </Col>
        <Col xl="3" md="6">
          <Card className="card-box border-0 shadow-danger-sm p-4 mb-5">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle bg-danger text-white text-center font-size-lg mr-3">
                <FontAwesomeIcon icon={["far", "user"]} />
              </div>
              <div className="text-black-50">Paiements</div>
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
              <div className="text-black-50">Recharges</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
              <FontAwesomeIcon
                icon={["fas", "arrow-down"]}
                className="font-size-sm text-first mr-2"
              />
              <div className="font-size-lg">
                8.958.023<small className="pl-2">MRU</small>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
