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
import { Settings, Filter } from "react-feather";

import { CardBody, UncontrolledTooltip, Progress } from "reactstrap";
import { connect } from "react-redux";

import empty from "../../../assets/images/empty.png";
import SkeletonLoader from "../../../utils/SkeletonLoader";

import { PaginateData } from "../../../utils/dataTable";
import ModalDetails from "./ModalDetails";
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
      modalInfo: false,
      currentItem: null,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.Paginate = this.Paginate.bind(this);
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
    //this.props.getTransactions(true, showAlert);
    //this.Paginate([...fetchData], this.state.totalRowsPerPage);
  }

  /*UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.agents.loading === false && this.state.init) {
      console.log(" sync agents props with state  ...");
      this.Paginate(
        [...nextProps.agents.payload],
        this.state.totalRowsPerPage
      );
    }
    if (
      nextProps.agents.loading === true &&
      this.props.agents.loading === false
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
    const agents = this.props.agents.loading ? (
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
                  <span className="font-weight-bold">{item.identifiant}</span>
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
                      {item.nom}
                    </a>
                    <span className="text-black-50 d-block">{item.tel}</span>
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
                      {item.email}
                    </a>
                    <span className="text-black-50 d-block">
                      {item.adresse}
                    </span>
                  </div>
                </td>
                <td className="font-size-lg font-weight-bold text-center">
                  <span>{item.solde}</span>
                  <small className="px-2">MRU</small>
                </td>

                <td className="text-center">
                  <Badge
                    className={
                      "px-4 py-1 h-auto text-" +
                      mapStatusClientsColors[item.status] +
                      " border-1 border-" +
                      mapStatusClientsColors[item.status]
                    }
                    color={"neutral-" + mapStatusClientsColors[item.status]}
                  >
                    {mapStatusClientsNames[item.status]}
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
              Listes des administrateurs
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
                        Identifiant
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Date de creation
                      </th>
                      <th
                        className=" text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Nom Complet
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Contact
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Solde
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
                  <tbody>{agents}</tbody>
                </Table>
              </div>
            </CardBody>
          </div>
          {!this.props.agents.loading && this.state.current.length !== 0 && (
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
        <ModalDetails
          item={this.state.currentItem}
          user={this.props.user}
          access={this.props.access}
          modal={this.state.modalInfo}
          handleModal={this.toggleDetail}
          mapStatusClientsColors={mapStatusClientsColors}
          mapStatusClientsNames={mapStatusClientsNames}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  agents: [],
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, {})(History);

const mapStatusClientsColors = {
  "01": "success",
  "02": "info",
  "03": "warning",
  "04": "danger",
};
const mapStatusClientsNames = {
  "01": "Actif",
  "02": "En Attente",
  "03": "Désactivé",
  "04": "Bloqué",
};

const demoData = [
  {
    id: 243,
    identifiant: "ADT1100459",
    status: "01",
    date: "09-05-2021 16:49:03",
    nom: "Med Vadel",
    tel: "47896230",
    adresse: "TVZ",
    email: "med@gmail.com",
    solde: 2569.0,
  },

  {
    id: 244,
    identifiant: "ADT5800070",
    status: "04",
    date: "12-02-2021 18:00:03",
    nom: "Cheikh Ahmed",
    tel: "20478963",
    adresse: "KSAR",
    email: "cheikh@gmail.com",
    solde: 300.0,
  },

  {
    id: 245,
    identifiant: "ADT0701259",
    status: "01",
    date: "21-01-2021 12:19:51",
    nom: "Salma Saleck",
    tel: "33302117",
    adresse: "TVZ",
    email: "salma@gmail.com",
    solde: 48901.0,
  },

  /*{
    id: 300,
    identifiant: "ADT0881103",
    status: "02",
    date: "18-03-2021 20:01:08",
    nom: "Brahim Mahmoud",
    tel: "27901410",
    adresse: "Cite plage",
    email: "brahim@gmail.com",
    solde: 74100.0,
  },*/

  {
    id: 246,
    identifiant: "ADT3600210",
    status: "03",
    date: "09-03-2021 21:28:09",
    nom: "Samba Dia",
    tel: "20179630",
    adresse: "E-Nord",
    email: "samba@gmail.com",
    solde: 1020.0,
  },
];
