import React from "react";

import { UncontrolledTooltip } from "reactstrap";

import { Bell, Activity, Calendar } from "react-feather";
import { connect } from "react-redux";
const SidebarFooter = (props) => {
  return (
    <>
      <div className="app-sidebar--footer">
        {props.role === "SYSADMIN" && (
          <ul>
            <li>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn btn-sm btn-transition-none px-2 mx-2"
                id="AnalyticsDashboardTooltip"
              >
                <Activity />
              </a>
              <UncontrolledTooltip
                target="AnalyticsDashboardTooltip"
                container=".app-sidebar--footer"
              >
                Analytics Dashboard
              </UncontrolledTooltip>
            </li>
            <li>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn btn-sm btn-transition-none px-2 mx-2"
                id="CryptoTooltip"
              >
                <Bell />
              </a>
              <UncontrolledTooltip
                target="CryptoTooltip"
                container=".app-sidebar--footer"
              >
                Crypto Components
              </UncontrolledTooltip>
            </li>
            <li>
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="btn btn-sm btn-transition-none px-2 mx-2"
                id="ButtonsPageTooltip"
              >
                <Calendar />
              </a>
              <UncontrolledTooltip
                target="ButtonsPageTooltip"
                container=".app-sidebar--footer"
              >
                Buttons
              </UncontrolledTooltip>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.role.value,
});

export default connect(mapStateToProps, {})(SidebarFooter);
