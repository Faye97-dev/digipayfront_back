import "./formik-demo.css";
import React, { useEffect, useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Button, Row, Col, Label, Card, Modal, CardBody } from "reactstrap";
import { connect } from "react-redux";
import { getAgences } from "../../actions/agence";
import { getClients } from "../../actions/client";
import { addTransfert } from "../../actions/transaction";
import { showAlert } from "../../utils/alerts";
import { SyncLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormAddClient from "./FormAddClient";
const objectAttributeExist = (item, value) => {
  if (!item) {
    return false;
  } else {
    return item.value === value;
  }
};

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
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
        .min(30001, "Montant doit etre plus 30000 MRU")
        .required("Montant est obligatoire!"),
      otherwise: Yup.number()
        .min(10, "Montant invalid")
        .max(30000, "Montant ne peut depasser 30000 MRU")
        .required("Montant est obligatoire!"),
    }),

    frais_origine: Yup.number()
      .min(0, "Frais origine invalid")
      .required("Frais destination est obligatoire!"),
    frais_destination: Yup.number()
      .min(0, "Frais_destination invalid")
      .required("Frais_destination est obligatoire!"),
  }),
  mapPropsToValues: (props) => ({
    transaction_type: "",
    agence_destination: "",
    destinataire: "",
    expediteur: "",
    montant: 0,
    frais_origine: 0,
    frais_destination: 0,
    remarque: "",
    //note: "",
  }),
  handleSubmit: (values, { props, resetForm, setSubmitting }) => {
    //{ setSubmitting, resetForm, addTransfert }
    const payload = {
      ...values,
      agence_origine: props.user.agence.id,
      agence_destination: values.agence_destination.value,
      destinataire: values.destinataire.value,
      expediteur: values.expediteur.value,
      categorie_transaction: values.transaction_type.value,
    };
    //console.log(payload);
    props.addTransfert(payload, resetForm, setSubmitting, showAlert);
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

  useEffect(() => {
    props.getAgences(showAlert);
    props.getClients(showAlert);
  }, []);

  /*const customSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...values,
      agence_origine: props.user.agence.id,
      agence_destination: values.agence_destination.value,
      destinataire: values.destinataire.value,
      expediteur: values.expediteur.value,
      categorie_transaction: values.transaction_type.value,
    };
    console.log(payload);
    props.addTransfert(payload, resetForm, setSubmitting);
  };*/
  const addIcon = (
    <Button
      color="primary"
      outline
      className="my-1 p-2 rounded-sm shadow-none hover-scale-sm d-10 border-0  d-inline-flex align-items-center justify-content-center"
      onClick={() => props.showModal()}
    >
      <FontAwesomeIcon icon={["fas", "plus"]} className="font-size-sm" />
    </Button>
  );

  return (
    <Form onSubmit={handleSubmit} className="px-sm-5 px-1">
      <Row>
        <Col xl="12">
          <MySelect
            label="Type de transaction"
            name="transaction_type"
            option={[
              { value: "INF_3000", label: "Inferieure a 30000 MRU" },
              { value: "SUP_3000", label: "Superieure a 30000 MRU" },
            ]}
            value={values.transaction_type}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={values.transaction_type !== "" && errors.transaction_type}
            touched={touched.transaction_type}
            placeholder="Selectionner le type de la transaction ..."
          />
        </Col>
      </Row>
      {values.transaction_type !== "" && (
        <>
          <Row>
            <Col xl="12">
              <MySelect
                label="Agence de destination"
                name="agence_destination"
                option={
                  agences.loading === false &&
                  agences.payload
                    .filter((item) => item.id !== user.agence.id)
                    .map((item) => {
                      return {
                        value: item.id,
                        label:
                          item.nom +
                          " | " +
                          item.type_agence +
                          " | " +
                          item.tel,
                      };
                    })
                }
                value={values.agence_destination}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.agence_destination}
                touched={touched.agence_destination}
                placeholder="Selectionner une agence ..."
              />
            </Col>
          </Row>
          <Row>
            {values.transaction_type.value === "SUP_3000" ? (
              <>
                <Col xl="6">
                  <MySelect
                    label="Destinataire"
                    name="destinataire"
                    option={
                      clients.loading === false &&
                      clients.payload.map((item) => {
                        return {
                          value: item.id,
                          label: item.nom + " | " + item.tel,
                        };
                      })
                    }
                    value={values.destinataire}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.destinataire}
                    touched={touched.destinataire}
                    placeholder="Selectionner un destinataire ..."
                    addIcon={addIcon}
                  />
                </Col>
                <Col xl="6">
                  <MySelect
                    label="Expediteur"
                    name="expediteur"
                    option={
                      clients.loading === false &&
                      clients.payload.map((item) => {
                        return {
                          value: item.id,
                          label: item.nom + " | " + item.tel,
                        };
                      })
                    }
                    value={values.expediteur}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.expediteur}
                    touched={touched.expediteur}
                    placeholder="Selectionner un expediteur ..."
                    addIcon={addIcon}
                  />
                </Col>
              </>
            ) : (
              <Col xl="12">
                <MySelect
                  label="Destinataire"
                  name="destinataire"
                  option={
                    clients.loading === false &&
                    clients.payload.map((item) => {
                      return {
                        value: item.id,
                        label: item.nom + " | " + item.tel,
                      };
                    })
                  }
                  value={values.destinataire}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.destinataire}
                  touched={touched.destinataire}
                  placeholder="Selectionner un destinataire ..."
                  addIcon={addIcon}
                />
              </Col>
            )}
          </Row>

          <Row>
            <Col xl="6" style={{ margin: "12px 0" }}>
              <Label for="montant">Montant</Label>
              <Field name="montant" type="number" />

              {errors.montant && touched.montant && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.montant}
                </div>
              )}
            </Col>
            <Col xl="6" style={{ margin: "12px 0" }}>
              <Label for="frais_origine">Frais d'origine</Label>
              <Field name="frais_origine" type="number" />

              {errors.frais_origine && touched.frais_origine && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.frais_origine}
                </div>
              )}
            </Col>
            <Col xl="6" style={{ margin: "12px 0" }}>
              <Label for="frais_destination">Frais de destination</Label>
              <Field name="frais_destination" type="number" />

              {errors.frais_destination && touched.frais_destination && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.frais_destination}
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
        </>
      )}
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
      <div style={{ margin: "12px 0" }}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        {this.props.addIcon ? (
          <Row>
            <Col xs="10" sm="10" md="11">
              <Select
                id={this.props.name}
                options={this.props.option}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.props.value}
                placeholder={this.props.placeholder}
              />
            </Col>
            <Col xs="2" sm="2" md="1" className="p-0">
              {this.props.addIcon}
            </Col>
          </Row>
        ) : (
          <Select
            id={this.props.name}
            options={this.props.option}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
            placeholder={this.props.placeholder}
          />
        )}

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

const FormTransfert = (props) => {
  const [modalAddClient, setModalAddClient] = useState(false);
  const showModal = () => setModalAddClient(!modalAddClient);

  const [item, setItem] = useState(null);
  const handleItem = (obj) => setItem(obj);

  return (
    <>
      <MyEnhancedForm
        showModal={showModal}
        modalAddClient={modalAddClient}
        handleItem={handleItem}
        {...props}
      />
      <Modal
        zIndex={2000}
        centered
        size="lg"
        isOpen={modalAddClient}
        toggle={showModal}
        contentClassName="border-0"
      >
        {modalAddClient && (
          <Row className="no-gutters">
            <Col xl="12">
              <div className="bg-white rounded ">
                <div className="px-4 pt-4 pb-2">
                  <h1 className="pb-2 display-4 font-weight-bold font-size-lg text-primary text-center">
                    <span>
                      Enregistrer les informations d'un nouveau client
                    </span>
                  </h1>
                  <div className="rounded">
                    <div className="px-1 py-0">
                      <Card className="card-box mb-4">
                        <CardBody>
                          <FormAddClient showModal={showModal} />
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  agences: state.agence.agences,
  clients: state.client.clients,
  user: state.auth.user,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {
  getAgences,
  getClients,
  addTransfert,
})(FormTransfert);
