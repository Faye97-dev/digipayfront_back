import "./formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    tel: Yup.number()
      .min(0, "Numero de telephone invalid  !")
      .max(100000000, "Numero de telephone invalid  !")
      .required("Numero de telephone est obligatoire !"),
    /*.test(
        "len",
        "Must be exactly 5 characters",
        (tel) => tel.toString().length === 5
      ),*/
    montant: Yup.number()
      .min(0, "Montant doit etre positif !")
      .required("Montant est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    tel: "",
    montant: "",
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
          <Label for="tel">Client</Label>
          <Field name="tel" type="number" />

          {errors.tel && touched.tel && (
            <div style={{ color: "red", marginTop: ".5rem" }}>{errors.tel}</div>
          )}
        </Col>
      </Row>
      <Row>
        <Col xl="12" style={{ margin: "12px 0" }}>
          <Label for="montant">Montant</Label>
          <Field name="montant" type="number" />

          {errors.montant && touched.montant && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.montant}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col xl="12" style={{ margin: "12px 0" }}>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Envoyer
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const FormClientSend = () => <MyEnhancedForm />;
export default FormClientSend;
