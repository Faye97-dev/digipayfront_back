import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, Button, Modal } from "reactstrap";
import RcPagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/fr_FR";
import { PaginateData } from "../../utils/dataTable";
import { getNotifications } from "../../actions/notification";
import empty from "../../assets/images/empty.png";
import { showAlert } from "../../utils/alerts";
import { connect } from "react-redux";
import { SkeletonCard } from "../../utils/SkeletonLoader";
const fetchData = [
  {
    id: 1,
    from: "42158976",
    date: "13-11-2020 16:59",
    style: "warning",
    msg: "Vous avez envoye 500.0 pour le client dont le numero est : 42158976",
  },
  {
    id: 2,
    from: "2015786",
    date: "12-11-2020 12:59",
    style: "primary",
    msg: "Vous avez retire 6200.0 pour le client dont le numero est : 2015786",
  },
  {
    id: 3,
    from: "20171400",
    date: "28-10-2020 10:21",
    style: "warning",
    msg: "Vous avez envoye 250.0 pour le client dont le numero est : 20171400",
  },
  {
    id: 4,
    from: "20101410",
    date: "25-10-2020 20:12",
    style: "primary",
    msg: "Vous avez retire 500.0 pour le client dont le numero est : 20101410",
  },
];
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
      currentQrCode: null,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.Paginate = this.Paginate.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal = (qrcode) => {
    this.setState({
      ...this.state,
      modalQrCode: !this.state.modalQrCode,
      currentQrCode: qrcode,
    });
    //console.log(qrcode);
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
                      {/*<Badge color="first" className="px-3 mx-2">
                      On hold
                      </Badge>*/}
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
                <div className="p-2">
                  <img src={this.state.currentQrCode} alt="img" width="100%" />
                </div>
              </Modal>
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
});

export default connect(mapStateToProps, {
  getNotifications,
})(NotificationList);
