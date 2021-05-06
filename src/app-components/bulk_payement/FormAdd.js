import "../dashboard/formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";
import { SyncLoader } from "react-spinners";
import { connect } from "react-redux";
import { addGrpPayement } from "../../actions/grp_payement";
import { showAlert } from "../../utils/alerts";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    nom: Yup.string()
      .max(30, "Nombre de caractères limite dépassé !")
      .required(" Nom du groupe de payement est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    nom: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };
    props.addGrpPayement(
      payload,
      showAlert,
      setSubmitting,
      resetForm,
      props.handleModal
    );
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  return (
    <>
      <Form onSubmit={handleSubmit} className="px-sm-5 px-3">
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

export default connect(mapStateToProps, { addGrpPayement })(FormAdd);
