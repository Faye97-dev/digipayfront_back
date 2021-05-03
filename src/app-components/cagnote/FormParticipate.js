import "../dashboard/formik-demo.css";
import React, { useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Card, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyncLoader } from "react-spinners";
import { connect } from "react-redux";
import { client_check_cagnoteId } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import FormDonation from "./FormDonation";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    numero_cagnote: Yup.string().required(
      "l'identifiant de la cagnote est obligatoire !"
    ),
  }),
  mapPropsToValues: (props) => ({
    numero_cagnote: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };
    payload.id = props.user.id;

    client_check_cagnoteId(payload, showAlert, props.access).then((res) => {
      if (res) {
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
          resetForm();
        }
      }
      setSubmitting(false);
    });
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  return (
    <>
      {props.modalCagnoteInfo === false && (
        <Form onSubmit={handleSubmit} className="px-sm-5 px-1">
          <Row>
            <Col xl="12" style={{ margin: "12px 0" }}>
              <Label for="numero_cagnote">
                Veuillez entrer un identifiant de la cagnotte
              </Label>
              <Field name="numero_cagnote" type="text" />
              {errors.numero_cagnote && touched.numero_cagnote && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.numero_cagnote}
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col xl="12" style={{ margin: "12px 0" }}>
              {isSubmitting ? (
                <>
                  <SyncLoader color={"var(--primary)"} loading={true} />
                </>
              ) : (
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  Payer
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);
const FormParticipate = (props) => {
  const [modalCagnoteInfo, setModalCagnoteInfo] = useState(false);
  const showDivInfo = () => setModalCagnoteInfo(!modalCagnoteInfo);

  const [item, setItem] = useState(null);
  const handleItem = (obj) => setItem(obj);

  return (
    <>
      <MyEnhancedForm
        {...props}
        showDivInfo={showDivInfo}
        modalCagnoteInfo={modalCagnoteInfo}
        handleItem={handleItem}
      />
      {modalCagnoteInfo && (
        <Card className="card-box mx-sm-5 mx-1 mt-5 mb-5 px-1 py-1">
          <Row className="no-gutters">
            <Col xl="12">
              <div className="bg-white rounded ">
                <div className="px-2 px-sm-5 pt-4 pb-2">
                  <h1 className="display-4 font-weight-normal font-size-xl text-center">
                    <>
                      <span>
                        Voulez-vous faire un don pour cette cagnotte ?
                      </span>
                    </>
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
                                {`${item.nom}`}
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                              <div className=" font-size-md">Description</div>
                              <div className=" font-size-lg text-primary">
                                {item.motif && item.motif !== ""
                                  ? item.motif
                                  : "-------------"}
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                              <div className=" font-size-md">
                                Montant souhaité
                              </div>
                              <div className=" font-size-lg text-primary">
                                {item.objectif}
                                <small className="px-2">MRU</small>
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                              <div className=" font-size-md">Responsable</div>
                              <div className=" font-size-lg text-primary">
                                {`${item.responsable.first_name} ${item.responsable.last_name}`}
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                              <div className=" font-size-md">Date</div>
                              <div className=" font-size-lg text-primary">
                                {item.date}
                              </div>
                            </div>
                            <div className="divider my-2"></div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  )}

                  <div>
                    <FormDonation
                      showDivInfo={showDivInfo}
                      item={item}
                      handleItem={handleItem}
                    />
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
});

export default connect(mapStateToProps, {})(FormParticipate);
