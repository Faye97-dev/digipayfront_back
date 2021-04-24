import "./formik-demo.css";
import React, { useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";
import { checkSecretKey } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import { clientDigipay_Livraison } from "../../actions/transaction";
import { connect } from "react-redux";
const formikEnhancer = withFormik({
  /*validationSchema: Yup.object().shape({
    secret_key: Yup.number()
      .min(0, "Numero de transaction doit etre positif !")
      .required("Numero de transaction est obligatoire !"),
  }),*/
  mapPropsToValues: () => ({
    secret_key: "",
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = {
      ...values,
    };
    if (props.transaction && payload.secret_key !== "")
      checkSecretKey(
        {
          id: props.transaction.transfertID,
          model_transaction: "TRANSFERT_DIRECT",
        },
        payload.secret_key,
        showAlert,
        props.access
      ).then((res) => {
        if (res) {
          if (res.checked) {
            props.clientDigipay_Livraison(
              {
                transaction: props.transaction.transactionID,
                confirm: props.confirmed,
              },
              showAlert
            );
            setSubmitting(false);
            props.handleModalLivraison(null);
          } else if (res.checked === false) {
            showAlert(
              "warning",
              "Code de livraison invalid !",
              <FontAwesomeIcon icon={["fas", "question-circle"]} />
            );
            setSubmitting(false);
          }
        } else {
          setSubmitting(false);
        }
      });
    else setSubmitting(false);
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
            <Label for="secret_key">Code de livraison</Label>
            <Field name="secret_key" type="text" />
          </Col>
        </Row>

        <div className="d-flex justify-content-between pt-3">
          <div className="mr-auto">
            {isSubmitting ? (
              <>
                <ClipLoader color={"var(--danger)"} loading={true} />
              </>
            ) : (
              <Button
                color="danger"
                type="submit"
                size="sm"
                disabled={isSubmitting}
                onClick={() => props.setConfirmed(false)}
              >
                Annuler la livraison
              </Button>
            )}
          </div>
          <div className="ml-auto">
            {isSubmitting ? (
              <>
                <ClipLoader color={"var(--success)"} loading={true} />
              </>
            ) : (
              <Button
                color="success"
                type="submit"
                size="sm"
                disabled={isSubmitting}
                onClick={() => props.setConfirmed(true)}
              >
                Confirmer
              </Button>
            )}
          </div>
        </div>
      </Form>
    </>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);
const FormSecretKeyLivraison = (props) => {
  const [confirmed, setConfirmed] = useState(null);
  return (
    <MyEnhancedForm
      {...props}
      confirmed={confirmed}
      setConfirmed={setConfirmed}
    />
  );
};

const mapStateToProps = (state) => ({
  //user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, {
  clientDigipay_Livraison,
})(FormSecretKeyLivraison);
