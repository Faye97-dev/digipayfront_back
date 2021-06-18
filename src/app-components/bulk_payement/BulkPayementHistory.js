import React, { Component, useState } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  Card,
  Input,
  Badge,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";

import RcPagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/fr_FR";
import { Filter } from "react-feather";

import { CardBody } from "reactstrap";
import { connect } from "react-redux";
import { getGrpPayements } from "../../actions/grp_payement";
import { showAlert } from "../../utils/alerts";

import empty from "../../assets/images/empty.png";
import SkeletonLoader from "../../utils/SkeletonLoader";

import { PaginateData } from "../../utils/dataTable";
import ModalDetails from "./ModalDetails";
import ModalDelete from "./ModalDelete";

const updateCurrentItem = (item, data) => {
  if (item) {
    const res = data.find((val) => val.id === item.id);
    return res;
  } else {
    return null;
  }
};

class BulkPayementHistory extends Component {
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
      modal4: false,
      modalDelete: false,
      currentItem: null,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.Paginate = this.Paginate.bind(this);
  }

  toggle4 = (item) =>
    this.setState({
      ...this.state,
      modal4: !this.state.modal4,
      currentItem: item,
    });

  deleteToggle = (item) =>
    this.setState({
      ...this.state,
      modalDelete: !this.state.modalDelete,
      currentItem: item,
    });

  openSearch = () => this.setState({ ...this.state, searchOpen: true });
  closeSearch = () => this.setState({ ...this.state, searchOpen: false });

  componentDidMount() {
    this.props.getGrpPayements(true, showAlert);
    //this.Paginate([...fetchData], this.state.totalRowsPerPage);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.grp_payements.loading === false && this.state.init) {
      console.log(" sync grp_payements props with state  ...");
      this.Paginate(
        [...nextProps.grp_payements.payload],
        this.state.totalRowsPerPage
      );
    }
    if (
      nextProps.grp_payements.loading === true &&
      this.props.grp_payements.loading === false
    ) {
      console.log("reset init bolean ant sync props to state ....");
      this.setState({
        ...this.state,
        init: true,
      });
    }
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
      currentItem: updateCurrentItem(this.state.currentItem, [...paginated]),
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
    const grp_payements = this.props.grp_payements.loading ? (
      <tr>
        <td colSpan="6">
          <SkeletonLoader />
        </td>
      </tr>
    ) : (
      <>
        {this.state.current.length === 0 ? (
          <tr>
            <td colSpan="6">
              <div className="d-flex align-items-center justify-content-center pt-3">
                <img style={{ width: "15%" }} src={empty} />
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
                  <span className="font-weight-bold">{item.date}</span>
                </td>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">{item.nom}</span>
                </td>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">{`${item.responsable.first_name} ${item.responsable.last_name}`}</span>
                </td>

                <td className="text-center text-black-30">
                  <span className="font-weight-bold">{item.total_montant}</span>
                  <small className="px-2">MRU</small>
                </td>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">
                    {item.nbre_beneficiaires}
                  </span>
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
                              this.toggle4(item);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={["fas", "eye"]}
                              className="font-size-md mr-3"
                            />
                            <span>Details</span>
                          </NavLinkStrap>
                        </NavItem>
                        <NavItem>
                          <NavLinkStrap
                            href="#/"
                            onClick={(e) => {
                              e.preventDefault();
                              this.deleteToggle(item);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={["fas", "trash"]}
                              className="font-size-md mr-3"
                            />
                            <span>Supprimer</span>
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
            <h5 className="font-weight-bold text-dark">
              Liste des groupes de paiements
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
                        Date
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Nom
                      </th>

                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Responsable
                      </th>

                      <th
                        className="text-center text-center text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Montant total
                      </th>
                      <th
                        className="text-center text-center text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Beneficiaires
                      </th>

                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>{grp_payements}</tbody>
                </Table>
              </div>
            </CardBody>
          </div>

          {!this.props.grp_payements.loading &&
            this.state.current.length !== 0 && (
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

          <ModalDetails
            item={this.state.currentItem}
            user={this.props.user}
            access={this.props.access}
            modal={this.state.modal4}
            handleModal={this.toggle4}
          />
          <ModalDelete
            item={this.state.currentItem}
            user={this.props.user}
            access={this.props.access}
            modal={this.state.modalDelete}
            handleModal={this.deleteToggle}
          />
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  grp_payements: state.grp_payement.grp_payements,
  role: state.auth.role,
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, {
  getGrpPayements,
})(BulkPayementHistory);
