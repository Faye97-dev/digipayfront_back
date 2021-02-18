import "./formik-demo.css";
import React, { useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Row,
  Col,
  Label,
  Modal,
  Card,
  CardBody,
  Badge,
} from "reactstrap";
import { showAlert } from "../../utils/alerts";
import { checkClientDigipay } from "../../actions/async";
import { addTransfert_clientDigipay } from "../../actions/transaction";
import { SyncLoader } from "react-spinners";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    tel: Yup.number()
      .min(20000000, " Numero de telephone invalid  !")
      .max(99999999, " Numero de telephone invalid  !")
      .required(" Numero de telephone est obligatoire !"),
    /*.test(
        "len",
        "Must be exactly 5 characters",
        (tel) => tel.toString().length === 5
      ),*/
    montant: Yup.number()
      .min(1, " Montant doit etre superieur a zero !")
      .required(" Montant est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    tel: "",
    montant: "",
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = {
      ...values,
    };
    //setTimeout(() => {
    payload["sender"] = props.user.id;
    checkClientDigipay(payload, showAlert).then((res) => {
      //console.log(res);
      setSubmitting(false);
      //
      const keys = Object.keys({ ...res });
      if (keys.includes("msg")) {
        showAlert(
          "warning",
          res.msg,
          <FontAwesomeIcon icon={["far", "question-circle"]} />
        );
      } else {
        if (res.soldeEnough === true) {
          props.handleItem(res);
          props.handleModal();
        } else if (res.soldeEnough === false) {
          showAlert(
            "warning",
            "Votre solde est insuffisant pour effectuer cette opération !",
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
        }
      }
    });
    //}, 5000);
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  return (
    <Form onSubmit={handleSubmit} className="px-5">
      <Row>
        <Col xl="12" style={{ margin: "12px 0" }}>
          <Label for="tel">Client</Label>
          <Field name="tel" type="number" />

          {errors.tel && touched.tel && (
            <div style={{ color: "red", marginTop: ".5rem" }}>{errors.tel}</div>
          )}
        </Col>
      </Row>
      <Row>
        <Col xl="12" style={{ margin: "12px 0" }}>
          <Label for="montant">Montant</Label>
          <Field name="montant" type="number" />

          {errors.montant && touched.montant && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.montant}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col xl="12" style={{ margin: "12px 0" }}>
          {isSubmitting || props.transactions.loading ? (
            <SyncLoader color={"var(--primary)"} loading={true} />
          ) : (
            <Button
              color="primary"
              type="submit"
              disabled={isSubmitting || props.transactions.loading}
            >
              Envoyer
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

/*const MyEnhancedForm = connect(mapStateToProps, {
  addTransfert_clientDigipay,
})(formikEnhancer(MyForm));*/

const MyEnhancedForm = formikEnhancer(MyForm);

const FormClientSend = (props) => {
  const [modalClientinfo, setModalClientinfo] = useState(false);
  const handleModal = () => setModalClientinfo(!modalClientinfo);

  const [item, setItem] = useState(null);
  const handleItem = (obj) => setItem(obj);

  const handleSubmit = () => {
    let payload = {};
    if (item.check === true) {
      payload["client_destinataire"] = item.client.id;
      payload["client_origine"] = props.user.id;
      payload["montant"] = item.montant;
    } else if (item.check === false) {
      payload["tel"] = item.client;
      payload["client_origine"] = props.user.id;
      payload["montant"] = item.montant;
    }
    //console.log(payload);
    props.addTransfert_clientDigipay(payload, showAlert);
    handleModal();
    // reset form ??
  };
  return (
    <>
      <MyEnhancedForm
        handleModal={handleModal}
        handleItem={handleItem}
        {...props}
      />
      <Modal
        zIndex={2000}
        centered
        size="lg"
        isOpen={modalClientinfo}
        toggle={handleModal}
        contentClassName="border-0"
      >
        <Row className="no-gutters">
          {/*<Col xl="5" className="p-3 p-xl-0">
            <img
              alt="..."
              className="rounded br-xl-right-0 img-fit-container"
              src={svgImage1}
            />
          </Col>*/}
          <Col xl="12">
            <div className="bg-white rounded ">
              <div className="px-2 px-sm-5 pt-4 pb-2">
                <h1 className="display-4 font-weight-normal font-size-xl text-center">
                  {item && item.check === true ? (
                    <>
                      <span>Vous confirmer de envoyer le montant de</span>
                      <Badge
                        className="px-2 mx-1  font-size-lg"
                        color="primary"
                      >
                        {item.montant + " MRU"}
                      </Badge>
                      <span> au compte client ci-dessous ?</span>
                    </>
                  ) : item && item.check === false ? (
                    <>
                      <span>Vous confirmer de envoyer le montant de</span>
                      <Badge
                        className="px-2 mx-1  font-size-lg"
                        color="primary"
                      >
                        {item.montant + " MRU"}
                      </Badge>
                      <span>
                        au numero
                        <Badge
                          className="px-2 mx-1  font-size-lg"
                          color="primary"
                        >
                          {item.client}
                        </Badge>
                        par code de confirmation ?
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </h1>
              </div>
              <div className="px-sm-4 px-2 py-2">
                {item && item.check === true && (
                  <div className=" rounded  ">
                    <div className="px-sm-4 px-2 py-0">
                      <Card className="card-box mb-4">
                        <CardBody>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Nom</div>
                            <div className=" font-size-lg text-primary">
                              {`${item.client.first_name} ${item.client.last_name}`}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Telephone</div>
                            <div className=" font-size-lg text-primary">
                              {item.client.tel}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Email</div>
                            <div className=" font-size-lg text-primary">
                              {item.client.email ? item.client.email : " --- "}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between px-3 py-1">
                            <div className=" font-size-md">Adresse</div>
                            <div className=" font-size-lg text-primary">
                              {item.client.adresse
                                ? item.client.adresse
                                : " --- "}
                            </div>
                          </div>
                          {/*<div className="divider my-2"></div>
                        <div className="d-flex align-items-center justify-content-between px-3 py-1">
                          <div className=" font-size-md">Telephone</div>
                          <div className=" font-size-lg text-primary">
                            {item && item.transaction.agence_origine.tel}
                          </div>
                        </div>
                            <div className="divider my-2"></div>*/}
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                )}

                <div className="d-flex px-sm-4 px-2">
                  <div className="mr-auto">
                    <Button
                      className="btn btn-danger btn-block mb-4"
                      onClick={handleModal}
                    >
                      Annuler
                    </Button>
                  </div>
                  <div className="ml-auto">
                    <Button
                      className="btn btn-success btn-block mb-4"
                      onClick={handleSubmit}
                    >
                      Confirmer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {
  addTransfert_clientDigipay,
})(FormClientSend);
