import "./formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    numero_transaction: Yup.number()
      .min(0, "Numero de transaction doit etre positif !")
      .required("Numero de transaction est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    numero_transaction: "",
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  return (
    <>
      <Form onSubmit={handleSubmit} className="px-5">
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <Label for="numero_transaction">Numero de transaction</Label>
            <Field name="numero_transaction" type="number" />

            {errors.numero_transaction && touched.numero_transaction && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.numero_transaction}
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <Button color="primary" type="submit" disabled={isSubmitting}>
              {props.submit}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const FormVendor = (props) => <MyEnhancedForm submit={props.submit} />;
export default FormVendor;
