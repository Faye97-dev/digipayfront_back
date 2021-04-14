import "./formik-demo.css";
import React, { useEffect, useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import {
  Button,
  Row,
  Col,
  Label,
  Card,
  Modal,
  CardBody,
  Badge,
} from "reactstrap";
import { connect } from "react-redux";
import { getAgences } from "../../actions/agence";
import { getClients } from "../../actions/client";
import { addTransfert } from "../../actions/transaction";
import { check_clienAnonyme } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import { SyncLoader, ClipLoader } from "react-spinners";
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
    //destinataire: Yup.object().required("Destinataire est obligatoire!"),
    destinataire: Yup.number()
      .min(20000000, " Numero de telephone invalid  !")
      .max(99999999, " Numero de telephone invalid  !")
      .required(" Destinataire est obligatoire !"),
    expediteur: Yup.number().when("transaction_type", {
      //is: (transaction_type) => transaction_type.value === "SUP_3000",
      is: (transaction_type) =>
        objectAttributeExist(transaction_type, "SUP_3000"),
      then: Yup.number()
        .min(20000000, " Numero de telephone invalid  !")
        .max(99999999, " Numero de telephone invalid  !")
        .required(" Expediteur est obligatoire !"),
      //otherwise: Yup.string()
    }),

    montant: Yup.number().when("transaction_type", {
      is: (transaction_type) =>
        objectAttributeExist(transaction_type, "SUP_3000"),

      then: Yup.number()
        .min(30001, "Montant doit etre plus 30000 MRU !")
        .max(100000, "Montant ne peut depasser 100000 MRU !")
        .required("Montant est obligatoire !"),
      otherwise: Yup.number()
        .min(10, "Montant doit etre plus 10 MRU !")
        .max(30000, "Montant ne peut depasser 30000 MRU !")
        .required("Montant est obligatoire !"),
    }),

    /*frais_origine: Yup.number()
      .min(0, "Frais origine invalid")
      .required("Frais destination est obligatoire!"),
    frais_destination: Yup.number()
      .min(0, "Frais_destination invalid")
      .required("Frais_destination est obligatoire!"),*/
  }),
  mapPropsToValues: (props) => ({
    transaction_type: "",
    agence_destination: "",
    destinataire: "",
    destinataireInfo: null,
    expediteur: "",
    expediteurInfo: null,
    montant: 0,
    frais_origine: 0,
    frais_destination: 0,
    remarque: "",
    //note: "",
  }),
  handleSubmit: (
    values,
    { props, resetForm, setSubmitting, setFieldError }
  ) => {
    //{ setSubmitting, resetForm, addTransfert }
    const payload = {
      ...values,
      agence_origine: props.user.agence.id,
      agence_destination: values.agence_destination.value,
      categorie_transaction: values.transaction_type.value,
      //expediteur: values.expediteur.value,
    };

    // trans inf 3000
    if (values.destinataireInfo === null) {
      setFieldError(
        "destinataire",
        "Veuillez ajouter les informations du destinataire !"
      );
      setSubmitting(false);
    }
    if (
      payload.categorie_transaction === "INF_3000" &&
      values.destinataireInfo
    ) {
      props.addTransfert(payload, resetForm, setSubmitting, showAlert);
    }

    // trans sup 3000
    if (
      //values.expediteur !== "" &&
      payload.categorie_transaction === "SUP_3000" &&
      values.expediteurInfo === null
    ) {
      setFieldError(
        "expediteur",
        "Veuillez ajouter les informations de l'expediteur !"
      );
      setSubmitting(false);
    }

    if (
      payload.categorie_transaction === "SUP_3000" &&
      values.expediteurInfo &&
      values.destinataireInfo
    ) {
      if (!values.expediteurInfo.digipay) {
        props.addTransfert(payload, resetForm, setSubmitting, showAlert);
      } else {
        showAlert(
          "warning",
          "Nous vous conseillons d'utiliser l'application mobile pour un envoi venant d'un client digiPay",
          <FontAwesomeIcon icon={["far", "question-circle"]} />
        );
        setSubmitting(false);
      }
    }

    //
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
    setFieldError,
    isSubmitting,
    handleChange,
    agences,
    //clients,
    user,
    resetForm,
    //setSubmitting,
  } = props;

  useEffect(() => {
    props.getAgences(showAlert);
    //props.getClients(showAlert);
  }, []);

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

  //const [destinataireInfo, setDestinataireInfo] = useState(null);
  const [destinataireLoading, setDestinataireLoading] = useState(false);
  const destinataireHandleChange = (e) => {
    handleChange(e);
    if (e.target.value.toString().length === 8) {
      setDestinataireLoading(true);
      check_clienAnonyme({ tel: e.target.value }, showAlert, props.access).then(
        (res) => {
          const keys = Object.keys({ ...res });
          if (keys.includes("msg")) {
            showAlert(
              "warning",
              res.msg,
              <FontAwesomeIcon icon={["far", "question-circle"]} />
            );
            if (values.destinataireInfo) {
              console.log("reset destinataire info");
              setFieldValue("destinataireInfo", null);
            }
          } else {
            setFieldValue("destinataireInfo", res);
          }
          setDestinataireLoading(false);
        }
      );
    } else {
      if (values.destinataireInfo) {
        console.log("reset destinataire info");
        setFieldValue("destinataireInfo", null);
      }
    }
  };

  const [expediteurLoading, setExpediteurLoading] = useState(false);
  const expediteurHandleChange = (e) => {
    handleChange(e);
    if (e.target.value.toString().length === 8) {
      setExpediteurLoading(true);
      check_clienAnonyme({ tel: e.target.value }, showAlert, props.access).then(
        (res) => {
          const keys = Object.keys({ ...res });
          if (keys.includes("msg")) {
            showAlert(
              "warning",
              res.msg,
              <FontAwesomeIcon icon={["far", "question-circle"]} />
            );
            if (values.expediteurInfo) {
              console.log("reset expediteur info");
              setFieldValue("expediteurInfo", null);
            }
          } else {
            setFieldValue("expediteurInfo", res);
          }
          setExpediteurLoading(false);
        }
      );
    } else {
      if (values.expediteurInfo) {
        console.log("reset expediteur info");
        setFieldValue("expediteurInfo", null);
      }
    }
  };

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
            reset={true}
            setFieldValue={setFieldValue}
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
                  {/*<MySelect
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
                  />*/}
                  <CustomSearchInput
                    label="Destinataire"
                    name="destinataire"
                    type="number"
                    error={errors.destinataire}
                    touched={touched.destinataire}
                    onChange={destinataireHandleChange}
                    placeholder="Selectionner un destinataire ..."
                    addIcon={addIcon}
                    loading={destinataireLoading}
                  />
                  {(!errors.destinataire || !touched.destinataire) && (
                    <div className="d-flex justify-content-start pt-2">
                      {values.destinataireInfo && (
                        <Badge color="dark" className="my-2 mr-3 px-2">
                          <span className="text-white font-size-sm">
                            {values.destinataireInfo?.nom}
                          </span>
                        </Badge>
                      )}

                      {values.destinataireInfo?.digipay && (
                        <Badge color="primary" className="my-2 px-2">
                          <span className="text-white font-size-sm ">
                            Digipay
                          </span>
                        </Badge>
                      )}
                    </div>
                  )}
                </Col>
                <Col xl="6">
                  <CustomSearchInput
                    label="Expediteur"
                    name="expediteur"
                    type="number"
                    error={errors.expediteur}
                    touched={touched.expediteur}
                    onChange={expediteurHandleChange}
                    placeholder="Selectionner un expediteur ..."
                    addIcon={addIcon}
                    loading={expediteurLoading}
                  />
                  {(!errors.expediteur || !touched.expediteur) && (
                    <div className="d-flex justify-content-start pt-2">
                      {values.expediteurInfo && (
                        <Badge color="dark" className="my-2 mr-3 px-2">
                          <span className="text-white font-size-sm">
                            {values.expediteurInfo?.nom}
                          </span>
                        </Badge>
                      )}

                      {values.expediteurInfo?.digipay && (
                        <Badge color="primary" className="my-2 px-2">
                          <span className="text-white font-size-sm ">
                            Digipay
                          </span>
                        </Badge>
                      )}
                    </div>
                  )}
                </Col>
              </>
            ) : (
              <>
                <Col xl="12">
                  <CustomSearchInput
                    label="Destinataire"
                    name="destinataire"
                    type="number"
                    error={errors.destinataire}
                    touched={touched.destinataire}
                    onChange={destinataireHandleChange}
                    placeholder="Selectionner un destinataire ..."
                    addIcon={addIcon}
                    loading={destinataireLoading}
                  />
                </Col>
                {(!errors.destinataire || !touched.destinataire) && (
                  <Col xl="12">
                    <div className="d-flex justify-content-start pt-2">
                      {values.destinataireInfo && (
                        <Badge color="dark" className="my-2 mr-3 px-2">
                          <span className="text-white font-size-sm">
                            {values.destinataireInfo?.nom}
                          </span>
                        </Badge>
                      )}

                      {values.destinataireInfo?.digipay && (
                        <>
                          <Badge color="primary" className="my-2 px-2">
                            <span className="text-white font-size-sm ">
                              Digipay
                            </span>
                          </Badge>
                        </>
                      )}
                    </div>
                  </Col>
                )}
              </>
            )}
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
            {/*<Col xl="6" style={{ margin: "12px 0" }}>
              <Label for="frais_origine">Frais d'origine</Label>
              <Field name="frais_origine" type="number" />

              {errors.frais_origine && touched.frais_origine && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.frais_origine}
                </div>
              )}
            </Col>*/}
            {/*<Col xl="6" style={{ margin: "12px 0" }}>
              <Label for="frais_destination">Frais de destination</Label>
              <Field name="frais_destination" type="number" />

              {errors.frais_destination && touched.frais_destination && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.frais_destination}
                </div>
              )}
            </Col>*/}
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

class CustomSearchInput extends React.Component {
  handleChange = (item) => {
    this.props.onChange(this.props.name, item);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <div>
        <Label for={this.props.name}>{this.props.label}</Label>
        {this.props.addIcon && (
          <Row>
            <Col xs="10" sm="10" md="11">
              <Field
                name={this.props.name}
                type={this.props.type}
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}
              />
            </Col>

            <Col xs="2" sm="2" md="1" className="p-0">
              {this.props.loading ? (
                <ClipLoader color={"var(--primary)"} loading={true} />
              ) : (
                this.props.addIcon
              )}
            </Col>
          </Row>
        )}
        {this.props.error && this.props.touched && (
          <div style={{ color: "red", marginTop: ".5rem" }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
}

class MySelect extends React.Component {
  handleChange = (item) => {
    // this is going to call setFieldValue and manually update values.topcis
    //console.log(item);
    this.props.onChange(this.props.name, item);
    if (this.props.reset) {
      this.props.setFieldValue("agence_destination", "");
      this.props.setFieldValue("destinataire", "");
      this.props.setFieldValue("destinataireInfo", null);
      this.props.setFieldValue("expediteur", "");
      this.props.setFieldValue("expediteurInfo", null);
      this.props.setFieldValue("montant", 0);
      this.props.setFieldValue("remarque", "");
    }
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
  access: state.auth.access,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {
  getAgences,
  getClients,
  addTransfert,
})(FormTransfert);
