import "./formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";
import { connect } from "react-redux";
import { randomCodeRetrait } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import { SyncLoader } from "react-spinners";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    montant: Yup.number()
      .min(10, " Montant doit etre plus 10 MRU !")
      .max(30000, " Montant ne peut depasser 30000 MRU !")
      .required(" Montant est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    montant: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };

    payload["role"] = props.user.role;
    payload["id"] = props.user.id;

    randomCodeRetrait(payload, showAlert, props.access).then((res) => {
      setSubmitting(false);
      resetForm();
    });
    //showDivInfo();
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
            <Label for="montant">
              Obtenez un code pour retirer du cash auprès de l'une de nos
              agences.
            </Label>
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
            {isSubmitting ? (
              <SyncLoader color={"var(--primary)"} loading={true} />
            ) : (
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Demander
              </Button>
            )}
            {/*<Button color="primary" type="submit" disabled={isSubmitting}>
              Demander
                </Button>*/}
          </Col>
        </Row>
      </Form>
    </>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const FormVendorWithdraw = (props) => <MyEnhancedForm {...props} />;

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, {})(FormVendorWithdraw);
