import React, { useState } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Card, Badge, Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { getNotWhitrated } from "../../actions/async";
import { addRetrait } from "../../actions/transaction";
import { connect } from "react-redux";
import { showAlert } from "../../utils/alerts";
import { ClipLoader } from "react-spinners";
function FormRetrait(props) {
  return (
    <>
      <div className="mx-5 my-4">
        <label className="py-2">
          Veuillez saisir le numero de telephone du destinataire pour effectuer
          un retrait
        </label>
        <SearchBar
          agence={props.agence}
          addRetrait={props.addRetrait}
          loading={props.transactions.loading}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  agence: state.auth.user.agence,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, { addRetrait })(FormRetrait);

/*const emptymsg = (
  <div className="d-flex align-items-center align-content-start">
    <span className="font-size-xl d-block d-40 btn-icon mr-3 text-center bg-white text-warning rounded-sm"></span>
    <span>
      <strong className="d-block">Attention!</strong>Pas de retraits disponibles
      pour ce numero de telephone !
    </span>
  </div>
);*/

function SearchBar(props) {
  const [searchStatus5, setSearchStatus5] = useState(false);
  const [listRetraits, setListRetraits] = useState([]);
  const toggleSearch5 = () => setSearchStatus5(!searchStatus5);
  const handleSumbit = (e) => {
    if (e.keyCode === 13) {
      //console.log(e.target.value);
      getNotWhitrated(e.target.value, props.agence.id).then((res) => {
        setListRetraits([...res]);
        if (res.length === 0)
          showAlert(
            "warning",
            "Pas de retraits disponibles pour ce numero de telephone !",
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
        /*toast.warning(emptymsg, {
            containerId: "B",
          });*/
        //alert("Pas de retraits disponibles pour ce numero de telephone !");
      });
      //getNotWhitrated(this.state.value).
    }
  };
  const removeRetrait = (id) => {
    const res = listRetraits.filter((item) => item.id !== id);
    setListRetraits(res);
  };
  return (
    <>
      <div
        className={clsx("search-wrapper  mb-4", {
          "is-active": searchStatus5,
        })}
      >
        <span className="icon-wrapper text-black">
          <FontAwesomeIcon icon={["fas", "search"]} />
        </span>
        <Input
          type="search"
          onFocus={toggleSearch5}
          onBlur={toggleSearch5}
          onKeyDown={handleSumbit}
          defaultValue="2035699"
          placeholder="Rechercher par numero de telephone ..."
        />
      </div>
      <ListRetraits
        data={listRetraits}
        removeRetrait={removeRetrait}
        addRetrait={props.addRetrait}
        loading={props.loading}
      />
    </>
  );
}

function ListRetraits(props) {
  return (
    <>
      {props.data.length !== 0 && (
        <Card className="card-box mb-5 bg-white">
          <div className="px-3 py-4">
            <div className="scroll-area rounded bg-white shadow-overflow">
              <PerfectScrollbar>
                <div className="p-3">
                  {props.data.map((item) => {
                    return (
                      <div key={item.id}>
                        <div className="d-flex justify-content-between">
                          <div className="pl-2">
                            <div className="font-weight-bold">
                              <a
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="text-black"
                              >
                                {item.agence_origine.nom}
                              </a>
                            </div>
                            <small className="d-flex pt-2 align-items-center"></small>
                          </div>
                          <div className="text-center pl-2">
                            <a
                              href="#/"
                              className="font-weight-bold text-black"
                              onClick={(e) => e.preventDefault()}
                            >
                              {item.destinataire.nom}
                            </a>
                            <br />
                            <span>{item.destinataire.tel}</span>
                          </div>
                          <div className="pl-2">
                            <span className="text-black">
                              {item.date_creation}
                            </span>
                          </div>
                          <div className="pl-2">
                            <span className=" font-weight-bold text-primary">
                              {item.montant + " "}
                            </span>
                            MRU
                          </div>

                          <div>
                            {props.loading ? (
                              <ClipLoader
                                color={"var(--warning)"}
                                loading={true}
                              />
                            ) : (
                              <Button
                                color="warning btn btn-sm"
                                disabled={props.loading}
                                onClick={() => {
                                  props.addRetrait(
                                    { id: item.id },
                                    props.removeRetrait,
                                    showAlert
                                  );
                                }}
                              >
                                Retirer
                              </Button>
                            )}
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
        </Card>
      )}
    </>
  );
}
