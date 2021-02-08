import React, { useState } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Table,
  Col,
  Card,
  CardHeader,
  Container,
  Label,
  FormGroup,
  Input,
  Badge,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";

import Switch from "rc-switch";

export default function Demo() {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [checked1, setChecked1] = useState(false);

  const toggleCheck1 = () => {
    setChecked1(!checked1);
  };

  const [checked2, setChecked2] = useState(false);

  const toggleCheck2 = () => {
    setChecked2(!checked2);
  };

  return (
    <>
      <Card className="mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-0">
          <div className="nav-line-alt w-100">
            <Nav className="nav-line d-flex justify-content-center">
              <NavItem>
                <NavLinkStrap
                  className={clsx("p-4 font-size-md", {
                    active: activeTab === "1",
                  })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  <span className="font-weight-bold font-size-sm text-uppercase">
                    Personal details
                  </span>
                  <div className="divider" />
                </NavLinkStrap>
              </NavItem>
              <NavItem>
                <NavLinkStrap
                  className={clsx("p-4 font-size-md", {
                    active: activeTab === "2",
                  })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  <span className="font-weight-bold font-size-sm text-uppercase">
                    Settings
                  </span>
                  <div className="divider" />
                </NavLinkStrap>
              </NavItem>
              <NavItem>
                <NavLinkStrap
                  className={clsx("p-4 font-size-md", {
                    active: activeTab === "3",
                  })}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  <span className="font-weight-bold font-size-sm text-uppercase">
                    Social Accounts
                  </span>
                  <div className="divider" />
                </NavLinkStrap>
              </NavItem>
            </Nav>
          </div>
        </CardHeader>
        <TabContent className="px-0 py-0 py-lg-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Container>
              <div className="text-uppercase font-weight-bold text-primary pt-4 font-size-sm">
                General
              </div>
              <div className="py-4">
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label className="font-weight-bold" for="">
                        First Name
                      </Label>
                      <Input
                        type="text"
                        name=""
                        id=""
                        placeholder="First name..."
                      />
                    </FormGroup>
                    <Label className="font-weight-bold" for="">
                      Birthday
                    </Label>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Input
                            type="text"
                            name=""
                            id=""
                            placeholder="Day..."
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Input
                            type="text"
                            name=""
                            id=""
                            placeholder="Month..."
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Input
                            type="text"
                            name=""
                            id=""
                            placeholder="Year..."
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label className="font-weight-bold" for="">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        name=""
                        id=""
                        placeholder="Last name ..."
                      />
                    </FormGroup>
                    <Label className="font-weight-bold" for="">
                      Mobile phone
                    </Label>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Input
                            type="text"
                            name=""
                            id=""
                            placeholder="Area..."
                          />
                        </FormGroup>
                      </Col>
                      <Col md="8">
                        <FormGroup>
                          <Input
                            type="text"
                            name=""
                            id=""
                            placeholder="Number..."
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="divider mb-4" />
            <Container>
              <div className="text-uppercase font-weight-bold text-primary font-size-sm pb-4">
                Location
              </div>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <Label className="font-weight-bold" for="">
                      Postal Code
                    </Label>
                    <Input
                      type="text"
                      name=""
                      id=""
                      placeholder="Postal code..."
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label className="font-weight-bold" for="">
                      Country
                    </Label>
                    <Input type="select" name="select" id="exampleSelect">
                      <option>United Kingdom</option>
                      <option>Spain</option>
                      <option>Portugal</option>
                      <option>China</option>
                      <option>Germany</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label className="font-weight-bold" for="">
                      City
                    </Label>
                    <Input type="text" name="" id="" placeholder="City..." />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label className="font-weight-bold" for="">
                  Address
                </Label>
                <Input type="textarea" name="" id="" />
              </FormGroup>
            </Container>
            <div className="divider mt-5 mb-4" />
            <Container className="d-flex align-items-center justify-content-end">
              <div className="py-4">
                <Button color="success" size="lg" className="font-weight-bold">
                  Save details
                </Button>
              </div>
            </Container>
          </TabPane>
          <TabPane tabId="2">
            <Container className="py-3">
              <div>
                <CardHeader className="d-flex align-items-center bg-transparent card-header-alt px-0 pb-4">
                  <div>
                    <h6 className="font-weight-bold font-size-xl mb-1 text-black">
                      Account
                    </h6>
                    <p className="text-black-50 mb-0">
                      Manage your account settings from the section below.
                    </p>
                  </div>
                </CardHeader>
              </div>
              <ListGroup className="mb-4">
                <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                  <div className="d-flex align-items-center mr-4">
                    <div>
                      <div className="font-weight-bold">
                        Wallets Activity Alerts
                      </div>
                      <span className="opacity-6 d-block">
                        Enable SMS alerts for any wallets activities.
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Switch
                      checked={checked1}
                      onClick={toggleCheck1}
                      className="switch-medium"
                    />
                  </div>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                  <div className="d-flex align-items-center mr-4">
                    <div>
                      <div className="font-weight-bold">
                        Require Login Pin Code
                      </div>
                      <span className="opacity-6 d-block">
                        Enable the requirement of PIN code for all login
                        attempts.
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Switch
                      checked={checked2}
                      onClick={toggleCheck2}
                      className="switch-medium"
                    />
                  </div>
                </ListGroupItem>
              </ListGroup>
              <ListGroup>
                <ListGroupItem className="d-block d-lg-flex justify-content-between align-items-center py-3">
                  <div className="d-flex align-items-center mr-0 mr-md-4">
                    <div>
                      <div className="font-weight-bold">Change Password</div>
                      <span className="opacity-6 d-block">
                        You can change the password for your account using this
                        dialog window.
                      </span>
                    </div>
                  </div>
                  <div className="d-block d-md-flex mt-3 mt-lg-0 align-items-center">
                    <Button size="sm" color="warning" className="text-nowrap">
                      Change Password
                    </Button>
                  </div>
                </ListGroupItem>
                <ListGroupItem className="d-block d-lg-flex justify-content-between align-items-center py-3">
                  <div className="d-flex align-items-center mr-0 mr-md-4">
                    <div>
                      <div className="font-weight-bold d-flex align-items-center">
                        Two-Factor Authentication
                        <Badge color="success" className="text-uppercase ml-2">
                          Enabled
                        </Badge>
                      </div>
                      <span className="opacity-6 d-block">
                        Enable the requirement of PIN code for all login
                        attempts.
                      </span>
                    </div>
                  </div>
                  <div className="d-block d-md-flex mt-3 mt-lg-0 align-items-center">
                    <Button size="sm" active color="primary">
                      Disabled
                    </Button>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Container>
            <div className="divider my-4" />
            <Container>
              <div>
                <CardHeader className="d-flex align-items-center bg-transparent card-header-alt px-0 pb-4">
                  <div>
                    <h6 className="font-weight-bold font-size-xl mb-1 text-black">
                      All Logs
                    </h6>
                    <p className="text-black-50 mb-0">
                      See your sign in activity logs below.
                    </p>
                  </div>
                </CardHeader>
                <Table
                  bordered
                  responsive
                  size="sm"
                  className="text-nowrap mb-4"
                >
                  <thead className="thead-light text-capitalize font-size-sm font-weight-bold">
                    <tr>
                      <th className="text-left px-4">Browser</th>
                      <th className="text-left px-4">IP Address</th>
                      <th className="text-left px-4">Location</th>
                      <th className="text-left px-4">Date/Time</th>
                      <th className="text-center" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4">Chrome on Linux</td>
                      <td className="text-left px-4">192.168.0.1</td>
                      <td className="text-left px-4">San Francisco, USA</td>
                      <td className="text-left px-4">
                        19 Feb, 2020 | 11:22 PM
                      </td>
                      <td className="text-center">
                        <Button
                          color="neutral-danger"
                          className="mx-1 shadow-none d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                        >
                          <FontAwesomeIcon
                            icon={["fas", "times"]}
                            className="font-size-sm"
                          />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4">Chrome on UbuntuOS</td>
                      <td className="text-left px-4">192.168.0.1</td>
                      <td className="text-left px-4">Madrid, Spain</td>
                      <td className="text-left px-4">
                        23 Feb, 2020 | 07:35 AM
                      </td>
                      <td className="text-center">
                        <Button
                          color="neutral-danger"
                          className="mx-1 shadow-none d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                        >
                          <FontAwesomeIcon
                            icon={["fas", "times"]}
                            className="font-size-sm"
                          />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4">Edge on Windows</td>
                      <td className="text-left px-4">192.168.0.1</td>
                      <td className="text-left px-4">Bucharest, Romania</td>
                      <td className="text-left px-4">
                        25 Feb, 2020 | 08:49 AM
                      </td>
                      <td className="text-center">
                        <Button
                          color="neutral-danger"
                          className="mx-1 shadow-none d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                        >
                          <FontAwesomeIcon
                            icon={["fas", "times"]}
                            className="font-size-sm"
                          />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Container>
          </TabPane>
          <TabPane tabId="3">
            <Container className="py-3">
              <div>
                <CardHeader className="d-flex align-items-center bg-transparent card-header-alt px-0 pb-4">
                  <div>
                    <h6 className="font-weight-bold font-size-xl mb-1 text-black">
                      Connect to social accounts
                    </h6>
                    <p className="text-black-50 mb-0">
                      You can connect your social accounts for faster logins.
                    </p>
                  </div>
                </CardHeader>

                <div className="font-weight-bold opacity-7 mb-3">Connected</div>
                <ListGroup className="mb-5">
                  <ListGroupItem className="d-block d-lg-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center mr-4">
                      <Button
                        tag="a"
                        className="d-50 d-flex shadow-none p-0 align-items-center justify-content-center rounded-pill mr-3 font-size-lg border-0"
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        color="facebook"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "facebook"]}
                          className="font-size-xl"
                        />
                      </Button>
                      <div>
                        <div className="d-block">
                          <div className="font-weight-bold">
                            <b>Facebook</b> account connected
                          </div>
                          <div className="opacity-7">
                            You can revoke access with one click.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-block d-md-flex mt-3 mt-lg-0 align-items-center">
                      <Button
                        color="danger"
                        className="text-nowrap shadow-none font-weight-bold font-size-lg"
                      >
                        Revoke Access
                      </Button>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem className="d-block d-lg-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center mr-4">
                      <Button
                        tag="a"
                        className="d-50 d-flex shadow-none p-0 align-items-center justify-content-center rounded-pill mr-3 font-size-lg border-0"
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        color="twitter"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "twitter"]}
                          className="font-size-xl"
                        />
                      </Button>
                      <div>
                        <div className="d-block">
                          <div className="font-weight-bold">
                            <b>Twitter</b> account connected
                          </div>
                          <div className="opacity-7">
                            You can revoke access with one click.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-block d-md-flex mt-3 mt-lg-0 align-items-center">
                      <Button
                        color="danger"
                        className="text-nowrap shadow-none font-weight-bold font-size-lg"
                      >
                        Revoke Access
                      </Button>
                    </div>
                  </ListGroupItem>
                </ListGroup>
                <div className="font-weight-bold opacity-7 mb-3">
                  More Options
                </div>
                <ListGroup className="mb-4">
                  <ListGroupItem className="d-block d-lg-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center mr-4">
                      <Button
                        tag="a"
                        className="d-50 d-flex shadow-none p-0 align-items-center justify-content-center rounded-pill mr-3 font-size-lg border-0"
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        color="google"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "google"]}
                          className="font-size-xl"
                        />
                      </Button>
                      <div>
                        <div className="d-block">
                          <div className="font-weight-bold">
                            <b>Google</b> account is not yet connected.
                          </div>
                          <div className="opacity-7">
                            Click the Connect button to get started.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-block d-md-flex mt-3 mt-lg-0 align-items-center">
                      <Button
                        color="light"
                        className="shadow-none font-weight-bold font-size-lg"
                      >
                        Connect
                      </Button>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Container>
            <div className="divider my-4" />
            <Container>
              <CardHeader className="d-flex align-items-center bg-transparent card-header-alt px-0 pb-2">
                <div>
                  <h6 className="font-weight-bold font-size-xl mb-1 text-black">
                    Import Contacts
                  </h6>
                  <p className="text-black-50 mb-0">
                    You can import your existing contacts from your favourite
                    email providers.
                  </p>
                </div>
              </CardHeader>
              <div className="py-4">
                <div className="d-flex justify-content-start">
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="mr-4 mb-4 btn-input-select"
                  >
                    <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill shadow-none btn-google">
                      <FontAwesomeIcon icon={["fab", "google"]} />
                    </div>
                    <div className="font-weight-bold font-size-lg mt-2">
                      Google
                    </div>
                    <div className="opacity-6">Click to import</div>
                  </a>
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="mr-4 mb-4 btn-input-select"
                  >
                    <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill shadow-none btn-twitter">
                      <FontAwesomeIcon icon={["fab", "twitter"]} />
                    </div>
                    <div className="font-weight-bold font-size-lg mt-2">
                      Twitter
                    </div>
                    <div className="opacity-6">Click to import</div>
                  </a>
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="mr-4 mb-4 btn-input-select"
                  >
                    <div className="d-40 text-white d-flex align-items-center justify-content-center rounded-pill shadow-none btn-facebook">
                      <FontAwesomeIcon icon={["fab", "facebook"]} />
                    </div>
                    <div className="font-weight-bold font-size-lg mt-2">
                      Facebook
                    </div>
                    <div className="opacity-6">Click to import</div>
                  </a>
                </div>
              </div>
            </Container>
          </TabPane>
        </TabContent>
      </Card>
    </>
  );
}
