import React, { useState } from "react";
import Dashboard from "./Dashboard";
import History from "./History";

export default function RechargeCredit() {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);
  return (
    <>
      <Dashboard />
      <History modalAjoutCredit={modal} handleModalAjoutCredit={handleModal} />
    </>
  );
}
