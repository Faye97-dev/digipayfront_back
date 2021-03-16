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
import { check_byRole_ClientVendor } from "../../actions/async";
import { addRecharge } from "../../actions/transaction";
import { SyncLoader } from "react-spinners";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VENDOR, CLIENT } from "../../utils/choices";

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
    //payload["sender"] = props.user.id;
    //console.log(payload);
    check_byRole_ClientVendor(payload, showAlert).then((res) => {
      setSubmitting(false);
      const keys = Object.keys({ ...res });
      if (keys.includes("msg")) {
        showAlert(
          "warning",
          res.msg,
          <FontAwesomeIcon icon={["far", "question-circle"]} />
        );
      } else {
        props.handleItem(res);
        props.showDivInfo();
        /*if (res.soldeEnough === true) {
          props.handleItem(res);
          props.showDivInfo();
        } else if (res.soldeEnough === false) {
          showAlert(
            "warning",
            "Votre solde est insuffisant pour effectuer cette opération !",
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
        }*/
      }
    });
    //}, 5000);
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  return (
    <Form onSubmit={handleSubmit} className="px-sm-5 px-1">
      {props.modalUserinfo === false && (
        <>
          <Row>
            <Col xl="12" style={{ margin: "12px 0" }}>
              <Label for="tel">Téléphone</Label>
              <Field name="tel" type="number" />

              {errors.tel && touched.tel && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.tel}
                </div>
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
              <>
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
              </>
            </Col>
          </Row>
        </>
      )}
    </Form>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const FormRecharge = (props) => {
  const [modalUserinfo, setModalUserinfo] = useState(false);
  const showDivInfo = () => setModalUserinfo(!modalUserinfo);

  const [item, setItem] = useState(null);
  const handleItem = (obj) => setItem(obj);

  const handleSubmit = () => {
    let payload = {};
    payload["destinataire"] = { id: item.id, role: item.role };
    payload["montant"] = item.montant;
    payload["agence"] = props.user.agence.id;
    props.addRecharge(payload, showAlert);
    showDivInfo();
    // reset form ??
  };
  return (
    <>
      <MyEnhancedForm
        showDivInfo={showDivInfo}
        modalUserinfo={modalUserinfo}
        handleItem={handleItem}
        {...props}
      />

      {modalUserinfo && (
        <Card className="card-box mx-sm-5 mx-1 mt-5 mb-5 px-1 py-1">
          <Row className="no-gutters">
            <Col xl="12">
              <div className="bg-white rounded ">
                <div className="px-2 px-sm-5 pt-4 pb-2">
                  <h1 className="display-4 font-weight-normal font-size-xl text-center">
                    {item && item.role === CLIENT ? (
                      <>
                        <span>Voulez-vous enregistrer une recharge de</span>
                        <Badge
                          className="px-2 mx-1  font-size-lg"
                          color="primary"
                        >
                          {item.montant + " MRU"}
                        </Badge>
                        <span>au client ci- dessous ?</span>
                      </>
                    ) : item && item.role === VENDOR ? (
                      <>
                        <span>Voulez-vous enregistrer une recharge de</span>
                        <Badge
                          className="px-2 mx-1  font-size-lg"
                          color="primary"
                        >
                          {item.montant + " MRU"}
                        </Badge>
                        <span>au commercant ci- dessous ?</span>
                      </>
                    ) : (
                      ""
                    )}
                  </h1>
                </div>
                <div className="px-sm-4 px-2 py-2">
                  {
                    //item && item.role === CLIENT && (
                    item && (
                      <div className=" rounded  ">
                        <div className="px-sm-4 px-1 py-0">
                          <Card className="mb-4">
                            <CardBody>
                              <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                                <div className=" font-size-md">Nom</div>
                                <div className=" font-size-lg text-primary">
                                  {`${item.first_name} ${item.last_name}`}
                                </div>
                              </div>
                              <div className="divider my-2"></div>
                              <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                                <div className=" font-size-md">Telephone</div>
                                <div className=" font-size-lg text-primary">
                                  {item.tel}
                                </div>
                              </div>
                              <div className="divider my-2"></div>
                              <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                                <div className=" font-size-md">Email</div>
                                <div className=" font-size-lg text-primary">
                                  {item.email ? item.email : " --- "}
                                </div>
                              </div>
                              <div className="divider my-2"></div>
                              <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                                <div className=" font-size-md">Adresse</div>
                                <div className=" font-size-lg text-primary">
                                  {item.adresse ? item.adresse : " --- "}
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </div>
                    )
                  }

                  <div className="d-flex px-sm-4 px-1">
                    <div className="mr-auto">
                      <Button
                        className="btn btn-danger btn-block mb-4 px-2 px-sm-4"
                        onClick={showDivInfo}
                      >
                        Annuler
                      </Button>
                    </div>
                    <div className="ml-auto">
                      <Button
                        className="btn btn-success btn-block mb-4 px-2 px-sm-4"
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
        </Card>
      )}
      {/*</Modal>*/}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {
  addRecharge,
})(FormRecharge);