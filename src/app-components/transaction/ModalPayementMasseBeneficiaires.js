import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getBeneficiairesByNumeroGrpPayement } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import { Card, Row, Col, Modal, Button } from "reactstrap";
export default function ModalPayementMasseBeneficiaires(props) {
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    //console.log(props.item);
    if (props.item) {
      setLoading(true);
      getBeneficiairesByNumeroGrpPayement(
        {
          numero_grp_payement: props.item?.transaction?.numero_grp_payement,
          user: props.user.id,
        },
        showAlert,
        props.access
      ).then((res) => {
        if (res) {
          setParticipants(res);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    }
  }, [props.item]);

  return (
    <>
      {props.item && (
        <div className="d-flex align-items-center justify-content-center flex-wrap">
          <Modal
            zIndex={2000}
            centered
            size="lg"
            isOpen={props.modal}
            toggle={() => props.handleModal(null)}
            contentClassName="border-0 bg-gray"
          >
            <Row>
              <Col xl="12">
                <div className=" rounded p-4">
                  <div className="px-0 py-0">
                    <Card className="card-box">
                      <div className="card-header">
                        <span className="font-size-lg mb-0 py-2">
                          Liste des Beneficiaires
                        </span>
                      </div>

                      {loading ? (
                        <div className="p-3">
                          <SyncLoader color={"var(--primary)"} loading={true} />
                        </div>
                      ) : (
                        <>
                          {participants.length === 0 ? (
                            <span className="p-3">Pas de Beneficiaires !</span>
                          ) : (
                            <div className="px-1 py-1">
                              <div className="scroll-area rounded bg-white shadow-overflow">
                                <PerfectScrollbar>
                                  <div className="p-3">
                                    {participants.map((item) => {
                                      return (
                                        <div key={item.id}>
                                          <div className="d-flex justify-content-between flex-wrap">
                                            <div className="py-1 pr-1 ">
                                              <div className="font-size-md font-weight-bold">
                                                <a
                                                  href="#/"
                                                  onClick={(e) =>
                                                    e.preventDefault()
                                                  }
                                                  className="text-black"
                                                >
                                                  {`${item.destinataire.first_name} ${item.destinataire.last_name}`}
                                                </a>
                                              </div>
                                            </div>

                                            <div className="py-1 pr-1">
                                              <span className="font-weight-bold text-primary font-size-lg">
                                                {item.montant}
                                              </span>
                                              <small className="pl-2 text-black">
                                                MRU
                                              </small>
                                            </div>

                                            <div className="py-1 ">
                                              <span className="font-weight-normal text-black font-size-md">
                                                {item.remarque &&
                                                item.remarque !== ""
                                                  ? `"${item.remarque}"`
                                                  : "------"}
                                              </span>
                                            </div>
                                            {/*<div className="py-1 ">
                                              <span className="font-weight-normal text-primary font-size-md">
                                                {item.date_creation}
                                              </span>
                                                </div>*/}
                                          </div>
                                          <div className="divider my-2"></div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </PerfectScrollbar>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </Card>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl="12">
                <div className="d-flex px-4 pb-4">
                  <div className="mr-auto">
                    <Button
                      onClick={() => props.handleModal(null)}
                      block
                      color="danger"
                    >
                      Fermer
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Modal>
        </div>
      )}
    </>
  );
}
