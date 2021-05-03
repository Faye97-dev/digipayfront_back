import "./formik-demo.css";
import React, { useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Badge } from "reactstrap";
import { connect } from "react-redux";
import { showAlert } from "../../utils/alerts";
import { SyncLoader } from "react-spinners";
import Switch from "rc-switch";
import { addFastPayement_Vendor } from "../../actions/transaction";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    montant: Yup.number()
      .min(10, " Montant doit etre plus 10 MRU !")
      .max(1000000, " Montant ne peut depasser 1000000 MRU !")
      .required(" Montant est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    montant: "",
    label: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = props.beforeSubmit({ ...values });
    props.addFastPayement_Vendor(
      payload,
      showAlert,
      setSubmitting,
      props.closeModal
    );
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting, setFieldValue } = props;

  return (
    <>
      <Form onSubmit={handleSubmit} className="px-4 pt-1 pb-4">
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

          <Col xl="12" style={{ margin: "12px 0" }}>
            <Label for="label">Libellé</Label>
            <Field name="label" type="text" />

            {errors.label && touched.label && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.label}
              </div>
            )}
          </Col>
        </Row>
        <div className="d-flex align-items-center pt-3">
          <div className="mr-auto">
            <Button
              color="danger"
              disabled={isSubmitting}
              onClick={props.closeModal}
              size="md"
            >
              Annuler
            </Button>
          </div>
          <div className="ml-auto">
            {isSubmitting ? (
              <SyncLoader color={"var(--info)"} loading={true} />
            ) : (
              <div>
                <Button
                  color="primary"
                  className="ml-0"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Payer
                </Button>
              </div>
            )}
          </div>
        </div>
      </Form>
    </>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const FormVendorFastPay = (props) => <MyEnhancedForm {...props} />;

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, { addFastPayement_Vendor })(
  FormVendorFastPay
);
