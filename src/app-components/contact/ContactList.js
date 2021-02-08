import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Input,
  Card,
  Badge,
  Button,
  CardBody,
  ListGroup,
  ListGroupItem,
  Progress,
  Col,
  Row,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import RcPagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/fr_FR";
import { PaginateData } from "../../utils/dataTable";
import avatar6 from "../../assets/images/digi.ico";
// responsiblite of cards
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
class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      init: true,
      //totalPage: 1,
      totalRowsPerPage: 10,
      totalData: 0,
      page: 1,
      current: [],
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.Paginate = this.Paginate.bind(this);
  }
  componentDidMount() {
    //this.props.getTransactions(true, showAlert);
    this.Paginate([...fetchData], this.state.totalRowsPerPage);
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
    return (
      <>
        <Row className="d-flex justify-content-center ">
          <Col xl="4" md="6" sm="8" xs="12">
            <Card className=" mb-3 bg-white">
              <div className="px-3 py-1">
                <div className="rounded bg-white ">
                  <ListGroup flush>
                    <ListGroupItem className="text-center px-4 py-2 d-block d-flex flex-column justify-content-between align-items-center">
                      <div className="d-flex justify-content-between align-items-center ">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-size-xl mx-0 my-2 font-weight-normal"
                        >
                          DigiPay
                        </a>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="avatar-icon-wrapper"
                        >
                          <div className="d-block p-0 avatar-icon-wrapper m-0 d-100">
                            <Badge
                              color="success"
                              className="badge-circle p-top-a"
                            >
                              Online
                            </Badge>
                            <div className="rounded overflow-hidden">
                              <img
                                alt="..."
                                className="img-fluid"
                                src={avatar6}
                              />
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="divider mb-3" />
                      <div className="d-flex flex-column justify-content-between align-items-center ppt2">
                        <div className="pb-1">
                          <FontAwesomeIcon
                            icon={["far", "envelope"]}
                            className="mr-2"
                          />
                          <span className="text-black-50 ">
                            contact1@gmail.com
                          </span>
                        </div>
                        <div className="pb-1">
                          <FontAwesomeIcon
                            icon={["fa", "globe-europe"]}
                            className="mr-2"
                          />
                          <span className="text-black-50 ">
                            www.contact1.com
                          </span>
                        </div>
                        <div className="pb-1">
                          <FontAwesomeIcon
                            icon={["far", "map"]}
                            className="mr-2"
                          />
                          <span className="text-black-50">
                            Nouakchott, Mauritanie
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-column justify-content-between align-items-center ppt2">
                        <div className="pb-1">
                          <FontAwesomeIcon
                            icon={["fa", "phone-square-alt"]}
                            className="mr-2"
                          />
                          <span className="text-black-50 ">+222 235698422</span>
                        </div>

                        <div className="pb-1">
                          <FontAwesomeIcon
                            icon={["fab", "whatsapp"]}
                            className="mr-2"
                          />
                          <span className="text-black-50 ">+222 235698422</span>
                        </div>
                        <div className="pb-1">
                          <FontAwesomeIcon
                            icon={["fab", "facebook"]}
                            className="mr-2"
                          />
                          <span className="text-black-50 ">
                            contact1.facebook.com
                          </span>
                        </div>

                        <div className="pb-1">
                          <FontAwesomeIcon
                            icon={["fab", "linkedin"]}
                            className="mr-2"
                          />
                          <span className="text-black-50">
                            linkedin/55478gygdrc4
                          </span>
                        </div>
                        <div className="pb-3 pt-1 py-xl-0">
                          <Button
                            color="primary"
                            size="sm"
                            className="shadow-none mr-2 text-uppercase font-size-xs font-weight-bold"
                          >
                            Profil
                          </Button>
                        </div>
                      </div>
                    </ListGroupItem>
                  </ListGroup>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        {/*<Card className="p-1 card-box">
          <Row>
            <Col xl="12">
              <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
                <RcPagination
                  defaultPageSize={this.state.totalRowsPerPage}
                  onChange={this.handleChangePage}
                  current={this.state.page}
                  total={this.state.totalData}
                  locale={localeInfo}
                />
              </div>
            </Col>
          </Row>
    </Card>*/}
      </>
    );
  }
}

export default ContactList;

/* <Row>
  <Col xl="4">
    <Card className="card-box mb-5 bg-white">
      <div className="px-3 py-4">
        <div className="rounded bg-white ">
          <ListGroup flush>
            <ListGroupItem className="text-center text-xl-left p-4 d-block d-flex justify-content-between align-items-start">
              <a
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="avatar-icon-wrapper mr-0 mr-xl-3"
              >
                <div className="d-block p-0 avatar-icon-wrapper m-0 d-100">
                  <Badge
                    color="success"
                    className="badge-circle p-top-a"
                  >
                    Online
                  </Badge>
                  <div className="rounded overflow-hidden">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={avatar6}
                    />
                  </div>
                </div>
              </a>
              <div className="d-flex flex-grow-1 pl-1 flex-column">
                <div className="d-flex flex-column justify-content-between">
                  <div>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="font-size-lg mx-0 my-3 my-xl-0 font-weight-bold p-0"
                    >
                      Contact 1
                    </a>
                    <div className="">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "envelope"]}
                          className="mr-2"
                        />
                        <span className="text-black-50">
                          contact1@gmail.com
                        </span>
                      </div>
                      <div>
                        <FontAwesomeIcon
                          icon={["fa", "globe-europe"]}
                          className="mr-2"
                        />
                        <span className="text-black-50">
                          www.contact1.com
                        </span>
                      </div>
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "map"]}
                          className="mr-2"
                        />
                        <span className="text-black-50">
                          Nouakchott, Mauritanie
                        </span>
                      </div>
                    </div>
                    <div className="">
                      <div>
                        <FontAwesomeIcon
                          icon={["fa", "phone-square-alt"]}
                          className="mr-2"
                        />
                        <span className="text-black-50">
                          +222 235698422
                        </span>
                      </div>

                      <div>
                        <FontAwesomeIcon
                          icon={["fab", "whatsapp"]}
                          className="mr-2"
                        />
                        <span className="text-black-50">
                          +222 235698422
                        </span>
                      </div>
                      <div>
                        <FontAwesomeIcon
                          icon={["fab", "facebook"]}
                          className="mr-2"
                        />
                        <span className="text-black-50">
                          contact1.facebook.com
                        </span>
                      </div>

                      <div>
                        <FontAwesomeIcon
                          icon={["fab", "linkedin"]}
                          className="mr-2"
                        />
                        <span className="text-black-50">
                          linkedin/55478gygdrc4
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="divider mb-3 mb-xl-0" />
                  <div className="pb-3 pt-1 py-xl-0">
                    <Button
                      color="primary"
                      size="sm"
                      className="shadow-none mr-2 text-uppercase font-size-xs font-weight-bold"
                    >
                      Profil
                    </Button>
                  </div>
                </div>
                <Row className="d-flex align-items-center">
                  <Col lg="12">
                    
                  </Col>
                </Row>
              </div>
            </ListGroupItem>

            
          </ListGroup>

          <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
            <RcPagination
              defaultPageSize={this.state.totalRowsPerPage}
              onChange={this.handleChangePage}
              current={this.state.page}
              total={this.state.totalData}
              locale={localeInfo}
            />
          </div>
        </div>
      </div>
    </Card>
  </Col>
</Row>
*/
