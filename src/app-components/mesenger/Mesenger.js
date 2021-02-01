import React, { useState } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  CardBody,
  Card,
  CardHeader,
  Input,
  Badge,
  UncontrolledTooltip,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import avatar1 from "../../assets/images/avatars/av1.png";
import avatar2 from "../../assets/images/avatars/av2.png";
import avatar3 from "../../assets/images/avatars/av3.png";
import avatar4 from "../../assets/images/avatars/av4.png";
//import avatar5 from "../../assets/images/avatars/av5.png";
import avatar6 from "../../assets/images/avatars/av6.png";
import avatar7 from "../../assets/images/avatars/av5.png";

/*import people2 from "../../assets/images/stock-photos/people-3.jpg";
import people1 from "../../assets/images/stock-photos/people-2.jpg";
*/
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Mesenger() {
  //const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);
  const [isSidebarMenuOpen2, setIsSidebarMenuOpen2] = useState(false);

  //const toggleSidebarMenu = () => setIsSidebarMenuOpen(!isSidebarMenuOpen);
  const toggleSidebarMenu2 = () => setIsSidebarMenuOpen2(!isSidebarMenuOpen2);

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [inputBg, setInputBg] = useState(false);
  const toggleInputBg = () => setInputBg(!inputBg);

  return (
    <>
      <div className="app-inner-content-layout app-inner-content-layout-fixed">
        <div className="btn-md-pane d-lg-none px-4 order-0">
          <Button
            onClick={toggleSidebarMenu2}
            size="sm"
            color="primary"
            className="p-0 btn-icon d-40"
          >
            <FontAwesomeIcon icon={["fas", "bars"]} />
          </Button>
        </div>
        <div className="app-inner-content-layout--main order-3 order-lg-2 card-box bg-secondary">
          <CardHeader className="rounded-0 bg-white p-4 border-bottom">
            <div className="card-header--title">
              <small>Messenger</small>
              <b>Cheikh Abedellahi</b>
            </div>
            <div className="card-header--actions">
              <Button
                size="sm"
                color="first"
                className="btn-pill d-40 p-0"
                id="SendMessageTooltip30"
              >
                <FontAwesomeIcon icon={["fas", "plus"]} />
              </Button>
              <UncontrolledTooltip target="SendMessageTooltip30">
                Ajouter dans la conversation
              </UncontrolledTooltip>
            </div>
          </CardHeader>
          <PerfectScrollbar>
            <div className="chat-wrapper p-3">
              <div className="chat-item p-2 mb-2">
                <div className="align-box-row">
                  <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                    <div className="avatar-icon rounded-circle shadow-none">
                      <img alt="..." src={avatar7} />
                    </div>
                  </div>
                  <div>
                    <div className="chat-box bg-gray-400 text-second">
                      <p>Bonjour Moustapha.</p>
                      <p>C'est Abedellahi. Comment va tu?</p>
                      {/*<p>
                          <SkeletonTheme color="#ffff" highlightColor="#444">
                          <Skeleton width={200} duration={2} />
                          </SkeletonTheme>
                        </p>*/}
                    </div>
                    <small className="mt-2 d-block text-black-50">
                      <FontAwesomeIcon
                        icon={["far", "clock"]}
                        className="mr-1 opacity-5"
                      />
                      11:01 | Hier
                    </small>
                  </div>
                </div>
              </div>
              <div className="chat-item chat-item-reverse p-2 mb-2">
                <div className="align-box-row flex-row-reverse">
                  <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                    <div className="avatar-icon rounded-circle shadow-none">
                      <img alt="..." src={avatar1} />
                    </div>
                  </div>
                  <div>
                    <div className="chat-box bg-dark text-white">
                      <p>Bonjour, Abedellahi.</p>
                      <p>
                        Je vais bien et toi ? je t'envoie les documents tout de
                        suite .
                      </p>
                    </div>
                    <small className="mt-2 d-block text-black-50">
                      <FontAwesomeIcon
                        icon={["far", "clock"]}
                        className="mr-1 opacity-5"
                      />
                      11:02 AM | Hier
                    </small>
                  </div>
                </div>
              </div>
              <div className="chat-item p-2 mb-2">
                <div className="align-box-row">
                  <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                    <div className="avatar-icon rounded-circle shadow-none">
                      <img alt="..." src={avatar7} />
                    </div>
                  </div>
                  <div>
                    <div className="chat-box bg-gray-400 text-second">
                      <p>je me porte bien aussi.</p>
                      <p> D'accord !</p>
                    </div>
                    <small className="mt-2 d-block text-black-50">
                      <FontAwesomeIcon
                        icon={["far", "clock"]}
                        className="mr-1 opacity-5"
                      />
                      11:02 AM | Hier
                    </small>
                  </div>
                </div>
              </div>
              <div className="chat-item p-2 mb-2">
                <div className="align-box-row">
                  <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                    <div className="avatar-icon rounded-circle shadow-none">
                      <img alt="..." src={avatar7} />
                    </div>
                  </div>
                  <div>
                    <div className="chat-box bg-gray-400 text-second">
                      <p>
                        je viens de les recevoir sur mail Merci ! <br /> Ok a la
                        prochaine et Bonne journee.
                      </p>
                    </div>
                    <small className="mt-2 d-block text-black-50">
                      <FontAwesomeIcon
                        icon={["far", "clock"]}
                        className="mr-1 opacity-5"
                      />
                      11:05 AM | Hier
                    </small>
                  </div>
                </div>
              </div>
              <div className="chat-item chat-item-reverse p-2 mb-2">
                <div className="align-box-row flex-row-reverse">
                  <div className="avatar-icon-wrapper avatar-icon-lg align-self-start">
                    <div className="avatar-icon rounded-circle shadow-none">
                      <img alt="..." src={avatar1} />
                    </div>
                  </div>
                  <div>
                    <div className="chat-box bg-dark text-white">
                      <p>Au revoir Abdellahi , a toi aussi de meme </p>
                    </div>
                    <small className="mt-2 d-block text-black-50">
                      <FontAwesomeIcon
                        icon={["far", "clock"]}
                        className="mr-1 opacity-5"
                      />
                      11:05 AM | Hier
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </PerfectScrollbar>
          <div className="bg-white">
            <div className="card-footer p-0">
              {/* <div className="d-block d-md-flex text-center text-md-left transition-base align-items-center justify-content-between py-3 px-4">
                  <div>
                    <Button
                      size="sm"
                      color="neutral-primary"
                      className={clsx("d-inline-flex mr-2 btn-pill px-3 py-1", {
                        active: activeTab === "1",
                      })}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      <span className="btn-wrapper--label font-size-xs text-uppercase">
                        Create Post
                      </span>
                    </Button>
                    <Button
                      size="sm"
                      color="neutral-primary"
                      className={clsx("d-inline-flex btn-pill px-3 py-1", {
                        active: activeTab === "3",
                      })}
                      onClick={() => {
                        toggle("3");
                      }}
                    >
                      <span className="btn-wrapper--label font-size-xs text-uppercase">
                        Event
                      </span>
                    </Button>
                  </div>
                  <div className="text-black-50 pt-3 pt-md-0 font-size-sm">
                    Posting as <b className="text-black">Emma Taylor</b>
                    </div>
                </div>
                */}

              <div
                className={clsx(
                  "d-flex align-items-center transition-base px-4 py-3",
                  { "bg-secondary": inputBg }
                )}
              >
                <div className="avatar-icon-wrapper avatar-initials avatar-icon-lg mr-3">
                  <div className="avatar-icon bg-neutral-dark text-black">
                    MK
                  </div>
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
                    { "pl-4": inputBg }
                  )}
                  bsSize="lg"
                  placeholder="Envoyer un message ..."
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "app-inner-content-layout--sidebar bg-white app-inner-content-layout--sidebar__xl order-1",
            { "layout-sidebar-open": isSidebarMenuOpen2 }
          )}
        >
          <div className="text-uppercase font-size-sm text-primary font-weight-bold my-3 px-3">
            Contacts
          </div>
          <PerfectScrollbar>
            <Nav className="nav-neutral-first flex-column">
              <NavItem>
                <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                  <div className="align-box-row">
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <Badge color="success" className="badge-circle">
                        En ligne
                      </Badge>
                      <div className="avatar-icon rounded-circle">
                        <img alt="..." src={avatar7} />
                      </div>
                    </div>
                    <div className="pl-2">
                      <span className="d-block text-black font-size-sm font-weight-bold">
                        Cheikh Abedellahi
                        <div className="d-block text-black-50 font-size-xs font-weight-normal">
                          2 mins
                        </div>
                      </span>
                    </div>
                  </div>
                </NavLinkStrap>
              </NavItem>
              <NavItem>
                <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                  <div className="align-box-row">
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <Badge color="danger" className="badge-circle">
                        Hors ligne
                      </Badge>
                      <div className="avatar-icon rounded-circle">
                        <img alt="..." src={avatar2} />
                      </div>
                    </div>
                    <div className="pl-2">
                      <span className="d-block text-black font-size-sm font-weight-bold">
                        Moussa Ba
                        <div className="d-block text-black-50 font-size-xs font-weight-normal">
                          3 heures
                        </div>
                      </span>
                    </div>
                  </div>
                </NavLinkStrap>
              </NavItem>
              <NavItem>
                <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                  <div className="align-box-row">
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <Badge color="success" className="badge-circle">
                        En ligne
                      </Badge>
                      <div className="avatar-icon rounded-circle">
                        <img alt="..." src={avatar3} />
                      </div>
                    </div>
                    <div className="pl-2">
                      <span className="d-block text-black font-size-sm font-weight-bold">
                        Ahmed ali
                        <div className="d-block text-black-50 font-size-xs font-weight-normal">
                          5 heures
                        </div>
                      </span>
                    </div>
                  </div>
                </NavLinkStrap>
              </NavItem>
              <NavItem>
                <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                  <div className="align-box-row">
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <Badge color="warning" className="badge-circle">
                        Idle
                      </Badge>
                      <div className="avatar-icon rounded-circle">
                        <img alt="..." src={avatar4} />
                      </div>
                    </div>
                    <div className="pl-2">
                      <span className="d-block text-black font-size-sm font-weight-bold">
                        Brahim Jeid
                        <div className="d-block text-black-50 font-size-xs font-weight-normal">
                          1 jour
                        </div>
                      </span>
                    </div>
                  </div>
                </NavLinkStrap>
              </NavItem>
            </Nav>
          </PerfectScrollbar>
          <div className="app-content--sidebar__footer text-center p-3 d-block">
            <Button color="neutral-danger" size="sm">
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={["far", "trash-alt"]} />
              </span>
              <span className="btn-wrapper--label">
                Effacer une conversation
              </span>
            </Button>
          </div>
        </div>

        <div
          onClick={toggleSidebarMenu2}
          className={clsx("sidebar-inner-layout-overlay", {
            active: isSidebarMenuOpen2,
          })}
        />
      </div>
    </>
  );
}
