import React, { useState } from "react";

import clsx from "clsx";

import { Collapse, Badge } from "reactstrap";

import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import { setSidebarToggleMobile } from "../../reducers/ThemeOptions";

import SidebarUserbox from "../SidebarUserbox";

import {
  Gift,
  Users,
  Award,
  Grid,
  ChevronRight,
  Shield,
  Briefcase,
  Settings,
  Activity,
  Crop,
  Heart,
  Box,
  PieChart,
  BookOpen,
  Sliders,
  MapPin,
  ExternalLink,
  Send,
  User,
  CreditCard,
  Repeat,
  BarChart,
  DollarSign,
  Phone,
  MessageCircle,
  PhoneCall,
  File,
} from "react-feather";

import { Row, Col, Button, Modal } from "reactstrap";

//import stock1 from "../../assets/images/stock-photos/stock-5.jpg";
import svgImage1 from "../../assets/images/illustrations/pack1/wireframe.svg";

const SidebarMenu = (props) => {
  const { setSidebarToggleMobile, sidebarUserbox } = props;

  const toggleSidebarMobile = () => setSidebarToggleMobile(false);

  /*const [dashboardOpen, setDashboardOpen] = useState(false);
  const toggleDashboard = (event) => {
    setDashboardOpen(!dashboardOpen);
    event.preventDefault();
  };

  const [elementsOpen, setElementsOpen] = useState(false);
  const toggleElements = (event) => {
    setElementsOpen(!elementsOpen);
    event.preventDefault();
  };

  const [pagesOpen, setPagesOpen] = useState(false);
  const togglePages = (event) => {
    setPagesOpen(!pagesOpen);
    event.preventDefault();
  };

  const [otherPagesOpen, setOtherPagesOpen] = useState(false);
  const toggleOtherPages = (event) => {
    setOtherPagesOpen(!otherPagesOpen);
    event.preventDefault();
  };*/

  /*const [designSystemOpen, setDesignSystemOpen] = useState(false);
  const toggleDesignSystem = (event) => {
    setDesignSystemOpen(!designSystemOpen);
    event.preventDefault();
  };

  const [blocksOpen, setBlocksOpen] = useState(false);
  const toggleBlocks = (event) => {
    setBlocksOpen(!blocksOpen);
    event.preventDefault();
  };

  const [levelsOpen, setLevelsOpen] = useState(false);
  const toggleLevels = (event) => {
    setLevelsOpen(!levelsOpen);
    event.preventDefault();
  };

  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const toggleWidgets = (event) => {
    setWidgetsOpen(!widgetsOpen);
    event.preventDefault();
  };

  const [chartsOpen, setChartsOpen] = useState(false);
  const toggleCharts = (event) => {
    setChartsOpen(!chartsOpen);
    event.preventDefault();
  };

  const [uiKitComponentsOpen, setUiKitComponents] = useState(false);
  const toggleUiKitComponents = (event) => {
    setUiKitComponents(!uiKitComponentsOpen);
    event.preventDefault();
  };

  const [formsComponentsOpen, setFormsComponents] = useState(false);
  const toggleFormsComponents = (event) => {
    setFormsComponents(!formsComponentsOpen);
    event.preventDefault();
  };

  const [collapsedLayoutOpen, setCollapsedLayoutOpen] = useState(false);
  const toggleCollapsedLayout = (event) => {
    setCollapsedLayoutOpen(!collapsedLayoutOpen);
    event.preventDefault();
  };

  const [pagesLoginOpen, setPagesLoginOpen] = useState(false);
  const togglePagesLogin = (event) => {
    setPagesLoginOpen(!pagesLoginOpen);
    event.preventDefault();
  };

  const [pagesRegisterOpen, setPagesRegisterOpen] = useState(false);
  const togglePagesRegister = (event) => {
    setPagesRegisterOpen(!pagesRegisterOpen);
    event.preventDefault();
  };

  const [pagesRecoverOpen, setPagesRecoverOpen] = useState(false);
  const togglePagesRecover = (event) => {
    setPagesRecoverOpen(!pagesRecoverOpen);
    event.preventDefault();
  };*/

  /* sysAdmin */
  const [transactionOpen, setTransactionOpen] = useState(false);
  const toggleTransaction = (event) => {
    setTransactionOpen(!transactionOpen);
    event.preventDefault();
  };

  const [utilisateurOpen, setUtilisateurOpen] = useState(false);
  const toggleUtilisateur = (event) => {
    setUtilisateurOpen(!utilisateurOpen);
    event.preventDefault();
  };

  const [settingOpen, setSettingOpen] = useState(false);
  const toggleSetting = (event) => {
    setSettingOpen(!settingOpen);
    event.preventDefault();
  };

  /* Modal List des agences */
  const [modalRechargeEspece, setModalRechargeEspece] = useState(false);
  const handleModal = () => setModalRechargeEspece(!modalRechargeEspece);

  const Links = [
    {
      id: 1,
      label: "Tableau de bord",
      link: "/Dashboard",
      icon: <PieChart />,
      roles: [
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
      ],
    },
    /*{
      id: 2,
      label: "Recharge",
      link: "/Recharge",
      icon: <Repeat />,
      roles: ["CLIENT"],
      children: [
        {
          label: "Recharge Especes",
          click: handleModal,
        },
        {
          label: "Recharge Banquaire",
          link: "/RechargeBanquaire",
        },
      ],
    },*/
    {
      id: 2,
      label: "Recharge",
      icon: <Repeat />,
      roles: ["CLIENT"],
      click: handleModal,
      link: "/Agence",
    },
    /*{
      id: 4,
      label: "Employes",
      link: "/Employe",
      icon: <User />,
      roles: ["SYSADMIN"],
    },*/
    {
      id: 5,
      label: "Transactions",
      link: "/Transaction",
      icon: <CreditCard />,
      roles: ["EMPLOYE_AGENCE", "RESPONSABLE_AGENCE", "CLIENT", "VENDOR"],
    },
    {
      id: 11,
      label: "Cagnottes",
      link: "/Cagnote",
      icon: <DollarSign />,
      roles: ["CLIENT"],
    },
    /*{
      id: 6,
      label: "Statistiques",
      link: "/Statistique",
      icon: <BarChart />,
      roles: [
        "SYSADMIN",
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
      ],
    },*/
    {
      id: 7,
      label: "Compensations",
      link: "/Compensation",
      icon: <DollarSign />,
      roles: ["RESPONSABLE_AGENCE", "AGENT_COMPENSATION"],
    },
    {
      id: 8,
      label: "Notifications",
      link: "/Notification",
      icon: <MessageCircle />,
      roles: [
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

    /*{
      id: 10,
      label: "Messagerie",
      link: "/Chat",
      icon: <Send />,
      roles: [
        "SYSADMIN",
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
      ],
    },*/

    /*  SysAdmin Links */

    {
      id: 17,
      label: "Tableau de bord",
      link: "/Dashboard",
      icon: <PieChart />,
      roles: ["SYSADMIN"],
    },

    {
      id: 11,
      label: "Transactions",
      icon: <CreditCard />,
      toggle: [transactionOpen, toggleTransaction],
      roles: ["SYSADMIN"],
      children: [
        {
          label: "Transactions via agence",
          link: "/Transaction/Agence",
        },
        {
          label: "Transactions directs",
          link: "/Transaction/Direct",
        },
        {
          label: "Cagnottes",
          link: "/Transaction/Cagnotte",
        },
        {
          label: "Compensations",
          link: "/Compensation",
        },
      ],
    },

    {
      id: 12,
      label: "Utilisateurs",
      icon: <Users />,
      roles: ["SYSADMIN"],
      toggle: [utilisateurOpen, toggleUtilisateur],
      children: [
        {
          label: "Agences",
          link: "/Utilisateur/Agence",
        },
        {
          label: "Commerçants",
          link: "/Utilisateur/Commerçant",
        },
        {
          label: "Clients",
          link: "/Utilisateur/Client",
        },
        {
          label: "Agents trésoriers",
          link: "/Utilisateur/Trésorier",
        },
      ],
    },

    {
      id: 15,
      label: "Administrateurs",
      icon: <Users />,
      link: "/Administrateur",
      roles: ["SYSADMIN"],
    },

    {
      id: 13,
      label: "Recharge Téléphonique",
      icon: <PhoneCall />,
      link: "/RechargeTéléphonique",
      roles: ["SYSADMIN"],
    },

    {
      id: 14,
      label: "Opérations Banquaires",
      icon: <CreditCard />,
      link: "/OpérationBanquaire",
      roles: ["SYSADMIN"],
    },

    {
      id: 18,
      label: "Notifications",
      link: "/Notification",
      icon: <MessageCircle />,
      roles: ["SYSADMIN"],
    },

    {
      id: 20,
      label: "Reporting",
      link: "/Reporting",
      icon: <File />,
      roles: ["SYSADMIN"],
    },

    {
      id: 16,
      label: "Paramètres",
      icon: <Settings />,
      roles: ["SYSADMIN"],
      toggle: [settingOpen, toggleSetting],
      children: [
        {
          label: "Paramètres générales",
          link: "/Paramètres",
        },
        {
          label: "Paramètres avancées",
          link: "/Paramètres/Avancées",
        },
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
                    onClick={item.toggle[1]}
                    className={clsx({ active: item.toggle[0] })}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-item-label">{item.label}</span>
                    <span className="sidebar-icon-indicator">
                      <ChevronRight />
                    </span>
                  </a>
                  <Collapse isOpen={item.toggle[0]}>
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
            {/* <Col xl="5" className="p-3 p-xl-0">
              <img
                alt="..."
                className="rounded br-xl-right-0 img-fit-container"
                src={svgImage1}
              />
            </Col>*/}
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
