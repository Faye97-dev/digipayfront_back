import React, { useState } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  Card,
  CardHeader,
  Container,
  Input,
  Badge,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Button,
  Table,
} from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDropzone } from "react-dropzone";
import CountUp from "react-countup";
import hero1 from "../../assets/images/hero-bg/hero-8.jpg";
import stock3 from "../../assets/images/stock-photos/stock-6.jpg";

import stock1 from "../../assets/images/stock-photos/stock-4.jpg";
import stock2 from "../../assets/images/stock-photos/stock-5.jpg";

import { Upload, Check, X, User } from "react-feather";
import { useEffect } from "react";

import people1 from "../../assets/images/stock-photos/people-1.jpg";

import { ArrowDownRight, ArrowLeft, ArrowUpRight } from "react-feather";

import people3 from "../../assets/images/stock-photos/people-3.jpg";
import people2 from "../../assets/images/stock-photos/people-2.jpg";

import avatar1 from "../../assets/images/avatars/avatar1.jpg";
import avatar2 from "../../assets/images/avatars/avatar2.jpg";
import avatar3 from "../../assets/images/avatars/avatar3.jpg";
import avatar4 from "../../assets/images/avatars/avatar4.jpg";
import avatar5 from "../../assets/images/avatars/avatar5.jpg";
import avatar6 from "../../assets/images/avatars/avatar6.jpg";
import avatar7 from "../../assets/images/avatars/avatar7.jpg";

import Switch from "rc-switch";
import FormAgence from "./FormAgence";
export default function ProfilResponsable() {
  const [inputBg, setInputBg] = useState(false);
  const toggleInputBg = () => setInputBg(!inputBg);

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [activeTab2, setActiveTab2] = useState("1");

  const toggle2 = (tab) => {
    if (activeTab2 !== tab) setActiveTab2(tab);
  };

  const [files, setFiles] = useState([]);
  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
    getRootProps,
    getInputProps,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div
      key={file.name}
      className="rounded-circle avatar-image overflow-hidden d-140 bg-neutral-success text-center font-weight-bold text-success d-flex justify-content-center align-items-center"
    >
      <img
        className="img-fluid img-fit-container rounded-sm"
        src={file.preview}
        alt="..."
      />
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

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
      <div className="app-inner-content-layout">
        <div className="app-inner-content-layout--main p-0">
          <div className="hero-wrapper mx-5 rounded-bottom shadow-xxl bg-composed-wrapper bg-second">
            <div className="flex-grow-1 w-100 d-flex align-items-center">
              <div
                className="bg-composed-wrapper--image opacity-3"
                style={{ backgroundImage: "url(" + hero1 + ")" }}
              />
              <div className="bg-composed-wrapper--bg bg-deep-sky opacity-4" />
              <div className="bg-composed-wrapper--content px-3 pt-5">
                <Container className="pt-4">
                  <div className="d-block d-md-flex align-items-center">
                    <div className="dropzone rounded-circle shadow-sm-dark mr-md-3">
                      <div
                        {...getRootProps({
                          className: "dropzone-upload-wrapper",
                        })}
                      >
                        <input {...getInputProps()} />
                        <div className="dropzone-inner-wrapper d-140 rounded-circle dropzone-avatar">
                          <div className="avatar-icon-wrapper d-140 rounded-circle m-2">
                            <Button
                              color="link"
                              onClick={open}
                              className="avatar-button badge shadow-sm-dark btn-icon badge-position badge-position--bottom-right border-2 text-indent-0 d-40 badge-circle badge-first text-white"
                            >
                              <Upload className="d-20" />
                            </Button>

                            <div>
                              {isDragAccept && (
                                <div className="rounded-circle overflow-hidden d-140 bg-success text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                  <Check className="d-40" />
                                </div>
                              )}
                              {isDragReject && (
                                <div className="rounded-circle overflow-hidden d-140 bg-danger text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                  <X className="d-60" />
                                </div>
                              )}
                              {!isDragActive && (
                                <div className="rounded-circle overflow-hidden d-140 bg-second text-center font-weight-bold text-white-50 d-flex justify-content-center align-items-center">
                                  <User className="d-50" />
                                </div>
                              )}
                            </div>

                            {thumbs.length > 0 && <div>{thumbs}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex text-white flex-column pl-md-2">
                      <div className="d-block d-md-flex align-items-center">
                        <div className="my-3 my-md-0">
                          <div className="d-flex align-items-end">
                            <div className="font-size-xxl font-weight-bold">
                              @emmaTaylor_1ET
                            </div>
                          </div>
                          <div className="font-weight-bold mt-1 font-size-lg text-white-50">
                            Emma Taylor
                          </div>
                        </div>
                        {/* spacing */}
                        <div
                          className="d-none d-xl-block"
                          style={{ width: "15rem" }}
                        ></div>
                        <div
                          className="d-none d-lg-block"
                          style={{ width: "22rem" }}
                        ></div>
                        <div
                          className="d-block d-lg-none d-xl-none"
                          style={{ width: "12rem" }}
                        ></div>
                        <div className="ml-auto">
                          <Button
                            size="sm"
                            color="first"
                            className="mr-4  shadow-none rounded-lg text-uppercase line-height-1 font-weight-bold font-size-xs px-3 w-auto py-0 d-40"
                          >
                            Profil
                          </Button>

                          {/* <Button
                            className="btn-icon rounded-lg shadow-none hover-scale-lg d-40 p-0"
                            color="success"
                          >
                            <FontAwesomeIcon icon={["fas", "cog"]} />
                         </Button>*/}
                        </div>
                      </div>
                      <div className="d-flex font-size-xl py-4 align-items-center">
                        <div className="mr-2">
                          438{" "}
                          <span className="font-size-sm text-white-50">
                            projects
                          </span>
                        </div>
                        <div className="mr-2">
                          12,459{" "}
                          <span className="font-size-sm text-white-50">
                            messages
                          </span>
                        </div>
                        <div className="mr-2">
                          84{" "}
                          <span className="font-size-sm text-white-50">
                            issues
                          </span>
                        </div>
                      </div>
                      {/*<div className="font-size-lg">
                        This admin template is a complete frontend solution for
                        easy-building applications or presentation websites.
                        It&#39;s fully responsive and designed by professional
                        UI&#x2F;UX designers and developers.
                              </div>*/}
                    </div>
                  </div>
                  <div className="my-5 nav-tabs-success tabs-animated tabs-animated-shadow">
                    <Nav tabs className="justify-content-center">
                      <NavItem className="px-3">
                        <NavLinkStrap
                          className={clsx("bg-white-10 m-3 m-lg-0 rounded-lg", {
                            active: activeTab2 === "1",
                          })}
                          onClick={() => {
                            toggle2("1");
                          }}
                        >
                          <span className="font-size-lg text-white px-2 py-1">
                            Statistiques
                          </span>
                          <div className="divider" />
                        </NavLinkStrap>
                      </NavItem>
                      <NavItem className="px-3">
                        <NavLinkStrap
                          className={clsx("bg-white-10 m-3 m-lg-0 rounded-lg", {
                            active: activeTab2 === "2",
                          })}
                          onClick={() => {
                            toggle2("2");
                          }}
                        >
                          <span className="font-size-lg text-white px-2 py-1">
                            Informations de l'agence
                          </span>
                          <div className="divider" />
                        </NavLinkStrap>
                      </NavItem>
                      <NavItem className="px-3">
                        <NavLinkStrap
                          className={clsx("bg-white-10 m-3 m-lg-0 rounded-lg", {
                            active: activeTab2 === "3",
                          })}
                          onClick={() => {
                            toggle2("3");
                          }}
                        >
                          <span className="font-size-lg text-white px-2 py-1">
                            Parametres <FontAwesomeIcon icon={["fas", "cog"]} />
                          </span>
                          <div className="divider" />
                        </NavLinkStrap>
                      </NavItem>
                    </Nav>
                  </div>
                </Container>
              </div>
            </div>
          </div>

          <Container className="z-over py-5">
            <TabContent activeTab={activeTab2}>
              <TabPane tabId="1">
                <Row>
                  <Col lg="4">
                    <Card className="card-box mb-5 p-4">
                      <div className="card-tr-actions">
                        <Button
                          className="p-0 d-20 mr-1 btn-transition-none opacity-6"
                          color="link"
                        >
                          <FontAwesomeIcon
                            icon={["far", "heart"]}
                            className="font-size-sm"
                          />
                        </Button>
                        <Button
                          className="p-0 d-20 btn-transition-none opacity-6"
                          color="link"
                        >
                          <FontAwesomeIcon
                            icon={["fas", "user"]}
                            className="font-size-sm"
                          />
                        </Button>
                      </div>
                      <div className="d-flex align-items-center justify-content-between py-2">
                        <div className="d-50 rounded-circle border-0 my-2 card-icon-wrapper bg-second text-white btn-icon text-center">
                          <FontAwesomeIcon
                            icon={["far", "bell"]}
                            className="font-size-xl"
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="badge rounded-circle badge-success d-20 btn-icon p-0 mr-0 mr-xl-2">
                            <FontAwesomeIcon
                              icon={["fas", "check"]}
                              className="font-size-sm"
                            />
                          </div>
                          <span className="font-size-xs text-dark d-none d-xl-block">
                            Target achieved
                          </span>
                        </div>
                      </div>
                      <div className="font-size-xl font-weight-bold pt-2 text-black">
                        Recent Visitors
                      </div>
                      <div className="opacity-7">Today's analytics</div>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-box mb-5 p-4">
                      <div className="card-tr-actions">
                        <Button
                          className="p-0 d-20 mr-1 btn-transition-none opacity-6"
                          color="link"
                        >
                          <FontAwesomeIcon
                            icon={["far", "heart"]}
                            className="font-size-sm"
                          />
                        </Button>
                        <Button
                          className="p-0 d-20 btn-transition-none opacity-6"
                          color="link"
                        >
                          <FontAwesomeIcon
                            icon={["fas", "user"]}
                            className="font-size-sm"
                          />
                        </Button>
                      </div>
                      <div className="d-flex align-items-center justify-content-between py-2">
                        <div className="d-50 rounded-circle border-0 my-2 card-icon-wrapper bg-info text-white btn-icon text-center">
                          <FontAwesomeIcon
                            icon={["fas", "camera-retro"]}
                            className="font-size-xl"
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="badge rounded-circle badge-success d-20 btn-icon p-0 mr-0 mr-xl-2">
                            <FontAwesomeIcon
                              icon={["fas", "check"]}
                              className="font-size-sm"
                            />
                          </div>
                          <span className="font-size-xs text-dark d-none d-xl-block">
                            Target achieved
                          </span>
                        </div>
                      </div>
                      <div className="font-size-xl font-weight-bold pt-2 text-black">
                        Today's Revenue
                      </div>
                      <div className="opacity-7">Successful orders</div>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-box mb-5 p-4">
                      <div className="card-tr-actions">
                        <Button
                          className="p-0 d-20 mr-1 btn-transition-none opacity-6"
                          color="link"
                        >
                          <FontAwesomeIcon
                            icon={["far", "heart"]}
                            className="font-size-sm"
                          />
                        </Button>
                        <Button
                          className="p-0 d-20 btn-transition-none opacity-6"
                          color="link"
                        >
                          <FontAwesomeIcon
                            icon={["fas", "user"]}
                            className="font-size-sm"
                          />
                        </Button>
                      </div>
                      <div className="d-flex align-items-center justify-content-between py-2">
                        <div className="d-50 rounded-circle border-0 my-2 card-icon-wrapper bg-warning text-white btn-icon text-center">
                          <FontAwesomeIcon
                            icon={["far", "lightbulb"]}
                            className="font-size-xl"
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="badge rounded-circle badge-danger d-20 btn-icon p-0 mr-0 mr-xl-2">
                            <FontAwesomeIcon
                              icon={["fas", "times"]}
                              className="font-size-sm"
                            />
                          </div>
                          <span className="font-size-xs text-danger d-none d-xl-block">
                            Target failed
                          </span>
                        </div>
                      </div>
                      <div className="font-size-xl font-weight-bold pt-2 text-black">
                        New Customers
                      </div>
                      <div className="opacity-7">Latest statistics</div>
                    </Card>
                  </Col>
                </Row>
                <Card className="card-box mb-5">
                  <Row className="no-gutters">
                    <Col xl="6" className="p-4">
                      <div className="divider-v divider-v-lg" />

                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <b>Reports</b>
                          <div className="text-black-50">
                            Monthly sales reports
                          </div>
                        </div>
                        <div className="font-weight-bold text-danger font-size-xl">
                          <CountUp
                            start={0}
                            end={2.363}
                            duration={6}
                            delay={2}
                            separator=""
                            decimals={3}
                            decimal=","
                          />
                        </div>
                      </div>
                      <div className="divider my-3" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <b>User</b>
                          <div className="text-black-50">
                            Visitors last week
                          </div>
                        </div>
                        <div className="font-weight-bold text-success font-size-xl">
                          <CountUp
                            start={0}
                            end={987}
                            duration={6}
                            delay={2}
                            separator=""
                            decimals={0}
                            decimal=","
                          />
                        </div>
                      </div>
                      <div className="divider my-3" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <b>Sales</b>
                          <div className="text-black-50">
                            Total average weekly report
                          </div>
                        </div>
                        <div className="font-weight-bold text-warning font-size-xl">
                          <CountUp
                            start={0}
                            end={483}
                            duration={6}
                            delay={2}
                            separator=""
                            decimals={0}
                            decimal=","
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl="6" className="p-4">
                      <div className="divider-v divider-v-lg" />

                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <b>Stats</b>
                          <div className="text-black-50">
                            Last month targets
                          </div>
                        </div>
                        <div className="font-weight-bold text-warning font-size-xl">
                          $1,23M
                        </div>
                      </div>
                      <div className="divider my-3" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <b>Payments</b>
                          <div className="text-black-50">Week's expenses</div>
                        </div>
                        <div className="font-weight-bold text-danger font-size-xl">
                          - $123,305
                        </div>
                      </div>
                      <div className="divider my-3" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <b>Orders</b>
                          <div className="text-black-50">
                            Total products ordered
                          </div>
                        </div>
                        <div className="font-weight-bold text-warning font-size-xl">
                          65
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </TabPane>
              <TabPane tabId="2">
                <Card className="bg-white ">
                  <FormAgence />
                </Card>
                {/*<Row>
                  <Col xl="6">
                    <Card className="card-box mb-5 p-4">
                      <div className="d-flex align-items-center justify-content-between py-2">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper d-50 mr-3 avatar-initials">
                            <div className="avatar-icon rounded-circle d-50 shadow-sm font-weight-normal text-white bg-danger">
                              TS
                            </div>
                          </div>
                          <div>
                            <a
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              className="font-weight-bold"
                              title="..."
                            >
                              Shanelle Wynn
                            </a>
                            <span className="text-black-50 d-block">
                              UI Engineer, Apple Inc.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="badge rounded-circle badge-neutral-success text-success d-30 btn-icon p-0 mr-1">
                            <FontAwesomeIcon icon={["fas", "check"]} />
                          </div>
                          <span className="font-size-xs text-success">
                            Profile Verified
                          </span>
                        </div>
                      </div>
                      <div className="divider mx-auto my-3 w-100" />
                      <div className="text-center">
                        <Button
                          className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none"
                          color="primary"
                          outline
                        >
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={["far", "eye"]} />
                          </span>
                        </Button>
                        <Button
                          className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none"
                          color="primary"
                          outline
                        >
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={["far", "heart"]} />
                          </span>
                        </Button>
                        <Button
                          className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none"
                          color="primary"
                          outline
                        >
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={["fas", "user"]} />
                          </span>
                        </Button>
                      </div>
                      <div className="divider mx-auto my-3 w-100" />
                      <Row className="text-center">
                        <Col sm="4">
                          <div className="text-black-50">Projects</div>
                          <b className="font-size-lg">381</b>
                        </Col>
                        <Col sm="4">
                          <div className="text-black-50">Reviews</div>
                          <b className="font-size-lg">129</b>
                        </Col>
                        <Col sm="4">
                          <div className="text-black-50">Revenue</div>
                          <b className="font-size-lg">$691</b>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col xl="6">
                    <Card className="card-box mb-5 p-4">
                      <div className="d-flex align-items-center justify-content-between py-2">
                        <div className="d-flex align-items-center">
                          <div className="avatar-icon-wrapper d-50 mr-3">
                            <div className="avatar-icon rounded-circle d-50 shadow-sm">
                              <img alt="..." src={avatar2} />
                            </div>
                          </div>
                          <div>
                            <a
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              className="font-weight-bold"
                              title="..."
                            >
                              Richard Doyle
                            </a>
                            <span className="text-black-50 d-block">
                              Senior Consultant, Google
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="badge rounded-circle badge-neutral-warning text-warning d-30 btn-icon p-0 mr-1">
                            <FontAwesomeIcon icon={["far", "clock"]} />
                          </div>
                          <span className="font-size-xs text-warning">
                            Review Pending
                          </span>
                        </div>
                      </div>
                      <div className="divider mx-auto my-3 w-100" />
                      <div className="text-center">
                        <Button
                          className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none"
                          color="primary"
                          outline
                        >
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={["far", "eye"]} />
                          </span>
                        </Button>
                        <Button
                          className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none"
                          color="primary"
                          outline
                        >
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={["far", "heart"]} />
                          </span>
                        </Button>
                        <Button
                          className="p-0 d-30 btn-icon rounded-sm mx-1 btn-transition-none"
                          color="primary"
                          outline
                        >
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={["fas", "user"]} />
                          </span>
                        </Button>
                      </div>
                      <div className="divider mx-auto my-3 w-100" />
                      <Row className="text-center">
                        <Col sm="4">
                          <div className="text-black-50">Projects</div>
                          <b className="font-size-lg">34</b>
                        </Col>
                        <Col sm="4">
                          <div className="text-black-50">Reviews</div>
                          <b className="font-size-lg">21</b>
                        </Col>
                        <Col sm="4">
                          <div className="text-black-50">Revenue</div>
                          <b className="font-size-lg">$283</b>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>*/}
              </TabPane>
              <TabPane tabId="3">
                <Card className="bg-white p-3">
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
                            <div className="font-weight-bold">
                              Change Password
                            </div>
                            <span className="opacity-6 d-block">
                              You can change the password for your account using
                              this dialog window.
                            </span>
                          </div>
                        </div>
                        <div className="d-block d-md-flex mt-3 mt-lg-0 align-items-center">
                          <Button
                            size="sm"
                            color="warning"
                            className="text-nowrap"
                          >
                            Change Password
                          </Button>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem className="d-block d-lg-flex justify-content-between align-items-center py-3">
                        <div className="d-flex align-items-center mr-0 mr-md-4">
                          <div>
                            <div className="font-weight-bold d-flex align-items-center">
                              Two-Factor Authentication
                              <Badge
                                color="success"
                                className="text-uppercase ml-2"
                              >
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
                            <td className="text-left px-4">
                              San Francisco, USA
                            </td>
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
                            <td className="text-left px-4">
                              Bucharest, Romania
                            </td>
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
                </Card>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col lg="6">
                    <Card className="shadow-sm rounded-lg overflow-hidden mb-5">
                      <div className="card-img-wrapper rounded">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="img-wrapper-overlay p-4 p-xl-5 img-wrapper-overlay--visible rounded"
                        >
                          <div className="overlay-btn-wrapper card-body text-white text-center">
                            <h5 className="px-2 font-weight-bold display-4 mb-4">
                              Bamburgh React Admin Dashboard with Reactstrap PRO
                            </h5>
                            <p className="font-size-lg text-white-50 mb-0">
                              This admin template is a complete frontend
                              solution for easy-building applications or
                              presentation websites. It&#39;s fully responsive
                              and designed by professional UI&#x2F;UX designers
                              and developers.
                            </p>
                            <div className="mt-4">
                              <div className="avatar-icon-wrapper mx-auto mb-2">
                                <div className="avatar-icon shadow-sm-dark">
                                  <img alt="..." src={avatar6} />
                                </div>
                              </div>
                              <div>Dalia Finney</div>
                            </div>
                          </div>
                          <div className="card-badges card-badges-top">
                            <Badge pill color="danger">
                              Development
                            </Badge>
                          </div>
                        </a>
                        <img
                          src={stock1}
                          className="card-overlay-image img-fit-container rounded"
                          alt="..."
                        />
                      </div>
                    </Card>
                    <Card className="shadow-sm rounded-lg overflow-hidden mb-5">
                      <div className="card-img-wrapper rounded">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="p-4 p-lg-5 img-wrapper-overlay img-wrapper-overlay--visible shadow-none rounded"
                        >
                          <div className="overlay-btn-wrapper d-block p-3 p-lg-5 text-left text-white">
                            <h5 className="font-weight-bold display-3 mb-3">
                              Bamburgh React Admin Dashboard with Reactstrap PRO
                            </h5>
                            <p className="font-size-lg mb-3">
                              350+ custom-made, beautiful components, widgets,
                              pages, dashboards and applications.
                            </p>
                            <p className="font-size-md text-white-50">
                              This admin template is a complete frontend
                              solution for easy-building applications or
                              presentation websites. It&#39;s fully responsive
                              and designed by professional UI&#x2F;UX designers
                              and developers.
                            </p>
                            <p className="font-size-md text-white-50">
                              Browse through the live previews to see just how
                              powerful this admin template really is!
                            </p>

                            <div className="divider bg-white opacity-1 my-4" />
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <div className="avatar-icon-wrapper mr-3">
                                  <div className="avatar-icon shadow-sm-dark">
                                    <img alt="..." src={avatar3} />
                                  </div>
                                </div>
                                <div className="font-size-lg">
                                  Shanelle Wynn
                                </div>
                              </div>
                              <div className="d-flex align-items-center text-white-50">
                                <FontAwesomeIcon
                                  icon={["far", "clock"]}
                                  className="mr-2"
                                />
                                <small>5 days ago</small>
                              </div>
                            </div>
                          </div>
                          <div className="card-badges card-badges-top">
                            <Badge className="badge-pill" color="success">
                              Marketing
                            </Badge>
                          </div>
                        </a>
                        <img
                          src={stock3}
                          className="card-overlay-image img-fit-container rounded"
                          alt="..."
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col lg="6">
                    <Card className="shadow-sm rounded-lg overflow-hidden hover-scale-sm mb-5">
                      <div className="card-img-wrapper rounded">
                        <div className="img-wrapper-overlay align-items-end img-wrapper-overlay--visible p-4 p-xl-5">
                          <div className="overlay-btn-wrapper p-4 card-body text-white">
                            <h5 className="px-2 font-weight-bold display-4 mb-4">
                              Bamburgh React Admin Dashboard with Reactstrap PRO
                            </h5>
                            <p className="font-size-lg mb-0 text-white-50">
                              This admin template is a complete frontend
                              solution for easy-building applications or
                              presentation websites. It&#39;s fully responsive
                              and designed by professional UI&#x2F;UX designers
                              and developers.
                            </p>
                            <div className="mt-4">
                              <div className="avatar-icon-wrapper mx-auto mb-2">
                                <div className="avatar-icon shadow-sm-dark">
                                  <img alt="..." src={avatar7} />
                                </div>
                              </div>
                              <div>Miranda Lawson</div>
                            </div>
                          </div>
                        </div>
                        <div className="card-badges">
                          <Badge
                            pill
                            color="neutral-success"
                            className="text-success"
                          >
                            Marketing
                          </Badge>
                        </div>
                        <img
                          src={stock2}
                          className="card-overlay-image img-fit-container rounded"
                          alt="..."
                        />
                      </div>
                    </Card>
                    <Card className="shadow-sm rounded-lg overflow-hidden mb-5">
                      <div className="card-img-wrapper rounded">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="img-wrapper-overlay img-wrapper-overlay--visible shadow-none rounded"
                        >
                          <div className="overlay-btn-wrapper p-4 p-lg-5 text-left text-white">
                            <div className="d-flex align-items-center">
                              <div className="avatar-icon-wrapper mr-3">
                                <div className="avatar-icon shadow-sm-dark">
                                  <img alt="..." src={avatar3} />
                                </div>
                              </div>
                              <div>
                                <div>Shanelle Wynn</div>
                                <span className="text-white-50">
                                  UI Engineer, Apple Inc.
                                </span>
                              </div>
                            </div>

                            <div className="divider bg-white opacity-2 my-3 my-lg-5" />

                            <h5 className="font-weight-bold display-3">
                              Bamburgh React Admin Dashboard with Reactstrap PRO
                            </h5>
                            <p className="font-size-lg my-3 text-white-50">
                              Browse through the live previews to see just how
                              powerful this admin template really is!
                            </p>
                            <p className="text-light">
                              This admin template is a complete frontend
                              solution for easy-building applications or
                              presentation websites. It&#39;s fully responsive
                              and designed by professional UI&#x2F;UX designers
                              and developers.
                            </p>

                            <div className="divider bg-white opacity-2 my-3 my-lg-5" />

                            <div className="d-flex align-items-center text-white-50">
                              <FontAwesomeIcon
                                icon={["far", "clock"]}
                                className="mr-2"
                              />
                              <small>added 3 days ago</small>
                            </div>
                          </div>
                          <div className="card-badges card-badges-bottom">
                            <Badge color="first">Articles</Badge>
                          </div>
                        </a>
                        <img
                          src={stock3}
                          className="card-overlay-image img-fit-container rounded"
                          alt="..."
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Container>
        </div>
      </div>
    </>
  );
}
