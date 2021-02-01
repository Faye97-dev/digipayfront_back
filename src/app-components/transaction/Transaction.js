import React, { Component } from "react";
import TransactionsHistory from "../dashboard/TransactionsHistory";
import TransactionsCompensation from "../dashboard/TransactionsCompensation";
export class Transaction extends Component {
  render() {
    return (
      <>
        <TransactionsHistory></TransactionsHistory>
        <br /> <br />
        <TransactionsCompensation />
      </>
    );
  }
}

export default Transaction;
