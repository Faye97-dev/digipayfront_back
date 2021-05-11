import "../dashboard/formik-demo.css";
import React, { useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Card, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyncLoader } from "react-spinners";
import { connect } from "react-redux";
import { addCagnote } from "../../actions/cagnote";
import { checkClientDigipay_newCagnote } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import Switch from "rc-switch";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    beneficiaire: Yup.number()
      .min(20000000, " Numéro de téléphone invalid  !")
      .max(99999999, " Numéro de téléphone invalid  !")
      .required(" Numéro de téléphone est obligatoire !"),

    nom: Yup.string()
      .max(20, "Nombre de caractères limite dépassé !")
      .required(" Nom de la cagnote est obligatoire !"),

    objectif: Yup.number()
      .min(0, "Montant doit etre moins 0 MRU !")
      .max(1000000, " Montant ne peut dépassé 1000000 MRU !")
      .required("Montant doit etre moins 0 MRU !"),

    motif: Yup.string()
      .max(30, "Nombre de caractères limite dépassé !")
      .required("La description de la cagnotte est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    nom: "",
    objectif: 0,
    motif: "",
    beneficiaire: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };

    checkClientDigipay_newCagnote(
      { tel: payload.beneficiaire },
      showAlert,
      props.access
    ).then((res) => {
      if (res) {
        const keys = Object.keys({ ...res });
        if (keys.includes("msg")) {
          /*props.setBeneficiaireInfo(null);
          props.setformData(null);*/
          showAlert(
            "warning",
            res.msg,
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
        } else {
          props.setBeneficiaireInfo(res);
          props.setformData({ ...payload });
          resetForm();
        }
      }
      setSubmitting(false);
    });
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting, setFieldValue } = props;

  return (
    <>
      {!props.beneficiaireInfo && (
        <Form onSubmit={handleSubmit} className="px-sm-5 px-1">
          <Row>
            <Col xl="12" style={{ margin: "12px 0" }}>
              <Label for="beneficiaire">Téléphone du bénéficiaire</Label>
              <Field name="beneficiaire" type="number" />

              {errors.beneficiaire && touched.beneficiaire && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.beneficiaire}
                </div>
              )}
            </Col>

            <Col xl="12" style={{ margin: "12px 0" }}>
              <Label for="nom">Nom</Label>
              <Field name="nom" type="text" />
              {errors.nom && touched.nom && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.nom}
                </div>
              )}
            </Col>
            <Col xl="12" style={{ margin: "12px 0" }}>
              <Label for="objectif">Montant souhaité</Label>
              <Field name="objectif" type="number" />
              {errors.objectif && touched.objectif && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.objectif}
                </div>
              )}
            </Col>
            <Col xl="12" style={{ margin: "12px 0" }}>
              <Label for="motif">Description</Label>
              <Field name="motif" type="text" />
              {errors.motif && touched.motif && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.motif}
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col xl="12" style={{ margin: "12px 0" }}>
              {isSubmitting || props.cagnotes.loading ? (
                <>
                  <SyncLoader color={"var(--primary)"} loading={true} />
                </>
              ) : (
                <Button
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || props.cagnotes.loading}
                >
                  Ajouter
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
const FormAdd = (props) => {
  const [beneficiaireInfo, setBeneficiaireInfo] = useState(null);
  const [formData, setformData] = useState(null);

  const handleSubmit = () => {
    let payload = { ...formData };
    payload["beneficiaire"] = beneficiaireInfo.id;

    props.addCagnote(payload, showAlert);

    setBeneficiaireInfo(null);
    setformData(null);
  };

  return (
    <>
      <MyEnhancedForm
        {...props}
        beneficiaireInfo={beneficiaireInfo}
        setBeneficiaireInfo={setBeneficiaireInfo}
        setformData={setformData}
      />
      {beneficiaireInfo && (
        <Card className="card-box mx-sm-5 mx-1 mt-5 mb-5 px-1 py-1">
          <Row className="no-gutters">
            <Col xl="12">
              <div className="bg-white rounded ">
                <div className="px-2 px-sm-5 pt-4 pb-2">
                  <h1 className="display-4 font-weight-normal font-size-xl text-center">
                    <>
                      <span>
                        Voulez-vous créer une cagnotte pour le bénéficiaire ?
                      </span>
                    </>
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
                              {`${beneficiaireInfo.first_name}  ${beneficiaireInfo.last_name}`}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                            <div className=" font-size-md">Téléphone</div>
                            <div className=" font-size-lg text-primary">
                              {beneficiaireInfo.tel}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>

                  <div className="d-flex px-sm-4 px-1">
                    <div className="mr-auto">
                      <Button
                        className="btn btn-danger btn-block mb-4 px-2 px-sm-4"
                        onClick={() => setBeneficiaireInfo(null)}
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
  cagnotes: state.cagnote.cagnotes,
});

export default connect(mapStateToProps, { addCagnote })(FormAdd);
