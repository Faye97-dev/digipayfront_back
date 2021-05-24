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
import { getTransactions } from "../../../actions/transaction";

import {
  mapColorStatus,
  mapTypeNames,
  mapColorTypes,
  mapStatusNames,
} from "../../../utils/choices";
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

//import FormFilter from "../../transaction/FormFilter";
import empty from "../../../assets/images/empty.png";
import { showAlert } from "../../../utils/alerts";
import SkeletonLoader from "../../../utils/SkeletonLoader";
import ModalTransDetails from "../../transaction/ModalTransDetails";
//import CollapseModel from "./CollapseModel";
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
    //this.props.getTransactions(true, showAlert);
  }

  /*UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (
      nextProps.transactions.loading === false &&
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
  }*/

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
        {
          //this.state.current.length === 0 ? (
          demoData.length === 0 ? (
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
            //this.state.current.map((item) => {
            demoData.map((item) => {
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
                      color={
                        "neutral-" + mapColorStatus[item.transaction.status]
                      }
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
          )
        }
      </>
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
              {/*!this.props.transactions.loading && (
                <Button
                  color="danger"
                  outline
                  className="d-flex align-items-center justify-content-center d-40 mr-2 p-0 rounded-pill"
                  onClick={this.reset}
                >
                  <RotateCw className="w-50" />
                </Button>
              )*/}

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

                <DropdownMenu right className="dropdown-menu-md p-0">
                  <div>
                    {/*<FormFilter
                      handleFilter={this.handleFilter}
                      filterValues={this.state.filterValues}
                      filtersOptions={filtersOptions}
                    />*/}
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
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {
  getTransactions,
})(History);

const demoData = [
  {
    id: 191,
    code_transaction: "TR0200375",
    type_transaction: "02",
    categorie_transaction: "INF_3000",
    date: "25-04-2021 22:27:01",
    transaction: {
      id: 375,
      agence_origine: {
        id: 4,
        commune: { commune_code: 3, wilaya: "NKTT", commune: "TOUJOUNINE" },
        nom: "Agence 3",
        solde: 80681.0,
        frais: 15.0,
        retrait: 52.0,
        dette: 20.0,
        code_agence: "AG98566320",
        tel: "30211890",
        adresse: "Toujounine",
        logitude: null,
        latitude: null,
        email: "agence4@gmail.com",
        type_agence: "AGENCE_INTERN",
        active: true,
        online: true,
        remarque: "",
        last_date_cloture: "10-04-2021 15:25:35",
      },
      agence_destination: {
        id: 4,
        commune: { commune_code: 3, wilaya: "NKTT", commune: "TOUJOUNINE" },
        nom: "Agence 2",
        solde: 80681.0,
        frais: 15.0,
        retrait: 52.0,
        dette: 20.0,
        code_agence: "AG98566320",
        tel: "30211890",
        adresse: "Toujounine",
        logitude: null,
        latitude: null,
        email: "agence4@gmail.com",
        type_agence: "AGENCE_INTERN",
        active: true,
        online: true,
        remarque: "",
        last_date_cloture: "10-04-2021 15:25:35",
      },
      destinataire: {
        id: 15,
        nom: "Ely Cheikh",
        tel: "40444044",
        nni: null,
        piece: null,
      },
      expediteur: {
        id: 1,
        nom: "Ahmed Ali",
        tel: "20151418",
        nni: null,
        piece: null,
      },
      code_secret: "6260",
      montant: 10.0,
      motif: null,
      remarque: null,
      status: "WITHDRAWED",
      is_edited: false,
      date_creation: "25-04-2021 22:27:01",
      date_modifcation: "25-04-2021 22:27:01",
      user_created: null,
      user_edited: null,
      frais_origine: 0.0,
      frais_destination: 0.0,
      frais_societe: 0.0,
      categorie_transaction: "INF_3000",
    },
  },

  {
    id: 190,
    code_transaction: "TR0200374",
    type_transaction: "02",
    categorie_transaction: "INF_3000",
    date: "25-04-2021 22:25:11",
    transaction: {
      id: 374,
      agence_origine: {
        id: 4,
        commune: { commune_code: 3, wilaya: "NKTT", commune: "TOUJOUNINE" },
        nom: "Agence 3",
        solde: 80681.0,
        frais: 15.0,
        retrait: 52.0,
        dette: 20.0,
        code_agence: "AG98566320",
        tel: "30211890",
        adresse: "Toujounine",
        logitude: null,
        latitude: null,
        email: "agence4@gmail.com",
        type_agence: "AGENCE_INTERN",
        active: true,
        online: true,
        remarque: "",
        last_date_cloture: "10-04-2021 15:25:35",
      },
      agence_destination: {
        id: 4,
        commune: { commune_code: 3, wilaya: "NKTT", commune: "TOUJOUNINE" },
        nom: "Agence 5",
        solde: 80681.0,
        frais: 15.0,
        retrait: 52.0,
        dette: 20.0,
        code_agence: "AG98566320",
        tel: "30211890",
        adresse: "Toujounine",
        logitude: null,
        latitude: null,
        email: "agence4@gmail.com",
        type_agence: "AGENCE_INTERN",
        active: true,
        online: true,
        remarque: "",
        last_date_cloture: "10-04-2021 15:25:35",
      },
      destinataire: {
        id: 1,
        nom: "Ahmed Ali",
        tel: "20151418",
        nni: null,
        piece: null,
      },
      expediteur: null,
      code_secret: "9559",
      montant: 12.0,
      motif: null,
      remarque: null,
      status: "WITHDRAWED",
      is_edited: false,
      date_creation: "25-04-2021 22:25:11",
      date_modifcation: "25-04-2021 22:25:11",
      user_created: null,
      user_edited: null,
      frais_origine: 0.0,
      frais_destination: 0.0,
      frais_societe: 0.0,
      categorie_transaction: "INF_3000",
    },
  },

  {
    id: 188,
    code_transaction: "TR0500371",
    type_transaction: "05",
    categorie_transaction: "SUP_3000",
    date: "25-04-2021 21:57:34",
    transaction: {
      id: 371,
      agence_origine: {
        id: 4,
        commune: { commune_code: 3, wilaya: "NKTT", commune: "TOUJOUNINE" },
        nom: "Agence 1",
        solde: 80681.0,
        frais: 15.0,
        retrait: 52.0,
        dette: 20.0,
        code_agence: "AG98566320",
        tel: "30211890",
        adresse: "Toujounine",
        logitude: null,
        latitude: null,
        email: "agence4@gmail.com",
        type_agence: "AGENCE_INTERN",
        active: true,
        online: true,
        remarque: "",
        last_date_cloture: "10-04-2021 15:25:35",
      },
      agence_destination: {
        id: 4,
        commune: { commune_code: 3, wilaya: "NKTT", commune: "TOUJOUNINE" },
        nom: "Agence 5",
        solde: 80681.0,
        frais: 15.0,
        retrait: 52.0,
        dette: 20.0,
        code_agence: "AG98566320",
        tel: "30211890",
        adresse: "Toujounine",
        logitude: null,
        latitude: null,
        email: "agence4@gmail.com",
        type_agence: "AGENCE_INTERN",
        active: true,
        online: true,
        remarque: "",
        last_date_cloture: "10-04-2021 15:25:35",
      },
      destinataire: {
        id: 1,
        nom: "Ahmed Ali",
        tel: "20151418",
        nni: null,
        piece: null,
      },
      expediteur: null,
      code_secret: "",
      montant: 5000.0,
      motif: null,
      remarque: null,
      status: "COMFIRMED",
      is_edited: false,
      date_creation: "25-04-2021 21:57:34",
      date_modifcation: "25-04-2021 21:57:34",
      user_created: null,
      user_edited: null,
      frais_origine: 0.0,
      frais_destination: 0.0,
      frais_societe: 0.0,
      categorie_transaction: "SUP_3000",
    },
  },

  {
    id: 187,
    code_transaction: "TR0200368",
    type_transaction: "02",
    categorie_transaction: "INF_3000",
    date: "25-04-2021 21:20:58",
    transaction: {
      id: 368,
      agence_origine: {
        id: 4,
        commune: { commune_code: 3, wilaya: "NKTT", commune: "TOUJOUNINE" },
        nom: "Agence 2",
        solde: 80681.0,
        frais: 15.0,
        retrait: 52.0,
        dette: 20.0,
        code_agence: "AG98566320",
        tel: "30211890",
        adresse: "Toujounine",
        logitude: null,
        latitude: null,
        email: "agence4@gmail.com",
        type_agence: "AGENCE_INTERN",
        active: true,
        online: true,
        remarque: "",
        last_date_cloture: "10-04-2021 15:25:35",
      },
      agence_destination: {
        id: 4,
        commune: { commune_code: 3, wilaya: "NKTT", commune: "TOUJOUNINE" },
        nom: "Agence 5",
        solde: 80681.0,
        frais: 15.0,
        retrait: 52.0,
        dette: 20.0,
        code_agence: "AG98566320",
        tel: "30211890",
        adresse: "Toujounine",
        logitude: null,
        latitude: null,
        email: "agence4@gmail.com",
        type_agence: "AGENCE_INTERN",
        active: true,
        online: true,
        remarque: "",
        last_date_cloture: "10-04-2021 15:25:35",
      },
      destinataire: {
        id: 15,
        nom: "Ely Cheikh",
        tel: "40444044",
        nni: null,
        piece: null,
      },
      expediteur: {
        id: 1,
        nom: "Ahmed Ali",
        tel: "20151418",
        nni: null,
        piece: null,
      },
      code_secret: "DFA2A682",
      montant: 10.0,
      motif: null,
      remarque: null,
      status: "WITHDRAWED",
      is_edited: false,
      date_creation: "25-04-2021 21:20:58",
      date_modifcation: "25-04-2021 21:20:58",
      user_created: null,
      user_edited: null,
      frais_origine: 0.0,
      frais_destination: 0.0,
      frais_societe: 0.0,
      categorie_transaction: "INF_3000",
    },
  },
];
