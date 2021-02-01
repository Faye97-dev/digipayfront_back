import React, { Component } from "react";
import DashboardAmount from "./DashboardAmount";
import FormCompensation from "./FormCompensation";
import TransactionsCompensation from "./TransactionsCompensation";
import Clotures from "./Clotures";
import Charts from "./Chart";

export class DashboardCompensation extends Component {
  render() {
    return (
      <>
        <DashboardAmount labelPrimary="Total de versements" />
        <FormCompensation></FormCompensation>
        <Clotures />
        <br /> <br />
        <TransactionsCompensation />
        <Charts labelPrimary="Versements"></Charts>
      </>
    );
  }
}

export default DashboardCompensation;
