import "./formik-demo.css";
import React, { useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Badge, Card, CardBody } from "reactstrap";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { addPayback } from "../../actions/transaction";
import { checkCode_transaction } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VENDOR, CLIENT } from "../../utils/choices";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    numero_transaction: Yup.string().required(
      "Numero de transaction est obligatoire !"
    ),
  }),
  mapPropsToValues: (props) => ({
    numero_transaction: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };
    payload["vendor"] = props.user.id;
    checkCode_transaction(payload, showAlert, props.access).then((res) => {
      if (res) {
        const keys = Object.keys({ ...res });
        if (keys.includes("msg")) {
          showAlert(
            "warning",
            res.msg,
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
        } else {
          //console.log(res);
          if (res.transaction) {
            const temp = res.transaction;
            temp.transactionId = res.id;
            props.handleItem(temp);
            props.showDivInfo();
          }
        }
      }
      setSubmitting(false);
      resetForm();
    });
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  return (
    <>
      <Form onSubmit={handleSubmit} className="px-sm-5 px-1">
        {props.modalUserinfo === false && (
          <>
            <Row>
              <Col xl="12" style={{ margin: "12px 0" }}>
                <Label for="numero_transaction">Numero de transaction</Label>
                <Field name="numero_transaction" type="text" />

                {errors.numero_transaction && touched.numero_transaction && (
                  <div style={{ color: "red", marginTop: ".5rem" }}>
                    {errors.numero_transaction}
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
                    {props.submit}
                  </Button>
                )}
              </Col>
            </Row>
          </>
        )}
      </Form>
    </>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const FormVendor = (props) => {
  const [modalUserinfo, setModalUserinfo] = useState(false);
  const showDivInfo = () => setModalUserinfo(!modalUserinfo);

  const [item, setItem] = useState(null);
  const handleItem = (obj) => setItem(obj);

  const handleSubmit = () => {
    let payload = {};
    payload["transaction"] = item.transactionId;
    payload["vendor"] = props.user.id;
    props.addPayback(payload, showAlert);
    showDivInfo();
    // reset form ??
  };
  return (
    <>
      <MyEnhancedForm
        {...props}
        showDivInfo={showDivInfo}
        modalUserinfo={modalUserinfo}
        handleItem={handleItem}
      />

      {modalUserinfo && (
        <Card className="card-box mx-sm-5 mx-1 mt-5 mb-5 px-1 py-1">
          <Row className="no-gutters">
            <Col xl="12">
              <div className="bg-white rounded ">
                <div className="px-2 px-sm-5 pt-4 pb-2">
                  <h1 className="display-4 font-weight-normal font-size-xl text-center">
                    {item &&
                    item.expediteur &&
                    item.expediteur.role === CLIENT ? (
                      <>
                        <span>Voulez-vous effectuer un remboursement de</span>
                        <Badge
                          className="px-2 mx-1  font-size-lg"
                          color="primary"
                        >
                          {item.montant + " MRU"}
                        </Badge>
                        <span>au client ci- dessous ?</span>
                      </>
                    ) : item &&
                      item.expediteur &&
                      item.expediteur.role === VENDOR ? (
                      <>
                        <span>Voulez-vous effectuer un remboursement de</span>
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
                  {item && (
                    <div className=" rounded  ">
                      <div className="px-sm-4 px-1 py-0">
                        <Card className="mb-4">
                          <CardBody>
                            <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                              <div className=" font-size-md">Nom</div>
                              <div className=" font-size-lg text-primary">
                                {item &&
                                  item.expediteur &&
                                  `${item.expediteur.first_name} ${item.expediteur.last_name}`}
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                              <div className=" font-size-md">Telephone</div>
                              <div className=" font-size-lg text-primary">
                                {item && item.expediteur && item.expediteur.tel}
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                              <div className=" font-size-md">Email</div>
                              <div className=" font-size-lg text-primary">
                                {item &&
                                item.expediteur &&
                                item.expediteur.email
                                  ? item.expediteur.email
                                  : " --- "}
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                              <div className=" font-size-md">Adresse</div>
                              <div className=" font-size-lg text-primary">
                                {item &&
                                item.expediteur &&
                                item.expediteur.adresse
                                  ? item.expediteur.adresse
                                  : " --- "}
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  )}

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
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, { addPayback })(FormVendor);
//export default FormVendor;
