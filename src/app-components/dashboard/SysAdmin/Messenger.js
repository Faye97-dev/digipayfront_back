import React, { useState } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CardBody,
  Col,
  Row,
  Card,
  CardHeader,
  Input,
  Badge,
  UncontrolledTooltip,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import PerfectScrollbar from "react-perfect-scrollbar";
import avatar3 from "../../../assets/images/avatars/avatar3.jpg";
import avatar7 from "../../../assets/images/avatars/avatar7.jpg";

import people2 from "../../../assets/images/stock-photos/people-2.jpg";
import people1 from "../../../assets/images/stock-photos/people-1.jpg";

import Chart from "react-apexcharts";

import avatar1 from "../../../assets/images/avatars/avatar1.jpg";
import avatar2 from "../../../assets/images/avatars/avatar2.jpg";
import avatar4 from "../../../assets/images/avatars/avatar4.jpg";
import avatar5 from "../../../assets/images/avatars/avatar5.jpg";
export default function Messenger() {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [inputBg, setInputBg] = useState(false);
  const toggleInputBg = () => setInputBg(!inputBg);

  const chartListsLarge1Options = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
      },
    },
    stroke: {
      color: "#4191ff",
      curve: "smooth",
      width: 2,
    },
    colors: ["#4191ff"],
    fill: {
      color: "#4191ff",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.7,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    yaxis: {
      min: 0,
    },
  };
  const chartListsLarge1Data = [
    {
      name: "Sales",
      data: [32, 52, 45, 32, 54, 56, 28, 25, 36, 62],
    },
  ];
  return (
    <>
      <Row>
        <Col md="12" xl="6">
          <Card className="card-box mb-md-5">
            <div className="card-header-alt px-4 pt-4 pb-2">
              <h6 className="font-weight-bold font-size-lg mb-1 text-black">
                Weekly Sales
              </h6>
              <p className="text-black-50 mb-0">
                Reports for what we sold this week.
              </p>
            </div>
            <div>
              <Chart
                options={chartListsLarge1Options}
                series={chartListsLarge1Data}
                type="area"
                height={160}
              />
            </div>
            <div
              className="scroll-area shadow-overflow"
              style={{ height: "400px" }}
            >
              <PerfectScrollbar options={{ wheelPropagation: false }}>
                <ListGroup flush>
                  <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-2">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar2} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Shanelle Wynn
                        </a>
                        <span className="text-black-50 d-block">
                          UI Engineer, Apple Inc.
                        </span>
                      </div>
                    </div>
                    <Button size="sm" color="neutral-dark" className="ml-4">
                      View
                    </Button>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-2">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar3} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Akeem Griffith
                        </a>
                        <span className="text-black-50 d-block">
                          Manager, Google Inc.
                        </span>
                      </div>
                    </div>
                    <Button size="sm" color="neutral-dark" className="ml-4">
                      View
                    </Button>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-2">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar4} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Abigayle Hicks
                        </a>
                        <span className="text-black-50 d-block">
                          Project Manager, Spotify
                        </span>
                      </div>
                    </div>
                    <Button size="sm" color="neutral-dark" className="ml-4">
                      View
                    </Button>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-2">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar1} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Reece Corbett
                        </a>
                        <span className="text-black-50 d-block">
                          Senior Designer, Amazon Inc.
                        </span>
                      </div>
                    </div>
                    <div>
                      <Button size="sm" color="neutral-dark" className="ml-4">
                        View
                      </Button>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-2">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar5} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Reece Corbett
                        </a>
                        <span className="text-black-50 d-block">
                          Senior Designer, Amazon Inc.
                        </span>
                      </div>
                    </div>
                    <Button size="sm" color="neutral-dark" className="ml-4">
                      View
                    </Button>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-2">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar2} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Shanelle Wynn
                        </a>
                        <span className="text-black-50 d-block">
                          UI Engineer, Apple Inc.
                        </span>
                      </div>
                    </div>
                    <Button size="sm" color="neutral-dark" className="ml-4">
                      View
                    </Button>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-2">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar3} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Akeem Griffith
                        </a>
                        <span className="text-black-50 d-block">
                          Manager, Google Inc.
                        </span>
                      </div>
                    </div>
                    <Button size="sm" color="neutral-dark" className="ml-4">
                      View
                    </Button>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-icon-wrapper mr-2">
                        <div className="avatar-icon">
                          <img alt="..." src={avatar4} />
                        </div>
                      </div>
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Abigayle Hicks
                        </a>
                        <span className="text-black-50 d-block">
                          Project Manager, Spotify
                        </span>
                      </div>
                    </div>
                    <Button size="sm" color="neutral-dark" className="ml-4">
                      View
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </PerfectScrollbar>
            </div>
            <div className="card-footer p-3 text-center">
              <Button size="sm" color="primary">
                <span className="btn-wrapper--label">View all employees</span>
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={["fas", "arrow-right"]} />
                </span>
              </Button>
            </div>
          </Card>
        </Col>
        <Col md="12" xl="6">
          <Card className="card-box ">
            <CardHeader>
              <div className="card-header--title">
                <small>Messenger</small>
                <b>Talking to Kate</b>
              </div>
              <div className="card-header--actions">
                <Button
                  color="neutral-first"
                  className="btn-pill p-0 d-40 btn-icon btn-animated-icon"
                  id="SendMessageTooltip2"
                >
                  <span>
                    <FontAwesomeIcon
                      icon={["fas", "plus"]}
                      className="font-size-sm"
                    />
                  </span>
                </Button>
                <UncontrolledTooltip target="SendMessageTooltip2">
                  Send new message
                </UncontrolledTooltip>
              </div>
            </CardHeader>
            <CardBody>
              <div
                className="scroll-area-lg shadow-overflow"
                style={{ height: "435px" }}
              >
                <PerfectScrollbar>
                  <div className="chat-wrapper">
                    <div className="chat-item p-2 mb-2">
                      <div className="align-box-row">
                        <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                          <div className="avatar-icon rounded border-0">
                            <img alt="..." src={avatar7} />
                          </div>
                        </div>
                        <div>
                          <div className="chat-box bg-first text-white">
                            <p>Hello, John.</p>
                            <p>This is Kenny. How are you?</p>
                          </div>
                          <small className="mt-2 d-block text-black-50">
                            <FontAwesomeIcon
                              icon={["far", "clock"]}
                              className="mr-1 opacity-5"
                            />
                            11:01 AM | Yesterday
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="chat-item chat-item-reverse p-2 mb-2">
                      <div className="align-box-row flex-row-reverse">
                        <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                          <div className="avatar-icon rounded border-0">
                            <img alt="..." src={avatar3} />
                          </div>
                        </div>
                        <div>
                          <div className="chat-box bg-first text-white">
                            <p>Hey, Kate.</p>
                            <p>
                              I'm attaching the pictures you requested below:
                            </p>
                            <Card className="mt-3 mb-2 pt-2 pb-2 text-center">
                              <div>
                                <a
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    className="img-fluid rounded m-1 shadow-sm"
                                    src={people1}
                                    width="54"
                                  />
                                </a>
                                <a
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    className="img-fluid rounded m-1 shadow-sm"
                                    src={people2}
                                    width="54"
                                  />
                                </a>
                              </div>
                            </Card>
                          </div>
                          <small className="mt-2 d-block text-black-50">
                            <FontAwesomeIcon
                              icon={["far", "clock"]}
                              className="mr-1 opacity-5"
                            />
                            11:01 AM | Yesterday
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="chat-item p-2 mb-2">
                      <div className="align-box-row">
                        <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                          <div className="avatar-icon rounded border-0">
                            <img alt="..." src={avatar7} />
                          </div>
                        </div>
                        <div>
                          <div className="chat-box bg-first text-white">
                            <p>Thanks.</p>
                            <p>Really appreciate it!</p>
                          </div>
                          <small className="mt-2 d-block text-black-50">
                            <FontAwesomeIcon
                              icon={["far", "clock"]}
                              className="mr-1 opacity-5"
                            />
                            11:01 AM | Yesterday
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="chat-item p-2 mb-2">
                      <div className="align-box-row">
                        <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                          <div className="avatar-icon rounded border-0">
                            <img alt="..." src={avatar7} />
                          </div>
                        </div>
                        <div>
                          <div className="chat-box bg-first text-white">
                            <p>Bye for now, talk to you later.</p>
                          </div>
                          <small className="mt-2 d-block text-black-50">
                            <FontAwesomeIcon
                              icon={["far", "clock"]}
                              className="mr-1 opacity-5"
                            />
                            11:01 AM | Yesterday
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="chat-item chat-item-reverse p-2 mb-2">
                      <div className="align-box-row flex-row-reverse">
                        <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                          <div className="avatar-icon rounded border-0">
                            <img alt="..." src={avatar3} />
                          </div>
                        </div>
                        <div>
                          <div className="chat-box bg-first text-white">
                            <p>Almost forgot about your tasks.</p>
                            <p>
                              <b>Check the links below:</b>
                            </p>
                            <Card className="bg-premium-dark p-1 mt-3 mb-2">
                              <div className="text-center py-2">
                                <Button
                                  color="link"
                                  className="p-0 btn-icon bg-ripe-malin d-inline-block text-center text-white font-size-xl d-40 rounded-circle border-0 m-2"
                                  id="MenuExampleTooltip111"
                                >
                                  <FontAwesomeIcon
                                    icon={["far", "gem"]}
                                    className="font-size-sm"
                                  />
                                </Button>
                                <Button
                                  color="link"
                                  className="p-0 btn-icon bg-grow-early d-inline-block text-center text-white font-size-xl d-40 rounded-circle border-0 m-2"
                                  id="MenuExampleTooltip118"
                                >
                                  <FontAwesomeIcon
                                    icon={["far", "building"]}
                                    className="font-size-sm"
                                  />
                                </Button>
                                <Button
                                  color="link"
                                  className="p-0 btn-icon bg-arielle-smile d-inline-block text-center text-white font-size-xl d-40 rounded-circle border-0 m-2"
                                  id="MenuExampleTooltip125"
                                >
                                  <FontAwesomeIcon
                                    icon={["far", "chart-bar"]}
                                    className="font-size-sm"
                                  />
                                </Button>
                                <UncontrolledTooltip target="MenuExampleTooltip111">
                                  Menu example
                                </UncontrolledTooltip>
                                <UncontrolledTooltip target="MenuExampleTooltip118">
                                  Menu Example
                                </UncontrolledTooltip>
                                <UncontrolledTooltip target="MenuExampleTooltip125">
                                  Menu Example
                                </UncontrolledTooltip>
                              </div>
                            </Card>
                          </div>
                          <small className="mt-2 d-block text-black-50">
                            <FontAwesomeIcon
                              icon={["far", "clock"]}
                              className="mr-1 opacity-5"
                            />
                            11:03 AM | Yesterday
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </PerfectScrollbar>
              </div>
            </CardBody>
            <div className="card-footer p-0">
              <div className="divider" />
              <div
                className={clsx(
                  "d-flex align-items-center transition-base px-4 py-3",
                  { "bg-secondary": inputBg }
                )}
              >
                <div className="avatar-icon-wrapper avatar-initials avatar-icon-lg mr-3">
                  <div className="avatar-icon text-white bg-second">H</div>
                  <Badge
                    color="success"
                    className="badge-position badge-position--bottom-center badge-circle"
                    title="Badge bottom center"
                  >
                    Online
                  </Badge>
                </div>
                <Input
                  onFocus={toggleInputBg}
                  onBlur={toggleInputBg}
                  className={clsx(
                    "transition-base border-0 pl-2 font-size-lg",
                    {
                      "pl-4": inputBg,
                    }
                  )}
                  bsSize="lg"
                  placeholder="Write your message here..."
                />
              </div>
              <div className="divider" />
              <div className="d-flex align-items-center justify-content-between px-4 py-3">
                <div>
                  <Button
                    size="sm"
                    color="neutral-warning"
                    className="d-inline-flex mr-2 btn-transition-none btn-pill pb-0 pt-1"
                  >
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={["far", "file-audio"]} />
                    </span>
                    <span className="btn-wrapper--label font-size-xs font-weight-bold text-uppercase">
                      Audio
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    color="neutral-first"
                    className="d-inline-flex mr-2 btn-transition-none btn-pill pb-0 pt-1"
                  >
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={["far", "file-video"]} />
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    color="neutral-danger"
                    className="d-inline-flex mr-2 btn-transition-none btn-pill pb-0 pt-1"
                  >
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={["far", "file-excel"]} />
                    </span>
                    <span className="btn-wrapper--label font-size-xs font-weight-bold text-uppercase">
                      Doc
                    </span>
                  </Button>
                </div>
                <div>
                  <Button
                    className="d-inline-flex font-weight-bold font-size-sm text-uppercase"
                    color="primary"
                  >
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={["far", "envelope"]} />
                    </span>
                    <span className="btn-wrapper--label font-size-xs font-weight-bold text-uppercase">
                      Send
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
