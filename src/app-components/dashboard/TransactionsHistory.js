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
} from "reactstrap";

import RcPagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/fr_FR";
import { Filter, RotateCw, ArrowUp, ArrowDown } from "react-feather";

import { connect } from "react-redux";
import { getTransactions } from "../../actions/transaction";

import {
  mapColorStatus,
  mapTypeNames,
  mapColorTypes,
} from "../../utils/choices";
import {
  filterDataProcess,
  filterToBool,
  searchToBool,
  PaginateData,
  allNull,
  allCurrentOption,
  orderingData,
  getHighlightedText,
} from "../../utils/dataTable";

import FormFilter from "../transaction/FormFilter";
import empty from "../../assets/images/empty.png";
import { showAlert } from "../../utils/alerts";

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
  ["code_transaction"],
  ["date"],
  ["transaction", "montant"],
];

class TransactionsHistory extends Component {
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

  openSearch = () => this.setState({ ...this.state, searchOpen: true });
  closeSearch = () => this.setState({ ...this.state, searchOpen: false });

  componentDidMount() {
    this.props.getTransactions(true, showAlert);
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (
      nextProps.transactions.loading === false &&
      //nextProps.transactions.payload !== this.state.data &&
      this.state.init
    ) {
      console.log(" sync transactions props with state  ...");
      this.Paginate(
        [...nextProps.transactions.payload],
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

    if (
      nextProps.transactions.loading === true &&
      this.props.transactions.loading === false
    ) {
      console.log("reset init bolean ant sync props to state ....");
      this.setState({
        ...this.state,
        init: true,
      });
    }
  }

  reset() {
    console.log("reset data ...");
    this.Paginate(
      [...this.props.transactions.payload],
      this.state.totalRowsPerPage,
      false
    );
  }

  handleSearchSubmit(e) {
    if (e.keyCode === 13) {
      const filter = [...this.props.transactions.payload].filter((item) =>
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
    const filter = [...this.props.transactions.payload].filter((item) =>
      filterToBool(item, fil, keys)
    );
    this.Paginate([...filter], this.state.totalRowsPerPage, false, { ...fil });
  }

  handleRowsPerPage(data) {
    this.Paginate(
      [...this.props.transactions.payload],
      data.rowsPerPage,
      false
    );
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
    const transactions = this.props.transactions.loading ? (
      <tr>
        <td colSpan="9">loading .....</td>
      </tr>
    ) : (
      <>
        {this.state.current.length === 0 ? (
          <tr>
            <td colSpan="9">
              <div className="d-flex align-items-center justify-content-center pt-3">
                <img style={{ width: "17%" }} src={empty} />
              </div>
              <div className="d-flex align-items-center justify-content-center pt-1">
                <span>Pas de données disponibles </span>
              </div>
            </td>
          </tr>
        ) : (
          this.state.current.map((item) => {
            return (
              <tr key={item.id}>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">
                    {getHighlightedText(
                      item.code_transaction,
                      this.state.search
                    )}
                  </span>
                </td>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">
                    {getHighlightedText(item.date, this.state.search)}
                  </span>
                </td>
                <td className="text-center">
                  <div>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black-30"
                      title="..."
                    >
                      {getHighlightedText(
                        item.transaction.agence_origine.nom,
                        this.state.search
                      )}
                    </a>
                    <span className="text-black-50 d-block">
                      {item.transaction.agence_origine.type_agence}
                    </span>
                  </div>
                </td>
                <td className="text-center">
                  <div>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black-30"
                      title="..."
                    >
                      {getHighlightedText(
                        item.transaction.agence_destination.nom,
                        this.state.search
                      )}
                    </a>
                    <span className="text-black-50 d-block">
                      {item.transaction.agence_destination.type_agence}
                    </span>
                  </div>
                </td>
                <td className="text-center">
                  <div>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black-30"
                      title="..."
                    >
                      {getHighlightedText(
                        item.transaction.destinataire.nom,
                        this.state.search
                      )}
                    </a>
                    <span className="text-black-50 d-block">
                      {getHighlightedText(
                        item.transaction.destinataire.tel,
                        this.state.search
                      )}
                    </span>
                  </div>
                </td>

                <td className="font-size-lg font-weight-bold text-center">
                  <span>
                    {getHighlightedText(
                      item.transaction.montant,
                      this.state.search
                    )}
                  </span>
                  <small className="px-2">MRU</small>
                </td>
                <td className="text-center">
                  <Badge
                    className={
                      "px-4 py-1 h-auto text-" +
                      mapColorTypes[item.type_transaction] +
                      " border-1 border-" +
                      mapColorTypes[item.type_transaction]
                    }
                    color={"neutral-" + mapColorTypes[item.type_transaction]}
                  >
                    {mapTypeNames[item.type_transaction]}
                  </Badge>
                </td>
                <td className="text-center">
                  <Badge
                    className={
                      "px-4 py-1 h-auto text-" +
                      mapColorStatus[item.transaction.status] +
                      " border-1 border-" +
                      mapColorStatus[item.transaction.status]
                    }
                    color={"neutral-" + mapColorStatus[item.transaction.status]}
                  >
                    {item.transaction.status}
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
            );
          })
        )}
      </>
    );

    return (
      <>
        <Card className="card-box shadow-none">
          <div className="px-4 pt-4 text-primary">
            <h5 className="font-weight-normal text-dark">
              Historique de transactions
            </h5>
          </div>
          <div className="d-flex justify-content-between px-4 py-3">
            {/*<div
              className={clsx(
                "search-wrapper search-wrapper--alternate search-wrapper--grow",
                { "is-active": this.state.searchOpen }
              )}
            >
              <span className="icon-wrapper text-black">
                <FontAwesomeIcon icon={["fas", "search"]} />
              </span>
              <Input
                type="search"
                onFocus={this.openSearch}
                onBlur={this.closeSearch}
                placeholder="Search transactions..."
                onKeyDown={this.handleSearchSubmit}
                value={this.state.search}
                onChange={this.handleSearchChange}
              />
              </div>
            <div className="d-flex align-items-center">
              <Button
                color="danger"
                outline
                className="d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill"
                onClick={this.reset}
              >
                <RotateCw className="w-50" />
              </Button>
              <UncontrolledDropdown>
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

                <DropdownMenu right className="dropdown-menu-xl p-0">
                  <div className="p-3">
                    <FormFilter
                      handleFilter={this.handleFilter}
                      filterValues={this.state.filterValues}
                      filtersOptions={filtersOptions}
                    />
                </div>
                </DropdownMenu>
              </UncontrolledDropdown>
              </div>
              */}
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
                      >
                        Numero
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
                        Agence d'origine
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Agence de destination
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Destinataire
                      </th>
                      <th
                        className="text-center text-center text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Montant
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
                  {/*<thead>
                    <tr>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                        onClick={() =>
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
                        onClick={() =>
                          this.handleOrdering({
                            attribute: ["type_agence"],
                            increment: this.state.orderingValues.increment,
                          })
                        }
                      >
                        Type {this.currentOrdering("type_agence")}
                      </th>
                     
                    </tr>
                  </thead>
                      */}
                  <tbody>{transactions}</tbody>
                </Table>
              </div>
            </CardBody>
          </div>
          {!this.props.transactions.loading && this.state.current.length !== 0 && (
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
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {
  getTransactions,
})(TransactionsHistory);
