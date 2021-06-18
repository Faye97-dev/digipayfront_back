import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, Button } from "reactstrap";
import CountUp from "react-countup";
import TabsClient from "./TabsClient";
import TransactionsClient from "./TransactionsClient";
import RechargeCredit from "./RechargeCredit";
import { connect } from "react-redux";
import { updateSolde_clientDigipay } from "../../actions/async";
import { UPDATE_SOLDE_CLIENT_DIGIPAY } from "../../actions/types";
import DemoAgGrid from "./DemoAgGrid";
import ClientFacturePayement from "./ClientFacturePayement";

class DashboardClient extends Component {
  render() {
    return (
      <>
        <DashboardAmount {...this.props}></DashboardAmount>
        <TabsClient></TabsClient>
        {/*<div className="d-none d-xl-block">*/}
        <ClientFacturePayement />
        <RechargeCredit></RechargeCredit>
        {/*</div>*/}
        <TransactionsClient></TransactionsClient>
        {/*<DemoAgGrid />*/}
      </>
    );
  }
}

function DashboardAmount(props) {
  const [showAmout, setShowAmout] = useState(false);
  useEffect(() => {
    props.updateSolde(props.user, props.access);
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center">
        <XlFormat
          {...props}
          showAmout={showAmout}
          setShowAmout={setShowAmout}
        />
        <SmallFormat
          {...props}
          showAmout={showAmout}
          setShowAmout={setShowAmout}
        />
      </div>
    </>
  );
}

function SmallFormat(props) {
  return (
    <Col xs="11" sm="8" md="7" className="d-block d-xl-none">
      <Card className="card-box mb-4">
        <div className="my-3 mx-3">
          <Button
            color="secondary"
            outline
            className="d-flex align-items-center justify-content-center border-0 d-30 mr-2 px-4"
            onClick={() => props.setShowAmout(!props.showAmout)}
            title={
              props.showAmout ? "Cacher votre solde" : "Afficher votre solde"
            }
          >
            {props.showAmout ? (
              <FontAwesomeIcon
                icon={["fas", "eye-slash"]}
                className="display-5 text-primary"
              />
            ) : (
              <FontAwesomeIcon
                icon={["fas", "eye"]}
                className="display-5 text-primary"
              />
            )}
          </Button>
        </div>
        <div className="card-content-overlay text-center pb-5 pt-1">
          <div className="d-70 rounded-circle bg-primary text-white btn-icon mx-auto text-center shadow-primary">
            <FontAwesomeIcon
              icon={["fas", "money-bill"]}
              className="display-4"
            />
          </div>
          <div className="font-weight-bold font-size-xl text-black display-3 mt-4 mb-1">
            {props.showAmout ? (
              <div className="d-flex align-items-center justify-content-center">
                <CountUp
                  start={0}
                  end={props.user && props.user.solde}
                  duration={2}
                  separator=""
                  suffix=" MRU"
                />
                {/*<div className="font-weight-normal font-size-md text-danger pl-2">
                  <CountUp
                    start={0}
                    end={props.user && props.user.on_hold}
                    duration={2}
                    separator=""
                    prefix="(- "
                    suffix=" MRU)"
                  />
                  </div>*/}
              </div>
            ) : (
              "* * * * *"
            )}
          </div>
          <div className="font-size-xl text-black ">Solde</div>

          {/*<div className="text-center">
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
                                end={0}
                                duration={2}
                                separator=""
                                suffix=" MRU"
                              />
                            </span>
                          </div>
                          <div className="font-size-sm text-black">
                            {"Recharges"}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md="5" xs="6" className=" ml-md-auto">
                      <div className="py-3 ">
                        <div className=" pt-3 text-center ">
                          <div className="display-4 text-danger font-size-sm font-weight-bold">
                            <span>
                              <CountUp
                                start={0}
                                end={0}
                                duration={2}
                                separator=""
                                suffix=" MRU"
                              />
                            </span>
                          </div>
                          <div className="font-size-sm  text-black">
                            Paiements
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        */}
        </div>
      </Card>
    </Col>
  );
}

function XlFormat(props) {
  return (
    <Col xl="5" className="d-none d-xl-block">
      <Card className="card-box mb-4">
        <div className="my-3 mx-3">
          <Button
            color="secondary"
            outline
            className="d-flex align-items-center justify-content-center border-0 d-30 mr-2 px-4"
            onClick={() => props.setShowAmout(!props.showAmout)}
            title={
              props.showAmout ? "Cacher votre solde" : "Afficher votre solde"
            }
          >
            {props.showAmout ? (
              <FontAwesomeIcon
                icon={["fas", "eye-slash"]}
                className="display-5 text-primary"
              />
            ) : (
              <FontAwesomeIcon
                icon={["fas", "eye"]}
                className="display-5 text-primary"
              />
            )}
          </Button>
        </div>
        <div className="card-content-overlay text-center pb-5 pt-1">
          <div className="d-70 rounded-circle bg-primary text-white btn-icon mx-auto text-center shadow-primary">
            <FontAwesomeIcon
              icon={["fas", "money-bill"]}
              className="display-4"
            />
          </div>
          <div className="font-weight-bold font-size-xxl text-black display-3 mt-4 mb-1">
            {props.showAmout ? (
              <CountUp
                start={0}
                end={props.user && props.user.solde}
                duration={2}
                separator=""
                suffix=" MRU"
              />
            ) : (
              "* * * * *"
            )}
          </div>
          <div className="font-size-xxl text-black ">Solde</div>

          {/*<div className="text-center">
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
                                end={0}
                                duration={2}
                                separator=""
                                suffix=" MRU"
                              />
                            </span>
                          </div>
                          <div className="font-size-lg text-black">
                            {"Recharges"}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xl="5" className="ml-xl-auto ">
                      <div className="py-3 px-xl-2">
                        <div className="px-xl-3 pt-3 text-center ">
                          <div className="display-4 text-danger font-size-lg font-weight-bold">
                            <span>
                              <CountUp
                                start={0}
                                end={0}
                                duration={2}
                                separator=""
                                suffix=" MRU"
                              />
                            </span>
                          </div>
                          <div className="font-size-lg  text-black">
                            Paiements
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        */}
        </div>
      </Card>
    </Col>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
});

const mapDispatchToProps = (dispatch) => ({
  updateSolde: (user, access) => {
    if (user) {
      updateSolde_clientDigipay(user.id, access).then((res) => {
        if (res) {
          dispatch({
            type: UPDATE_SOLDE_CLIENT_DIGIPAY,
            payload: res,
          });
        }
      });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardClient);
