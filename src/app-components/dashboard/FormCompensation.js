import "../dashboard/formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Card } from "reactstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { showAlert } from "../../utils/alerts";
import { addCompensation } from "../../actions/compensation";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    montant: Yup.number()
      .min(10, " Montant doit etre plus 10 MRU !")
      .max(1000000, " Montant ne peut depasser 1000000 MRU !")
      .required(" Montant est obligatoire !"),

    /*transaction_type: Yup.string()
      .required("Type de transaction est obligatoire !")
      .oneOf(["versement", "retrait"]),*/

    transaction_type: Yup.object().required(
      "Type de transaction est obligatoire!"
    ),
    agence: Yup.object().required("Agence est obligatoire!"),

    /*frais_origine: Yup.number()
        .min(0, "Frais origine > 0")
        .required("Frais destination is required!"),
      frais_destination: Yup.number()
        .min(0, "Frais_destination > 0")
        .required("Frais_destination is required!"),*/
  }),
  mapPropsToValues: (props) => ({
    transaction_type: "",
    agence: "",
    montant: 0,
    //frais_origine: 0,
    //frais_destination: 0,
    remarque: "",
    //note: "",
  }),
  handleSubmit: (values, { props, resetForm, setSubmitting }) => {
    const payload = {
      ...values,
      agence_destination: values.agence.value,
      type_trans: values.transaction_type.value,
      agent: props.user.id,
    };
    //console.log(payload);
    props.addCompensation(payload, resetForm, setSubmitting, showAlert);
    //setSubmitting(false);
    //resetForm();
    /*setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);*/
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    agences,
  } = props;
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xl="6">
            <MySelect
              label="Type de transaction"
              name="transaction_type"
              option={[
                { value: "versement", label: "Versement" },
                { value: "retrait", label: "Retrait" },
              ]}
              value={values.transaction_type}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.transaction_type}
              touched={touched.transaction_type}
              placeholder="Selectionner le type de la transaction ..."
            />
          </Col>
          <Col xl="6">
            <MySelect
              label="Agence"
              name="agence"
              option={
                agences.loading === false &&
                agences.payload.map((item) => {
                  return {
                    value: item.id,
                    label:
                      item.nom + " | " + item.type_agence + " | " + item.tel,
                  };
                })
              }
              value={values.agence}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.agence}
              touched={touched.agence}
              placeholder="Selectionner une agence ..."
            />
          </Col>
        </Row>

        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
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
            <Label for="remarque">Remarque</Label>
            <Field name="remarque" type="text" placeholder="remarques ...." />

            {errors.remarque && touched.remarque && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.remarque}
              </div>
            )}
          </Col>
          {/*<Col xl="12" style={{ margin: "12px 0" }}>
            <Label for="note">Note</Label>
            <Field name="note" type="text" placeholder="notes ...." />

            {errors.note && touched.note && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.note}
              </div>
            )}
            </Col>*/}
        </Row>
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            {isSubmitting ? (
              <SyncLoader color={"var(--primary)"} loading={true} />
            ) : (
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Enregistrer
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

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
          placeholder={this.props.placeholder}
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

const FormCompensation = (props) => (
  <Card className="mb-5">
    <div className="m-4">
      <MyEnhancedForm {...props} />
    </div>
  </Card>
);

const mapStateToProps = (state) => ({
  agences: state.agence.agences,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  addCompensation,
})(FormCompensation);
