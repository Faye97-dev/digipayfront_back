//import React, { useState, useEffect } from "react";
/*  skleton loading ,  comment code , dropdwon backdrop , nombre de rows par page ,  secure search field , ordering , type of object */
import React, { Component } from "react";
import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  Card,
  Input,
  Badge,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  CardBody,
  Nav,
  NavItem,
} from "reactstrap";

import RcPagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/fr_FR";
import { Filter, RotateCw, ArrowUp, ArrowDown } from "react-feather";

import { connect } from "react-redux";
import { getAgences } from "../../../actions/agence";
import { mapColorAgence } from "../../../utils/choices";
import { showAlert } from "../../../utils/alerts";
import SkeletonLoader from "../../../utils/SkeletonLoader";
import {
  filterDataProcess,
  filterToBool,
  searchToBool,
  PaginateData,
  allNull,
  allCurrentOption,
  orderingData,
  getHighlightedText,
} from "../../../utils/dataTable";
//import PerfectScrollbar from "react-perfect-scrollbar";
//import FormFilter from "./FormFilter";
//import FormRows from "./FormRows";
import { NavLink as NavLinkStrap } from "reactstrap";
import empty from "../../../assets/images/empty.png";
import ModalDetails from "./ModalDetails";

const filtersOptions = {
  type_agence: {
    label: "Type agence",
    name: "type_agence",
    content: [
      { value: "AGENCE_INTERN", label: "AGENCE_INTERN" },
      { value: "PARTNER_SILVER", label: "PARTNER_SILVER" },
      { value: "PARTNER_GOLD", label: "PARTNER_GOLD" },
    ],
  },
  online: {
    label: "Status",
    name: "online",
    content: [
      { value: false, label: "Hors Ligne" },
      { value: true, label: "En ligne" },
    ],
  },
  commune_code: {
    label: "Commune",
    name: "commune_code",
    content: [
      { value: 1, label: "TVZ" },
      { value: 2, label: "KSAR" },
    ],
  },
};

const searchOptions = [
  ["code_agence"],
  ["adresse"],
  ["nom"],
  ["tel"],
  ["email"],
  ["commune", "commune"],
];

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      init: true,
      search: "",
      //totalPage: 1,
      totalRowsPerPage: 5,
      totalData: 0,
      page: 1,
      current: [],
      filterValues: {},
      orderingValues: {},
      searchOpen: false,
      modalInfo: false,
      currentItem: null,
    };

    this.reset = this.reset.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.Paginate = this.Paginate.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleRowsPerPage = this.handleRowsPerPage.bind(this);
    this.handleOrdering = this.handleOrdering.bind(this);
    this.currentOrdering = this.currentOrdering.bind(this);
  }

  toggleDetail = (item) =>
    this.setState({
      ...this.state,
      modalInfo: !this.state.modalInfo,
      currentItem: item,
    });

  openSearch = () => this.setState({ ...this.state, searchOpen: true });
  closeSearch = () => this.setState({ ...this.state, searchOpen: false });

  componentDidMount() {
    this.props.getAgences(showAlert);
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (
      nextProps.agences.loading === false &&
      //nextProps.agences.payload !== this.state.data &&
      this.state.init
    ) {
      console.log(" sync agences props with state  ...");
      this.Paginate(
        [...nextProps.agences.payload],
        this.state.totalRowsPerPage,
        false
      );
    }

    if (
      nextState.search === "" &&
      this.state.search !== "" &&
      (nextState.filterValues === {} || allNull(nextState.filterValues))
    ) {
      this.reset();
    }
  }

  reset() {
    console.log("reset data ...");
    this.Paginate(
      [...this.props.agences.payload],
      this.state.totalRowsPerPage,
      false
    );
  }

  handleSearchSubmit(e) {
    if (e.keyCode === 13) {
      const filter = [...this.props.agences.payload].filter((item) =>
        searchToBool(item, e.target.value, searchOptions)
      );
      this.Paginate([...filter], this.state.totalRowsPerPage, e.target.value);
    }
  }

  handleSearchChange(e) {
    this.setState({
      ...this.state,
      search: e.target.value,
    });
  }

  handleChangePage(page) {
    this.setState({
      ...this.state,
      page,
      current: [...this.state.data].filter((item) => item.page === page),
    });
  }

  Paginate(data, rows, valueSearch, filterValues = {}, orderingValues = {}) {
    const [page, paginated] = PaginateData(data, rows);
    const temp = [...paginated].filter((item) => item.page === 1);
    //const filterData = !filterValues ? {} : filterValues;

    this.setState({
      ...this.state,
      data: [...paginated],
      init: false,
      search: !valueSearch ? "" : valueSearch,
      //totalPage: page,
      //totalRowsPerPage: rows,
      totalData: paginated.length,
      page: 1,
      current: temp,
      filterValues:
        filterValues !== true
          ? allCurrentOption(filtersOptions, filterValues)
          : { ...this.state.filterValues },
      orderingValues,
    });
  }

  handleFilter(data) {
    const [fil, keys] = filterDataProcess(data);
    const filter = [...this.props.agences.payload].filter((item) =>
      filterToBool(item, fil, keys)
    );
    this.Paginate([...filter], this.state.totalRowsPerPage, false, { ...fil });
  }

  handleRowsPerPage(data) {
    this.Paginate([...this.props.agences.payload], data.rowsPerPage, false);
  }

  handleOrdering(data) {
    let { attribute, increment } = data;
    const orderedData = orderingData(
      [...this.state.data],
      attribute,
      increment
    );

    attribute =
      attribute.length === 1
        ? attribute[0]
        : attribute.length === 2
        ? attribute[1]
        : attribute;

    this.Paginate(
      [...orderedData],
      this.state.totalRowsPerPage,
      this.state.search,
      true,
      { attribute, increment: !increment }
    );
  }

  currentOrdering(attribute) {
    if (this.state.orderingValues.attribute === attribute) {
      if (this.state.orderingValues.increment) {
        return <ArrowUp className="text-success" style={{ width: "14px" }} />;
      } else if (this.state.orderingValues.increment === false) {
        return <ArrowDown className="text-danger" style={{ width: "14px" }} />;
      }
    }
    return <></>;
  }

  render() {
    const agences = this.props.agences.loading ? (
      <tr>
        <td colSpan="10">
          <SkeletonLoader />
        </td>
      </tr>
    ) : (
      <>
        {this.state.current.length === 0 ? (
          <tr>
            <td colSpan="10">
              <div className="d-flex align-items-center justify-content-center pt-3">
                <img style={{ width: "17%" }} src={empty} />
              </div>
              <div className="d-flex align-items-center justify-content-center pt-1">
                <span>Pas de données disponibles </span>
              </div>
            </td>
          </tr>
        ) : (
          this.state.current
            //.filter((item) => item.id !== this.props.user.agence.id) look for solution
            .map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    {getHighlightedText(item.code_agence, this.state.search)}
                  </td>
                  <td>{getHighlightedText(item.nom, this.state.search)}</td>
                  <td className="text-center">
                    <div>
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="font-weight-bold text-black"
                        title="..."
                      >
                        {getHighlightedText(
                          item.commune.commune,
                          this.state.search
                        )}
                      </a>
                      <span className="text-black-50 d-block">
                        {getHighlightedText(item.adresse, this.state.search)}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div>
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="font-weight-bold text-black"
                        title="..."
                      >
                        {getHighlightedText(item.tel, this.state.search)}
                      </a>
                      <span className="text-black-50 d-block">
                        {getHighlightedText(item.email, this.state.search)}
                      </span>
                    </div>
                  </td>
                  <td className="font-weight-bold text-black font-size-md text-center">
                    {item.solde}
                    <small className="px-2 font-weight-normal">MRU</small>
                  </td>
                  {/*<td className="font-weight-bold text-black font-size-md text-center">
                    {item.frais}
                    <small className="px-2 font-weight-normal">MRU</small>
                    </td>*/}
                  <td className="font-weight-bold text-black font-size-md text-center">
                    {item.dette}
                    <small className="px-2 font-weight-normal">MRU</small>
                  </td>
                  <td className="text-center">
                    <Badge
                      className={
                        "px-4 py-1 h-auto text-" +
                        mapColorAgence[item.type_agence] +
                        " border-1 border-" +
                        mapColorAgence[item.type_agence]
                      }
                      color={"neutral-" + mapColorAgence[item.type_agence]}
                    >
                      {item.type_agence}
                    </Badge>
                  </td>

                  <td className="text-center">
                    <Badge
                      className={
                        item.online
                          ? "px-4 py-1 h-auto text-success border-1 border-sucess neutral-success"
                          : "px-4 py-1 h-auto text-danger border-1 border-danger neutral-danger"
                      }
                      color={item.online ? "neutral-success" : "neutral-danger"}
                    >
                      {item.online ? "En ligne" : "Hors ligne"}
                    </Badge>
                  </td>

                  <td className="text-center">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        size="sm"
                        color="link"
                        className="btn-link-primary p-0 text-primary "
                      >
                        <FontAwesomeIcon
                          icon={["fas", "ellipsis-h"]}
                          className="font-size-lg"
                        />
                      </DropdownToggle>
                      <DropdownMenu
                        right
                        className="dropdown-menu-md overflow-hidden p-0"
                      >
                        <Nav pills className=" flex-column p-2">
                          <NavItem>
                            <NavLinkStrap
                              href="#/"
                              onClick={(e) => {
                                e.preventDefault();
                                this.toggleDetail(item);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={["fas", "eye"]}
                                className="font-size-md mr-3"
                              />
                              <span>Details</span>
                            </NavLinkStrap>
                          </NavItem>
                        </Nav>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              );
            })
        )}
      </>
    );
    return (
      <>
        <Card className="card-box shadow-none">
          <div className="px-4 pt-4 text-primary">
            <h5 className="font-weight-bold text-dark">Listes des Agences</h5>
          </div>
          <div className="d-flex justify-content-between px-4 py-3">
            <div
              className={clsx(
                "search-wrapper search-wrapper--alternate search-wrapper--grow",
                { "is-active": this.state.searchOpen }
              )}
            >
              <span className="icon-wrapper text-black">
                <FontAwesomeIcon icon={["fas", "search"]} />
              </span>
              {/*<Input
                type="search"
                onFocus={this.openSearch}
                onBlur={this.closeSearch}
                placeholder="Search orders..."
                onKeyDown={this.handleSearchSubmit}
                value={this.state.search}
                onChange={this.handleSearchChange}
                disabled={this.props.agences.loading}
              />*/}
              <Input
                type="search"
                onFocus={this.openSearch}
                onBlur={this.closeSearch}
                placeholder="Rechercher par ..."
              />
            </div>
            <div className="d-flex align-items-center">
              {/*!this.props.agences.loading && (
                <Button
                  color="danger"
                  outline
                  className="d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill"
                  onClick={this.reset}
                >
                  <RotateCw className="w-50" />
                </Button>
              )*/}

              <UncontrolledDropdown disabled={this.props.agences.loading}>
                {this.state.filterValues === {} ||
                allNull(this.state.filterValues) ? (
                  <DropdownToggle
                    outline
                    color="primary"
                    className="d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill"
                  >
                    <Filter className="w-50" />
                  </DropdownToggle>
                ) : (
                  <DropdownToggle
                    color="primary"
                    className="d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill"
                  >
                    <Filter className="w-50" />
                  </DropdownToggle>
                )}

                <DropdownMenu right className="dropdown-menu-md p-0">
                  {/*<div className="p-3">
                    <FormFilter
                      handleFilter={this.handleFilter}
                      filterValues={this.state.filterValues}
                      filtersOptions={filtersOptions}
                    />
                    </div>*/}
                  <div></div>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <div className="divider" />
          <div className="px-4 pt-3 pb-1">
            <CardBody>
              <div className="table-responsive">
                <Table hover borderless className="text-nowrap mb-0">
                  <thead>
                    <tr>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                        onClick={() =>
                          !this.props.agences.loading &&
                          this.handleOrdering({
                            attribute: ["code_agence"],
                            increment: this.state.orderingValues.increment,
                          })
                        }
                      >
                        Code agence {this.currentOrdering("code_agence")}
                      </th>
                      <th
                        className=" text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                        onClick={() =>
                          !this.props.agences.loading &&
                          this.handleOrdering({
                            attribute: ["nom"],
                            increment: this.state.orderingValues.increment,
                          })
                        }
                      >
                        Nom {this.currentOrdering("nom")}
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                        onClick={() =>
                          !this.props.agences.loading &&
                          this.handleOrdering({
                            attribute: ["commune", "commune"],
                            increment: this.state.orderingValues.increment,
                          })
                        }
                      >
                        Adresse {this.currentOrdering("commune")}
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                        onClick={() =>
                          !this.props.agences.loading &&
                          this.handleOrdering({
                            attribute: ["tel"],
                            increment: this.state.orderingValues.increment,
                          })
                        }
                      >
                        Contact {this.currentOrdering("tel")}
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Solde
                      </th>
                      {/*<th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Frais
                      </th>*/}
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Dette
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                        onClick={() =>
                          !this.props.agences.loading &&
                          this.handleOrdering({
                            attribute: ["type_agence"],
                            increment: this.state.orderingValues.increment,
                          })
                        }
                      >
                        Type {this.currentOrdering("type_agence")}
                      </th>

                      <th
                        className="text-center text-center text-center font-size-lg font-weight-normal   text-dark"
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
                  <tbody>{agences}</tbody>
                </Table>
              </div>
            </CardBody>
          </div>
          {!this.props.agences.loading && this.state.current.length !== 0 && (
            <div className="d-flex align-items-center justify-content-center mb-5">
              <RcPagination
                defaultPageSize={this.state.totalRowsPerPage}
                onChange={this.handleChangePage}
                current={this.state.page}
                total={this.state.totalData}
                locale={localeInfo}
              />
            </div>
          )}
        </Card>
        <ModalDetails
          item={this.state.currentItem}
          user={this.props.user}
          access={this.props.access}
          modal={this.state.modalInfo}
          handleModal={this.toggleDetail}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  agences: state.agence.agences,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getAgences,
})(History);
