import React from "react";

import clsx from "clsx";
import { Link } from "react-router-dom";

import { Nav, NavItem } from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";

import { connect } from "react-redux";

const Footer = (props) => {
  const { footerShadow, footerBgTransparent } = props;
  return (
    <>
      <div
        className={clsx("app-footer text-black-50", {
          "app-footer--shadow": footerShadow,
          "app-footer--opacity-bg": footerBgTransparent,
        })}
      >
        <div className="app-footer--first">
          {/*<Nav>
            <NavItem>
              <NavLinkStrap
                tag={Link}
                to="/DashboardAnalytics"
                className="rounded-sm"
              >
                Analytics
              </NavLinkStrap>
            </NavItem>
            <NavItem>
              <NavLinkStrap
                tag={Link}
                to="/DashboardStatistics"
                className="rounded-sm"
              >
                Statistics
              </NavLinkStrap>
            </NavItem>
            <NavItem>
              <NavLinkStrap tag={Link} to="/Overview" className="rounded-sm">
                Overview
              </NavLinkStrap>
            </NavItem>
          </Nav>*/}
        </div>
        <div className="app-footer--second pt-2">
          <span>
            Développé par
            <a
              href="https://www.digitransform.mr"
              target="_blank"
              rel="noopener noreferrer"
              title="digiTransform"
              className="pl-1"
            >
              digiTransform
            </a>
          </span>{" "}
          © 2021
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  footerShadow: state.ThemeOptions.footerShadow,
  footerBgTransparent: state.ThemeOptions.footerBgTransparent,
});

export default connect(mapStateToProps)(Footer);
