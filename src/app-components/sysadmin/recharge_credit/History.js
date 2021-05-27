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
import FormUpload from "./FormUpload";
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
        <td colSpan="5">
          <SkeletonLoader />
        </td>
      </tr>
    ) : (
      <>
        {demoData.length === 0 ? (
          <tr>
            <td colSpan="5">
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
                  <span className="font-weight-bold">{item.carte}</span>
                </td>
                <td className="font-size-lg font-weight-bold text-center">
                  <span>{item.montant}</span>
                  <small className="px-2">MRU</small>
                </td>

                <td className="text-center">
                  <Badge
                    className={
                      "px-4 py-1 h-auto text-" +
                      mapOperateurColors[item.operateur] +
                      " border-1 border-" +
                      mapOperateurColors[item.operateur]
                    }
                    color={"neutral-" + mapOperateurColors[item.operateur]}
                  >
                    {mapOperateurNames[item.operateur]}
                  </Badge>
                </td>

                <td className="text-center">
                  <Badge
                    className={
                      "px-4 py-1 h-auto text-" +
                      mapStatusColors[item.status] +
                      " border-1 border-" +
                      mapStatusColors[item.status]
                    }
                    color={"neutral-" + mapStatusColors[item.status]}
                  >
                    {mapStatusNames[item.status]}
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
              Listes des cartes de credit
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
                placeholder="Search orders..."
              />*/}
              <Button
                color="primary"
                onClick={this.props.handleModalAjoutCredit}
                className="hover-scale-sm font-weight-bold px-2 mb-2"
              >
                <span className="px-2">Ajouter des cartes</span>
              </Button>
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
                        Carte de credit
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Montant
                      </th>
                      <th
                        className=" text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Operateur
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
        {/*<ModalDetails
          item={this.state.currentItem}
          user={this.props.user}
          access={this.props.access}
          modal={this.state.modalInfo}
          handleModal={this.toggleDetail}
          mapStatusClientsColors={mapStatusClientsColors}
          mapStatusClientsNames={mapStatusClientsNames}
        />*/}
        <FormUpload
          modalAjoutCredit={this.props.modalAjoutCredit}
          handleModalAjoutCredit={this.props.handleModalAjoutCredit}
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

const mapStatusColors = {
  "01": "success",
  "02": "danger",
};
const mapStatusNames = {
  "01": "Actif",
  "02": "Expiré",
};

const mapOperateurColors = {
  "01": "primary",
  "02": "warning",
  "03": "info",
};
const mapOperateurNames = {
  "01": "Chinguitel",
  "02": "Mauritel",
  "03": "Mattel",
};

const demoData = [
  {
    id: 243,
    carte: "4789 65423 15896",
    status: "01",
    operateur: "02",
    montant: 200.0,
  },

  {
    id: 244,
    carte: "2047 89651 03589",
    status: "02",
    operateur: "03",
    montant: 500.0,
  },

  {
    id: 245,
    carte: "4782 02201 69203",
    status: "02",
    operateur: "02",
    montant: 100.0,
  },

  {
    id: 246,
    carte: "3021 89520 25003",
    status: "01",
    operateur: "01",
    montant: 30.0,
  },

  {
    id: 247,
    carte: "4108 20478 01259",
    status: "01",
    operateur: "03",
    montant: 200.0,
  },

  {
    id: 248,
    carte: "2014 25890 44203",
    status: "02",
    operateur: "01",
    montant: 40.0,
  },
];
