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
import Badge from "reactstrap/lib/Badge";
import {
  mapColorStatus,
  mapTypeNames,
  mapColorTypes,
} from "../../utils/choices";
export default function CollapseModel(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="accordion mb-4">
        <Card className={clsx("card-box", { "panel-open": isOpen })}>
          <Card>
            <CardHeader>
              <div className="panel-title ">
                <div className="accordion-toggle">
                  <Button
                    size="sm"
                    className="d-flex align-items-center justify-content-between py-3"
                    onClick={toggle}
                  >
                    <div className="d-flex aligns-items-center justify-content-center flex-wrap">
                      <h5 className="font-weight-normal">
                        {/*<Badge color="warning" className="px-2 py-1 h-auto">
                          {props.type_transaction} REMBOURSEMENT
                        </Badge>*/}
                        <Badge
                          className={
                            "px-4 py-1 h-auto text-" +
                            mapColorTypes[props.type_transaction] +
                            " border-1 border-" +
                            mapColorTypes[props.type_transaction]
                          }
                          color={
                            "neutral-" + mapColorTypes[props.type_transaction]
                          }
                        >
                          {mapTypeNames[props.type_transaction]}
                        </Badge>
                      </h5>
                      <h6 className="ml-2 font-weight-bold py-1 my-0">
                        {props.montant}
                        <small className="px-2 font-weight-normal">MRU</small>
                      </h6>
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
              <div className="px-2 py-3 px-1">
                <Row className="no-gutters align-items-center">
                  <Col xl="12">
                    <CardBody className="px-3 pt-1 pb-1 ">
                      {/*<div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span className="font-size-sm text-uppercase text-black-30">
                            Agence source
                          </span>
                        </div>
                        <div className="font-weight-bold text-black font-size-sm">
                          1523.0 MRU
                        </div>
                      </div>
                      <div className="divider my-3" />*/}
                      {props.children}
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
