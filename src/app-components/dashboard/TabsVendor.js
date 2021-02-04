import React, { useState } from "react";

import clsx from "clsx";
import { Row, Col, Card, TabContent, TabPane, Nav, NavItem } from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";

import FormVendor from "./FormVendor";
import FormVendorPayback from "./FormVendorPayback";
import FormClientPay from "./FormClientPay";
export default function TabsClient() {
  const [activeTab, setActiveTab] = useState("2");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <Row className="py-5">
        <Col lg="12">
          <Card className="shadow-xxl px-3">
            <div className="nav-tabs-primary tabs-animated tabs-animated-line">
              <Nav tabs justified className="justify-content-center">
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === "2" })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">
                      Encaisser
                    </span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === "3" })}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">Retirer</span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">Payer</span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === "4" })}
                    onClick={() => {
                      toggle("4");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">
                      Rembourser
                    </span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="2">
                <div className=" my-5">
                  <FormVendor submit="Payer" />
                </div>
              </TabPane>
              <TabPane tabId="3">
                <div className=" my-5">
                  <FormVendor submit="Demander" />
                </div>
              </TabPane>
              <TabPane tabId="4">
                <div className=" my-5">
                  <FormVendorPayback submit="Demander" />
                </div>
              </TabPane>
              <TabPane tabId="1">
                <div className=" my-5">
                  <FormClientPay submit="Demander" />
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    </>
  );
}
