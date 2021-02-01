import React, { Component, useState } from "react";

import {
  Row,
  Col,
  CardBody,
  Card,
  CardHeader,
  Collapse,
  Button,
} from "reactstrap";
import FormClientCredit from "./FormClientCredit";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import stock1 from "../../assets/images/stock-photos/stock-5.jpg";
export default class RechargeCredit extends Component {
  render() {
    return (
      <>
        {/*<Card className="card-box p-5 mb-5">
          <Row className="no-gutters align-items-center">
            <Col xl="5">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="d-flex h-280px rounded card-box-hover-rise"
              >
                <img
                  src={stock1}
                  alt="Bamburgh React Admin Dashboard with Reactstrap PRO"
                  className="img-fit-container rounded"
                />
              </a>
            </Col>
            <Col xl="7">
              <CardBody className="px-0 px-xl-5 pt-4 pb-xl-1">
                <a href="#/" onClick={(e) => e.preventDefault()}>
                  <h2 className="font-weight-bold mb-1">
                    Recharge de Carte credit
                  </h2>
                </a>
                <FormClientCredit></FormClientCredit>
              </CardBody>
            </Col>
          </Row>
    </Card>*/}

        <LivePreviewExample></LivePreviewExample>
      </>
    );
  }
}

function LivePreviewExample() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="accordion mb-5">
        <Card className={clsx("card-box", { "panel-open": isOpen })}>
          <Card>
            <CardHeader>
              <div className="panel-title ">
                <div className="accordion-toggle">
                  <Button
                    size="lg"
                    className="d-flex align-items-center justify-content-between py-4"
                    onClick={toggle}
                  >
                    <div>
                      <h3 className="font-weight-bold mb-1 text-primary">
                        Recharge Carte credit
                      </h3>
                    </div>
                    <FontAwesomeIcon
                      icon={["fas", "angle-up"]}
                      className="font-size-xl accordion-icon"
                    />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <Collapse isOpen={isOpen}>
              <div className="p-5">
                <Row className="no-gutters align-items-center">
                  <Col xl="5">
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="d-flex h-280px rounded card-box-hover-rise"
                    >
                      <img
                        src={stock1}
                        alt="Bamburgh React Admin Dashboard with Reactstrap PRO"
                        className="img-fit-container rounded"
                      />
                    </a>
                  </Col>
                  <Col xl="7">
                    <CardBody className="px-0 px-xl-5 pt-4 pb-xl-1">
                      <FormClientCredit></FormClientCredit>
                    </CardBody>
                  </Col>
                </Row>
              </div>
            </Collapse>
          </Card>
        </Card>
      </div>
    </>
  );
}
