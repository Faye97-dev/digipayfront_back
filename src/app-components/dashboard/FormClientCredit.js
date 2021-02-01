import "./formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";
import Select from "react-select";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    operateur: Yup.object().required("L'operateur est obligatoire !"),
    carte: Yup.object().required("La carte est obligatoire !"),
    tel: Yup.number()
      .min(0, "Numero de telephone invalid  !")
      .max(100000000, "Numero de telephone invalid  !")
      .required("Numero de telephone est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    operateur: "",
    carte: "",
    tel: 45121830,
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      carte: { ...values.carte },
      operateur: { ...values.operateur },
    };
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xl="6" lg="12" style={{ margin: "9px 0" }}>
            <MySelect
              label="Operateur"
              name="operateur"
              option={optionsOperateur}
              value={values.operateur}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.operateur}
              touched={touched.operateur}
            />
          </Col>
          <Col xl="6" lg="12" style={{ margin: "9px 0" }}>
            <MySelect
              label="Carte"
              name="carte"
              option={optionsCarte}
              value={values.carte}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.carte}
              touched={touched.carte}
            />
          </Col>
        </Row>
        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <Label for="tel">Telephone</Label>
            <Field name="tel" type="number" />

            {errors.tel && touched.tel && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.tel}
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <Button color="primary" type="submit" disabled={isSubmitting}>
              Acheter
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const optionsCarte = [
  { value: "50", label: "50 MRU" },
  { value: "100", label: "100 MRU" },
  { value: "200", label: "200 MRU" },
  { value: "500", label: "500 MRU" },
  { value: "100", label: "100 MRU" },
];

const optionsOperateur = [
  { value: "mauritel", label: "Mauritel" },
  { value: "mattel", label: "Matttel" },
  { value: "chinguitel", label: "Chinguitel" },
];

class MySelect extends React.Component {
  handleChange = (item) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange(this.props.name, item);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <div style={{ margin: "9px 0" }}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <Select
          id={this.props.name}
          options={this.props.option}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder="Selectionner ..."
        />
        {!!this.props.error && this.props.touched && (
          <div style={{ color: "red", marginTop: ".5rem" }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
}
const MyEnhancedForm = formikEnhancer(MyForm);

const FormClientCredit = () => <MyEnhancedForm />;
export default FormClientCredit;
