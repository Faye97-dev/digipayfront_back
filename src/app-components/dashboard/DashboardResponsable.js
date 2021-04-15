import React, { Component } from "react";
import DashboardAmount from "./DashboardAmount";
import Tabs from "./Tabs";
import TransactionsHistory from "./TransactionsHistory";
import TransactionsCompensation from "./TransactionsCompensation";
import Charts from "./Chart";
import EmployeGrid from "./EmployeGrid";

class DashboardResponsable extends Component {
  render() {
    return (
      <>
        <DashboardAmount></DashboardAmount>
        <Tabs></Tabs>
        <TransactionsHistory></TransactionsHistory>
        {/*<br />
          <br />
          <TransactionsCompensation />*/}
        <EmployeGrid></EmployeGrid>
        <Charts></Charts>
      </>
    );
  }
}

export default DashboardResponsable;
