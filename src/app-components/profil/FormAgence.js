import "../dashboard/formik-demo.css";
import React, { useEffect } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Button, Row, Col, Label, Badge } from "reactstrap";
import { connect } from "react-redux";
import { getAgences } from "../../actions/agence";
import { getClients } from "../../actions/client";
import { addTransfert } from "../../actions/transaction";
import { showAlert } from "../../utils/alerts";
import { SyncLoader } from "react-spinners";
const objectAttributeExist = (item, value) => {
  if (!item) {
    return false;
  } else {
    return item.value === value;
  }
};

const formikEnhancer = withFormik({
  /*validationSchema: Yup.object().shape({
    transaction_type: Yup.object().required(
      "Type de transaction est obligatoire!"
    ),
    agence_destination: Yup.object().required(
      "Agence destination est obligatoire !"
    ),
    destinataire: Yup.object().required("Destinataire est obligatoire!"),
    expediteur: Yup.object().when("transaction_type", {
      //is: (transaction_type) => transaction_type.value === "SUP_3000",
      is: (transaction_type) =>
        objectAttributeExist(transaction_type, "SUP_3000"),
      then: Yup.object().required("Expediteur est obligatoire!"),
      //otherwise: Yup.string()
    }),

    montant: Yup.number().when("transaction_type", {
      is: (transaction_type) =>
        objectAttributeExist(transaction_type, "SUP_3000"),

      then: Yup.number()
        .min(3001, "Montant doit etre plus 3000 MRU")
        .required("Montant est obligatoire!"),
      otherwise: Yup.number()
        .min(10, "Montant invalid")
        .max(3000, "Montant ne peut depasser 3000 MRU")
        .required("Montant est obligatoire!"),
    }),

    frais_origine: Yup.number()
      .min(0, "Frais origine invalid")
      .required("Frais destination est obligatoire!"),
    frais_destination: Yup.number()
      .min(0, "Frais_destination invalid")
      .required("Frais_destination est obligatoire!"),
  }),*/
  mapPropsToValues: (props) => ({
    nom: "Agence 1",
    code_agence: "AG235697810",
    type_agence: { value: "AGENCE_INTERN", label: "AGENCE_INTERN" },
    adresse: "Tvz illot 3",
    commune: { value: "TVZ", label: "TVZ" },
    tel: "+222 20301597",
    email: "agence1@gamil.com",
    solde: 2056300,
    frais: 52036,
    dette: 0,
  }),
  handleSubmit: (values, { props, resetForm, setSubmitting }) => {
    //{ setSubmitting, resetForm, addTransfert }
    /*const payload = {
      ...values,
      agence_origine: props.user.agence.id,
      agence_destination: values.agence_destination.value,
      destinataire: values.destinataire.value,
      expediteur: values.expediteur.value,
      categorie_transaction: values.transaction_type.value,
    };*/
    console.log("in build ...");
    setSubmitting(false);
    //props.addTransfert(payload, resetForm, setSubmitting, showAlert);
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
    clients,
    user,
    //resetForm,
    //setSubmitting,
  } = props;

  return (
    <Form onSubmit={handleSubmit} className="px-5 py-4">
      <Row>
        <Col sm="6" style={{ margin: "12px 0" }}>
          <Badge
            className={
              "px-3 py-1 h-auto text-" +
              "success" +
              " border-1 border-" +
              "success"
            }
            color={"neutral-" + "success"}
          >
            Active
          </Badge>
        </Col>
        <Col
          sm="6"
          className="d-flex justify-content-end "
          style={{ margin: "12px 0" }}
        >
          <div className="d-none d-sm-block">
            <Label className="px-2">Dernier cloture</Label>
            <Badge
              className={
                "px-3 py-1 h-auto text-" +
                "danger" +
                " border-1 border-" +
                "danger"
              }
              color={"neutral-" + "danger"}
            >
              05-01-2021 17:55
            </Badge>
          </div>
        </Col>
      </Row>
      <Row>
        {/* first part */}
        <Col xl="4" style={{ margin: "12px 0" }}>
          <Label for="nom">Nom</Label>
          <Field name="nom" type="text" />

          {errors.nom && touched.nom && (
            <div style={{ color: "red", marginTop: ".5rem" }}>{errors.nom}</div>
          )}
        </Col>
        <Col xl="4" style={{ margin: "12px 0" }}>
          <Label for="code_agence">Code agence</Label>
          <Field name="code_agence" type="text" />

          {errors.code_agence && touched.code_agence && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.code_agence}
            </div>
          )}
        </Col>
        <Col xl="4" style={{ margin: "12px 0" }}>
          <MySelect
            label="Type de agence"
            name="type_agence"
            option={[
              { value: "AGENCE_INTERN", label: "AGENCE_INTERN" },
              { value: "PARTNER_SILVER", label: "PARTNER_SILVER" },
              { value: "PARTNER_GOLD", label: "PARTNER_GOLD" },
            ]}
            value={values.type_agence}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={values.type_agence !== "" && errors.type_agence}
            touched={touched.type_agence}
            placeholder="Selectionner le type d'agence ..."
          />
        </Col>
        {/* second part */}
        <Col xl="6" style={{ margin: "12px 0" }}>
          <Label for="adresse">Adresse</Label>
          <Field name="adresse" type="text" />

          {errors.adresse && touched.adresse && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.adresse}
            </div>
          )}
        </Col>
        <Col xl="6" style={{ margin: "12px 0" }}>
          <MySelect
            label="Commune"
            name="commune"
            option={[
              { value: "TVZ", label: "TVZ" },
              { value: "KSAR", label: "KSAR" },
            ]}
            value={values.commune}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={values.commune !== "" && errors.commune}
            touched={touched.commune}
            placeholder="Selectionner la commune ..."
          />
        </Col>
        {/* third part */}
        <Col xl="6" style={{ margin: "12px 0" }}>
          <Label for="tel">Telephone</Label>
          <Field name="tel" type="text" />

          {errors.tel && touched.tel && (
            <div style={{ color: "red", marginTop: ".5rem" }}>{errors.tel}</div>
          )}
        </Col>
        <Col xl="6" style={{ margin: "12px 0" }}>
          <Label for="email">Email</Label>
          <Field name="email" type="email" />

          {errors.email && touched.email && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.email}
            </div>
          )}
        </Col>
        {/* four part */}
        <Col xl="4" style={{ margin: "12px 0" }}>
          <Label for="solde">Solde</Label>
          <Field name="solde" type="number" />

          {errors.solde && touched.solde && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.solde}
            </div>
          )}
        </Col>
        <Col xl="4" style={{ margin: "12px 0" }}>
          <Label for="frais">Frais</Label>
          <Field name="frais" type="number" />

          {errors.frais && touched.frais && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.frais}
            </div>
          )}
        </Col>
        <Col xl="4" style={{ margin: "12px 0" }}>
          <Label for="dette">Dette</Label>
          <Field name="dette" type="number" />

          {errors.dette && touched.dette && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.dette}
            </div>
          )}
        </Col>
        {/* five part */}
      </Row>

      <>
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            {isSubmitting ? (
              <SyncLoader color={"var(--primary)"} loading={true} />
            ) : (
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Enregistrer les modifications
              </Button>
            )}
          </Col>
        </Row>
      </>
    </Form>
  );
};

class MySelect extends React.Component {
  handleChange = (item) => {
    // this is going to call setFieldValue and manually update values.topcis
    //console.log(item);
    this.props.onChange(this.props.name, item);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <div style={{ margin: "4px 0" }}>
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

const mapStateToProps = (state) => ({
  agences: state.agence.agences,
  clients: state.client.clients,
  user: state.auth.user,
  transactions: state.transaction.transactions,
});
const MyEnhancedForm = connect(mapStateToProps, {
  getAgences,
  getClients,
  addTransfert,
})(formikEnhancer(MyForm));

const FormAgence = () => <MyEnhancedForm />;

export default FormAgence;
