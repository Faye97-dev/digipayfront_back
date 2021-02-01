import React, { Component } from "react";
import EmployeGrid from "./EmployeGrid";
import DashboardAmount from "./DashboardAmount";
import TransactionsHistory from "./TransactionsHistory";
import Chart from "./Chart";
import TopAgenceEmploye from "./SysAdmin/TopAgenceEmploye";
import Progress, { HeaderProgress } from "./SysAdmin/Progress";
import Messenger from "./SysAdmin/Messenger";

export class DashboardSysAdmin extends Component {
  render() {
    return (
      <>
        <HeaderProgress />
        <TransactionsHistory></TransactionsHistory>
        <TopAgenceEmploye></TopAgenceEmploye>
        <Chart />
        <Progress />
        <Messenger />
        <EmployeGrid />
      </>
    );
  }
}

export default DashboardSysAdmin;
