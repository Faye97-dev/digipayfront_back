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
//import { withFormik, Field, Form } from "formik";
import { FlagIcon } from "react-flag-kit";
import { connect } from "react-redux";
function ProfilResponsable(props) {
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
                              @{props.user && props.user.username}
                            </div>
                          </div>
                          <div className="font-weight-bold mt-1 font-size-lg text-white-50">
                            {props.user &&
                              props.user.first_name +
                                " " +
                                props.user.last_name}
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
                          25{" "}
                          <span className="font-size-sm text-white-50">
                            Transactions
                          </span>
                        </div>
                        <div className="mr-2">
                          12{" "}
                          <span className="font-size-sm text-white-50">
                            Notifications
                          </span>
                        </div>
                        <div className="mr-2">
                          7{" "}
                          <span className="font-size-sm text-white-50">
                            Connexions
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
                            Informations
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
                            Paramètres <FontAwesomeIcon icon={["fas", "cog"]} />
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
                {/*<Row>
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
                </Row>*/}
                <Card className="card-box mb-5">
                  <Row className="no-gutters">
                    <Col xl="6" className="p-4">
                      <div className="divider-v divider-v-lg" />

                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <b>Paiements</b>
                          <div className="text-black-50">
                            Paiements du mois précédent
                          </div>
                        </div>
                        <div className="font-weight-bold text-danger font-size-xl">
                          <CountUp
                            start={0}
                            end={2363}
                            duration={6}
                            delay={2}
                            separator=""
                            decimals={3}
                            suffix=" MRU"
                          />
                        </div>
                      </div>
                      <div className="divider my-3" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <b>Transferts</b>
                          <div className="text-black-50">
                            Transferts du mois précédent
                          </div>
                        </div>
                        <div className="font-weight-bold text-success font-size-xl">
                          <CountUp
                            start={0}
                            end={9860}
                            duration={6}
                            delay={2}
                            separator=""
                            decimals={0}
                            suffix=" MRU"
                          />
                        </div>
                      </div>
                      <div className="divider my-3" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <b>Retraits</b>
                          <div className="text-black-50">
                            Retraits du mois précédent
                          </div>
                        </div>
                        <div className="font-weight-bold text-warning font-size-xl">
                          <CountUp
                            start={0}
                            end={4830}
                            duration={6}
                            delay={2}
                            separator=""
                            decimals={0}
                            suffix=" MRU"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl="6" className="p-4">
                      <div className="divider-v divider-v-lg" />

                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <b>Achats credit</b>
                          <div className="text-black-50">
                            Achats credit du mois précédent
                          </div>
                        </div>
                        <div className="font-weight-bold text-warning font-size-xl">
                          1523.0 MRU
                        </div>
                      </div>
                      <div className="divider my-3" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <b>Dettes</b>
                          <div className="text-black-50">
                            Dettes du mois précédent
                          </div>
                        </div>
                        <div className="font-weight-bold text-danger font-size-xl">
                          -1230 MRU
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
                            Compte
                          </h6>
                          <p className="text-black-50 mb-0">
                            Gérez les paramètres de votre compte dans la section
                            ci-dessous.
                          </p>
                        </div>
                      </CardHeader>
                    </div>
                    <ListGroup className="mb-4">
                      <ListGroupItem>
                        <div className="font-weight-bold">
                          Choix de la langue
                        </div>
                        <div
                          className="pt-3"
                          role="group"
                          aria-labelledby="my-radio-group"
                        >
                          <label>
                            <input type="radio" name="card_type" value="fr" />
                            Français
                            <span className="px-2">
                              <FlagIcon code="FR" size={35} />
                            </span>
                          </label>
                          <label className="pl-sm-3 px-0">
                            <input type="radio" name="card_type" value="ar" />
                            Arabe
                            <span className="px-2">
                              <FlagIcon code="MR" size={35} />
                            </span>
                          </label>
                          <label className="pl-sm-3 px-0">
                            <input type="radio" name="card_type" value="ch" />
                            Chinois
                            <span className="px-2">
                              <FlagIcon code="CN" size={35} />
                            </span>
                          </label>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                        <div className="d-flex align-items-center mr-4">
                          <div>
                            <div className="font-weight-bold">
                              Activer les sms
                            </div>
                            <span className="opacity-6 d-block">
                              Vous permet de recevoir des notifications par sms
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
                              Activer la connexion avec code PIN
                            </div>
                            <span className="opacity-6 d-block">
                              Pour plus de sécurité ajouter cette étape de
                              validation
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
                              Changement Password
                            </div>
                            <span className="opacity-6 d-block">
                              Choisissez un nouveau mot de passe
                            </span>
                          </div>
                        </div>
                        <div className="d-block d-md-flex mt-3 mt-lg-0 align-items-center">
                          <Button
                            size="sm"
                            color="warning"
                            className="text-nowrap"
                          >
                            Modifier
                          </Button>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem className="d-block d-lg-flex justify-content-between align-items-center py-3">
                        <div className="d-flex align-items-center mr-0 mr-md-4">
                          <div>
                            <div className="font-weight-bold d-flex align-items-center">
                              Authentification à deux facteurs
                              <Badge
                                color="success"
                                className="text-uppercase ml-2"
                              >
                                Activé
                              </Badge>
                            </div>
                            <span className="opacity-6 d-block">
                              Activer l'usage du code pour pouvoir utiliser
                              cette fonctionnalité
                            </span>
                          </div>
                        </div>
                        <div className="d-block d-md-flex mt-3 mt-lg-0 align-items-center">
                          <Button size="sm" active color="primary">
                            Desactivé
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
                            Vos logs :
                          </h6>
                          <p className="text-black-50 mb-0">
                            Vos dernières connexions
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
                            <th className="text-left px-4">Navigateur</th>
                            <th className="text-left px-4">Adresse IP</th>
                            <th className="text-left px-4">Localisation</th>
                            <th className="text-left px-4">Date</th>
                            <th className="text-center" />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4">Chrome dans windows 8</td>
                            <td className="text-left px-4">192.168.0.1</td>
                            <td className="text-left px-4">Tvz, Nouakchott</td>
                            <td className="text-left px-4">
                              19 Fev, 2021 | 11:22
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
                            <td className="px-4">Chrome dans Samsung A20s</td>
                            <td className="text-left px-4">194.167.25.1</td>
                            <td className="text-left px-4">
                              Ksar, Nouackchott
                            </td>
                            <td className="text-left px-4">
                              30 Jan, 2021 | 07:35
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
                            <td className="px-4">
                              Firefox dans Macbook Pro 2015
                            </td>
                            <td className="text-left px-4">245.120.058.1</td>
                            <td className="text-left px-4">Tvz, Nouackchott</td>
                            <td className="text-left px-4">
                              15 Jan, 2021 | 14:49
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(ProfilResponsable);
