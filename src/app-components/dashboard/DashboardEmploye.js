import React, { Component } from "react";
import Tabs from "./Tabs";
import TransactionsHistory from "./TransactionsHistory";

export class DashboardEmploye extends Component {
  render() {
    return (
      <>
        <Tabs></Tabs>
        <TransactionsHistory></TransactionsHistory>
      </>
    );
  }
}

export default DashboardEmploye;
