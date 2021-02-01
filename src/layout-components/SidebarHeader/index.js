import React from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UncontrolledTooltip } from "reactstrap";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  setSidebarToggle,
  setSidebarToggleMobile,
} from "../../reducers/ThemeOptions";

import projectLogo from "../../assets/images/digi.ico";

const SidebarHeader = (props) => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const {
    sidebarToggleMobile,
    setSidebarToggleMobile,

    sidebarToggle,
    setSidebarToggle,
  } = props;

  return (
    <>
      <div className="app-sidebar--header">
        <div className="app-sidebar-logo">
          <NavLink to="/Dashboard" title="DigiPay" className="app-sidebar-logo">
            <div className="app-sidebar-logo--icon">
              <img alt="DigiPay" src={projectLogo} />
            </div>
            <div className="app-sidebar-logo--text text-white pt-2">
              <h5>digiPay</h5>
              <b></b>
            </div>
          </NavLink>
        </div>
        <button
          onClick={toggleSidebar}
          className="btn btn-sm collapse-sidebar-btn"
          id="CollapseSidebarTooltip"
        >
          <FontAwesomeIcon icon={["fas", "angle-double-left"]} size="lg" />
        </button>
        <UncontrolledTooltip
          target="CollapseSidebarTooltip"
          container=".app-sidebar"
          placement="right"
        >
          Reduire le menu
        </UncontrolledTooltip>
        <button
          className={clsx(
            "navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn",
            { "is-active": sidebarToggleMobile }
          )}
          onClick={toggleSidebarMobile}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
        <button
          onClick={toggleSidebar}
          className="expand-sidebar-btn btn btn-sm"
          id="ExpandSidebarTooltip"
        >
          <FontAwesomeIcon icon={["fas", "arrows-alt-h"]} />
        </button>
        <UncontrolledTooltip
          target="ExpandSidebarTooltip"
          container=".app-sidebar"
          placement="right"
        >
          Etendre le menu
        </UncontrolledTooltip>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggle: (enable) => dispatch(setSidebarToggle(enable)),
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeader);
