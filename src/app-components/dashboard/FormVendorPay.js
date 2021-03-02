import "./formik-demo.css";
import React, { useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Badge, Card, CardBody } from "reactstrap";
import { showAlert } from "../../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkCodePayement_Vendor } from "../../actions/async";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { addPayement_Vendor } from "../../actions/transaction";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    code: Yup.string().required(
      "Code de paiement ou Numero de facture est obligatoire !"
    ),
  }),
  mapPropsToValues: (props) => ({
    code: "",
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = {
      ...values,
    };

    /*setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);*/

    payload["vendorId"] = props.user.id;
    checkCodePayement_Vendor(payload, showAlert).then((res) => {
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
        props.handleItem(res);
        props.showDivInfo();
      }
    });
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  return (
    <Form onSubmit={handleSubmit} className="px-sm-5 px-1">
      {props.modalPayementinfo === false && (
        <>
          <Row>
            <Col xl="12" style={{ margin: "12px 0" }}>
              <Label for="code">
                Entrez un code de paiement ou un numéro de facture
              </Label>
              <Field name="code" type="text" />

              {errors.code && touched.code && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.code}
                </div>
              )}
            </Col>
          </Row>

          <Row>
            <Col xl="12" style={{ margin: "12px 0" }}>
              {/*<Button color="primary" type="submit" disabled={isSubmitting}>
                Payer
              </Button>*/}
              {isSubmitting || props.transactions.loading ? (
                <SyncLoader color={"var(--primary)"} loading={true} />
              ) : (
                <Button
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || props.transactions.loading}
                >
                  Payer
                </Button>
              )}
            </Col>
          </Row>
        </>
      )}
    </Form>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const FormVendorPay = (props) => {
  const [modalPayementinfo, setModalPayementinfo] = useState(false);
  const showDivInfo = () => setModalPayementinfo(!modalPayementinfo);

  const [item, setItem] = useState(null);
  const handleItem = (obj) => setItem(obj);

  const handleSubmit = () => {
    let payload = {};

    payload["vendor"] = props.user.id;
    payload["pre_transaction"] = item.id;

    //console.log(payload);
    props.addPayement_Vendor(payload, showAlert);
    showDivInfo();
    // reset form ??
  };
  return (
    <>
      <MyEnhancedForm
        showDivInfo={showDivInfo}
        modalPayementinfo={modalPayementinfo}
        handleItem={handleItem}
        {...props}
      />
      {modalPayementinfo && (
        <Card className="card-box mx-sm-5 mx-1 mt-5 mb-5 px-1 py-1">
          <Row className="no-gutters">
            <Col xl="12">
              <div className="bg-white rounded ">
                <div className="px-2 px-sm-5 pt-4 pb-2">
                  <h1 className="display-4 font-weight-normal font-size-xl text-center">
                    <span>Voulez-vous payer le montant de</span>
                    <Badge className="px-2 mx-1  font-size-lg" color="primary">
                      {item.montant + " MRU"}
                    </Badge>
                    <span>au commercant ci- dessous ?</span>
                  </h1>
                </div>
                <div className="px-sm-4 px-2 py-2">
                  <div className=" rounded  ">
                    <div className="px-sm-4 px-1 py-0">
                      <Card className="mb-4">
                        <CardBody>
                          <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                            <div className=" font-size-md">Nom</div>
                            <div className=" font-size-lg text-primary">
                              {`${item.expediteur.first_name} ${item.expediteur.last_name}`}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                            <div className=" font-size-md">Telephone</div>
                            <div className=" font-size-lg text-primary">
                              {item.expediteur.tel}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                            <div className=" font-size-md">Email</div>
                            <div className=" font-size-lg text-primary">
                              {item.expediteur.email
                                ? item.expediteur.email
                                : " --- "}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                            <div className=" font-size-md">Adresse</div>
                            <div className=" font-size-lg text-primary">
                              {item.expediteur.adresse
                                ? item.expediteur.adresse
                                : " --- "}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
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
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, { addPayement_Vendor })(FormVendorPay);
