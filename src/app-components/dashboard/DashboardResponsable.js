import React, { Component } from "react";
import DashboardAmount from "./DashboardAmount";
import Tabs from "./Tabs";
import TransactionsHistory from "./TransactionsHistory";
import Charts from "./Chart";
import EmployeGrid from "./EmployeGrid";

export class DashboardResponsable extends Component {
  render() {
    return (
      <>
        <DashboardAmount></DashboardAmount>
        <Tabs></Tabs>
        <TransactionsHistory></TransactionsHistory>
        <EmployeGrid></EmployeGrid>
        <Charts></Charts>
      </>
    );
  }
}

export default DashboardResponsable;
