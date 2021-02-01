import "../dashboard/formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Card } from "reactstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    montant: Yup.number()
      .min(0, "Montant invalid  !")
      .required("Montant est obligatoire !"),
    nom: Yup.string().required("Nom complet est obligatoire !"),
    card_type: Yup.string()
      .required("Type de carte est obligatoire !")
      .oneOf(["master_card", "card_visa"]),
    numero_carte: Yup.number()
      .min(0, "Numero de la carte invalid  !")
      .required("Numero de la carte est obligatoire !"),
    mois: Yup.object().required("Mois est obligatoire !"),
    annee: Yup.number()
      .min(0, "Annee invalid  !")
      .required("Annee est obligatoire !"),
    cvv: Yup.number()
      .min(0, "Code CVV invalid  !")
      .max(1000, "Code CVV invalid  !")
      .required("Code CVV est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    card_type: "",
    nom: "",
    montant: "",
    numero_carte: "",
    mois: "",
    annee: "",
    cvv: "",
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      mois: { ...values.mois },
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
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xl="12">
            <div role="group" aria-labelledby="my-radio-group">
              <label>
                <Field type="radio" name="card_type" value="master_card" />
                Master Card
                <span className="px-2">
                  <FontAwesomeIcon
                    icon={["fa", "credit-card"]}
                    className="font-size-lg text-primary"
                  />
                </span>
              </label>
              <label className="px-3">
                <Field type="radio" name="card_type" value="card_visa" />
                Carte Visa
                <span className="px-2">
                  <FontAwesomeIcon
                    icon={["fa", "credit-card"]}
                    className="font-size-lg text-danger"
                  />
                </span>
              </label>
              {errors.card_type && touched.card_type && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.card_type}
                </div>
              )}
            </div>
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
          <Col xl="6" style={{ margin: "9px 0" }}>
            <Label for="nom">Nom complet</Label>
            <Field name="nom" type="text" />

            {errors.nom && touched.nom && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.nom}
              </div>
            )}
          </Col>
          <Col xl="6" style={{ margin: "9px 0" }}>
            <Label for="numero_carte">Numero de la carte</Label>
            <Field
              name="numero_carte"
              type="number"
              placeholder="XXXX-XXXX-XXXX-XXXX"
            />

            {errors.numero_carte && touched.numero_carte && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.numero_carte}
              </div>
            )}
          </Col>
        </Row>

        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <MySelect
              label="Mois d'expiration"
              name="mois"
              option={optionsMois}
              value={values.mois}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.mois}
              touched={touched.mois}
            />
          </Col>
        </Row>

        <Row>
          <Col xl="6" style={{ margin: "9px 0" }}>
            <Label for="annee">Annee d'expiration</Label>
            <Field name="annee" type="number" placeholder="2021" />
            {errors.annee && touched.annee && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.annee}
              </div>
            )}
          </Col>

          <Col xl="6" style={{ margin: "9px 0" }}>
            <Label for="cvv">Code CVV</Label>
            <Field name="cvv" type="number" placeholder="XXX" />

            {errors.cvv && touched.cvv && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.cvv}
              </div>
            )}
          </Col>
        </Row>

        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <Button color="primary" type="submit" disabled={isSubmitting}>
              Confirmer
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const optionsMois = [
  { value: "jan", label: "Janvier" },
  { value: "fev", label: "Fevrier" },
  { value: "avr", label: "Mars" },
  { value: "mai", label: "Avril" },
  { value: "juin", label: "Mai" },
  { value: "juil", label: "Juin" },
  { value: "aout", label: "Juillet" },
  { value: "sep", label: "Aout" },
  { value: "oct", label: "Septembre" },
  { value: "nov", label: "Octobre" },
  { value: "dec", label: "Decembre" },
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
          placeholder="Selectionner le mois ..."
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

const FormBanquaire = () => (
  <Card>
    <div className="m-4">
      <MyEnhancedForm />
    </div>
  </Card>
);
export default FormBanquaire;
