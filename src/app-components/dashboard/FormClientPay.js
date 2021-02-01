import "./formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    code_facture: Yup.number()
      .min(0, "Code de paiement ou Numero de facture invalid  !")
      .required("Code de paiement ou Numero de facture est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    code_facture: "",
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
    <Form onSubmit={handleSubmit} className="px-5">
      <Row>
        <Col xl="12" style={{ margin: "12px 0" }}>
          <Label for="code_facture">
            Entrez un code de paiement ou un numéro de facture
          </Label>
          <Field name="code_facture" type="number" />

          {errors.code_facture && touched.code_facture && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.code_facture}
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col xl="12" style={{ margin: "12px 0" }}>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Payer
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const FormClientPay = () => <MyEnhancedForm />;
export default FormClientPay;
