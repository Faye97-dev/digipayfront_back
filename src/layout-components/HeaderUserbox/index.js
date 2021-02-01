import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  ListGroup,
  ListGroupItem,
  UncontrolledTooltip,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";
import avatar7 from "../../assets/images/avatars/av6.png";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../../actions/auth";
const HeaderUserbox = (props) => {
  return (
    <>
      <UncontrolledDropdown className="position-relative ml-2">
        <DropdownToggle
          color="link"
          className="p-0 text-left d-flex btn-transition-none align-items-center"
        >
          <div className="d-block p-0 avatar-icon-wrapper">
            <Badge color="success" className="badge-circle p-top-a">
              En ligne
            </Badge>
            <div className="avatar-icon rounded">
              <img src={avatar7} alt="..." />
            </div>
          </div>
          <div className="d-none d-xl-block pl-2">
            <div className="font-weight-bold">
              {props.user && props.user.first_name + " " + props.user.last_name}
            </div>
            <span className="text-black-50">
              {props.user && props.user.role}
            </span>
          </div>
          <span className="pl-1 pl-xl-3">
            <FontAwesomeIcon
              icon={["fas", "angle-down"]}
              className="opacity-5"
            />
          </span>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg overflow-hidden p-0">
          <ListGroup flush className="text-left bg-transparent">
            <ListGroupItem className="rounded-top">
              <Nav pills className="nav-neutral-primary flex-column">
                <NavItem>
                  {/*<NavLinkStrap href="/#" tag={NavLink} to="/PageProfile">*/}
                  <NavLinkStrap href="/#" onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={["far", "user"]}
                      className="font-size-xxl text-primary"
                    />
                    <span className="px-2">Mon Profil</span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      props.logout();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={["fas", "sign-out-alt"]}
                      className="font-size-xxl text-danger"
                    />
                    <span className="px-2">Se Deconnecter</span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </ListGroupItem>
            <ListGroupItem className="bg-transparent p-0">
              <div className="grid-menu grid-menu-2col">
                <div className="py-3">
                  <div className="d-flex justify-content-center">
                    <div className="d-flex align-items-center">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "chart-bar"]}
                          className="font-size-xxl text-primary"
                        />
                      </div>
                      <div className="pl-3 line-height-sm">
                        <b className="font-size-lg">
                          {props.user && props.user.agence.solde} MRU
                        </b>
                        <span className="text-black-50 d-block">Revenue</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(HeaderUserbox);
