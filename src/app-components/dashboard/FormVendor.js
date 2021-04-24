import "./formik-demo.css";
import React, { useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Badge } from "reactstrap";
import { connect } from "react-redux";
import { randomCodePayement, updateNotification } from "../../actions/async";
import { showAlert } from "../../utils/alerts";
import { SyncLoader } from "react-spinners";
import Switch from "rc-switch";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    montant: Yup.number()
      .min(10, " Montant doit etre plus 10 MRU !")
      .max(1000000, " Montant ne peut depasser 1000000 MRU !")
      .required(" Montant est obligatoire !"),
    livraison: Yup.boolean(),

    delai: Yup.number().when("livraison", {
      is: (livraison) => livraison === true,
      then: Yup.number()
        .min(1, " Le delai minimun est de 1 jour !")
        .max(90, "  Le delai maximum est de 90 jour !")
        .required(" Le delai est obligatoire !"),
      //otherwise: Yup.string()
    }),
    //.required(" Montant est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    montant: "",
    delai: 0,
    label: "",
    livraison: false,
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };

    payload["id"] = props.user.id;

    randomCodePayement(payload, showAlert, props.access).then((res) => {
      if (res) {
        const { id, ...notifBody } = res.notification;
        props.setShowCodePaiement(res.code_confirmation);
        if (!values.livraison) {
          props.generateQrCode(res.code_confirmation).then((res) => {
            if (res) {
              const fileData = {
                content: res,
                name: `QrCode${Date.now()}.jpg`,
              };
              updateNotification(
                id,
                notifBody,
                fileData,
                showAlert,
                props.access
              );
            }
          });
        } else {
          props.handleModal();
        }
      }
      setSubmitting(false);
      resetForm();
    });
    /*console.log(payload);
    setSubmitting(false);*/
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting, setFieldValue } = props;
  //const [checked, setChecked] = useState(false);

  const toggle = () => {
    setFieldValue("livraison", !props.values.livraison);
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className="px-sm-5 px-1">
        <Row>
          <div className="d-flex align-items-center mx-3 px-1">
            <div className="py-1 pr-4 font-weight-bold font-size-lg text-primary">
              {/*<Badge className="px-3 font-size-md" color="primary">*/}
              E-commerce
            </div>

            <Switch
              checked={props.values.livraison}
              onClick={toggle}
              className="switch-small toggle-switch-success"
            />
          </div>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <Label for="montant">Montant</Label>
            <Field name="montant" type="number" />

            {errors.montant && touched.montant && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.montant}
              </div>
            )}
          </Col>
          {props.values.livraison && (
            <Col xl="12" style={{ margin: "12px 0" }}>
              <Label for="delai">Delai de livraison</Label>
              <Field name="delai" type="number" />

              {errors.delai && touched.delai && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.delai}
                </div>
              )}
            </Col>
          )}
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
});

export default connect(mapStateToProps, {})(FormVendor);
