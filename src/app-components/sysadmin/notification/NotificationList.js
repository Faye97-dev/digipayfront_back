import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, Button, Modal, Badge } from "reactstrap";
import RcPagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/fr_FR";
import { PaginateData } from "../../../utils/dataTable";
import { getNotifications } from "../../../actions/notification";
import { validCompensation } from "../../../actions/async";
import empty from "../../../assets/images/empty.png";
import { showAlert } from "../../../utils/alerts";
import { connect } from "react-redux";
import { SkeletonCard } from "../../../utils/SkeletonLoader";
import {
  TO_VALIDATE,
  DEMANDE_COMPENSATION,
  DEMANDE_PAIEMENT,
  CANCELED,
} from "../../../utils/choices";
import { AlertModal } from "../../../utils/AlertModal";
import { HOST } from "../../../actions/types";

class NotificationList extends Component {
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
      modalQrCode: false,
      modalAlertModal: false,
      currentQrCode: null,
      isSubmiting: false,
      currentNotif: null,
      confirmCompensation: null,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.Paginate = this.Paginate.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleConfirmCompensation = this.handleConfirmCompensation.bind(this);
    this.handleCancelCompensation = this.handleCancelCompensation.bind(this);
    // alert modal
    this.showModalAlertModal = this.showModalAlertModal.bind(this);
    this.toggleModalAlertModal = this.toggleModalAlertModal.bind(this);
  }

  handleModal = (qrcode) => {
    this.setState({
      ...this.state,
      modalQrCode: !this.state.modalQrCode,
      currentQrCode: qrcode,
    });
    //console.log(qrcode);
  };
  showModalAlertModal = (item, confirmCompensation) => {
    this.setState({
      ...this.state,
      modalAlertModal: true,
      currentNotif: { ...item },
      confirmCompensation,
    });
  };
  toggleModalAlertModal = () => {
    this.setState({
      ...this.state,
      modalAlertModal: !this.state.modalAlertModal,
      currentNotif: null,
      confirmCompensation: null,
    });
  };

  componentDidMount() {
    this.props.getNotifications(showAlert);
    //this.Paginate([...fetchData], this.state.totalRowsPerPage);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (
      nextProps.notifications.loading === false &&
      //nextProps.notifications.payload !== this.state.data &&
      this.state.init
    ) {
      console.log(" sync notifications props with state  ...");
      this.Paginate(
        [...nextProps.notifications.payload],
        this.state.totalRowsPerPage
      );
    }

    if (
      nextProps.notifications.loading === true &&
      this.props.notifications.loading === false
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

  handleConfirmCompensation(item) {
    this.setState({
      ...this.state,
      isSubmiting: true,
      modalAlertModal: false,
      currentNotif: null,
      confirmCompensation: null,
    });

    validCompensation(
      {
        confirm: true,
        agence: item.transaction.agence.id,
        transaction: item.transaction.id,
        notif: item.id,
      },
      showAlert,
      this.props.access
    ).then((res) => {
      if (res) {
        this.props.getNotifications(showAlert);
      }
      this.setState({
        ...this.state,
        isSubmiting: false,
      });
    });
  }

  handleCancelCompensation(item) {
    this.setState({
      ...this.state,
      isSubmiting: true,
      modalAlertModal: false,
      currentNotif: null,
      confirmCompensation: null,
    });

    validCompensation(
      {
        confirm: false,
        agence: item.transaction.agence.id,
        transaction: item.transaction.id,
        notif: item.id,
      },
      showAlert,
      this.props.access
    ).then((res) => {
      if (res) {
        this.props.getNotifications(showAlert);
      }
      this.setState({
        ...this.state,
        isSubmiting: false,
      });
    });
  }
  render() {
    const notifications = this.props.notifications.loading ? (
      <SkeletonCard />
    ) : (
      <>
        {this.state.current.length === 0 ? (
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
              <Card className="card-box mb-3" key={item.id}>
                <div className={`card-indicator bg-primary`} />
                <CardBody className="px-4 py-3">
                  <div className="d-none d-sm-block">
                    <div className="pb-3 d-flex justify-content-between">
                      <a
                        href="#/"
                        className="font-size-xl text-black"
                        onClick={(e) => e.preventDefault()}
                      >
                        {item.status}
                      </a>
                      {item.status === DEMANDE_PAIEMENT &&
                        item.transaction &&
                        item.transaction?.livraison && (
                          <div className="px-2">
                            <Badge color="success" className="px-2">
                              Livraison
                            </Badge>
                          </div>
                        )}
                      <div className="ml-auto font-size-sm text-primary">
                        <FontAwesomeIcon
                          icon={["far", "clock"]}
                          className="mr-1"
                        />
                        {item.date}
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-sm-block">
                    <div className="d-flex justify-content-between">
                      <div className="text-justify font-size-lg">
                        {item.message}
                      </div>

                      {item.qrcode && (
                        <div className="pl-3 ml-auto">
                          <Button
                            color="primary"
                            className="py-1 px-3"
                            onClick={() => this.handleModal(item.qrcode)}
                          >
                            <div className="font-size-sm text-white">
                              <FontAwesomeIcon icon={["fas", "qrcode"]} />
                            </div>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* mobile format */}
                  <div className="d-sm-none d-block ">
                    <a
                      href="#/"
                      className="font-size-xl text-black pb-2"
                      onClick={(e) => e.preventDefault()}
                    >
                      {item.status}
                    </a>

                    <div className="font-size-sm text-primary">
                      <FontAwesomeIcon
                        icon={["far", "clock"]}
                        className="mr-1"
                      />
                      {item.date}
                    </div>
                    {item.status === DEMANDE_PAIEMENT &&
                      item.transaction &&
                      item.transaction?.livraison && (
                        <div className="pb-1">
                          <Badge color="success" className="px-2">
                            Livraison
                          </Badge>
                        </div>
                      )}
                  </div>
                  <div className="d-sm-none d-block ">
                    <div className="text-justify">{item.message}</div>
                    {item.qrcode && (
                      <div>
                        <Button
                          color="primary"
                          className="py-1 px-3"
                          onClick={() => this.handleModal(item.qrcode)}
                        >
                          <div className="font-size-sm text-white">
                            <FontAwesomeIcon icon={["fas", "qrcode"]} />
                          </div>
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* comfirm and reject compensation */}
                  {item.transaction &&
                    item.transaction?.status &&
                    item.transaction.status === TO_VALIDATE &&
                    item.status === DEMANDE_COMPENSATION && (
                      <div className="d-flex justify-content-between pt-3">
                        <div className="mr-auto">
                          <Button
                            color="danger"
                            className="py-1 px-3"
                            disabled={this.state.isSubmiting}
                            onClick={() =>
                              this.showModalAlertModal(item, false)
                            }
                          >
                            <div className="font-size-sm text-white">
                              {this.state.isSubmiting
                                ? " En cours ... "
                                : "Rejeter"}
                            </div>
                          </Button>
                        </div>
                        <div className="ml-auto">
                          <Button
                            color="success"
                            className="py-1 px-3"
                            disabled={this.state.isSubmiting}
                            onClick={() => this.showModalAlertModal(item, true)}
                          >
                            <div className="font-size-sm text-white">
                              {this.state.isSubmiting
                                ? " En cours ... "
                                : "Confirmer"}
                            </div>
                          </Button>
                        </div>
                      </div>
                    )}

                  {/*
                  {item.transaction &&
                    item.transaction?.status &&
                    item.transaction.status === CANCELED &&
                    item.status === DEMANDE_COMPENSATION && (
                      <div className="d-flex justify-content-between">
                        <Badge color="danger" className="px-3 ml-auto">
                          Transaction Annulée
                        </Badge>
                      </div>
                    )}
                  */}
                </CardBody>
              </Card>
            );
          })
        )}
      </>
    );
    return (
      <>
        <Card className="card-box mb-5 bg-white">
          <div className="px-3 py-4">
            <div className="rounded bg-white ">
              {notifications}
              <Modal
                zIndex={2000}
                centered
                size="sm"
                isOpen={this.state.modalQrCode}
                toggle={() => this.handleModal(null)}
                contentClassName="border-0"
              >
                {this.state.currentQrCode && (
                  <div className="p-2">
                    {/*console.log(HOST, this.state.currentQrCode.substring(1))*/}
                    <img
                      src={HOST + this.state.currentQrCode.substring(1)}
                      alt="img"
                      width="100%"
                    />
                  </div>
                )}
              </Modal>
              <AlertModal
                toggleAlertModal={this.toggleModalAlertModal}
                alertModal={this.state.modalAlertModal}
                item={this.state.currentNotif}
                title={"Vous êtes sûr de cette action ?"}
                confirm={"Confimer"}
                cancel={"Annuler"}
                actionConfirm={this.handleConfirmCompensation}
                actionCancel={this.handleCancelCompensation}
                confirmOrCancel={this.state.confirmCompensation}
              />
              {!this.props.notifications.loading &&
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
            </div>
          </div>
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notification.notifications,
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, {
  getNotifications,
})(NotificationList);
