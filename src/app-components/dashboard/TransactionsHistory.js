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
  mapStatusNames,
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
import SkeletonLoader from "../../utils/SkeletonLoader";
import ModalTransDetails from "../transaction/ModalTransDetails";
import CollapseModel from "./CollapseModel";
const filtersOptions = {
  status: {
    label: "Status",
    name: "status",
    content: [
      { value: "NOT_WITHDRAWED", label: "NOT_WITHDRAWED" },
      { value: "TO_VALIDATE", label: "TO_VALIDATE" },
      { value: "WITHDRAWED", label: "WITHDRAWED" },
      { value: "CANCELED", label: "CANCELED" },
    ],
  },
  type_transaction: {
    label: "Type de Transaction",
    name: "type_transaction",
    content: [
      { value: "01", label: "TRANSFERT" },
      { value: "02", label: "RETRAIT" },
      { value: "03", label: "COMP_VERSEMENT" },
      { value: "04", label: "COMP_RETRAIT" },
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
                      {item.transaction.agence_origine.nom}
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
                      {item.transaction.agence_destination.nom}
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
                      {item.transaction.destinataire.nom}
                    </a>
                    <span className="text-black-50 d-block">
                      {item.transaction.destinataire.tel}
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
                <td className="font-size-lg font-weight-bold text-center">
                  <span>0</span>
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
                    {mapStatusNames[item.transaction.status]}
                  </Badge>
                </td>
                <td className="text-center">
                  {/*<Button
                    color="primary"
                    className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                  >
                    <FontAwesomeIcon
                      icon={["fas", "eye"]}
                      className="font-size-sm"
                    />
                  </Button>*/}
                  <ModalTransDetails item={item} />
                </td>
              </tr>
            );
          })
        )}
      </>
    );
    const transactions_mobile = this.props.transactions.loading ? (
      <SkeletonLoader />
    ) : this.state.current.length === 0 ? (
      <>
        <div className="d-flex align-items-center justify-content-center pt-3">
          <img style={{ width: "17%" }} src={empty} />
        </div>
        <div className="d-flex align-items-center justify-content-center pt-1">
          <span>Pas de données disponibles </span>
        </div>
      </>
    ) : (
      this.state.current.map((item) => {
        return (
          <div key={item.id}>
            <CollapseModel
              type_transaction={item.type_transaction}
              montant={item.transaction.montant}
              destinataire={item.transaction.destinataire.nom}
            >
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <span className="font-size-sm text-uppercase text-black-30">
                    Numero
                  </span>
                </div>
                <div className="font-weight-bold text-black font-size-sm">
                  {item.code_transaction}
                </div>
              </div>
              <div className="divider my-3" />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <span className="font-size-sm text-uppercase text-black-30">
                    Date
                  </span>
                </div>
                <div className="font-weight-bold text-black font-size-sm">
                  {item.date}
                </div>
              </div>
              <div className="divider my-3" />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <span className="font-size-sm text-uppercase text-black-30">
                    Agence d'origine
                  </span>
                </div>
                <div className="font-weight-bold text-black font-size-sm">
                  {item.transaction.agence_origine.nom}
                </div>
              </div>
              <div className="divider my-3" />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <span className="font-size-sm text-uppercase text-black-30">
                    Agence de destination
                  </span>
                </div>
                <div className="font-weight-bold text-black font-size-sm">
                  {item.transaction.agence_destination.nom}
                </div>
              </div>
              <div className="divider my-3" />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <span className="font-size-sm text-uppercase text-black-30">
                    Destinataire
                  </span>
                </div>
                <div className="font-weight-bold text-black font-size-sm">
                  {item.transaction.destinataire.nom +
                    " - " +
                    item.transaction.destinataire.tel}
                </div>
              </div>
              <div className="divider my-3" />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <span className="font-size-sm text-uppercase text-black-30">
                    Montant
                  </span>
                </div>
                <div className="font-weight-bold text-black font-size-sm">
                  {item.transaction.montant}
                  <small className="px-2 font-weight-normal">MRU</small>
                </div>
              </div>
              <div className="divider my-3" />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <span className="font-size-sm text-uppercase text-black-30">
                    Frais
                  </span>
                </div>
                <div className="font-weight-bold text-black font-size-sm">
                  0<small className="px-2 font-weight-normal">MRU</small>
                </div>
              </div>
              <div className="divider my-3" />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <span className="font-size-sm text-uppercase text-black-30">
                    Status
                  </span>
                </div>
                <div className="font-weight-bold text-black font-size-sm">
                  <Badge
                    className={
                      "px-4 py-1 h-auto text-" +
                      mapColorStatus[item.transaction.status] +
                      " border-1 border-" +
                      mapColorStatus[item.transaction.status]
                    }
                    color={"neutral-" + mapColorStatus[item.transaction.status]}
                  >
                    {mapStatusNames[item.transaction.status]}
                  </Badge>
                </div>
              </div>
              <div className="divider my-3" />
            </CollapseModel>
          </div>
        );
      })
    );

    return (
      <>
        <Card className="card-box shadow-none d-none d-md-block">
          <div className="px-4 pt-4 text-primary">
            <h5 className="font-weight-bold text-dark">
              Historiques de transactions
            </h5>
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
                placeholder="Rechercher par ..."
                onKeyDown={this.handleSearchSubmit}
                value={this.state.search}
                onChange={this.handleSearchChange}
                disabled={this.props.transactions.loading}
              />*/}
              <Input
                type="search"
                onFocus={this.openSearch}
                onBlur={this.closeSearch}
                placeholder="Rechercher par ..."
              />
            </div>
            <div className="d-flex align-items-center">
              {!this.props.transactions.loading && (
                <Button
                  color="danger"
                  outline
                  className="d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill"
                  onClick={this.reset}
                >
                  <RotateCw className="w-50" />
                </Button>
              )}

              <UncontrolledDropdown disabled={this.props.transactions.loading}>
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
          </div>
          <div className="divider" />
          <div className="px-4 pt-3 pb-1">
            <CardBody>
              <div className="table-responsive">
                <Table hover borderless className="text-nowrap mb-0">
                  <thead>
                    <tr>
                      <th
                        className="text-center font-size-lg font-weight-normal text-dark"
                        scope="col"
                        onClick={() =>
                          !this.props.transactions.loading &&
                          this.handleOrdering({
                            attribute: ["code_transaction"],
                            increment: this.state.orderingValues.increment,
                          })
                        }
                      >
                        Numero {this.currentOrdering("code_transaction")}
                      </th>
                      <th
                        className=" text-center font-size-lg font-weight-normal text-dark"
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
                        className="text-center text-center text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Frais
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                        onClick={() =>
                          !this.props.transactions.loading &&
                          this.handleOrdering({
                            attribute: ["type_transaction"],
                            increment: this.state.orderingValues.increment,
                          })
                        }
                      >
                        Type {this.currentOrdering("type_transaction")}
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                        onClick={() =>
                          !this.props.transactions.loading &&
                          this.handleOrdering({
                            attribute: ["transaction", "status"],
                            increment: this.state.orderingValues.increment,
                          })
                        }
                      >
                        Status {this.currentOrdering("status")}
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>

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
        {/*mobile version*/}
        <Card className="card-box shadow-none d-block d-md-none">
          <div className="px-4 pt-4 text-primary">
            <h5 className="font-weight-bold text-dark">
              Historiques de transactions
            </h5>
          </div>
          <div className="divider" />
          <div className="pb-1 pt-3 px-0">
            <CardBody>{transactions_mobile}</CardBody>
          </div>
          {!this.props.transactions.loading && this.state.current.length !== 0 && (
            <div className="d-flex align-items-center justify-content-center mt-2 mb-4">
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
