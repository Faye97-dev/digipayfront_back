import React, { useState, useEffect } from "react";

import clsx from "clsx";
import { Row, Col, Card, TabContent, TabPane, Nav, NavItem } from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";
import FormTransfert from "./FormTransfert";
import FormRetrait from "./FormRetrait";
import FormRecharge from "./FormRecharge";
import { connect } from "react-redux";
import { getNotifications } from "../../actions/notification";
import { showAlert } from "../../utils/alerts";

function Tabs(props) {
  /*const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };*/

  useEffect(() => {
    props.getNotifications(showAlert);
  }, []);

  return (
    <>
      <XlFormat {...props} />
      <SmallFormat {...props} />
    </>
  );
}

function SmallFormat(props) {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [activeTab2, setActiveTab2] = useState("2");

  const toggle2 = (tab) => {
    if (activeTab2 !== tab) setActiveTab2(tab);
  };

  return (
    <div className="d-block d-xl-none">
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
                      Transfert
                    </span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1" className="px-0">
                <div className=" my-4">
                  <FormTransfert />
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>

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
                    <span className="px-3 py-2 font-weight-bold">Recharge</span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab2 === "1" })}
                    onClick={() => {
                      toggle2("1");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">Retrait</span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab2}>
              <TabPane tabId="2" className="px-0">
                <div className=" my-4">
                  <FormRecharge />
                </div>
              </TabPane>
              <TabPane tabId="1" className="px-0">
                <div className=" my-4">
                  <FormRetrait />
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
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div className="d-none d-xl-block">
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
                  <FormRecharge />
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { getNotifications })(Tabs);
