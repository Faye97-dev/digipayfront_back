import React, { useState } from "react";

import clsx from "clsx";

import { Collapse, Badge } from "reactstrap";

import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import { setSidebarToggleMobile } from "../../reducers/ThemeOptions";

import SidebarUserbox from "../../layout-components/SidebarUserbox";

import {
  ChevronRight,
  PieChart,
  MapPin,
  User,
  CreditCard,
  Repeat,
  DollarSign,
  Phone,
  MessageCircle,
  Users,
} from "react-feather";

import { Row, Col, Button, Modal } from "reactstrap";

const SidebarMenu = (props) => {
  const { setSidebarToggleMobile, sidebarUserbox } = props;

  const toggleSidebarMobile = () => setSidebarToggleMobile(false);

  const [applicationOpen, setApplicationOpen] = useState(false);
  const toggleApplication = (event) => {
    setApplicationOpen(!applicationOpen);
    event.preventDefault();
  };

  const [modalRechargeEspece, setModalRechargeEspece] = useState(false);
  const handleModal = () => setModalRechargeEspece(!modalRechargeEspece);

  const Links = [
    {
      id: 1,
      label: "Tableau de bord",
      link: "/Dashboard",
      icon: <PieChart />,
      roles: [
        "SYSADMIN",
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
      ],
    },

    {
      id: 2,
      label: "Recharge",
      icon: <Repeat />,
      roles: ["CLIENT"],
      click: handleModal,
      link: "/Agence",
    },
    {
      id: 4,
      label: "Employes",
      link: "/Employe",
      icon: <User />,
      roles: ["SYSADMIN"],
    },
    {
      id: 5,
      label: "Transactions",
      link: "/Transaction",
      icon: <CreditCard />,
      roles: [
        "SYSADMIN",
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",

        "CLIENT",
        "VENDOR",
      ],
    },
    {
      id: 11,
      label: "Cagnottes",
      link: "/Cagnote",
      icon: <DollarSign />,
      roles: ["CLIENT"],
    },

    {
      id: 12,
      label: "Paiement de masse",
      link: "/PaiementMasse",
      icon: <Users />,
      roles: ["CLIENT"],
    },

    {
      id: 7,
      label: "Compensations",
      link: "/Compensation",
      icon: <DollarSign />,
      roles: ["SYSADMIN", "RESPONSABLE_AGENCE", "AGENT_COMPENSATION"],
    },
    {
      id: 8,
      label: "Notifications",
      link: "/Notification",
      icon: <MessageCircle />,
      roles: [
        "SYSADMIN",
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
      ],
    },
    {
      id: 3,
      label: "Agences",
      link: "/Agence",
      icon: <MapPin />,
      roles: [
        "SYSADMIN",
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
      ],
    },
    {
      id: 9,
      label: "Contacts",
      link: "/Contact",
      icon: <Phone />,
      roles: [
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
      ],
    },
  ];

  const Menu = (
    <>
      <div className="sidebar-header">
        <span>Navigation Menu</span>
      </div>
      {Links.filter((item) => item.roles.includes(props.role)).map(
        (item, index) => {
          if (!item.children) {
            if (item.link && !item.click) {
              return (
                <ul key={item.id}>
                  <li>
                    <NavLink
                      activeClassName="active"
                      onClick={toggleSidebarMobile}
                      className="nav-link-simple"
                      to={item.link}
                    >
                      <span className="sidebar-icon">{item.icon}</span>
                      {item.label}
                      <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                        <ChevronRight />
                      </span>
                    </NavLink>
                  </li>
                </ul>
              );
            }
            if (item.link && item.click) {
              return (
                <ul key={item.id}>
                  <li>
                    <NavLink
                      onClick={item.click}
                      to={item.link}
                      activeClassName="active"
                      className="nav-link-simple"
                    >
                      <span className="sidebar-icon">{item.icon}</span>
                      {item.label}
                      <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                        <ChevronRight />
                      </span>
                    </NavLink>
                  </li>
                </ul>
              );
            }
          } else {
            return (
              <ul key={item.id}>
                <li>
                  <a
                    href="#/"
                    onClick={toggleApplication}
                    className={clsx({ active: applicationOpen })}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-item-label">{item.label}</span>
                    <span className="sidebar-icon-indicator">
                      <ChevronRight />
                    </span>
                  </a>
                  <Collapse isOpen={applicationOpen}>
                    <ul>
                      {item.children.map((child, key) => {
                        if (child.link) {
                          return (
                            <li key={key}>
                              <NavLink
                                onClick={toggleSidebarMobile}
                                to={child.link}
                              >
                                {child.label}
                              </NavLink>
                            </li>
                          );
                        } else {
                          return (
                            <li key={key}>
                              <NavLink onClick={child.click} to="#">
                                {child.label}
                              </NavLink>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </Collapse>
                </li>
              </ul>
            );
          }
        }
      )}
    </>
  );
  return (
    <>
      <PerfectScrollbar>
        {sidebarUserbox && <SidebarUserbox />}
        <div className="sidebar-navigation">{Menu}</div>
        <Modal
          zIndex={2000}
          centered
          size="md"
          isOpen={modalRechargeEspece}
          toggle={handleModal}
          contentClassName="border-0"
        >
          <Row className="no-gutters">
            <Col xl="12">
              <div className="bg-white rounded br-xl-left-0">
                <div className="p-5">
                  <p className="font-size-lg text-black text-center">
                    Merci de vous rendre auprès de l'une de nos agences
                    partenaires.
                  </p>

                  <NavLink
                    className="btn btn-primary btn-block"
                    onClick={handleModal}
                    to="/Agence"
                  >
                    Consulter la liste
                  </NavLink>
                </div>
              </div>
            </Col>
          </Row>
        </Modal>
      </PerfectScrollbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  role: state.auth.role.value,
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
