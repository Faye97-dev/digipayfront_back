import "../dashboard/formik-demo.css";
import React, { useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyncLoader } from "react-spinners";
import { connect } from "react-redux";
import { addCagnote } from "../../actions/cagnote";
import { checkClientDigipay_newCagnote } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import Switch from "rc-switch";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    beneficiaire: Yup.number().when("choix_beneficiaire", {
      is: (choix_beneficiaire) => choix_beneficiaire === true,
      then: Yup.number()
        .min(20000000, " Numéro de téléphone invalid  !")
        .max(99999999, " Numéro de téléphone invalid  !")
        .required(" Numéro de téléphone est obligatoire !"),
    }),

    choix_beneficiaire: Yup.boolean(),
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
    choix_beneficiaire: false,
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };
    if (!values.choix_beneficiaire) {
      props.addCagnote(payload, showAlert, setSubmitting, resetForm);
    } else {
      checkClientDigipay_newCagnote(
        { tel: payload.beneficiaire },
        showAlert,
        props.access
      ).then((res) => {
        if (res) {
          const keys = Object.keys({ ...res });
          if (keys.includes("msg")) {
            props.setBeneficiaireInfo(null);
            showAlert(
              "warning",
              res.msg,
              <FontAwesomeIcon icon={["far", "question-circle"]} />
            );
          } else {
            props.setBeneficiaireInfo(res);
            payload.beneficiaire = res.id;
            props.addCagnote(
              payload,
              showAlert,
              setSubmitting,
              resetForm,
              props.setBeneficiaireInfo
            );
          }
        }
        setSubmitting(false);
      });
    }
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting, setFieldValue } = props;

  const choose_beneficiaire = () => {
    props.setBeneficiaireInfo(null);
    setFieldValue("choix_beneficiaire", !props.values.choix_beneficiaire);
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className="px-sm-5 px-1">
        <Row>
          <div className="d-flex align-items-center mx-3 px-1">
            <div className="py-1 pr-4 font-weight-bold font-size-lg text-primary">
              Choisir un bénéficiaire
            </div>

            <Switch
              checked={props.values.choix_beneficiaire}
              onClick={choose_beneficiaire}
              className="switch-small toggle-switch-success"
            />
          </div>

          {props.values.choix_beneficiaire && (
            <Col xl="12" style={{ margin: "12px 0" }}>
              <Label for="beneficiaire">Téléphone du bénéficiaire</Label>
              <Field name="beneficiaire" type="number" />

              {props.beneficiaireInfo && (
                <Col xl="12" style={{ margin: "12px 0" }}>
                  <Badge color="primary" className="my-2 mr-3 px-2">
                    <span className="text-white font-size-md">{`${props.beneficiaireInfo.first_name} ${props.beneficiaireInfo.last_name}`}</span>
                  </Badge>
                </Col>
              )}

              {errors.beneficiaire && touched.beneficiaire && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.beneficiaire}
                </div>
              )}
            </Col>
          )}

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
            {isSubmitting ? (
              <>
                <SyncLoader color={"var(--primary)"} loading={true} />
              </>
            ) : (
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Ajouter
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);
const FormAdd = (props) => {
  const [beneficiaireInfo, setBeneficiaireInfo] = useState(null);
  return (
    <MyEnhancedForm
      {...props}
      beneficiaireInfo={beneficiaireInfo}
      setBeneficiaireInfo={setBeneficiaireInfo}
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, { addCagnote })(FormAdd);
