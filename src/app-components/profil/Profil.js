import React, { useState } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  Card,
  Container,
  Badge,
  Nav,
  NavItem,
  Button,
  TabPane,
  TabContent,
} from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";
import { useDropzone } from "react-dropzone";
import hero1 from "../../assets/images/hero-bg/hero-8.jpg";
import stock3 from "../../assets/images/stock-photos/stock-6.jpg";

import stock1 from "../../assets/images/stock-photos/stock-4.jpg";
import stock2 from "../../assets/images/stock-photos/stock-5.jpg";

import { Upload, Check, X, User } from "react-feather";
import { useEffect } from "react";
import avatar3 from "../../assets/images/avatars/avatar3.jpg";
import avatar6 from "../../assets/images/avatars/avatar6.jpg";
import avatar7 from "../../assets/images/avatars/avatar7.jpg";
import { connect } from "react-redux";
import ProfilStatistique from "./ProfilStatistique";
import ProfilSettings from "./ProfilSettings";
import FormProfilVendor from "./FormProfilVendor";
import FormProfilClient from "./FormProfilClient";
import {
  VENDOR,
  CLIENT,
  AGENT_COMPENSATION,
  RESPONSABLE_AGENCE,
  EMPLOYE_AGENCE,
} from "../../utils/choices";
import FormProfilEmploye from "./FormProfilEmploye";
import FormAgence from "./FormAgence";
import FormProfilResponsable from "./FormProfilResponsable";
import FormProfilAgent from "./FormProfilAgent";
import UpdatePassword from "./UpdatePassword";
function Profil(props) {
  //const [inputBg, setInputBg] = useState(false);
  //const toggleInputBg = () => setInputBg(!inputBg);

  /*const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };*/

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
                            disabled
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
                          ---{" "}
                          <span className="font-size-sm text-white-50">
                            Transactions
                          </span>
                        </div>
                        <div className="mr-2">
                          ---{" "}
                          <span className="font-size-sm text-white-50">
                            Notifications
                          </span>
                        </div>
                        <div className="mr-2">
                          ---{" "}
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
                            Paramètres{" "}
                            {/*<FontAwesomeIcon icon={["fas", "cog"]} />*/}
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
                <ProfilStatistique />
              </TabPane>
              <TabPane tabId="2">
                <Card className="bg-white ">
                  {props.role?.value === VENDOR && <FormProfilVendor />}
                  {props.role?.value === CLIENT && <FormProfilClient />}
                  {props.role?.value === EMPLOYE_AGENCE && (
                    <FormProfilEmploye />
                  )}
                  {props.role?.value === RESPONSABLE_AGENCE && (
                    <FormProfilResponsable />
                  )}
                  {props.role?.value === AGENT_COMPENSATION && (
                    <FormProfilAgent />
                  )}
                </Card>

                <Card className="my-4 bg-white">
                  <UpdatePassword />
                </Card>

                <Card className="my-4 bg-white">
                  {(props.role?.value === EMPLOYE_AGENCE ||
                    props.role?.value === RESPONSABLE_AGENCE) && <FormAgence />}
                </Card>
              </TabPane>
              <TabPane tabId="3">
                <ProfilSettings />
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
  role: state.auth.role,
});
export default connect(mapStateToProps, {})(Profil);
