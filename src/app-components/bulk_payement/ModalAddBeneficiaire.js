import "../dashboard/formik-demo.css";
import React, { useState } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Modal, Badge } from "reactstrap";
import { showAlert } from "../../utils/alerts";
import { SyncLoader } from "react-spinners";
import { addBeneficiaireGrpPayement } from "../../actions/grp_payement";
import { checkClientDigipay_grpPayement } from "../../actions/async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    tel: Yup.number()
      .min(20000000, " Numero de telephone invalid  !")
      .max(99999999, " Numero de telephone invalid  !")
      .required(" Numero de telephone est obligatoire !"),
    montant: Yup.number().when("digipay", {
      is: (digipay) => digipay,
      then: Yup.number()
        .min(10, " Montant doit etre plus 10 MRU !")
        .max(100000, " Montant ne peut depasser 100000 MRU !")
        .required(" Montant est obligatoire !"),
    }),
    motif: Yup.string().max(30, "Nombre de caractères limite dépassé !"),
  }),
  mapPropsToValues: (props) => ({
    montant: 0,
    motif: "",
    digipay: false,
    tel: "",
  }),
  handleSubmit: (values, { props, setSubmitting, setFieldValue }) => {
    const payload = {
      ...values,
    };

    /*payload["grp_payement"] = props.item.grp_payement.id;
    payload["id"] = props.item.id;*/

    if (!values.digipay) {
      const payload1 = { tel: payload.tel, user: props.user.id };
      checkClientDigipay_grpPayement(payload1, showAlert, props.access).then(
        (res) => {
          if (res) {
            const keys = Object.keys({ ...res });
            if (keys.includes("msg")) {
              showAlert(
                "warning",
                res.msg,
                <FontAwesomeIcon icon={["far", "question-circle"]} />
              );
            } else {
              setFieldValue("digipay", true);
              props.setClient(res);
            }
          }
          setSubmitting(false);
        }
      );
    } else {
      const payload2 = {
        motif: payload.motif,
        montant: payload.montant,
        beneficiaire: props.client.id,
        grp_payement: props.grp_payement,
      };

      props.addBeneficiaireGrpPayement(
        payload2,
        showAlert,
        setSubmitting,
        props.handleModal,
        props.syncActionToState
      );
    }

    /**/
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const {
    touched,
    errors,
    handleSubmit,
    isSubmitting,
    values,
    resetForm,
  } = props;
  return (
    <>
      <Form onSubmit={handleSubmit} className="px-sm-5 px-3 pt-3">
        <Row>
          {!values.digipay && (
            <Col xl="12" style={{ margin: "12px 0" }}>
              <Label for="tel">Telephone</Label>
              <Field name="tel" type="number" />

              {errors.tel && touched.tel && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.tel}
                </div>
              )}
            </Col>
          )}

          {values.digipay && (
            <>
              {props.client && (
                <Col xl="12" style={{ margin: "12px 0" }}>
                  <Badge color="primary" className="my-2 mr-3 px-2">
                    <span className="text-white font-size-md">{`${props.client.first_name} ${props.client.last_name}`}</span>
                  </Badge>
                </Col>
              )}

              <Col xl="12" style={{ margin: "12px 0" }}>
                <Label for="montant">Montant</Label>
                <Field name="montant" type="number" />
                {errors.montant && touched.montant && (
                  <div
                    style={{ color: "red", marginTop: ".5rem" }}
                    className="px-3"
                  >
                    {errors.montant}
                  </div>
                )}
              </Col>
              <Col xl="12" style={{ margin: "12px 0" }}>
                <Label for="motif">Motif</Label>
                <Field name="motif" type="text" />
                {errors.motif && touched.motif && (
                  <div style={{ color: "red", marginTop: ".5rem" }}>
                    {errors.motif}
                  </div>
                )}
              </Col>
            </>
          )}
        </Row>
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <div className="d-flex py-1">
              <div className="mr-auto">
                <Button
                  className="btn btn-danger btn-block mb-4 px-2 px-sm-4"
                  onClick={() => {
                    if (values.digipay) {
                      props.setClient(null);
                      resetForm();
                    } else {
                      props.handleModal(null);
                    }
                  }}
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
              </div>
              <div className="ml-auto">
                {isSubmitting ? (
                  <>
                    <SyncLoader color={"var(--success)"} loading={true} />
                  </>
                ) : (
                  <Button
                    className="btn btn-success btn-block mb-4 px-2 px-sm-4"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Ajouter
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
const ModalAddBeneficiaire = (props) => {
  return (
    <>
      <Modal
        zIndex={2000}
        centered
        size="md"
        isOpen={props.modal}
        toggle={props.handleModal}
        contentClassName="border-0 bg-gray"
      >
        <MyEnhancedForm
          {...props}
          client={props.client}
          setClient={props.setClient}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, {
  addBeneficiaireGrpPayement,
})(ModalAddBeneficiaire);
