import React, { useState } from "react";

import { connect } from "react-redux";

import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  UncontrolledPopover,
  Badge,
  CardBody,
  Card,
  Button,
  Progress,
} from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";

import avatar1 from "../../assets/images/avatars/avatar1.jpg";
import avatar2 from "../../assets/images/avatars/avatar2.jpg";
import avatar6 from "../../assets/images/avatars/avatar6.jpg";
import avatar7 from "../../assets/images/avatars/avatar7.jpg";
import people1 from "../../assets/images/stock-photos/people-1.jpg";
import people3 from "../../assets/images/stock-photos/people-3.jpg";

import { Grid, Users, Bell } from "react-feather";

import Chart from "react-apexcharts";
import PerfectScrollbar from "react-perfect-scrollbar";

import Switch from "rc-switch";
import { updateStatusAgence } from "../../actions/agence";
import { showAlert } from "../../utils/alerts";
import { ClipLoader } from "react-spinners";
import { NavLink } from "react-router-dom";
function Toggle(props) {
  //const [checked, setChecked] = useState(true);

  const toggle = () => {
    //setChecked(!props.checked);
    props.updateStatusAgence(!props.checked, showAlert);
  };
  return (
    <>
      <Switch
        checked={props.checked}
        onClick={toggle}
        className="switch-small toggle-switch-line toggle-switch-success"
      />
      <span className="px-4">{props.checked ? "En ligne" : "Hors Ligne"}</span>
    </>
  );
}
const HeaderDots = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const chartHeaderDotsOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      stacked: true,
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
      },
    },
    stroke: {
      show: false,
      width: 0,
      colors: ["transparent"],
    },
    colors: ["#7a7b97", "rgba(122, 123, 151, 0.15)"],
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
    },
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Last week",
      "Last month",
      "Last year",
      "Last quarter",
    ],
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    yaxis: {
      min: 0,
    },
  };
  const chartHeaderDotsData = [
    {
      name: "Net Profit",
      data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 4.0, 3.8, 5.1, 3.6, 3.2],
    },
    {
      name: "Net Loss",
      data: [2.1, 2.1, 3.0, 2.8, 4.0, 3.8, 5.1, 3.6, 4.1, 2.6, 1.2],
    },
  ];
  const menuDemo = (
    <>
      <span className="d-inline-block pr-2">
        <Button
          id="settingsPopover"
          color="neutral-danger"
          className="bg-neutral-danger text-danger font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded position-relative"
        >
          <span>
            <Badge color="danger" className="badge-circle badge-header-alt">
              Online
            </Badge>
            <Grid />
          </span>
        </Button>
        <UncontrolledPopover
          target="settingsPopover"
          trigger="legacy"
          className="popover-custom-wrapper popover-custom-lg"
          placement="auto"
        >
          <ul className="list-group list-group-flush text-left bg-transparent">
            <li className="list-group-item rounded-top">
              <div className="align-box-row">
                <div className="avatar-icon-wrapper avatar-icon-md">
                  <div className="avatar-icon rounded-circle">
                    <img alt="..." src={avatar7} />
                  </div>
                </div>
                <div className="pl-2">
                  <span className="font-weight-bold d-block">Emma Taylor</span>
                  <small className="pb-0 text-black-50 d-block">
                    This is an accountant profile
                  </small>
                </div>
              </div>
            </li>
            <li className="list-group-item bg-transparent py-2">
              <div className="align-box-row mb-1">
                <div>
                  <small className="font-weight-bold">Profile completion</small>
                </div>
              </div>
              <Progress
                className="progress-bar-rounded progress-bar-sm progress-animated-alt"
                color="success"
                value="43"
              >
                43%
              </Progress>
              <div className="align-box-row progress-bar--label mt-1 text-muted">
                <small className="text-dark">0</small>
                <small className="ml-auto">100%</small>
              </div>
            </li>
          </ul>
          <div className="card-footer bg-white p-3 text-center d-block">
            <Button size="sm" color="dark" className="mr-1">
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={["far", "keyboard"]} />
              </span>
              <span className="btn-wrapper--label">Tasks</span>
            </Button>
            <Button
              size="sm"
              outline
              color="danger"
              className="ml-1"
              title="Sign out"
            >
              <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
            </Button>
          </div>
        </UncontrolledPopover>
      </span>
      <span className="d-inline-block pr-2">
        <Button
          id="dotsMenuPopover"
          color="neutral-first"
          className="bg-neutral-first text-first font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded btn-transition-none"
        >
          <span>
            <Users />
          </span>
        </Button>
        <UncontrolledPopover
          target="dotsMenuPopover"
          trigger="legacy"
          popperClassName="popover-second shadow-lg"
          placement="auto"
          className="popover-custom-wrapper popover-custom-lg"
        >
          <div className="px-3 pt-3 pb-2 text-center">
            <div className="m-3 d-inline-block text-center">
              <Button
                tag="a"
                color="link"
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="p-0 bg-ripe-malin d-inline-block btn-icon text-center text-white d-50 rounded border-0 mb-2"
              >
                <FontAwesomeIcon
                  icon={["far", "gem"]}
                  className="font-size-xl"
                />
              </Button>
              <div className="d-block text-white-50">Tasks</div>
            </div>
            <div className="m-3 d-inline-block text-center">
              <Button
                tag="a"
                color="link"
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="p-0 bg-grow-early d-inline-block btn-icon text-center text-white d-50 rounded border-0 mb-2"
              >
                <FontAwesomeIcon
                  icon={["far", "building"]}
                  className="font-size-xl"
                />
              </Button>
              <div className="d-block text-white-50">Reports</div>
            </div>
            <div className="m-3 d-inline-block text-center">
              <Button
                tag="a"
                color="link"
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="p-0 bg-arielle-smile d-inline-block btn-icon text-center text-white d-50 rounded border-0 mb-2"
              >
                <FontAwesomeIcon
                  icon={["far", "chart-bar"]}
                  className="font-size-xl"
                />
              </Button>
              <div className="d-block text-white-50">Stats</div>
            </div>
          </div>
          <div className="divider opacity-2 bg-white mb-1" />
          <div className="text-center">
            <Button
              tag="a"
              href="#/"
              onClick={(e) => e.preventDefault()}
              color="link"
              className="btn-link-light text-white"
            >
              View more items
            </Button>
          </div>
        </UncontrolledPopover>
      </span>
    </>
  );

  const fetchData = [
    {
      id: 1,
      from: "42158976",
      date: "13-11-2020 16:59",
      style: "warning",
      type: "RETRAIT",
      msg:
        "Vous avez envoye 500.0 pour le client dont le numero est : 42158976",
    },
    {
      id: 2,
      from: "2015786",
      date: "12-11-2020 12:59",
      style: "primary",
      type: "TRANSFERT",
      msg:
        "Vous avez retire 6200.0 pour le client dont le numero est : 2015786",
    },
    {
      id: 3,
      from: "20171400",
      date: "28-10-2020 10:21",
      style: "warning",
      type: "RETRAIT",
      msg:
        "Vous avez envoye 250.0 pour le client dont le numero est : 20171400",
    },
  ];
  const popover = (
    <>
      <div className="bg-composed-wrapper bg-primary mx-3 mt-3 border-0 text-center rounded-sm">
        <div className="bg-composed-img-3 bg-composed-wrapper--image" />
        <div className="bg-composed-wrapper--content text-white px-2 py-4">
          <h4 className="font-size-xl font-weight-bold mb-2">Notifications</h4>
          <p className=" mb-0">
            You have <b className="text-success">4</b> new messages
          </p>
        </div>
      </div>
      <div className="tabs-animated tabs-animated-shadow tabs-bordered">
        <div className="scroll-area scroll-area-sm shadow-overflow">
          <PerfectScrollbar
            options={{
              wheelPropagation: false,
            }}
          >
            {fetchData.map((item) => {
              return (
                <Card className="card-box mb-3 mx-3" key={item.id}>
                  <div className={`card-indicator bg-${item.style}`} />
                  <CardBody className="px-4 py-2">
                    <div className="d-none d-sm-block">
                      <div className="pb-2 d-flex justify-content-between">
                        <a
                          href="#/"
                          className="font-size-xl text-black"
                          onClick={(e) => e.preventDefault()}
                        >
                          {item.from}
                        </a>
                        <div className="ml-auto font-size-sm text-primary px-2">
                          <FontAwesomeIcon
                            icon={["far", "clock"]}
                            className="mr-1"
                          />
                          {item.date}
                        </div>
                      </div>
                    </div>
                    <div className="d-sm-none d-block ">
                      <a
                        href="#/"
                        className="font-size-xl text-black pb-2"
                        onClick={(e) => e.preventDefault()}
                      >
                        {item.from}
                      </a>
                      <div className="font-size-sm text-primary pb-2">
                        <FontAwesomeIcon
                          icon={["far", "clock"]}
                          className="mr-1"
                        />
                        {item.date}
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-start text-justify">
                      <Badge color={item.style} className="px-3 mx-2">
                        {item.type}
                      </Badge>
                      {/*item.msg*/}
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </PerfectScrollbar>
        </div>
      </div>
      <div className="text-center py-3">
        <Button
          color="primary"
          className="px-4"
          tag={NavLink}
          to="/Notification"
        >
          <span className="btn-wrapper--label">Voir plus</span>
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={["fas", "arrow-right"]} />
          </span>
        </Button>
      </div>
    </>
  );
  const notif = (
    <>
      <span className="d-inline-block pr-2">
        <Button
          id="alertsPopover"
          color="neutral-primary"
          className="bg-neutral-primary text-primary font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded position-relative"
        >
          <span>
            <Badge color="success" className="badge-circle">
              New notifications
            </Badge>
            <Bell />
          </span>
        </Button>
        <UncontrolledPopover
          target="alertsPopover"
          trigger="legacy"
          className="d-sm-none d-block popover-custom-wrapper popover-custom-sm"
          placement="auto"
        >
          {popover}
        </UncontrolledPopover>
        <UncontrolledPopover
          target="alertsPopover"
          trigger="legacy"
          className="d-none d-sm-block popover-custom-wrapper popover-custom-md"
          placement="auto"
        >
          {popover}
        </UncontrolledPopover>
      </span>
    </>
  );

  let OnlineToggle = <></>;
  if (props.role === "RESPONSABLE_AGENCE") {
    OnlineToggle = props.auth.agenceStatus_isLoading ? (
      <span className="px-3">
        <ClipLoader color={"var(--primary)"} loading={true} />
      </span>
    ) : (
      <Toggle
        checked={props.auth.user && props.auth.user.agence.online}
        updateStatusAgence={props.updateStatusAgence}
      />
    );
  }
  return (
    <>
      <div className="d-flex align-items-center popover-header-wrapper">
        {/*notif*/}
        {OnlineToggle}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.role.value,
  auth: state.auth,
});

export default connect(mapStateToProps, { updateStatusAgence })(HeaderDots);
