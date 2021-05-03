import "../dashboard/formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyncLoader } from "react-spinners";
import { connect } from "react-redux";
import { addCagnote } from "../../actions/cagnote";
import { showAlert } from "../../utils/alerts";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    nom: Yup.string().required(" Nom de la cagnote est obligatoire !"),
    objectif: Yup.number()
      .min(100, " Montant doit etre plus 100 MRU !")
      .max(100000, " Montant ne peut depasser 100000 MRU !")
      .required(" Montant est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    nom: "",
    objectif: 0,
    motif: "",
    //nom_destinataire: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };
    //console.log(payload);
    //setSubmitting(false);

    props.addCagnote(payload, showAlert, setSubmitting, resetForm);
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  return (
    <>
      <Form onSubmit={handleSubmit} className="px-sm-5 px-1">
        <Row>
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
const FormAdd = (props) => <MyEnhancedForm {...props} />;

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { addCagnote })(FormAdd);
