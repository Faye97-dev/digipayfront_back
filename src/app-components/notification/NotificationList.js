import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Card, Badge, Button, CardBody } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import RcPagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/fr_FR";
import { PaginateData } from "../../utils/dataTable";
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
        <Card className="card-box mb-5 bg-white">
          <div className="px-3 py-4">
            <div className="rounded bg-white ">
              {/*<PerfectScrollbar>*/}
              {this.state.current.map((item) => {
                return (
                  <Card className="card-box mb-3" key={item.id}>
                    <div className={`card-indicator bg-${item.style}`} />
                    <CardBody className="px-4 py-3">
                      <div className="d-none d-sm-block">
                        <div className=" pb-3 d-flex justify-content-between">
                          <a
                            href="#/"
                            className="font-size-xl text-black"
                            onClick={(e) => e.preventDefault()}
                          >
                            {item.from}
                          </a>
                          <div className="ml-auto font-size-sm text-primary px-2">
                            <FontAwesomeIcon
                              icon={["far", "clock"]}
                              className="mr-1"
                            />
                            {item.date}
                          </div>
                        </div>
                      </div>
                      <div className="d-sm-none d-block ">
                        <a
                          href="#/"
                          className="font-size-xl text-black pb-2"
                          onClick={(e) => e.preventDefault()}
                        >
                          {item.from}
                        </a>
                        <div className="font-size-sm text-primary py-2">
                          <FontAwesomeIcon
                            icon={["far", "clock"]}
                            className="mr-1"
                          />
                          {item.date}
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-start text-justify">
                        {/*<Badge color="first" className="px-3 mx-2">
                          On hold
                          </Badge>*/}
                        {item.msg}
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
              {/*</PerfectScrollbar>*/}
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
      </>
    );
  }
}

export default NotificationList;
