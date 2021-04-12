import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, Button } from "reactstrap";
import { connect } from "react-redux";
import CountUp from "react-countup";
import { updateSolde } from "../../actions/async";
import { UPDATE_SOLDE } from "../../actions/types";

function DashboardAmount(props) {
  const [showAmout, setShowAmout] = useState(false);
  useEffect(() => {
    props.updateSolde(props.user.agence, props.access);
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center ">
        {/*<Col xl="4">
          <Temp {...props} />
          </Col>*/}
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
      {/* xs="12" sm="9" md="7" */}
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
          {/* pb-2 pt-4 */}
          <div className="d-70 rounded-circle bg-primary text-white btn-icon mx-auto text-center shadow-primary">
            <FontAwesomeIcon
              icon={["fas", "money-bill"]}
              className="display-4"
            />
          </div>
          <div className="font-weight-bold font-size-xl text-black display-3 mt-4 mb-1">
            {props.showAmout ? (
              <CountUp
                start={0}
                end={props.user && props.user.agence.solde}
                duration={2}
                separator=""
                suffix=" MRU"
              />
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
                                end={
                                  props.user &&
                                  props.user.agence.solde -
                                    props.user.agence.frais
                                }
                                duration={2}
                                separator=""
                                suffix=" MRU"
                              />
                            </span>
                          </div>
                          <div className="font-size-sm text-black">
                            {props.labelPrimary || "Transferts"}
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
                                end={props.user && props.user.agence.retrait}
                                duration={2}
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
        */}
        </div>
      </Card>
    </Col>
  );
}

function XlFormat(props) {
  return (
    <Col xl="5" className="d-none d-xl-block">
      {/* xl=7 */}
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
          {/* pb-2 pt-4 */}

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
                end={props.user && props.user.agence.solde}
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
                                end={
                                  props.user &&
                                  props.user.agence.solde -
                                    props.user.agence.frais
                                }
                                duration={2}
                                separator=""
                                suffix=" MRU"
                              />
                            </span>
                          </div>
                          <div className="font-size-lg text-black">
                            {props.labelPrimary || "Transferts"}
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
                                end={props.user && props.user.agence.retrait}
                                duration={2}
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
        */}
        </div>
      </Card>
    </Col>
  );
}

function Temp(props) {
  return (
    <Card className="card-box border-0 shadow-success-sm p-4 mb-2">
      <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-3 justify-content-center">
        <FontAwesomeIcon
          icon={["far", "dot-circle"]}
          className="font-size-sm text-warning mr-2"
        />
        <div className="font-size-xl">1.500.296</div>
      </div>
      <div className="text-black-50 text-center pt-3">Votre solde en MRU</div>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
});

const mapDispatchToProps = (dispatch) => ({
  updateSolde: (agence, access) => {
    if (agence) {
      updateSolde(agence.id, access).then((res) => {
        if (res) {
          dispatch({
            type: UPDATE_SOLDE,
            payload: res,
          });
        }
      });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAmount);

//export default connect(mapStateToProps, {})(DashboardAmount);
