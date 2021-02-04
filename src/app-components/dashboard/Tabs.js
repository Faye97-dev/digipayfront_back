import React, { useState } from "react";

import clsx from "clsx";
import { Row, Col, Card, TabContent, TabPane, Nav, NavItem } from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";
import FormTransfert from "./FormTransfert";
import FormRetrait from "./FormRetrait";
import FormClientSend from "./FormClientSend";
export default function Tabs() {
  const [activeTab, setActiveTab] = useState("1");

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
                    className={clsx({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">
                      Transfert
                    </span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === "2" })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">Retrait</span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === "3" })}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">Recharge</span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div className=" mt-4 mb-5">
                  <FormTransfert></FormTransfert>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <div className=" mt-4 mb-5">
                  <FormRetrait></FormRetrait>
                </div>
              </TabPane>
              <TabPane tabId="3">
                <div className=" mt-4 mb-5">
                  <FormClientSend />
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    </>
  );
}
