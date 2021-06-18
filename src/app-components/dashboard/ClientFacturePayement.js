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
import FormClientFacturePay from "./FormClientFacturePay";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ClientFacturePayement extends Component {
  render() {
    return (
      <>
        <CollapseFacturePayement />
      </>
    );
  }
}

function CollapseFacturePayement() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="accordion mb-5 mt-4">
        <Card className={clsx("card-box", { "panel-open": isOpen })}>
          <Card>
            <CardHeader>
              <div className="panel-title ">
                <div className="accordion-toggle">
                  <Button
                    size="lg"
                    className="d-flex align-items-center justify-content-between py-4"
                    onClick={toggleCollapse}
                  >
                    <div>
                      <h3 className="font-weight-bold mb-1 text-primary">
                        Paiement de facture
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
              <div className="px-lg-3 py-4 px-1">
                <Row className="no-gutters align-items-center">
                  <Col xl="12">
                    <CardBody className="px-5 pt-1 pb-1 ">
                      <FormClientFacturePay toggleCollapse={toggleCollapse} />
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
