import React from "react";
import ModalAddGrpPayement from "./ModalAddGrpPayement";
import BulkPayementHistory from "./BulkPayementHistory";
//import moduleName from 'Bulk'

export default function BulkPayement() {
  return (
    <div>
      <ModalAddGrpPayement />
      <BulkPayementHistory />
    </div>
  );
}
