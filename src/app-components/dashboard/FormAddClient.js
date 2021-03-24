import "../dashboard/formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";

import { connect } from "react-redux";
import { addClient } from "../../actions/client";
import { showAlert } from "../../utils/alerts";
import { SyncLoader } from "react-spinners";
import { checkExistTel_Client } from "../../actions/async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    nom: Yup.string().required("Nom d'utilisateur est obligatoire !"),
    tel: Yup.number()
      .min(20000000, " Numero de telephone invalid  !")
      .max(99999999, " Numero de telephone invalid  !")
      .required(" Numero de telephone est obligatoire !"),
    /*nni: Yup.number().when("nni", {
      is: (nni) =>
        objectAttributeExist(nni, "SUP_3000"),
      then: Yup.object().required("Expediteur est obligatoire!"),
      //otherwise: Yup.string()
    })*/
  }),
  mapPropsToValues: (props) => ({
    nom: "",
    tel: "",
    nni: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    //props.handleFormLoading();
    const payload = {
      ...values,
    };

    checkExistTel_Client(payload, showAlert, props.access).then((res) => {
      //console.log(res);
      if (res) {
        if (res.valid_tel === true) {
          props.addClient(payload, showAlert, props.showModal);
        }
        if (res.valid_tel === false) {
          showAlert(
            "warning",
            "Numero Telephone existant",
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
        }
      }
      setSubmitting(false);
      //resetForm();
    });
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  return (
    <Form onSubmit={handleSubmit} className="px-sm-4 px-1">
      <Row>
        <Col xl="12" style={{ margin: "12px 0" }}>
          <Label for="nom">Nom complet</Label>
          <Field name="nom" type="text" placeholder="Nom complet ..." />

          {errors.nom && touched.nom && (
            <div style={{ color: "red", marginTop: ".5rem" }}>{errors.nom}</div>
          )}
        </Col>
      </Row>
      <Row>
        <Col xl="12" style={{ margin: "12px 0" }}>
          <Label for="tel">Telephone</Label>
          <Field name="tel" type="number" placeholder="Telephone ..." />

          {errors.tel && touched.tel && (
            <div style={{ color: "red", marginTop: ".5rem" }}>{errors.tel}</div>
          )}
        </Col>
      </Row>
      <Row>
        <Col xl="12" style={{ margin: "12px 0" }}>
          <Label for="nni">Nni</Label>
          <Field name="nni" type="number" placeholder="Numero national ..." />

          {errors.nni && touched.nni && (
            <div style={{ color: "red", marginTop: ".5rem" }}>{errors.nni}</div>
          )}
        </Col>
      </Row>
      <Row>
        <Col xl="12" style={{ margin: "12px 0" }} className="my-3">
          <div className="d-flex ">
            <div className="mr-auto">
              <Button
                size="lg"
                disabled={props.clients.loading || isSubmitting}
                className="btn btn-danger btn-block mb-3 px-2 py-2 px-sm-4"
                onClick={props.showModal}
              >
                Annuler
              </Button>
            </div>
            <div className="ml-auto">
              {props.clients.loading || isSubmitting ? (
                <div className="d-flex align-items-center justify-content-center">
                  <SyncLoader color={"var(--primary)"} loading={true} />
                </div>
              ) : (
                <Button
                  size="lg"
                  type="submit"
                  disabled={props.clients.loading || isSubmitting}
                  className="btn btn-success btn-block mb-3 px-2 py-2 px-sm-4"
                >
                  Confirmer
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/*<Row>
        <Col xl="12" style={{ margin: "12px 0" }} className="my-3">
          {!props.clients.loading ? (
            <Button
              size="lg"
              type="submit"
              disabled={isSubmitting}
              className="btn-block text-uppercase font-weight-bold font-size-sm"
              color="primary"
            >
              Enregistrer
            </Button>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <Button
                size="lg"
                disabled
                className="btn-block text-uppercase font-weight-bold font-size-sm"
                color="primary"
              >
                <SyncLoader color={"var(--white)"} loading={true} />
              </Button>
            </div>
          )}
        </Col>
          </Row>*/}
    </Form>
  );
};

const mapStateToProps = (state) => ({
  clients: state.client.clients,
  access: state.auth.access,
});
const MyEnhancedForm = connect(mapStateToProps, { addClient })(
  formikEnhancer(MyForm)
);

const FormAddClient = (props) => {
  return <MyEnhancedForm {...props} />;
};

export default FormAddClient;
