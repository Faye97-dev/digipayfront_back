import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card } from "reactstrap";
import CountUp from "react-countup";
import TabsVendor from "./TabsVendor";
import TransactionsVendor from "./TransactionsVendor";

class DashboardVendor extends Component {
  render() {
    return (
      <>
        <DashboardAmount></DashboardAmount>
        <TabsVendor></TabsVendor>
        <TransactionsVendor></TransactionsVendor>
      </>
    );
  }
}

export default DashboardVendor;

function DashboardAmount() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <Col xs="12" lg="10" xl="8">
          <Card className="card-box mb-5">
            <div className="card-content-overlay text-center py-4">
              <div className="d-70 rounded-circle bg-primary text-white btn-icon mx-auto text-center shadow-primary">
                <FontAwesomeIcon
                  icon={["fas", "money-bill"]}
                  className="display-4"
                />
              </div>
              <div className="font-weight-bold text-black display-3 mt-4 mb-1">
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
                        <Col xl="5" md="12">
                          <div className="py-2 px-2">
                            <div className="p-4 text-center">
                              <div className="display-4 text-primary font-weight-bold">
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
                                Paiements
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xl="5" md="12" className="ml-auto">
                          <div className="py-2 px-2">
                            <div className="p-4 text-center">
                              <div className="display-4 text-success font-weight-bold">
                                <span>
                                  <CountUp
                                    start={0}
                                    end={17}
                                    duration={4}
                                    separator=""
                                    suffix=""
                                  />
                                </span>
                              </div>
                              <div className="font-size-lg  text-black">
                                Nombre de paiements
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
      </div>
    </>
  );
}
