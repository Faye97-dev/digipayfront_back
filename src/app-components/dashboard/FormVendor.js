import "./formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";
import { connect } from "react-redux";
import { randomCodePayement, updateNotification } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import { SyncLoader } from "react-spinners";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    montant: Yup.number()
      .min(10, " Montant doit etre plus 10 MRU !")
      //.max(30000, " Montant ne peut depasser 30000 MRU !")
      .required(" Montant est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    montant: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };

    payload["id"] = props.user.id;

    randomCodePayement(payload, showAlert, props.access).then((res) => {
      if (res) {
        const { id, ...notifBody } = res.notification;
        props.generateQrCode(res.code_confirmation).then((res) => {
          if (res) {
            //notifBody.qrcode = res;
            //console.log(res);
            const fileData = { content: res, name: `QrCode${Date.now()}.jpg` };
            updateNotification(
              id,
              notifBody,
              fileData,
              showAlert,
              props.access
            );
          }
        });
      }
      setSubmitting(false);
      resetForm();
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
            {/*<Button color="primary" type="submit" disabled={isSubmitting}>
              {props.submit}
            </Button>*/}
            {isSubmitting ? (
              <SyncLoader color={"var(--primary)"} loading={true} />
            ) : (
              <Button color="primary" type="submit" disabled={isSubmitting}>
                {props.submit}
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const FormVendor = (props) => <MyEnhancedForm {...props} />;
//export default FormVendor;

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {})(FormVendor);
