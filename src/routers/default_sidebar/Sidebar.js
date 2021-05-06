import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { setSidebarToggleMobile } from "../../reducers/ThemeOptions";
import PerfectScrollbar from "react-perfect-scrollbar";
import { SidebarHeader } from "../../layout-components";

const Sidebar = (props) => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };

  const {
    sidebarStyle,
    sidebarShadow,
    sidebarToggleMobile,
    setSidebarToggleMobile,
  } = props;
  return (
    <>
      <div
        className={clsx("app-sidebar", sidebarStyle, {
          "app-sidebar--shadow": sidebarShadow,
        })}
      >
        <SidebarHeader />
        <div className="app-sidebar--content">
          <SidebarMenu {...props} />
        </div>
      </div>
      <div
        onClick={toggleSidebarMobile}
        className={clsx("app-sidebar-overlay", {
          "is-active": sidebarToggleMobile,
        })}
      />
    </>
  );
};

const SidebarMenu = (props) => {
  return (
    <>
      <PerfectScrollbar>
        <div className="sidebar-navigation"></div>
      </PerfectScrollbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarShadow: state.ThemeOptions.sidebarShadow,
  sidebarFooter: state.ThemeOptions.sidebarFooter,
  sidebarStyle: state.ThemeOptions.sidebarStyle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,
  role: state.auth.role.value,
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
