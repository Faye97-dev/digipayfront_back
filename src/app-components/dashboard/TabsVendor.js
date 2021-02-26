import React, { useState } from "react";

import clsx from "clsx";
import { Row, Col, Card, TabContent, TabPane, Nav, NavItem } from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";

import FormVendor from "./FormVendor";
import FormVendorWithdraw from "./FormVendorWithdraw";
import FormVendorPayback from "./FormVendorPayback";
import FormVendorPay from "./FormVendorPay";
export default function TabsVendor(props) {
  return (
    <>
      <XlFormat {...props} />
      <SmallFormat {...props} />
    </>
  );
}

function CodeGenerator() {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <Row className="py-4">
        <Col lg="12">
          <Card className="shadow-xxl px-3">
            <div className="nav-tabs-primary tabs-animated tabs-animated-line">
              <Nav tabs justified className="justify-content-center">
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">
                      Générer un code de paiement
                    </span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div className=" my-5">
                  <FormVendor submit="Générer" />
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    </>
  );
}

function SmallFormat(props) {
  const [activeTab2, setActiveTab2] = useState("2");

  const toggle2 = (tab) => {
    if (activeTab2 !== tab) setActiveTab2(tab);
  };

  const [activeTab3, setActiveTab3] = useState("1");

  const toggle3 = (tab) => {
    if (activeTab3 !== tab) setActiveTab3(tab);
  };

  return (
    <div className="d-block d-xl-none">
      <CodeGenerator />
      {/* second tabs */}
      <Row className="py-4">
        <Col lg="12">
          <Card className="shadow-xxl px-3">
            <div className="nav-tabs-primary tabs-animated tabs-animated-line">
              <Nav tabs justified className="justify-content-center">
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab2 === "2" })}
                    onClick={() => {
                      toggle2("2");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">Payer</span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab2 === "1" })}
                    onClick={() => {
                      toggle2("1");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">Retirer</span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab2}>
              <TabPane tabId="2">
                <div className=" my-5">
                  <FormVendorPay />
                </div>
              </TabPane>
              <TabPane tabId="1">
                <div className="my-5">
                  <FormVendorWithdraw />
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
      {/* third tabs */}
      <Row className="py-4">
        <Col lg="12">
          <Card className="shadow-xxl px-3">
            <div className="nav-tabs-primary tabs-animated tabs-animated-line">
              <Nav tabs justified className="justify-content-center">
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab3 === "1" })}
                    onClick={() => {
                      toggle3("1");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">
                      Rembourser
                    </span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab3}>
              <TabPane tabId="1">
                <div className="my-5">
                  <FormVendorPayback submit="Demander" />
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
      <br />
    </div>
  );
}

function XlFormat(props) {
  const [activeTab, setActiveTab] = useState("3");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="d-none d-xl-block">
      <CodeGenerator />
      <Row className="py-4">
        <Col lg="12">
          <Card className="shadow-xxl px-3">
            <div className="nav-tabs-primary tabs-animated tabs-animated-line">
              <Nav tabs justified className="justify-content-center">
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
              <TabPane tabId="3">
                <div className=" my-5">
                  <FormVendorWithdraw />
                </div>
              </TabPane>
              <TabPane tabId="1">
                <div className=" my-5">
                  <FormVendorPay />
                </div>
              </TabPane>
              <TabPane tabId="4">
                <div className=" my-5">
                  <FormVendorPayback submit="Demander" />
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
      <br />
    </div>
  );
}
