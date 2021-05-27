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
        <Col xl="4" md="6">
          <Card className="card-box p-3 mb-5">
            <div className="d-flex align-items-center">
              <CircularProgressbarWithChildren
                value={54}
                strokeWidth={6}
                className="circular-progress-primary"
              >
                <div className="d-40 rounded-circle bg-neutral-primary btn-icon">
                  <FontAwesomeIcon
                    icon={["fas", "check"]}
                    className="font-size-lg text-primary"
                  />
                </div>
              </CircularProgressbarWithChildren>
              <div className="pl-3">
                <div className="text-black-50 font-weight-normal">
                  Agences Actives
                </div>
                <div className="display-4 font-weight-bold pt-2 text-black">
                  <CountUp start={0} end={35} duration={6} delay={2} />
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xl="4" md="6">
          <Card className="card-box p-3 mb-5">
            <div className="d-flex align-items-center">
              <CircularProgressbarWithChildren
                value={81}
                strokeWidth={6}
                className="circular-progress-success"
              >
                <div className="d-40 rounded-circle bg-neutral-success btn-icon">
                  <FontAwesomeIcon
                    icon={["fa", "signal"]}
                    className="font-size-lg text-success"
                  />
                </div>
              </CircularProgressbarWithChildren>
              <div className="pl-3">
                <div className="text-black-50 font-weight-normal">
                  Agences en Ligne
                </div>
                <div className="display-4 font-weight-bold pt-2 text-black">
                  <CountUp start={0} end={18} duration={6} delay={2} />
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/*<Col xl="4" md="6">
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
                  Agences en Attente
                </div>
                <div className="display-4 font-weight-bold pt-2 text-black">
                  <CountUp start={0} end={10} duration={6} delay={2} />
                </div>
              </div>
            </div>
          </Card>
         </Col>*/}

        <Col xl="4" md="6">
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
                  Agences Désactivées
                </div>
                <div className="display-4 font-weight-bold pt-2 text-black">
                  <CountUp start={0} end={7} duration={6} delay={2} />
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
