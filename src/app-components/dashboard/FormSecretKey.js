import "./formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";
import { checkSecretKey } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import { addRetraitBySms } from "../../actions/transaction";
import { connect } from "react-redux";
const formikEnhancer = withFormik({
  /*validationSchema: Yup.object().shape({
    secret_key: Yup.number()
      .min(0, "Numero de transaction doit etre positif !")
      .required("Numero de transaction est obligatoire !"),
  }),*/
  mapPropsToValues: (props) => ({
    secret_key: "",
    nom_destinataire: "",
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = {
      ...values,
    };
    //if (props.confirmedKey === false) {
    checkSecretKey(
      { id: props.transactionId, model_transaction: "PRE_TRANSACTION" },
      payload.secret_key,
      showAlert,
      props.access
    ).then((res) => {
      if (res) {
        if (res.checked) {
          props.addRetraitBySms(
            {
              id: props.transactionId,
              nom_destinataire: payload.nom_destinataire,
            },
            props.removeRetrait,
            showAlert,
            setSubmitting,
            props.closeModal
          );
          //setSubmitting(false);
        } else if (res.checked === false) {
          showAlert(
            "warning",
            "Code de confirmation invalid !",
            <FontAwesomeIcon icon={["fas", "question-circle"]} />
          );
          setSubmitting(false);
        }
      } else {
        setSubmitting(false);
      }
    });
    //}
    //if (props.confirmedKey === true) {
    /**/
    //console.log(props);
    //setSubmitting(false);
    //}
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  return (
    <>
      <Form onSubmit={handleSubmit} className="px-sm-5 px-1">
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <Label for="secret_key">Code de confirmation</Label>
            <Field name="secret_key" type="text" />
          </Col>
          {
            //props.confirmedKey && (
            <Col xl="12" style={{ margin: "12px 0" }}>
              <Label for="nom_destinataire">Nom du Client</Label>
              <Field name="nom_destinataire" type="text" />
            </Col>
            //)
          }
        </Row>
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            {isSubmitting ? (
              <>
                <span className="pr-2">Veuillez patienter svp ... </span>
                <ClipLoader color={"var(--primary)"} loading={true} />
              </>
            ) : (
              <Button color="primary" type="submit" disabled={isSubmitting}>
                {/*!props.confirmedKey ? "Valider" : "Enregistrer le retrait"*/}
                Valider
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);
const FormSecretKey = (props) => <MyEnhancedForm {...props} />;

//export default FormSecretKey;

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {
  addRetraitBySms,
})(FormSecretKey);
