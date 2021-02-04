import React, { Component } from "react";
import TransactionsHistory from "../dashboard/TransactionsHistory";
export class Transaction extends Component {
  render() {
    return (
      <>
        <TransactionsHistory></TransactionsHistory>
      </>
    );
  }
}

export default Transaction;
