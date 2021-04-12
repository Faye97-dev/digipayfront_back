import React, { Component } from "react";
//import DashboardAmount from "./DashboardAmount";
import FormCompensation from "./FormCompensation";
import TransactionsCompensation from "./TransactionsCompensation";
import Clotures from "./Clotures";
import Charts from "./Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, Button } from "reactstrap";
import CountUp from "react-countup";
import AgenceStatusList from "../agence/AgenceStatusList";
class DashboardCompensation extends Component {
  render() {
    return (
      <>
        {/*<DashboardAmount labelPrimary="Total de versements" />*/}
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
  return (
    <>
      <div className="d-flex justify-content-center ">
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
        <div className="card-content-overlay text-center pb-4 pt-4">
          <div className="d-70 rounded-circle bg-primary text-white btn-icon mx-auto text-center shadow-primary">
            <FontAwesomeIcon
              icon={["fas", "money-bill"]}
              className="display-4"
            />
          </div>
          <div className="font-weight-bold font-size-xl text-black display-3 mt-4 mb-1">
            <CountUp
              start={0}
              end={25000}
              duration={2}
              separator=""
              suffix=" MRU"
            />
          </div>
          <div className="font-size-xl text-black ">Solde</div>
        </div>
      </Card>
    </Col>
  );
}

function XlFormat(props) {
  return (
    <Col xl="6" className="d-none d-xl-block">
      <Card className="card-box mb-5">
        <div className="card-content-overlay text-center pb-4 pt-4">
          <div className="d-70 rounded-circle bg-primary text-white btn-icon mx-auto text-center shadow-primary">
            <FontAwesomeIcon
              icon={["fas", "money-bill"]}
              className="display-4"
            />
          </div>
          <div className="font-weight-bold font-size-xxl text-black display-3 mt-4 mb-1">
            <CountUp
              start={0}
              end={25000}
              duration={2}
              separator=""
              suffix=" MRU"
            />
          </div>
          <div className="font-size-xxl text-black ">Solde</div>
        </div>
      </Card>
    </Col>
  );
}

export default DashboardCompensation;
