import "../dashboard/formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label } from "reactstrap";
import { showAlert } from "../../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyncLoader } from "react-spinners";
import { client_participate_cagnote } from "../../actions/cagnote";
import { connect } from "react-redux";
import { clientPayementMasse } from "../../actions/async";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    motif: Yup.string()
      .max(30, "Nombre de caractères limite dépassé !")
      .required("Motif du paiement est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    motif: "",
  }),
  handleSubmit: (values, { props }) => {
    const payload = {
      ...values,
    };

    payload["grp_payement"] = props.item.id;
    payload["expediteur"] = props.user.id;

    props.setLoading(true);
    clientPayementMasse(payload, showAlert, props.access).then((res) => {
      if (res) {
        const keys = Object.keys({ ...res });
        if (keys.includes("msg")) {
          showAlert(
            "warning",
            res.msg,
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
        } else {
          showAlert(
            "success",
            res.transaction,
            <FontAwesomeIcon icon={["fas", "check"]} />
          );
          props.handleModal();
          setTimeout(() => {
            props.handleModalDetail();
          }, 1200);
        }
      }
      props.setLoading(false);
    });
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit } = props;
  return (
    <>
      <Form onSubmit={handleSubmit} className="p-0 pt-2">
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <Label for="motif">Motif de paiement</Label>
            <Field name="motif" type="text" />
          </Col>
          {errors.motif && touched.motif && (
            <div style={{ color: "red", marginTop: ".5rem" }} className="px-3">
              {errors.motif}
            </div>
          )}
        </Row>
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <div className="d-flex py-2">
              <div className="mr-auto">
                <Button
                  className="btn-pill"
                  color="danger"
                  onClick={() => props.handleModal(null)}
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
                    className="btn-pill"
                    color="info"
                    type="submit"
                    disabled={props.loading}
                  >
                    Confirmer
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
const FormMotifPayement = (props) => <MyEnhancedForm {...props} />;

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  client_participate_cagnote,
})(FormMotifPayement);
