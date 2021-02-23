import React, { useState, useEffect } from "react";

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
import { getTransactions } from "../../actions/transaction";
import { showAlert } from "../../utils/alerts";

import empty from "../../assets/images/empty.png";
import SkeletonLoader from "../../utils/SkeletonLoader";
import {
  mapColorStatus,
  mapTypeNames,
  mapColorTypes,
} from "../../utils/choices";
import FormFilter from "../transaction/FormFilter";
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

function TransactionsClient(props) {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  const statusOptions = [
    { value: "any", label: "All statuses" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "rejected", label: "Rejected" },
    { value: "processing", label: "Processing" },
    { value: "cancelled", label: "Cancelled" },
  ];
  useEffect(() => props.getTransactions(showAlert), []);

  const transactions = props.transactions.loading ? (
    <tr>
      <td colSpan="8">
        <SkeletonLoader />
      </td>
    </tr>
  ) : (
    <>
      {props.transactions.payload.length === 0 ? (
        <tr>
          <td colSpan="8">
            <div className="d-flex align-items-center justify-content-center pt-3">
              <img style={{ width: "17%" }} src={empty} />
            </div>
            <div className="d-flex align-items-center justify-content-center pt-1">
              <span>Pas de données disponibles </span>
            </div>
          </td>
        </tr>
      ) : (
        props.transactions.payload.map((item) => {
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
                    {keys.includes("agence_origine")
                      ? item.transaction.expediteur.nom
                      : `${item.transaction.expediteur.first_name} ${item.transaction.expediteur.last_name}`}
                  </a>
                  <span className="text-black-50 d-block">
                    {item.transaction.expediteur.tel}
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
          <h5 className="font-weight-bold text-dark">
            Historiques de transactions
          </h5>
        </div>
        <div className="d-flex justify-content-between px-4 py-3">
          <div
            className={clsx(
              "search-wrapper search-wrapper--alternate search-wrapper--grow",
              { "is-active": searchOpen }
            )}
          >
            <span className="icon-wrapper text-black">
              <FontAwesomeIcon icon={["fas", "search"]} />
            </span>
            <Input
              type="search"
              onFocus={openSearch}
              onBlur={closeSearch}
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
        <div className="d-flex align-items-center justify-content-center pt-3 mb-5">
          <RcPagination
            defaultPageSize={5}
            defaultCurrent={1}
            total={10}
            locale={localeInfo}
          />
        </div>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => ({
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {
  getTransactions,
})(TransactionsClient);
