import React, { useEffect, useState } from "react";

import { SyncLoader } from "react-spinners";
import { Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getBeneficiairesGrpPayement } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalEditBeneficiaire from "./ModalEditBeneficiaire";

export default function ListBeneficiaires(props) {
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [beneficiaires, setBeneficiaire] = useState([]);
  const setBeneficiaire_after_update = (val) => {
    const temp = beneficiaires.map((item) => {
      if (item.id === val.id) {
        return { ...val };
      } else {
        return item;
      }
    });
    return setBeneficiaire(temp);
  };

  const [modalEditBeneficiaire, setModalEditBeneficiaire] = useState(false);
  const handleModalEditBeneficiaire = (item = null) => {
    setCurrentItem(item);
    setModalEditBeneficiaire(!modalEditBeneficiaire);
  };

  useEffect(() => {
    setLoading(true);
    getBeneficiairesGrpPayement(
      props.grp_payement,
      showAlert,
      props.access
    ).then((res) => {
      if (res) {
        setBeneficiaire(res);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);
  return (
    <>
      {loading ? (
        <div className="p-3">
          <SyncLoader color={"var(--primary)"} loading={true} />
        </div>
      ) : (
        <>
          {beneficiaires.length === 0 ? (
            <span className="p-3">Pas de beneficiaires !</span>
          ) : (
            <>
              <div className="px-1 py-1">
                <div className="scroll-area rounded bg-white shadow-overflow">
                  <PerfectScrollbar>
                    <div className="p-3">
                      {beneficiaires.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="d-flex justify-content-between flex-wrap">
                              <div className="pr-1">
                                <div className="font-size-md font-weight-bold">
                                  <a
                                    href="#/"
                                    onClick={(e) => e.preventDefault()}
                                    className="text-black"
                                  >
                                    {`${item.beneficiaire.first_name} ${item.beneficiaire.last_name}`}
                                  </a>
                                </div>
                              </div>

                              <div className="pr-1">
                                <span className="font-weight-bold text-primary font-size-lg">
                                  {item.montant}
                                </span>
                                <small className="pl-2 text-black">MRU</small>
                              </div>

                              <div>
                                <Button
                                  color="warning btn btn-sm px-2 py-0 mx-1"
                                  outline
                                  disabled={loading}
                                  onClick={() =>
                                    handleModalEditBeneficiaire(item)
                                  }
                                >
                                  <FontAwesomeIcon icon={["fa", "edit"]} />
                                </Button>

                                <Button
                                  color="danger btn btn-sm px-2 py-0 mx-1"
                                  outline
                                  disabled={loading}
                                >
                                  <FontAwesomeIcon icon={["fa", "trash"]} />
                                </Button>
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                          </div>
                        );
                      })}
                    </div>
                  </PerfectScrollbar>
                </div>
              </div>
              <ModalEditBeneficiaire
                modal={modalEditBeneficiaire}
                handleModal={handleModalEditBeneficiaire}
                item={currentItem}
                syncActionToState={setBeneficiaire_after_update}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
