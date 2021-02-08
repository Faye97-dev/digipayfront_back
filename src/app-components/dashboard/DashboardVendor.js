import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card } from "reactstrap";
import CountUp from "react-countup";
import TabsVendor from "./TabsVendor";
import TransactionsVendor from "./TransactionsVendor";
import ChartVendor from "./ChartVendor";
class DashboardVendor extends Component {
  render() {
    return (
      <>
        <DashboardAmount></DashboardAmount>
        <TabsVendor></TabsVendor>
        <TransactionsVendor></TransactionsVendor>
        <ChartVendor />
      </>
    );
  }
}

export default DashboardVendor;

function DashboardAmount(props) {
  return (
    <>
      <div className="d-flex justify-content-center">
        <XlFormat {...props} />
        <SmallFormat {...props} />
      </div>
    </>
  );
}

function SmallFormat(props) {
  return (
    <Col xs="12" sm="9" md="7" className="d-block d-xl-none">
      <Card className="card-box mb-5">
        <div className="card-content-overlay text-center pb-2 pt-4">
          <div className="d-70 rounded-circle bg-primary text-white btn-icon mx-auto text-center shadow-primary">
            <FontAwesomeIcon
              icon={["fas", "money-bill"]}
              className="display-4"
            />
          </div>
          <div className="font-weight-bold font-size-xl text-black display-3 mt-4 mb-1">
            <CountUp
              start={0}
              end={19045}
              duration={4}
              separator=""
              suffix=" MRU"
            />
          </div>
          <div className="font-size-xl text-black ">Solde</div>

          <div className="text-center">
            <div className="flex-grow-1 w-100 d-flex align-items-center flex-row">
              <div className="bg-composed-wrapper--content p-2">
                <div className="align-self-center">
                  <Row className="row-no-gutters">
                    <Col md="5" xs="6">
                      <div className="py-3 ">
                        <div className="pt-3 pb-0 text-center">
                          <div className="display-4 text-primary font-size-sm font-weight-bold">
                            <span>
                              <CountUp
                                start={0}
                                end={15100}
                                duration={4}
                                separator=""
                                suffix=" MRU"
                              />
                            </span>
                          </div>
                          <div className="font-size-sm text-black">
                            {"Paiements"}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md="5" xs="6" className=" ml-md-auto">
                      <div className="py-3 ">
                        <div className=" pt-3 text-center ">
                          <div className="display-4 text-success font-size-sm font-weight-bold">
                            <span>
                              <CountUp
                                start={0}
                                end={17}
                                duration={4}
                                separator=""
                                suffix=" MRU"
                              />
                            </span>
                          </div>
                          <div className="font-size-sm  text-black">
                            Retraits
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
}

function XlFormat(props) {
  return (
    <Col xl="7" className="d-none d-xl-block">
      <Card className="card-box mb-5">
        <div className="card-content-overlay text-center pb-2 pt-4">
          <div className="d-70 rounded-circle bg-primary text-white btn-icon mx-auto text-center shadow-primary">
            <FontAwesomeIcon
              icon={["fas", "money-bill"]}
              className="display-4"
            />
          </div>
          <div className="font-weight-bold font-size-xxl text-black display-3 mt-4 mb-1">
            <CountUp
              start={0}
              end={19045}
              duration={4}
              separator=""
              suffix=" MRU"
            />
          </div>
          <div className="font-size-xxl text-black ">Solde</div>

          <div className="text-center">
            <div className="flex-grow-1 w-100 d-flex align-items-center flex-row">
              <div className="bg-composed-wrapper--content p-2">
                <div className="align-self-center">
                  <Row className="row-no-gutters">
                    <Col xl="5">
                      <div className="py-3 px-xl-2">
                        <div className="px-xl-3 pt-3 pb-0 text-center">
                          <div className="display-4 text-primary font-size-lg font-weight-bold">
                            <span>
                              <CountUp
                                start={0}
                                end={15100}
                                duration={4}
                                separator=""
                                suffix=" MRU"
                              />
                            </span>
                          </div>
                          <div className="font-size-lg text-black">
                            {"Paiements"}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xl="5" className="ml-xl-auto ">
                      <div className="py-3 px-xl-2">
                        <div className="px-xl-3 pt-3 text-center ">
                          <div className="display-4 text-success font-size-lg font-weight-bold">
                            <span>
                              <CountUp
                                start={0}
                                end={17145}
                                duration={4}
                                separator=""
                                suffix=" MRU"
                              />
                            </span>
                          </div>
                          <div className="font-size-lg  text-black">
                            Retraits
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
}
