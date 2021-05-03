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
import localeInfo from "rc-pagination/lib/locale/en_US";
import { Filter } from "react-feather";

import { CardBody } from "reactstrap";
import { connect } from "react-redux";
import { getCagnotes } from "../../actions/cagnote";
import { showAlert } from "../../utils/alerts";

import empty from "../../assets/images/empty.png";
import SkeletonLoader from "../../utils/SkeletonLoader";
import {
  mapColorStatus,
  mapTypeNames,
  mapColorTypes,
  mapStatusNames,
} from "../../utils/choices";

import { PaginateData } from "../../utils/dataTable";
import ModalDetails from "./ModalDetails";

class CagnoteHistory extends Component {
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
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.Paginate = this.Paginate.bind(this);
  }

  openSearch = () => this.setState({ ...this.state, searchOpen: true });
  closeSearch = () => this.setState({ ...this.state, searchOpen: false });

  componentDidMount() {
    this.props.getCagnotes(true, showAlert);
    //this.Paginate([...fetchData], this.state.totalRowsPerPage);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.cagnotes.loading === false && this.state.init) {
      console.log(" sync cagnotes props with state  ...");
      this.Paginate(
        [...nextProps.cagnotes.payload],
        this.state.totalRowsPerPage
      );
    }
    if (
      nextProps.cagnotes.loading === true &&
      this.props.cagnotes.loading === false
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
    const cagnotes = this.props.cagnotes.loading ? (
      <tr>
        <td colSpan="8">
          <SkeletonLoader />
        </td>
      </tr>
    ) : (
      <>
        {this.state.current.length === 0 ? (
          <tr>
            <td colSpan="8">
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
              <tr key={item.cagnote.id}>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">
                    {item.cagnote.numero_cagnote}
                  </span>
                </td>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">{item.cagnote.nom}</span>
                </td>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">{item.cagnote.date}</span>
                </td>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">{`${item.cagnote.responsable.first_name} ${item.cagnote.responsable.last_name}`}</span>
                </td>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">{item.cagnote.solde}</span>
                  <small className="px-2">MRU</small>
                </td>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">
                    {item.cagnote.nbre_participants}
                  </span>
                </td>
                <td className="text-center text-black-30">
                  <span className="font-weight-bold">
                    {item.cagnote.actif ? (
                      <Badge
                        className={
                          "px-4 py-1 h-auto text-success border-1 border-success"
                        }
                        color="neutral-success"
                      >
                        Actif
                      </Badge>
                    ) : (
                      <Badge
                        className={
                          "px-4 py-1 h-auto text-danger border-1 border-danger"
                        }
                        color={"neutral-danger"}
                      >
                        Cloturé
                      </Badge>
                    )}

                    {/*item.cagnote.verse_au_solde && (
                      <Badge
                        className={
                          "px-4 py-1 h-auto text-success border-1 border-success"
                        }
                        color="neutral-success"
                      >
                        Versé au solde
                      </Badge>
                      )*/}
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
                        {/*<NavItem>
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
                        </NavItem>*/}
                        <ModalDetails item={item} user={this.props.user} />
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
            <h5 className="font-weight-bold text-dark">Cagnotes</h5>
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
                        Identifiant
                      </th>
                      <th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Nom
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
                        Responsable
                      </th>
                      {/*<th
                        className="text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Montant souhaité
                      </th>*/}
                      <th
                        className="text-center text-center text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Solde
                      </th>
                      <th
                        className="text-center text-center text-center font-size-lg font-weight-normal   text-dark"
                        scope="col"
                      >
                        Participants
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
                  <tbody>{cagnotes}</tbody>
                </Table>
              </div>
            </CardBody>
          </div>

          {!this.props.cagnotes.loading && this.state.current.length !== 0 && (
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cagnotes: state.cagnote.cagnotes,
  role: state.auth.role,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getCagnotes,
})(CagnoteHistory);
