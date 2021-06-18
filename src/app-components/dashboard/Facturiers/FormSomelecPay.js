import "../formik-demo.css";
import React, { useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";
import { showAlert } from "../../../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyncLoader } from "react-spinners";
import { payementSomelec_clientDigipay } from "../../../actions/transaction";
import { connect } from "react-redux";
//import { clientPayementMasse } from "../../../actions/async";
import Switch from "rc-switch";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    montant: Yup.number()
      .min(10, " Montant doit etre plus 10 MRU !")
      .max(1000000, " Montant ne peut pas depasser 1000000 MRU !")
      .required(" Montant est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    montant: Math.trunc(props.item.solde),
  }),
  handleSubmit: (values, { props, setFieldError }) => {
    props.setLoading(true);
    const payload = {
      ...values,
    };

    payload["client"] = props.user.id;
    payload["facturier"] = props.item.facturier;
    payload["libele"] = props.item.service;
    payload["reference"] = props.item.reference;

    if (values.montant > props.item.solde) {
      setFieldError(
        "montant",
        `Le montant ne peut pas depasser ${props.item.solde} MRU`
      );
      props.setLoading(false);
    } else {
      props.payementSomelec_clientDigipay(
        payload,
        showAlert,
        props.setLoading,
        props.handleModalOperationDone
      );
    }
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, setFieldValue } = props;
  const [switchMontantTotal, setMontantTotal] = useState(true);
  const toggleTotalMontant = () => {
    if (switchMontantTotal) setFieldValue("montant", "");
    else setFieldValue("montant", Math.trunc(props.item.solde));

    setMontantTotal(!switchMontantTotal);
  };
  return (
    <>
      <div className="d-flex align-items-center pt-3">
        <div className="py-1 pr-4 font-weight-bold font-size-lg ">
          Montant Total
        </div>

        <Switch
          checked={switchMontantTotal}
          onClick={toggleTotalMontant}
          className="switch-small toggle-switch-success"
        />
      </div>
      <Form onSubmit={handleSubmit} className="p-0 pt-2">
        {!switchMontantTotal && (
          <Row>
            <Col xl="12" style={{ margin: "8px 0" }}>
              <Label for="montant" className="font-size-lg">
                Veuillez saisir un montant
              </Label>
              <Field name="montant" type="number" />
            </Col>
            {errors.montant && touched.montant && (
              <div
                style={{ color: "red", marginTop: ".5rem" }}
                className="px-4"
              >
                {errors.montant}
              </div>
            )}
          </Row>
        )}
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <div className="d-flex py-2">
              <div className="mr-auto">
                <Button
                  color="danger"
                  onClick={() => props.handleModalSomelec(null)}
                  disabled={props.loading}
                >
                  Annuler
                </Button>
              </div>
              <div className="ml-auto">
                {props.loading ? (
                  <>
                    <SyncLoader color={"var(--info)"} loading={true} />
                  </>
                ) : (
                  <Button
                    color="primary"
                    type="submit"
                    disabled={props.loading}
                  >
                    Payer
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);
const FormSomelecPay = (props) => {
  return <MyEnhancedForm {...props} />;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { payementSomelec_clientDigipay })(
  FormSomelecPay
);
