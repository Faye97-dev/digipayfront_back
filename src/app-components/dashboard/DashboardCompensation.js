import React, { Component, useState, useEffect } from "react";
//import DashboardAmount from "./DashboardAmount";
import FormCompensation from "./FormCompensation";
import TransactionsCompensation from "./TransactionsCompensation";
import Clotures from "./Clotures";
import Charts from "./Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, Button } from "reactstrap";
import CountUp from "react-countup";
import AgenceStatusList from "../agence/AgenceStatusList";
import { connect } from "react-redux";
import { updateSolde_clientDigipay } from "../../actions/async";
import { UPDATE_SOLDE_AGENT } from "../../actions/types";

class DashboardCompensation extends Component {
  render() {
    return (
      <>
        <DashboardAmount {...this.props} />
        <FormCompensation></FormCompensation>
        <AgenceStatusList />
        <br /> <br />
        <TransactionsCompensation />
        <Charts labelPrimary="Versements"></Charts>
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
      <div className="d-flex justify-content-center ">
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
              </div>
            ) : (
              "* * * * *"
            )}
          </div>
          <div className="font-size-xl text-black ">Solde</div>
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
            type: UPDATE_SOLDE_AGENT,
            payload: res,
          });
        }
      });
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardCompensation);
