import React, { Component } from "react";

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
import { connect } from "react-redux";

import empty from "../../../assets/images/empty.png";
import SkeletonLoader from "../../../utils/SkeletonLoader";
import {
  mapColorStatus,
  mapTypeNames,
  mapColorTypes,
  mapStatusNames,
  CAGNOTE,
  RECOLTE,
  PAIEMENT_MASSE,
} from "../../../utils/choices";

import { PaginateData } from "../../../utils/dataTable";
import ModalClientTransDetails from "../../transaction/ModalClientTransDetails";
import ModalPayementMasseBeneficiaires from "../../transaction/ModalPayementMasseBeneficiaires";

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

class History extends Component {
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
      modalPayementMasse: false,
      currentItem: null,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.Paginate = this.Paginate.bind(this);
  }

  /*togglePayementMasse = (item) =>
    this.setState({
      ...this.state,
      modalPayementMasse: !this.state.modalPayementMasse,
      currentItem: item,
    });*/
  openSearch = () => this.setState({ ...this.state, searchOpen: true });
  closeSearch = () => this.setState({ ...this.state, searchOpen: false });

  componentDidMount() {
    //this.props.getTransactions(true, showAlert);
    //this.Paginate([...fetchData], this.state.totalRowsPerPage);
  }

  /*UNSAFE_componentWillUpdate(nextProps) {
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
  }*/

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
        {demoData.length === 0 ? (
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
          demoData.map((item) => {
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
                      {item.type_transaction !== CAGNOTE &&
                      item.type_transaction !== RECOLTE ? (
                        <>
                          {!keys.includes("agence_origine") &&
                            `${item.transaction.expediteur.first_name} ${item.transaction.expediteur.last_name}`}
                          {keys.includes("agence_origine") &&
                            item.transaction.expediteur &&
                            item.transaction.expediteur.nom}
                          {keys.includes("agence_origine") &&
                            !item.transaction.expediteur &&
                            item.transaction.agence_origine.nom}
                        </>
                      ) : (
                        <>
                          {item.type_transaction === CAGNOTE &&
                            `${item.transaction.expediteur.first_name} ${item.transaction.expediteur.last_name}`}
                          {item.type_transaction === RECOLTE &&
                            `${item.transaction.expediteur.nom}`}
                        </>
                      )}
                    </a>
                    <span className="text-black-50 d-block">
                      {item.type_transaction !== CAGNOTE &&
                      item.type_transaction !== RECOLTE ? (
                        <>
                          {!keys.includes("agence_origine") &&
                            item.transaction.expediteur &&
                            item.transaction.expediteur.tel}
                          {keys.includes("agence_origine") &&
                            item.transaction.expediteur &&
                            item.transaction.expediteur.tel}
                          {keys.includes("agence_origine") &&
                            !item.transaction.expediteur &&
                            item.transaction.agence_origine.type_agence}
                        </>
                      ) : (
                        <>
                          {item.type_transaction === CAGNOTE &&
                            item.transaction.expediteur.tel}
                          {item.type_transaction === RECOLTE &&
                            `${item.transaction.expediteur.responsable.first_name} ${item.transaction.expediteur.responsable.last_name}`}
                        </>
                      )}
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
                      {item.type_transaction !== CAGNOTE &&
                      item.type_transaction !== RECOLTE ? (
                        <>
                          {item.type_transaction === PAIEMENT_MASSE &&
                          this.props.user.id ===
                            item.transaction?.expediteur.id ? (
                            <Button
                              color="primary"
                              size="sm"
                              onClick={(e) => {
                                //this.togglePayementMasse(item);
                                console.log("in build ....");
                              }}
                            >
                              <FontAwesomeIcon
                                icon={["fas", "users"]}
                                className="font-size-md p-0 m-0"
                              />
                            </Button>
                          ) : (
                            <>
                              {keys.includes("agence_origine")
                                ? item.transaction.destinataire.nom
                                : `${item.transaction.destinataire.first_name} ${item.transaction.destinataire.last_name}`}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {item.type_transaction === RECOLTE &&
                            `${item.transaction.destinataire.first_name} ${item.transaction.destinataire.last_name}`}
                          {item.type_transaction === CAGNOTE &&
                            `${item.transaction.destinataire.nom}`}
                        </>
                      )}
                    </a>
                    <span className="text-black-50 d-block">
                      {item.type_transaction !== CAGNOTE &&
                      item.type_transaction !== RECOLTE ? (
                        <>
                          {item.type_transaction === PAIEMENT_MASSE &&
                          this.props.user.id ===
                            item.transaction?.expediteur.id ? (
                            <></>
                          ) : (
                            <>{item.transaction.destinataire.tel}</>
                          )}
                        </>
                      ) : (
                        <>
                          {item.type_transaction === RECOLTE &&
                            item.transaction.destinataire.tel}
                          {item.type_transaction === CAGNOTE &&
                            `${item.transaction.destinataire.responsable.first_name} ${item.transaction.destinataire.responsable.last_name}`}
                        </>
                      )}
                    </span>
                  </div>
                </td>
                <td className="font-size-lg font-weight-bold text-center">
                  <span>
                    {item.type_transaction === PAIEMENT_MASSE &&
                    this.props.user.id === item.transaction?.expediteur.id
                      ? item.transaction.total
                      : item.transaction.montant}
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
                        {/*<ModalClientTransDetails item={item} />*/}
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
                <DropdownMenu right className="dropdown-menu-md p-0">
                  <div></div>
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
        {/*<ModalPayementMasseBeneficiaires
            item={this.state.currentItem}
            user={this.props.user}
            access={this.props.access}
            modal={this.state.modalPayementMasse}
            handleModal={this.togglePayementMasse}
          />*/}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transaction.transactions,
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, {})(History);

const demoData = [
  {
    id: 246,
    code_transaction: "TR0900462",
    type_transaction: "09",
    categorie_transaction: "NONE",
    date: "10-05-2021 03:13:04",
    transaction: {
      id: 462,
      expediteur: {
        id: 2,
        username: "ali1",
        first_name: "ahmed",
        role: "CLIENT",
        last_name: "mahmoud",
        tel: "20151418",
        email: "aliahmed@gmail.com",
        adresse: "cite plage 1",
      },
      destinataire: {
        id: 7,
        nbre_participants: 1,
        numero_cagnote: "9900007",
        responsable: {
          id: 2,
          username: "ali1",
          first_name: "ahmed",
          last_name: "mahmoud",
          role: "CLIENT",
        },
        beneficiaire: {
          id: 3,
          username: "ali2",
          first_name: "Mohamed",
          last_name: "Faye",
          role: "CLIENT",
        },
        nom: "Cagnote 1",
        solde: 125.0,
        objectif: 0.0,
        motif: "test",
        actif: false,
        verse_au_solde: true,
        date: "10-05-2021 02:39:08",
      },
      montant: 125.0,
      motif: null,
      remarque: null,
      status: "COMFIRMED",
      is_edited: false,
      date_creation: "10-05-2021 03:13:04",
      date_modifcation: "10-05-2021 03:13:04",
      user_created: null,
      user_edited: null,
      type_transaction: "CAGNOTE",
      frais_origine: 0.0,
      frais_destination: 0.0,
      frais_societe: 0.0,
    },
  },

  {
    id: 245,
    code_transaction: "TR1000461",
    type_transaction: "10",
    categorie_transaction: "NONE",
    date: "10-05-2021 03:10:23",
    transaction: {
      id: 461,
      expediteur: {
        id: 6,
        nbre_participants: 1,
        numero_cagnote: "9900006",
        responsable: {
          id: 2,
          username: "ali1",
          first_name: "ahmed",
          last_name: "mahmoud",
          role: "CLIENT",
        },
        beneficiaire: {
          id: 3,
          username: "ali2",
          first_name: "Mohamed",
          last_name: "Faye",
          role: "CLIENT",
        },
        nom: "Cagnotte 2",
        solde: 40050.0,
        objectif: 250.0,
        motif: "bla bla",
        actif: false,
        verse_au_solde: true,
        date: "10-05-2021 02:38:20",
      },
      destinataire: {
        id: 2,
        username: "ali1",
        first_name: "ahmed",
        role: "CLIENT",
        last_name: "mahmoud",
        tel: "20151418",
        email: "aliahmed@gmail.com",
        adresse: "cite plage 1",
      },
      montant: 40050.0,
      motif: null,
      remarque: null,
      status: "COMFIRMED",
      is_edited: false,
      date_creation: "10-05-2021 03:10:23",
      date_modifcation: "10-05-2021 03:10:23",
      user_created: null,
      user_edited: null,
      type_transaction: "RECOLTE",
      frais_origine: 0.0,
      frais_destination: 0.0,
      frais_societe: 0.0,
    },
  },

  {
    id: 244,
    code_transaction: "TR0900460",
    type_transaction: "09",
    categorie_transaction: "NONE",
    date: "10-05-2021 03:07:36",
    transaction: {
      id: 460,
      expediteur: {
        id: 2,
        username: "ali1",
        first_name: "ahmed",
        role: "CLIENT",
        last_name: "mahmoud",
        tel: "20151418",
        email: "aliahmed@gmail.com",
        adresse: "cite plage 1",
      },
      destinataire: {
        id: 6,
        nbre_participants: 1,
        numero_cagnote: "9900006",
        responsable: {
          id: 2,
          username: "ali1",
          first_name: "ahmed",
          last_name: "mahmoud",
          role: "CLIENT",
        },
        beneficiaire: {
          id: 3,
          username: "ali2",
          first_name: "Mohamed",
          last_name: "Faye",
          role: "CLIENT",
        },
        nom: "Cagnotte 2",
        solde: 255.0,
        objectif: 250.0,
        motif: "bla bla",
        actif: false,
        verse_au_solde: true,
        date: "10-05-2021 02:38:20",
      },
      montant: 255.0,
      motif: null,
      remarque: null,
      status: "COMFIRMED",
      is_edited: false,
      date_creation: "10-05-2021 03:07:36",
      date_modifcation: "10-05-2021 03:09:41",
      user_created: null,
      user_edited: null,
      type_transaction: "CAGNOTE",
      frais_origine: 0.0,
      frais_destination: 0.0,
      frais_societe: 0.0,
    },
  },
];
