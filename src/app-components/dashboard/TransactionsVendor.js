import React, { Component, useState } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Table,
  Col,
  Card,
  Input,
  Badge,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
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
import { connect } from "react-redux";
import { getTransactions } from "../../actions/transaction";
import { showAlert } from "../../utils/alerts";

import empty from "../../assets/images/empty.png";
import SkeletonLoader from "../../utils/SkeletonLoader";
import {
  mapColorStatus,
  mapTypeNames,
  mapColorTypes,
  mapStatusNames,
  VENDOR,
  TO_VALIDATE,
} from "../../utils/choices";
import FormFilter from "../transaction/FormFilter";
import CollapseModel from "./CollapseModel";
import { PaginateData } from "../../utils/dataTable";
import FormSecretKeyLivraison from "./FormSecretKeyLivraison";

const filtersOptions = {
  status: {
    label: "Status",
    name: "status",
    content: [
      { value: "NOT_WITHDRAWED", label: "VALIDER" },
      { value: "TO_VALIDATE", label: "EN ATTENTE" },
      { value: "WITHDRAWED", label: "RETIRER" },
      { value: "CANCELED", label: "ANNULER" },
    ],
  },
  type_transaction: {
    label: "Type de Transaction",
    name: "type_transaction",
    content: [
      { value: "01", label: "TRANSFERT" },
      { value: "02", label: "RETRAIT" },
      /*{ value: "03", label: "COMP_VERSEMENT" },
      { value: "04", label: "COMP_RETRAIT" },*/
    ],
  },
};

class TransactionsVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      init: true,
      //totalPage: 1,
      totalRowsPerPage: 5,
      totalData: 0,
      page: 1,
      current: [],
      searchOpen: false,
      modalLivraison: false,
      currentTransaction: null,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.Paginate = this.Paginate.bind(this);
    this.handleModalLivraison = this.handleModalLivraison.bind(this);
  }

  handleModalLivraison = (transaction = null) => {
    this.setState({
      ...this.state,
      modalLivraison: !this.state.modalLivraison,
      currentTransaction: transaction,
    });
  };

  openSearch = () => this.setState({ ...this.state, searchOpen: true });
  closeSearch = () => this.setState({ ...this.state, searchOpen: false });

  componentDidMount() {
    this.props.getTransactions(true, showAlert);
    //this.Paginate([...fetchData], this.state.totalRowsPerPage);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.transactions.loading === false && this.state.init) {
      console.log(" sync transactions props with state  ...");
      this.Paginate(
        [...nextProps.transactions.payload],
        this.state.totalRowsPerPage
      );
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
    /*if (
      nextState.search === "" &&
      this.state.search !== "" &&
      (nextState.filterValues === {} || allNull(nextState.filterValues))
    ) {
      this.reset();
    }*/
  }

  Paginate(data, rows) {
    const [page, paginated] = PaginateData(data, rows);
    const temp = [...paginated].filter((item) => item.page === 1);

    this.setState({
      ...this.state,
      data: [...paginated],
      init: false,
      totalData: paginated.length,
      page: 1,
      current: temp,
    });
  }

  handleChangePage(page) {
    this.setState({
      ...this.state,
      page,
      current: [...this.state.data].filter((item) => item.page === page),
    });
  }
  render() {
    const transactions = this.props.transactions.loading ? (
      <tr>
        <td colSpan="9">
          <SkeletonLoader />
        </td>
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
            const keys = Object.keys({ ...item.transaction });
            return (
              <tr key={item.id}>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">
                    {item.code_transaction}
                  </span>
                </td>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">{item.date}</span>
                </td>
                <td className="text-center">
                  <div>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-weight-bold text-black-30"
                      title="..."
                    >
                      {!keys.includes("agence_origine") &&
                        `${item.transaction.expediteur.first_name} ${item.transaction.expediteur.last_name}`}
                      {keys.includes("agence_origine") &&
                        item.transaction.expediteur &&
                        item.transaction.expediteur.nom}
                      {keys.includes("agence_origine") &&
                        !item.transaction.expediteur &&
                        item.transaction.agence_origine.nom}
                    </a>
                    <span className="text-black-50 d-block">
                      {!keys.includes("agence_origine") &&
                        item.transaction.expediteur &&
                        item.transaction.expediteur.tel}
                      {keys.includes("agence_origine") &&
                        item.transaction.expediteur &&
                        item.transaction.expediteur.tel}
                      {keys.includes("agence_origine") &&
                        !item.transaction.expediteur &&
                        item.transaction.agence_origine.type_agence}
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
                      {keys.includes("agence_origine")
                        ? item.transaction.destinataire.nom
                        : `${item.transaction.destinataire.first_name} ${item.transaction.destinataire.last_name}`}
                    </a>
                    <span className="text-black-50 d-block">
                      {item.transaction.destinataire.tel}
                    </span>
                  </div>
                </td>
                <td className="font-size-lg font-weight-bold text-center">
                  <span>{item.transaction.montant}</span>
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
                            onClick={(e) => e.preventDefault()}
                          >
                            <FontAwesomeIcon
                              icon={["fas", "eye"]}
                              className="font-size-md mr-3"
                            />
                            <span>Details</span>
                          </NavLinkStrap>
                        </NavItem>
                        {this.props.role?.value === VENDOR &&
                          item.transaction.status === TO_VALIDATE &&
                          item.transaction.destinataire.id ===
                            this.props.user.id && (
                            <NavItem>
                              <NavLinkStrap
                                href="#/"
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.handleModalLivraison({
                                    transfertID: item.transaction.id,
                                    transactionID: item.id,
                                    expediteurRole:
                                      item.transaction.expediteur.role,
                                  });
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={["fas", "truck"]}
                                  className="font-size-md mr-3"
                                />
                                <span>Livraison</span>
                              </NavLinkStrap>
                            </NavItem>
                          )}
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
        const keys = Object.keys({ ...item.transaction });
        return (
          <div key={item.id}>
            <CollapseModel
              type_transaction={item.type_transaction}
              montant={item.transaction.montant}
              destinataire={
                keys.includes("agence_origine")
                  ? item.transaction.destinataire.nom
                  : `${item.transaction.destinataire.first_name} ${item.transaction.destinataire.last_name}`
              }
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
                    Origine
                  </span>
                </div>
                <div className="font-weight-bold text-black font-size-sm">
                  {!keys.includes("agence_origine") &&
                    `${item.transaction.expediteur.first_name} ${item.transaction.expediteur.last_name}`}
                  {keys.includes("agence_origine") &&
                    item.transaction.expediteur &&
                    item.transaction.expediteur.nom}
                  {keys.includes("agence_origine") &&
                    !item.transaction.expediteur &&
                    item.transaction.agence_origine.nom}
                </div>
              </div>
              <div className="divider my-3" />
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <span className="font-size-sm text-uppercase text-black-30">
                    Beneficiaire
                  </span>
                </div>
                <div className="font-weight-bold text-black font-size-sm">
                  {keys.includes("agence_origine")
                    ? item.transaction.destinataire.nom
                    : `${item.transaction.destinataire.first_name} ${item.transaction.destinataire.last_name}`}
                  {" - " + item.transaction.destinataire.tel}
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
        <ModalLivraison
          handleModalLivraison={this.handleModalLivraison}
          modalLivraison={this.state.modalLivraison}
          transaction={this.state.currentTransaction}
        />
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
              <Input
                type="search"
                onFocus={this.openSearch}
                onBlur={this.closeSearch}
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
                    <FormFilter
                      handleFilter={() => console.log("in build ...")}
                      filterValues={{}}
                      filtersOptions={filtersOptions}
                    />
                  </div>
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
                        className=" text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Date
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Origine
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Beneficiaire
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
                  <tbody>{transactions}</tbody>
                </Table>
              </div>
            </CardBody>
          </div>

          {!this.props.transactions.loading && this.state.current.length !== 0 && (
            <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
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
  role: state.auth.role,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getTransactions,
})(TransactionsVendor);

function ModalLivraison(props) {
  return (
    <Modal
      zIndex={2000}
      centered
      size="md"
      isOpen={props.modalLivraison}
      toggle={props.handleModalLivraison}
      contentClassName="border-0"
    >
      <div className="my-4">
        <FormSecretKeyLivraison
          handleModalLivraison={props.handleModalLivraison}
          transaction={props.transaction}
        />
      </div>
    </Modal>
  );
}
