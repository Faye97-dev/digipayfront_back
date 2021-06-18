import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "reactstrap";
import { SyncLoader } from "react-spinners";
//import { client_cloturer_cagnote } from "../../../actions/cagnote";
import { connect } from "react-redux";
import Badge from "reactstrap/lib/Badge";
//import { showAlert } from "../../../utils/alerts";
import FormSomelecPay from "./FormSomelecPay";

function ModalSomelecPay(props) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal
        zIndex={2000}
        size={props.item ? "md" : "sm"}
        centered
        isOpen={props.modalSomelec}
        toggle={() => props.handleModalSomelec(null)}
      >
        <div className="text-center px-4 pb-2">
          {props.item ? (
            <>
              <h5 className="font-weight-normal mt-4 text-center">
                Vous confirmez le paiement de la facture de la somelec
                <Badge className="mx-1" color="primary">
                  {"N° "}
                  {props.item.reference}
                </Badge>
                estimée a
                <Badge className="mx-1" color="primary">
                  {props.item.solde}
                  {" MRU"}
                </Badge>
                pour le client
                <Badge className="mx-1" color="primary">
                  {props.item.nom_complet}
                </Badge>
                ?
              </h5>

              <FormSomelecPay
                modalSomelec={props.modalSomelec}
                handleModalSomelec={props.handleModalSomelec}
                handleModalOperationDone={props.handleModalOperationDone}
                item={props.item}
                loading={loading}
                setLoading={setLoading}
              />
            </>
          ) : (
            props.modalSomelec && (
              <>
                <h5 className="font-weight-normal mt-4 text-center">
                  Opération terminée !
                </h5>
                <div className="avatar-icon-wrapper rounded-circle m-0">
                  <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-success text-white m-0 d-90">
                    <FontAwesomeIcon
                      icon={["fas", "check"]}
                      className="d-flex align-self-center display-3"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center py-3">
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => props.handleModalSomelec(null)}
                    disabled={props.loading}
                  >
                    Fermer
                  </Button>
                </div>
              </>
            )
          )}
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(ModalSomelecPay);
