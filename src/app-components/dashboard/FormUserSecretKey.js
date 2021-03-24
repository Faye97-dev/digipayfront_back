import "./formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";
import { checkSecretKey } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import { addRetraitByRandomCode } from "../../actions/transaction";
import { connect } from "react-redux";

// Form sercret key for a vendor and client digipay
const formikEnhancer = withFormik({
  mapPropsToValues: (props) => ({
    secret_key: "",
    //nom_destinataire: "",
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = {
      ...values,
    };
    checkSecretKey(
      { id: props.transactionId, model_transaction: "PRE_TRANSACTION" },
      payload.secret_key,
      showAlert,
      props.access
    ).then((res) => {
      if (res) {
        if (res.checked) {
          props.addRetraitByRandomCode(
            {
              id: props.transactionId,
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
const FormUserSecretKey = (props) => <MyEnhancedForm {...props} />;

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {
  addRetraitByRandomCode,
})(FormUserSecretKey);
