import React, { useState } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Table,
  Col,
  Card,
  CustomInput,
  Input,
  Badge,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";
import Select from "react-select";
import RcPagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import {
  Settings,
  Filter,
  Trash,
  Save,
  ArrowDownCircle,
  ArrowUpCircle,
  Circle,
} from "react-feather";

import { CardBody, UncontrolledTooltip, Progress } from "reactstrap";

export default function TransactionsVendor() {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  const statusOptions = [
    { value: "any", label: "All statuses" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "rejected", label: "Rejected" },
    { value: "processing", label: "Processing" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <>
      <Card className="card-box shadow-none">
        <div className="px-4 pt-4 text-primary">
          <h5 className="font-weight-normal text-dark">
            Historique de transactions
          </h5>
        </div>
        <div className="d-flex justify-content-between px-4 py-3">
          <div
            className={clsx(
              "search-wrapper search-wrapper--alternate search-wrapper--grow",
              { "is-active": searchOpen }
            )}
          >
            <span className="icon-wrapper text-black">
              <FontAwesomeIcon icon={["fas", "search"]} />
            </span>
            <Input
              type="search"
              onFocus={openSearch}
              onBlur={closeSearch}
              placeholder="Search orders..."
            />
          </div>
          <div className="d-flex align-items-center">
            <UncontrolledDropdown>
              <DropdownToggle
                outline
                color="primary"
                className="d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill"
              >
                <Filter className="w-50" />
              </DropdownToggle>
              <DropdownMenu right className="dropdown-menu-xxl p-0">
                <div className="p-3">
                  <Row>
                    <Col md="12">
                      <small className="font-weight-bold pb-2 text-uppercase text-primary d-block">
                        Status
                      </small>
                      <Select
                        placeholder="Select..."
                        options={statusOptions}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: "0.29rem",
                          borderWidth: 1,
                          colors: {
                            ...theme.colors,
                            primary25: "rgba(60,68,177,0.15)",
                            primary50: "rgba(60,68,177,0.15)",
                            primary: "#3c44b1",
                          },
                        })}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="divider" />
                <DropdownItem>
                  <div className="p-3 text-center bg-secondary">
                    {/* <Button color="primary" size="sm">*/}
                    Filter results
                    {/*</Button> */}
                  </div>
                </DropdownItem>

                <div className="divider" />
                <div className="p-3">
                  <Row>
                    <Col md="6">
                      <DropdownItem>
                        <Nav className="nav-neutral-danger flex-column p-0">
                          <NavItem>
                            <NavLinkStrap
                              className="d-flex rounded-sm justify-content-center"
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                            >
                              <div className="nav-link-icon">
                                <Trash />
                              </div>
                              <span>Cancel</span>
                            </NavLinkStrap>
                          </NavItem>
                        </Nav>
                      </DropdownItem>
                    </Col>

                    <Col md="6">
                      <DropdownItem>
                        <Nav className="nav-neutral-success flex-column p-0">
                          <NavItem>
                            <NavLinkStrap
                              className="d-flex rounded-sm justify-content-center"
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                            >
                              <div className="nav-link-icon">
                                <Save />
                              </div>
                              <span>Save filter</span>
                            </NavLinkStrap>
                          </NavItem>
                        </Nav>
                      </DropdownItem>
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown>
              <DropdownToggle
                outline
                color="primary"
                className="d-flex align-items-center justify-content-center d-40 p-0 rounded-pill"
              >
                <Settings className="w-50" />
              </DropdownToggle>
              <DropdownMenu
                right
                className="dropdown-menu-lg overflow-hidden p-0"
              >
                <div className="font-weight-bold px-4 pt-3">Results</div>
                <Nav className="nav-neutral-first nav-pills-rounded flex-column p-2">
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <Circle />
                      </div>
                      <span className="font-size-md">
                        <b>10</b> results per page
                      </span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <Circle />
                      </div>
                      <span className="font-size-md">
                        <b>20</b> results per page
                      </span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <Circle />
                      </div>
                      <span className="font-size-md">
                        <b>30</b> results per page
                      </span>
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
                <div className="divider" />
                <div className="font-weight-bold px-4 pt-4">Order</div>
                <Nav className="nav-neutral-first nav-pills-rounded flex-column p-2">
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <ArrowUpCircle />
                      </div>
                      <span className="font-size-md">Ascending</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      <div className="nav-link-icon mr-2">
                        <ArrowDownCircle />
                      </div>
                      <span className="font-size-md">Descending</span>
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <div className="divider" />
        <div className="p-4">
          <CardBody>
            <div className="table-responsive">
              <Table hover borderless className="text-nowrap mb-0">
                <thead>
                  <tr>
                    <th
                      className="text-center font-size-lg font-weight-normal   text-dark"
                      scope="col"
                    >
                      Numero
                    </th>

                    <th
                      className="text-center font-size-lg font-weight-normal   text-dark"
                      scope="col"
                    >
                      Client
                    </th>

                    <th
                      className="text-center text-center text-center font-size-lg font-weight-normal   text-dark"
                      scope="col"
                    >
                      Montant
                    </th>
                    <th
                      className=" text-center font-size-lg font-weight-normal   text-dark"
                      scope="col"
                    >
                      Date
                    </th>
                    <th
                      className="text-center font-size-lg font-weight-normal   text-dark"
                      scope="col"
                    >
                      Type
                    </th>
                    <th
                      className="text-center font-size-lg font-weight-normal   text-dark"
                      scope="col"
                    >
                      Status
                    </th>
                    <th
                      className="text-center font-size-lg font-weight-normal   text-dark"
                      scope="col"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center text-black-30">
                      <span className="font-weight-bold"> 1604423704</span>
                    </td>

                    <td className="text-center">
                      <div>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black-30"
                          title="..."
                        >
                          Mohamed Mohamed
                        </a>
                        <span className="text-black-50 d-block">46461429</span>
                      </div>
                    </td>

                    <td className="font-size-lg font-weight-bold text-center">
                      <span>2.495</span>
                      <small className="px-2">MRU</small>
                    </td>

                    <td className="text-center text-black-30">
                      <span className="font-weight-bold">15-01-2020 12:10</span>
                    </td>

                    <td className="text-center">
                      <Badge
                        className="px-4 py-1 h-auto text-success border-1 border-success"
                        color="neutral-success"
                      >
                        PAIEMENT
                      </Badge>
                    </td>
                    <td className="text-center">
                      <Badge
                        className="px-4 py-1 h-auto text-success border-1 border-success"
                        color="neutral-success"
                      >
                        VALIDE
                      </Badge>
                    </td>
                    <td className="text-center">
                      <Button
                        color="primary"
                        className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                      >
                        <FontAwesomeIcon
                          icon={["fas", "eye"]}
                          className="font-size-sm"
                        />
                      </Button>
                    </td>
                  </tr>
                  <tr className="divider"></tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </div>
        <div className="d-flex align-items-center justify-content-center pt-3 mb-5">
          <RcPagination
            defaultPageSize={5}
            defaultCurrent={1}
            total={10}
            locale={localeInfo}
          />
        </div>
      </Card>
    </>
  );
}
