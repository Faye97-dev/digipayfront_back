import "../dashboard/formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";

import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { showAlert } from "../../utils/alerts";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Nom d'utilisateur est obligatoire !"),
    password: Yup.string().required("Mot de passe est obligatoire !"),
    /*.test(
        "len",
        "Must be exactly 5 characters",
        (tel) => tel.toString().length === 5
      ),*/
  }),
  mapPropsToValues: (props) => ({
    username: "",
    password: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    //console.log(props);
    const payload = {
      ...values,
    };
    //setTimeout(() => {
    props.login(payload, resetForm, setSubmitting, showAlert);
    //console.log(payload);
    //setSubmitting(false);
    //}, 7000);
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xl="12" style={{ margin: "12px 0" }}>
          <Label for="username" className="font-weight-bold">
            Username
          </Label>
          <Field
            name="username"
            type="text"
            placeholder="Enter your username"
          />

          {errors.username && touched.username && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.username}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col xl="12" style={{ margin: "12px 0" }}>
          <Label for="password" className="font-weight-bold">
            Password
          </Label>
          <Field
            name="password"
            type="password"
            placeholder="Enter your password"
          />

          {errors.password && touched.password && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.password}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        {/*<Col xl="12" style={{ margin: "12px 0" }}>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Envoyer
          </Button>
          </Col>*/}
      </Row>
      <Button
        size="lg"
        type="submit"
        disabled={isSubmitting}
        className="btn-block text-uppercase font-weight-bold font-size-sm"
        color="primary"
      >
        {props.loading ? "Loading .... " : "Login"}
      </Button>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.isLoading,
});
const MyEnhancedForm = connect(mapStateToProps, { login })(
  formikEnhancer(MyForm)
);

const FormLogin = () => <MyEnhancedForm />;
export default FormLogin;
