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
                  Trésoriers Actifs
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
                  Trésoriers en Attente
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
                  Trésoriers Désactivés
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
                  Trésoriers Bloqués
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
