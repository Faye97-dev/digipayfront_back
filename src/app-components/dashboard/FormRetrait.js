import React, { useState, Component } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Input,
  Card,
  Badge,
  Button,
  Modal,
  Row,
  Col,
  CardBody,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { getNotWhitrated } from "../../actions/async";
import { addRetrait } from "../../actions/transaction";
import { connect } from "react-redux";
import { showAlert } from "../../utils/alerts";
import { ClipLoader } from "react-spinners";
import FormSecretKey from "./FormSecretKey";
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

function SearchBar(props) {
  const [searchStatus5, setSearchStatus5] = useState(false);
  const [listRetraits, setListRetraits] = useState([]);
  const toggleSearch5 = () => setSearchStatus5(!searchStatus5);
  const handleSumbit = (e) => {
    if (e.keyCode === 13) {
      //console.log(e.target.value);
      getNotWhitrated(e.target.value, props.agence.id).then((res) => {
        // add a spinner here
        setListRetraits([...res]);
        if (res.length === 0)
          showAlert(
            "warning",
            "Pas de retraits disponibles pour ce numero de telephone !",
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
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

class ListRetraits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSecretKey: false,
      confirmedKey: false,
      transactionId: null,
    };

    this.handleModal = this.handleModal.bind(this);
    this.setConfirmedKey = this.setConfirmedKey.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleModal(id) {
    this.setState({
      ...this.state,
      modalSecretKey: !this.state.modalSecretKey,
      transactionId: id,
    });
  }

  closeModal() {
    this.setState({
      ...this.state,
      modalSecretKey: false,
      transactionId: null,
    });
  }

  setConfirmedKey(bool) {
    this.setState({
      ...this.state,
      confirmedKey: bool,
    });
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (
      nextState.modalSecretKey === false &&
      this.state.modalSecretKey === true
    ) {
      console.log(" reset secret key code  ...");
      this.setState({
        ...this.state,
        confirmedKey: false,
        modalSecretKey: false,
      });
    }
  }

  render() {
    return (
      <>
        <Modal
          zIndex={2000}
          centered
          size="lg"
          isOpen={this.state.modalSecretKey}
          toggle={this.handleModal}
          contentClassName="border-0"
        >
          <Row className="no-gutters">
            <Col xl="12">
              <div className="bg-white rounded ">
                <div className="px-4 pt-4 pb-2">
                  <h1 className="pb-2 display-4 font-weight-bold font-size-lg text-primary text-center">
                    <span>
                      Veuillez entrer le code de confirmation de la transaction
                    </span>
                  </h1>
                  <div className="rounded">
                    <div className="px-1 py-0">
                      <Card className="card-box mb-4">
                        <CardBody>
                          <FormSecretKey
                            confirmedKey={this.state.confirmedKey}
                            setConfirmedKey={this.setConfirmedKey}
                            transactionId={this.state.transactionId}
                            removeRetrait={this.props.removeRetrait}
                            closeModal={this.closeModal}
                          />
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Modal>
        {this.props.data.length !== 0 && (
          <Card className="card-box mb-5 bg-white">
            <div className="px-3 py-4">
              <div className="scroll-area rounded bg-white shadow-overflow">
                <PerfectScrollbar>
                  <div className="p-3">
                    {this.props.data.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="d-flex justify-content-between">
                            {item.agence_origine && (
                              <>
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
                                  {this.props.loading ? (
                                    <ClipLoader
                                      color={"var(--primary)"}
                                      loading={true}
                                    />
                                  ) : (
                                    <Button
                                      color="primary btn btn-sm"
                                      disabled={this.props.loading}
                                      onClick={() => {
                                        this.props.addRetrait(
                                          { id: item.id },
                                          this.props.removeRetrait,
                                          showAlert
                                        );
                                      }}
                                    >
                                      Retirer
                                    </Button>
                                  )}
                                </div>
                              </>
                            )}
                            {!item.agence_origine && (
                              <>
                                <div className="pl-2">
                                  <div className="font-weight-bold">
                                    <a
                                      href="#/"
                                      onClick={(e) => e.preventDefault()}
                                      className="text-black"
                                    >
                                      {item.expediteur.first_name +
                                        " " +
                                        item.expediteur.last_name}
                                    </a>
                                  </div>
                                  <span className="d-flex pt-2 align-items-center">
                                    {item.expediteur.tel}
                                  </span>
                                </div>
                                <div className="text-center pl-2">
                                  <a
                                    href="#/"
                                    className="font-weight-bold text-black"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    {item.destinataire}
                                  </a>
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
                                  {this.props.loading ? (
                                    <ClipLoader
                                      color={"var(--warning)"}
                                      loading={true}
                                    />
                                  ) : (
                                    <Button
                                      color="warning btn btn-sm"
                                      disabled={this.props.loading}
                                      onClick={() => {
                                        this.handleModal(item.id);
                                      }}
                                    >
                                      Retirer
                                      <span className="pl-2">
                                        <FontAwesomeIcon
                                          icon={["fa", "lock"]}
                                        />
                                      </span>
                                    </Button>
                                  )}
                                </div>
                              </>
                            )}
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
}
